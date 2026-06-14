import React from 'react';
import { StatCard, Card, Button, StatusBadge, Section, PageHeader, Grid, StarRating } from '../shared/UI.jsx';
import { DELIVERIES, VOLUNTEERS } from '../../data/mockData.js';

export default function VolunteerDashboard({ navigate }) {
  const me = VOLUNTEERS[0]; // Rahul Sharma
  const myDeliveries = DELIVERIES.filter(d => d.volunteer === me.name);
  const available = DELIVERIES.filter(d => d.status === 'scheduled');

  return (
    <div>
      <PageHeader
        title={`Hey, ${me.name}! 🚴`}
        subtitle="Ready to make a difference today?"
        actions={<Button onClick={() => navigate('route')} icon="🧭">Start Navigation</Button>}
      />

      <Grid cols={4} gap={16} style={{ marginBottom: 24 }}>
        <StatCard label="Total Deliveries" value={me.deliveries} icon="📦" color="green" trend={9} />
        <StatCard label="Rating" value={<span>⭐ {me.rating} <StarRating rating={Math.round(me.rating)} size={14} /></span>} icon="🏅" color="orange" sub="Avg rating" />
        <StatCard label="Active Today" value={myDeliveries.filter(d => d.status === 'in_transit').length} icon="🚚" color="blue" sub="In progress" />
        <StatCard label="Status" value={me.status === 'available' ? '🟢 Online' : '🔴 Offline'} icon="📍" color="purple" sub={me.location} />
      </Grid>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <Section title="My Active Deliveries" action={<Button variant="ghost" size="sm" onClick={() => navigate('tracking')}>View all →</Button>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {myDeliveries.length > 0 ? myDeliveries.map(d => (
              <Card key={d.id} style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 14 }}>{d.donationTitle}</p>
                    <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>{d.pickupAddress} → {d.deliveryAddress}</p>
                    <p style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 4 }}>{d.distance} · ETA {d.estimatedDelivery}</p>
                  </div>
                  <StatusBadge status={d.status} />
                </div>
                {d.status === 'in_transit' && (
                  <Button size="sm" style={{ marginTop: 10 }} onClick={() => navigate('route')}>🧭 Navigate</Button>
                )}
              </Card>
            )) : (
              <Card style={{ padding: 20, textAlign: 'center', color: 'var(--gray-400)' }}>No active deliveries right now</Card>
            )}
          </div>
        </Section>

        <Section title="Available Pickups" action={<Button variant="ghost" size="sm" onClick={() => navigate('tracking')}>View all →</Button>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {available.map(d => (
              <Card key={d.id} style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 14 }}>{d.donationTitle}</p>
                    <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>{d.donor} → {d.ngo}</p>
                    <p style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 4 }}>{d.distance} · Pickup {d.pickupTime}</p>
                  </div>
                  <StatusBadge status={d.status} />
                </div>
                <Button size="sm" variant="outline" style={{ marginTop: 10 }}>✋ Accept Pickup</Button>
              </Card>
            ))}
          </div>
        </Section>
      </div>

      <Section title="Quick Actions">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {[
            { icon: '🧭', label: 'Navigation', page: 'route', color: 'var(--green-50)', border: 'var(--green-200)' },
            { icon: '🗺️', label: 'Live Map', page: 'map', color: 'var(--blue-50)', border: 'var(--blue-200)' },
            { icon: '🆘', label: 'Emergency', page: 'emergency', color: 'var(--red-50)', border: 'var(--red-100)' },
            { icon: '🌱', label: 'My Impact', page: 'impact', color: 'var(--purple-50)', border: 'var(--purple-100)' },
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
