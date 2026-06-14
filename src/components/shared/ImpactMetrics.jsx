import React from 'react';
import { Card, StatCard, Section, PageHeader, Grid, ProgressBar, Button } from '../shared/UI.jsx';
import { IMPACT_DATA, ANALYTICS_DATA } from '../../data/mockData.js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ImpactMetrics() {
  const goals = [
    { label: 'Monthly Meal Goal', current: IMPACT_DATA.totalMeals, target: 15000, icon: '🍽️' },
    { label: 'CO₂ Reduction Goal', current: IMPACT_DATA.co2Saved, target: 800, icon: '🌍' },
    { label: 'Families Helped Goal', current: IMPACT_DATA.familiesHelped, target: 1500, icon: '👨‍👩‍👧‍👦' },
  ];

  return (
    <div>
      <PageHeader title="🌱 Impact Metrics" subtitle="See the real-world difference you're making"
        actions={<Button variant="secondary" icon="📄">Download Report</Button>} />

      <Grid cols={4} gap={16} style={{ marginBottom: 24 }}>
        <StatCard label="Total Meals Served" value={IMPACT_DATA.totalMeals.toLocaleString()} icon="🍽️" color="green" trend={14} />
        <StatCard label="CO₂ Saved" value={`${IMPACT_DATA.co2Saved} kg`} icon="🌍" color="blue" trend={11} />
        <StatCard label="Families Helped" value={IMPACT_DATA.familiesHelped.toLocaleString()} icon="👨‍👩‍👧‍👦" color="orange" trend={9} />
        <StatCard label="Donation Streak" value={`${IMPACT_DATA.donationStreak} days`} icon="🔥" color="purple" sub="Personal best!" />
      </Grid>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20, marginBottom: 24 }}>
        <Section title="📈 Meals Served Over Time">
          <Card style={{ padding: 20 }}>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={ANALYTICS_DATA.monthlyMeals}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-100)" />
                <XAxis dataKey="month" stroke="var(--gray-400)" fontSize={12} />
                <YAxis stroke="var(--gray-400)" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="meals" stroke="var(--green-600)" strokeWidth={3} dot={{ fill: 'var(--green-600)', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Section>

        <Section title="🎯 Monthly Goals">
          <Card style={{ padding: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {goals.map(g => (
                <div key={g.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)' }}>{g.icon} {g.label}</span>
                    <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>{g.current.toLocaleString()} / {g.target.toLocaleString()}</span>
                  </div>
                  <ProgressBar value={g.current} max={g.target} />
                </div>
              ))}
            </div>
          </Card>
        </Section>
      </div>

      <Section title="🏅 Achievements & Badges">
        <Grid cols={5} gap={14}>
          {IMPACT_DATA.badges.map((b, i) => (
            <Card key={b} style={{ padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>{['🥇','🍽️','🎯','🔥','👑'][i % 5]}</div>
              <p style={{ fontWeight: 700, fontSize: 13 }}>{b}</p>
              <p style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 4 }}>Unlocked</p>
            </Card>
          ))}
          {/* Locked badge example */}
          <Card style={{ padding: 20, textAlign: 'center', opacity: 0.5 }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>🔒</div>
            <p style={{ fontWeight: 700, fontSize: 13 }}>Super Donor</p>
            <p style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 4 }}>10,000 meals</p>
          </Card>
        </Grid>
      </Section>

      <Section title="🌍 Environmental Impact">
        <Card style={{ padding: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, textAlign: 'center' }}>
            <div>
              <p style={{ fontSize: 32, marginBottom: 8 }}>🌳</p>
              <p style={{ fontSize: 24, fontWeight: 800, color: 'var(--green-600)' }}>{Math.round(IMPACT_DATA.co2Saved / 21)}</p>
              <p style={{ fontSize: 13, color: 'var(--gray-500)' }}>Equivalent trees planted</p>
            </div>
            <div>
              <p style={{ fontSize: 32, marginBottom: 8 }}>💧</p>
              <p style={{ fontSize: 24, fontWeight: 800, color: 'var(--blue-600)' }}>{(IMPACT_DATA.totalMeals * 2.5).toLocaleString()}L</p>
              <p style={{ fontSize: 13, color: 'var(--gray-500)' }}>Water footprint saved</p>
            </div>
            <div>
              <p style={{ fontSize: 32, marginBottom: 8 }}>♻️</p>
              <p style={{ fontSize: 24, fontWeight: 800, color: 'var(--orange-500)' }}>{Math.round(IMPACT_DATA.totalMeals * 0.4)}kg</p>
              <p style={{ fontSize: 13, color: 'var(--gray-500)' }}>Food waste diverted</p>
            </div>
          </div>
        </Card>
      </Section>
    </div>
  );
}
