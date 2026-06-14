import React from 'react';
import { StatCard, Card, Button, UrgencyBadge, StatusBadge, Section, PageHeader, Grid } from '../shared/UI.jsx';
import { DONATIONS, DELIVERIES, IMPACT_DATA } from '../../data/mockData.js';

export default function DonorDashboard({ navigate }) {
  const activeDonations = DONATIONS.filter(d => d.status === 'available' || d.status === 'pending');
  const completedDonations = DONATIONS.filter(d => d.status === 'completed');

  return (
    <div>
      <PageHeader
        title="Welcome back! 👋"
        subtitle="Here's an overview of your food donation activity"
        actions={<Button onClick={() => navigate('post-donation')} icon="➕">Post New Donation</Button>}
      />

      <Grid cols={4} gap={16} style={{ marginBottom: 24 }}>
        <StatCard label="Active Donations" value={activeDonations.length} icon="📦" color="green" trend={12} />
        <StatCard label="Meals Served" value="1,245" icon="🍽️" color="orange" trend={8} />
        <StatCard label="CO₂ Saved" value="62 kg" icon="🌍" color="blue" sub="This month" />
        <StatCard label="Streak" value={`${IMPACT_DATA.donationStreak}d`} icon="🔥" color="purple" sub="Keep it up!" />
      </Grid>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <Section title="Active Donations" action={<Button variant="ghost" size="sm" onClick={() => navigate('browse')}>View all →</Button>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {activeDonations.map(d => (
              <Card key={d.id} style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--gray-900)', marginBottom: 4 }}>{d.title}</p>
                    <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>{d.quantity} · {d.location}</p>
                    <p style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 4 }}>Pickup: {d.pickupTime}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}>
                    <StatusBadge status={d.status} />
                    <UrgencyBadge urgency={d.urgency} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <div>
          <Section title="Recent Deliveries" action={<Button variant="ghost" size="sm" onClick={() => navigate('tracking')}>Track →</Button>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {DELIVERIES.map(d => (
                <Card key={d.id} style={{ padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 14 }}>{d.donationTitle}</p>
                      <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>To: {d.ngo}</p>
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
            { icon: '➕', label: 'Post Donation', page: 'post-donation', color: 'var(--green-50)', border: 'var(--green-200)' },
            { icon: '🤖', label: 'Smart Match', page: 'smart-match', color: 'var(--blue-50)', border: 'var(--blue-200)' },
            { icon: '📅', label: 'Schedule', page: 'scheduled', color: 'var(--purple-50)', border: 'var(--purple-100)' },
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

      <Section title="🏅 Your Badges">
        <Card style={{ padding: 20 }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {IMPACT_DATA.badges.map(b => (
              <div key={b} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '12px 16px', background: 'var(--green-50)', borderRadius: 'var(--radius)', border: '1px solid var(--green-200)' }}>
                <span style={{ fontSize: 24 }}>🏅</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--green-700)' }}>{b}</span>
              </div>
            ))}
          </div>
        </Card>
      </Section>
    </div>
  );
}
