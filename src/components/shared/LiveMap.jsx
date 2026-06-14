import React, { useState } from 'react';
import { Card, Button, Badge, PageHeader } from '../shared/UI.jsx';
import { DONATIONS, NGOS, VOLUNTEERS } from '../../data/mockData.js';

const PIN_TYPES = {
  donor: { color: '#16a34a', icon: '📦', label: 'Donor' },
  ngo: { color: '#2563eb', icon: '🏢', label: 'NGO' },
  volunteer: { color: '#f97316', icon: '🚴', label: 'Volunteer' },
};

export default function LiveMap() {
  const [activeType, setActiveType] = useState('all');
  const [hoveredPin, setHoveredPin] = useState(null);

  // Nagpur center: 21.1458, 79.0882
  // Map our lat/lng to SVG coords
  const toSVG = (lat, lng) => {
    const minLat = 21.10, maxLat = 21.18;
    const minLng = 79.05, maxLng = 79.12;
    const x = ((lng - minLng) / (maxLng - minLng)) * 760 + 20;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 380 + 20;
    return { x, y };
  };

  const donorPins = DONATIONS.filter(d => d.status !== 'completed').map(d => ({ ...toSVG(d.lat, d.lng), type: 'donor', label: d.title, sub: d.quantity, id: d.id }));
  const ngoPins = NGOS.map(n => ({ ...toSVG(n.lat, n.lng), type: 'ngo', label: n.name, sub: n.operatingHours, id: n.id }));
  const volPins = [
    { ...toSVG(21.1432, 79.0756), type: 'volunteer', label: 'Rahul Sharma', sub: 'In Transit', id: 1 },
    { ...toSVG(21.1601, 79.0892), type: 'volunteer', label: 'Sneha Patil', sub: 'Available', id: 4 },
  ];

  const allPins = [
    ...(activeType === 'all' || activeType === 'donor' ? donorPins : []),
    ...(activeType === 'all' || activeType === 'ngo' ? ngoPins : []),
    ...(activeType === 'all' || activeType === 'volunteer' ? volPins : []),
  ];

  return (
    <div>
      <PageHeader title="🗺️ Live Map" subtitle="Real-time view of donations, NGOs, and volunteers in Nagpur" />

      <Card style={{ padding: 16, marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)' }}>Show:</span>
          {['all', 'donor', 'ngo', 'volunteer'].map(t => (
            <button key={t} onClick={() => setActiveType(t)} style={{
              padding: '6px 16px', borderRadius: 'var(--radius-full)', fontSize: 13, fontWeight: 600,
              background: activeType === t ? PIN_TYPES[t]?.color || 'var(--gray-700)' : 'var(--gray-100)',
              color: activeType === t ? 'white' : 'var(--gray-600)',
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
            }}>
              {t === 'all' ? '🌍 All' : `${PIN_TYPES[t].icon} ${PIN_TYPES[t].label}s`}
            </button>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 16 }}>
            {Object.entries(PIN_TYPES).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: v.color }} />
                <span style={{ fontSize: 12, color: 'var(--gray-600)' }}>{v.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
        {/* SVG Map */}
        <svg viewBox="0 0 800 420" style={{ width: '100%', background: 'linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 100%)', display: 'block' }}>
          {/* Grid lines */}
          {[...Array(8)].map((_, i) => (
            <line key={`v${i}`} x1={i*100+50} y1={0} x2={i*100+50} y2={420} stroke="rgba(255,255,255,0.5)" strokeWidth={1} />
          ))}
          {[...Array(4)].map((_, i) => (
            <line key={`h${i}`} x1={0} y1={i*100+60} x2={800} y2={i*100+60} stroke="rgba(255,255,255,0.5)" strokeWidth={1} />
          ))}

          {/* Road lines */}
          <line x1={100} y1={210} x2={700} y2={210} stroke="white" strokeWidth={3} opacity={0.6} />
          <line x1={400} y1={20} x2={400} y2={400} stroke="white" strokeWidth={3} opacity={0.6} />
          <line x1={150} y1={80} x2={650} y2={350} stroke="white" strokeWidth={2} opacity={0.4} />

          {/* Active delivery route */}
          <line x1={380} y1={130} x2={310} y2={225} stroke="var(--purple-500)" strokeWidth={3} strokeDasharray="8,4" opacity={0.8} />
          <text x={340} y={178} fontSize={11} fill="var(--purple-600)" fontWeight="bold">in transit</text>

          {/* Nagpur label */}
          <text x={390} y={215} textAnchor="middle" fontSize={22} fontWeight="bold" fill="rgba(0,0,0,0.08)">NAGPUR</text>

          {/* Pins */}
          {allPins.map((pin, i) => {
            const pt = PIN_TYPES[pin.type];
            const isHovered = hoveredPin === `${pin.type}-${pin.id}`;
            return (
              <g key={i}
                onMouseEnter={() => setHoveredPin(`${pin.type}-${pin.id}`)}
                onMouseLeave={() => setHoveredPin(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle cx={pin.x} cy={pin.y} r={isHovered ? 22 : 18} fill={pt.color} opacity={0.15} />
                <circle cx={pin.x} cy={pin.y} r={isHovered ? 14 : 12} fill={pt.color} stroke="white" strokeWidth={2} />
                <text x={pin.x} y={pin.y + 5} textAnchor="middle" fontSize={12}>{pt.icon}</text>
                {isHovered && (
                  <g>
                    <rect x={pin.x - 70} y={pin.y - 52} width={140} height={44} rx={6} fill="white" filter="drop-shadow(0 2px 8px rgba(0,0,0,0.15))" />
                    <text x={pin.x} y={pin.y - 33} textAnchor="middle" fontSize={11} fontWeight="bold" fill="#111827">{pin.label.length > 18 ? pin.label.slice(0,18)+'…' : pin.label}</text>
                    <text x={pin.x} y={pin.y - 17} textAnchor="middle" fontSize={10} fill="#6b7280">{pin.sub}</text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        <div style={{ padding: '12px 20px', background: 'var(--gray-50)', borderTop: '1px solid var(--gray-100)', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, color: 'var(--gray-600)' }}>📦 {donorPins.length} active donations</span>
          <span style={{ fontSize: 13, color: 'var(--gray-600)' }}>🏢 {ngoPins.length} NGOs</span>
          <span style={{ fontSize: 13, color: 'var(--gray-600)' }}>🚴 {volPins.length} volunteers</span>
          <span style={{ fontSize: 13, color: 'var(--purple-600)', fontWeight: 600 }}>🚚 1 delivery in progress</span>
          <span style={{ fontSize: 12, color: 'var(--gray-400)', marginLeft: 'auto' }}>Hover pins for details</span>
        </div>
      </Card>

      <Card style={{ padding: 20, marginTop: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700 }}>🚴 Nearby Volunteers</h3>
          <Button variant="ghost" size="sm">View all →</Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
          {VOLUNTEERS.map(v => (
            <div key={v.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--gray-50)', borderRadius: 'var(--radius)' }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: 13 }}>{v.name}</p>
                <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>{v.location} · {v.vehicle}</p>
              </div>
              <Badge color={v.status === 'available' ? 'green' : v.status === 'on_delivery' ? 'purple' : 'gray'}>
                {v.status.replace('_', ' ')}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
