import React from 'react';
import { StatCard, Card, Button, UrgencyBadge, StatusBadge, Section, PageHeader, Grid } from '../shared/UI.jsx';
import { DONATIONS, DELIVERIES, EMERGENCY_REQUESTS, NGOS } from '../../data/mockData.js';

export default function NGODashboard({ navigate }) {
  const available = DONATIONS.filter(d => d.status === 'available');
  const ngo = NGOS[1]; // Robin Hood Army Nagpur as the logged-in NGO

  return (
    <div>
      <PageHeader
        title={`Welcome, ${ngo.name}! 🏢`}
        subtitle="Find food donations and manage your deliveries"
        actions={<Button onClick={() => navigate('browse')} icon="🔍">Browse Donations</Button>}
      />

      <Grid cols={4} gap={16} style={{ marginBottom: 24 }}>
        <StatCard label="Available Nearby" value={available.length} icon="📦" color="green" trend={15} />
        <StatCard label="Meals Received" value={ngo.totalMeals.toLocaleString()} icon="🍽️" color="orange" trend={6} />
        <StatCard label="Active Volunteers" value={ngo.volunteers} icon="🚴" color="blue" sub="On your team" />
        <StatCard label="Rating" value={`⭐ ${ngo.rating}`} icon="🏅" color="purple" sub="From donors" />
      </Grid>

      {EMERGENCY_REQUESTS.length > 0 && (
        <Card style={{ padding: 16, marginBottom: 24, background: 'var(--red-50)', border: '1px solid var(--red-200)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 24 }}>🆘</span>
              <div>
                <p style={{ fontWeight: 700, color: 'var(--red-700)' }}>{EMERGENCY_REQUESTS.length} Emergency Requests Active</p>
                <p style={{ fontSize: 13, color: 'var(--red-600)' }}>NGOs nearby need urgent food support</p>
              </div>
            </div>
            <Button variant="danger" size="sm" onClick={() => navigate('emergency')}>View All →</Button>
          </div>
        </Card>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <Section title="Available Donations Near You" action={<Button variant="ghost" size="sm" onClick={() => navigate('browse')}>View all →</Button>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {available.slice(0, 4).map(d => (
              <Card key={d.id} style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--gray-900)', marginBottom: 4 }}>{d.title}</p>
                    <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>{d.donor} · {d.quantity}</p>
                    <p style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 4 }}>Pickup: {d.pickupTime}</p>
                  </div>
                  <UrgencyBadge urgency={d.urgency} />
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <div>
          <Section title="Incoming Deliveries" action={<Button variant="ghost" size="sm" onClick={() => navigate('tracking')}>Track →</Button>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {DELIVERIES.map(d => (
                <Card key={d.id} style={{ padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 14 }}>{d.donationTitle}</p>
                      <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>From: {d.donor}</p>
                      <p style={{ fontSize: 12, color: 'var(--gray-400)' }}>Volunteer: {d.volunteer}</p>
                    </div>
                    <StatusBadge status={d.status} />
                  </div>
                </Card>
              ))}
            </div>
          </Section>
        </div>
      </div>

      <Section title="Quick Actions">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {[
            { icon: '🔍', label: 'Browse Food', page: 'browse', color: 'var(--green-50)', border: 'var(--green-200)' },
            { icon: '🆘', label: 'Emergency', page: 'emergency', color: 'var(--red-50)', border: 'var(--red-100)' },
            { icon: '🚚', label: 'Tracking', page: 'tracking', color: 'var(--blue-50)', border: 'var(--blue-200)' },
            { icon: '📊', label: 'Analytics', page: 'analytics', color: 'var(--orange-50)', border: 'var(--orange-100)' },
          ].map(a => (
            <button key={a.page} onClick={() => navigate(a.page)} style={{
              padding: '20px 16px', borderRadius: 'var(--radius-md)', background: a.color,
              border: `1px solid ${a.border}`, cursor: 'pointer', textAlign: 'center',
              transition: 'all 0.15s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              <span style={{ fontSize: 28 }}>{a.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)' }}>{a.label}</span>
            </button>
          ))}
        </div>
      </Section>
    </div>
  );
}
