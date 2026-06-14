import React, { useState } from 'react';
import { Card, Badge, PageHeader, Tabs, Button } from '../shared/UI.jsx';
import { LEADERBOARD } from '../../data/mockData.js';

const TYPE_LABELS = { donor: '🍽️ Donor', ngo: '🏢 NGO', volunteer: '🚴 Volunteer' };

export default function Leaderboard() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? LEADERBOARD : LEADERBOARD.filter(l => l.type === filter);

  const TABS = [
    { id: 'all', label: 'All' },
    { id: 'donor', label: '🍽️ Donors' },
    { id: 'ngo', label: '🏢 NGOs' },
    { id: 'volunteer', label: '🚴 Volunteers' },
  ];

  const podiumColors = ['linear-gradient(135deg, #fde047, #eab308)', 'linear-gradient(135deg, #e5e7eb, #9ca3af)', 'linear-gradient(135deg, #fdba74, #ea580c)'];

  return (
    <div>
      <PageHeader title="🏆 Leaderboard" subtitle="Top contributors making the biggest impact"
        actions={<Button variant="secondary" icon="📤">Share</Button>} />

      <div style={{ marginBottom: 20 }}>
        <Tabs tabs={TABS} active={filter} onChange={setFilter} />
      </div>

      {/* Podium for top 3 */}
      {filter === 'all' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
          {LEADERBOARD.slice(0, 3).map((l, i) => (
            <Card key={l.rank} style={{ padding: 24, textAlign: 'center', order: i === 0 ? 2 : i === 1 ? 1 : 3, transform: i === 0 ? 'scale(1.05)' : 'none' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: podiumColors[i], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 12px', fontWeight: 800, color: 'white' }}>
                #{l.rank}
              </div>
              <p style={{ fontSize: 28, marginBottom: 4 }}>{l.badge}</p>
              <p style={{ fontWeight: 700, fontSize: 16 }}>{l.name}</p>
              <Badge color={l.type === 'donor' ? 'green' : l.type === 'ngo' ? 'blue' : 'orange'} style={{ marginTop: 6 }}>{TYPE_LABELS[l.type]}</Badge>
              <p style={{ fontSize: 22, fontWeight: 800, color: 'var(--green-600)', marginTop: 12 }}>{l.meals.toLocaleString()}</p>
              <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>meals contributed</p>
            </Card>
          ))}
        </div>
      )}

      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--gray-100)' }}>
              {['Rank', 'Name', 'Type', 'Meals Contributed', 'CO₂ Saved', ''].map(h => (
                <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l.rank} style={{ borderBottom: '1px solid var(--gray-50)' }}>
                <td style={{ padding: '14px 20px', fontWeight: 800, fontSize: 16, color: l.rank <= 3 ? 'var(--orange-500)' : 'var(--gray-600)' }}>{l.badge} #{l.rank}</td>
                <td style={{ padding: '14px 20px', fontWeight: 600 }}>{l.name}</td>
                <td style={{ padding: '14px 20px' }}><Badge color={l.type === 'donor' ? 'green' : l.type === 'ngo' ? 'blue' : 'orange'}>{TYPE_LABELS[l.type]}</Badge></td>
                <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--green-600)' }}>{l.meals.toLocaleString()}</td>
                <td style={{ padding: '14px 20px', color: 'var(--gray-600)' }}>{l.co2} kg</td>
                <td style={{ padding: '14px 20px' }}><Button size="sm" variant="ghost">🎖️ Certificate</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
