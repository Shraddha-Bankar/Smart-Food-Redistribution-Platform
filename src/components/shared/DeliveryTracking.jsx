import React, { useState } from 'react';
import { Card, Button, StatusBadge, PageHeader, Modal, Timeline, ProgressBar } from '../shared/UI.jsx';
import { DELIVERIES } from '../../data/mockData.js';

export default function DeliveryTracking() {
  const [selected, setSelected] = useState(null);

  const getSteps = (d) => [
    { label: 'Donation Posted', done: true, time: '10:00 AM', note: `By ${d.donor}` },
    { label: 'NGO Matched', done: true, time: '10:15 AM', note: `Assigned to ${d.ngo}` },
    { label: 'Volunteer Assigned', done: true, time: '10:30 AM', note: `${d.volunteer} accepted` },
    { label: 'Pickup In Progress', done: d.status !== 'scheduled', active: d.status === 'in_transit', time: d.pickupTime },
    { label: 'Delivered', done: d.status === 'completed', time: d.estimatedDelivery, note: d.status === 'completed' ? 'Successfully delivered!' : 'Estimated' },
  ];

  const statusColor = { in_transit: 'var(--purple-600)', completed: 'var(--green-600)', scheduled: 'var(--yellow-500)' };
  const progressPct = { in_transit: 70, completed: 100, scheduled: 30 };

  return (
    <div>
      <PageHeader title="Delivery Tracking" subtitle="Real-time status of all food deliveries" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {DELIVERIES.map(d => (
          <Card key={d.id} style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{d.donationTitle}</h3>
                <p style={{ fontSize: 13, color: 'var(--gray-500)' }}>{d.donor} → {d.ngo}</p>
                <p style={{ fontSize: 13, color: 'var(--gray-400)' }}>🚴 {d.volunteer} · {d.distance} · {d.servings} servings</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <StatusBadge status={d.status} />
                <p style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 6 }}>ETA: {d.estimatedDelivery}</p>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>{d.pickupAddress}</span>
                <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>{d.deliveryAddress}</span>
              </div>
              <ProgressBar value={progressPct[d.status] || 0} color={statusColor[d.status] || 'var(--gray-400)'} height={10} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>📍 Pickup</span>
                <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>🏁 Delivery</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <Button variant="outline" size="sm" onClick={() => setSelected(d)}>📋 View Timeline</Button>
              {d.status === 'in_transit' && <Button variant="secondary" size="sm">📞 Call Volunteer</Button>}
            </div>
          </Card>
        ))}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Delivery Timeline">
        {selected && (
          <div>
            <div style={{ background: 'var(--gray-50)', padding: 16, borderRadius: 'var(--radius)', marginBottom: 20 }}>
              <h4 style={{ fontWeight: 700, marginBottom: 4 }}>{selected.donationTitle}</h4>
              <p style={{ fontSize: 13, color: 'var(--gray-500)' }}>{selected.weight} · {selected.servings} servings · {selected.distance}</p>
            </div>
            <Timeline steps={getSteps(selected)} />
          </div>
        )}
      </Modal>
    </div>
  );
}
