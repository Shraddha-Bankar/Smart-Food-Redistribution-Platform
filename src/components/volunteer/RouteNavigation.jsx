import React, { useState } from 'react';
import { Card, Button, PageHeader, Timeline, Badge, Toast } from '../shared/UI.jsx';
import { ROUTE_DATA, DELIVERIES } from '../../data/mockData.js';

export default function RouteNavigation() {
  const [started, setStarted] = useState(false);
  const [toast, setToast] = useState(null);
  const delivery = DELIVERIES.find(d => d.status === 'in_transit') || DELIVERIES[0];

  const start = () => {
    setStarted(true);
    setToast({ msg: '🧭 Navigation started! Follow the route to pickup location.', type: 'info' });
    setTimeout(() => setToast(null), 3000);
  };

  const complete = () => {
    setToast({ msg: '✅ Delivery marked as complete! Great job!', type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div>
      <PageHeader title="🧭 Route Navigation" subtitle="Turn-by-turn directions for your current delivery" />
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <svg viewBox="0 0 600 400" style={{ width: '100%', background: 'linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 100%)', display: 'block' }}>
            {[...Array(6)].map((_, i) => (
              <line key={`v${i}`} x1={i*100+50} y1={0} x2={i*100+50} y2={400} stroke="rgba(255,255,255,0.5)" strokeWidth={1} />
            ))}
            {[...Array(4)].map((_, i) => (
              <line key={`h${i}`} x1={0} y1={i*100+50} x2={600} y2={i*100+50} stroke="rgba(255,255,255,0.5)" strokeWidth={1} />
            ))}
            {/* Roads */}
            <line x1={80} y1={200} x2={520} y2={200} stroke="white" strokeWidth={4} opacity={0.7} />
            <line x1={300} y1={50} x2={300} y2={350} stroke="white" strokeWidth={4} opacity={0.7} />

            {/* Route path */}
            <path d="M 150 120 Q 250 100 300 200 T 450 280" stroke="var(--green-600)" strokeWidth={5} strokeDasharray={started ? "0" : "10,6"} fill="none">
              {started && <animate attributeName="stroke-dashoffset" from="1000" to="0" dur="2s" repeatCount="indefinite" />}
            </path>

            {/* Pickup pin */}
            <circle cx={150} cy={120} r={14} fill="var(--green-600)" stroke="white" strokeWidth={3} />
            <text x={150} y={125} textAnchor="middle" fontSize={14} fill="white">📦</text>
            <text x={150} y={100} textAnchor="middle" fontSize={12} fontWeight="bold" fill="var(--green-700)">Pickup</text>

            {/* Delivery pin */}
            <circle cx={450} cy={280} r={14} fill="var(--blue-600)" stroke="white" strokeWidth={3} />
            <text x={450} y={285} textAnchor="middle" fontSize={14} fill="white">🏁</text>
            <text x={450} y={310} textAnchor="middle" fontSize={12} fontWeight="bold" fill="var(--blue-600)">Delivery</text>

            {/* Volunteer position */}
            {started && (
              <g>
                <circle cx={220} cy={145} r={10} fill="var(--orange-500)" stroke="white" strokeWidth={2}>
                  <animate attributeName="cx" from="150" to="450" dur="8s" repeatCount="indefinite" />
                  <animate attributeName="cy" from="120" to="280" dur="8s" repeatCount="indefinite" />
                </circle>
              </g>
            )}
          </svg>
          <div style={{ padding: '14px 20px', background: 'var(--gray-50)', borderTop: '1px solid var(--gray-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>Distance</p>
              <p style={{ fontWeight: 700 }}>{ROUTE_DATA.distance}</p>
            </div>
            <div>
              <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>ETA</p>
              <p style={{ fontWeight: 700 }}>{ROUTE_DATA.duration}</p>
            </div>
            <div>
              <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>Status</p>
              <Badge color={started ? 'purple' : 'gray'}>{started ? 'In Transit' : 'Not Started'}</Badge>
            </div>
          </div>
        </Card>

        <div>
          <Card style={{ padding: 20, marginBottom: 16 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 12 }}>📦 {delivery.donationTitle}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>Pickup From</p>
                <p style={{ fontWeight: 600 }}>{ROUTE_DATA.pickup.address}</p>
              </div>
              <div>
                <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>Deliver To</p>
                <p style={{ fontWeight: 600 }}>{ROUTE_DATA.delivery.address}</p>
              </div>
              <div>
                <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>Cargo</p>
                <p style={{ fontWeight: 600 }}>{delivery.weight} · {delivery.servings} servings</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <Button variant="secondary" style={{ flex: 1 }}>📞 Call Donor</Button>
              <Button variant="secondary" style={{ flex: 1 }}>📞 Call NGO</Button>
            </div>
          </Card>

          <Card style={{ padding: 20, marginBottom: 16 }}>
            <Timeline steps={[
              { label: 'Head to pickup location', done: started, active: !started, time: '0.5 km' },
              { label: 'Collect food package', done: false, active: started, time: 'At pickup' },
              { label: 'Drive to NGO', done: false, time: ROUTE_DATA.distance },
              { label: 'Hand over & confirm', done: false, time: 'At delivery' },
            ]} />
          </Card>

          {!started ? (
            <Button onClick={start} style={{ width: '100%' }} size="lg" icon="🧭">Start Navigation</Button>
          ) : (
            <Button onClick={complete} style={{ width: '100%' }} size="lg" icon="✅" variant="primary">Mark Delivered</Button>
          )}
        </div>
      </div>
    </div>
  );
}
