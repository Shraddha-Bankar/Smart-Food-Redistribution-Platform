import React, { useState } from 'react';
import { Card, Button, Badge, StatusBadge, PageHeader, Modal, Toast } from '../shared/UI.jsx';
import { SCHEDULED_DONATIONS } from '../../data/mockData.js';

export default function ScheduledDonations({ navigate }) {
  const [donations, setDonations] = useState(SCHEDULED_DONATIONS);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);

  const toggleStatus = (id) => {
    setDonations(ds => ds.map(d => d.id === id ? { ...d, status: d.status === 'active' ? 'paused' : 'active' } : d));
    setToast({ msg: 'Schedule updated', type: 'success' });
    setTimeout(() => setToast(null), 2000);
  };

  const remove = (id) => {
    setDonations(ds => ds.filter(d => d.id !== id));
    setSelected(null);
    setToast({ msg: 'Schedule cancelled', type: 'success' });
    setTimeout(() => setToast(null), 2000);
  };

  const freqColors = { daily: 'green', weekly: 'blue', monthly: 'purple', biweekly: 'orange' };

  return (
    <div>
      <PageHeader title="Scheduled Donations" subtitle="Manage your recurring food donation schedules"
        actions={<Button onClick={() => navigate('post-donation')} icon="➕">New Schedule</Button>} />
      {toast && <Toast message={toast.msg} type={toast.type} />}

      {donations.length === 0 ? (
        <Card style={{ padding: 40, textAlign: 'center' }}>
          <p style={{ fontSize: 40, marginBottom: 12 }}>📅</p>
          <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>No scheduled donations</p>
          <p style={{ color: 'var(--gray-500)', marginBottom: 20 }}>Set up recurring donations to automate your impact</p>
          <Button onClick={() => navigate('post-donation')}>Create Schedule</Button>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {donations.map(d => (
            <Card key={d.id} style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700 }}>{d.title}</h3>
                    <StatusBadge status={d.status} />
                    <Badge color={freqColors[d.frequency] || 'gray'}>{d.frequency}</Badge>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 12 }}>
                    {[
                      { label: '📅 Day', value: d.day },
                      { label: '⏰ Time', value: d.time },
                      { label: '📦 Quantity', value: d.quantity },
                      { label: '🏢 NGO', value: d.assignedNgo },
                    ].map(s => (
                      <div key={s.label} style={{ background: 'var(--gray-50)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
                        <p style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 2 }}>{s.label}</p>
                        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-800)' }}>{s.value}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: d.status === 'active' ? 'var(--green-50)' : 'var(--gray-50)', padding: '8px 14px', borderRadius: 'var(--radius-sm)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, color: 'var(--gray-600)' }}>Next pickup: <strong style={{ color: d.status === 'active' ? 'var(--green-700)' : 'var(--gray-600)' }}>{d.nextPickup}</strong></span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, marginLeft: 20 }}>
                  <Button variant="outline" size="sm" onClick={() => toggleStatus(d.id)}>
                    {d.status === 'active' ? '⏸ Pause' : '▶ Resume'}
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => setSelected(d)}>✏️ Edit</Button>
                  <Button variant="danger" size="sm" onClick={() => remove(d.id)}>🗑️</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Edit Schedule">
        {selected && (
          <div>
            <p style={{ color: 'var(--gray-600)', marginBottom: 20 }}>Editing: <strong>{selected.title}</strong></p>
            <p style={{ color: 'var(--gray-500)', fontSize: 13 }}>Full edit form for recurring schedule management. Use the pause/resume and cancel controls on the main card for quick actions.</p>
            <div style={{ marginTop: 24, display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <Button variant="secondary" onClick={() => setSelected(null)}>Cancel</Button>
              <Button onClick={() => { setSelected(null); setToast({ msg: 'Schedule saved', type: 'success' }); setTimeout(() => setToast(null), 2000); }}>Save Changes</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
