import React from 'react';
import { StatCard, Card, Button, StatusBadge, Section, PageHeader, Grid } from '../shared/UI.jsx';
import { DONATIONS, DELIVERIES, USERS_ADMIN, IMPACT_DATA, NGOS } from '../../data/mockData.js';

export default function AdminDashboard({ navigate }) {
  const pendingNgos = NGOS.filter(n => !n.verified);
  const pendingUsers = USERS_ADMIN.filter(u => u.status === 'pending');
  const activeDeliveries = DELIVERIES.filter(d => d.status === 'in_transit');

  return (
    <div>
      <PageHeader
        title="Admin Dashboard ⚙️"
        subtitle="Platform overview and management"
        actions={<Button onClick={() => navigate('analytics')} icon="📊">View Analytics</Button>}
      />

      <Grid cols={4} gap={16} style={{ marginBottom: 24 }}>
        <StatCard label="Total Meals Served" value={IMPACT_DATA.totalMeals.toLocaleString()} icon="🍽️" color="green" trend={14} />
        <StatCard label="Active Donations" value={DONATIONS.filter(d => d.status !== 'completed').length} icon="📦" color="blue" trend={8} />
        <StatCard label="Total Users" value={USERS_ADMIN.length} icon="👥" color="orange" sub={`${pendingUsers.length} pending`} />
        <StatCard label="CO₂ Saved" value={`${IMPACT_DATA.co2Saved} kg`} icon="🌍" color="purple" sub="This month" />
      </Grid>

      {pendingNgos.length > 0 && (
        <Card style={{ padding: 16, marginBottom: 24, background: 'var(--orange-50)', border: '1px solid var(--orange-100)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 24 }}>🏢</span>
              <div>
                <p style={{ fontWeight: 700, color: 'var(--orange-600)' }}>{pendingNgos.length} NGO(s) Pending Verification</p>
                <p style={{ fontSize: 13, color: 'var(--gray-600)' }}>{pendingNgos.map(n => n.name).join(', ')}</p>
              </div>
            </div>
            <Button variant="warning" size="sm" onClick={() => navigate('ngo-verify')}>Review →</Button>
          </div>
        </Card>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <Section title="Recent Users" action={<Button variant="ghost" size="sm" onClick={() => navigate('admin-users')}>Manage →</Button>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {USERS_ADMIN.slice(0, 4).map(u => (
              <Card key={u.id} style={{ padding: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 14 }}>{u.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>{u.email} · {u.type}</p>
                  </div>
                  <StatusBadge status={u.status} />
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="Active Deliveries" action={<Button variant="ghost" size="sm" onClick={() => navigate('tracking')}>View all →</Button>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {DELIVERIES.map(d => (
              <Card key={d.id} style={{ padding: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 14 }}>{d.donationTitle}</p>
                    <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>{d.donor} → {d.ngo} via {d.volunteer}</p>
                  </div>
                  <StatusBadge status={d.status} />
                </div>
              </Card>
            ))}
          </div>
        </Section>
      </div>

      <Section title="Platform Management">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {[
            { icon: '👥', label: 'Users', page: 'admin-users', color: 'var(--green-50)', border: 'var(--green-200)' },
            { icon: '🏢', label: 'NGO Verify', page: 'ngo-verify', color: 'var(--blue-50)', border: 'var(--blue-200)' },
            { icon: '🆘', label: 'Emergency', page: 'emergency', color: 'var(--red-50)', border: 'var(--red-100)' },
            { icon: '📊', label: 'Analytics', page: 'analytics', color: 'var(--purple-50)', border: 'var(--purple-100)' },
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
