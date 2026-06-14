import React, { useState } from 'react';
import { Card, Button, Badge, StarRating, PageHeader, Toast, Modal } from '../shared/UI.jsx';
import { NGOS } from '../../data/mockData.js';

export default function NGOVerify() {
  const [ngos, setNgos] = useState(NGOS);
  const [toast, setToast] = useState(null);
  const [selected, setSelected] = useState(null);

  const pending = ngos.filter(n => !n.verified);
  const verified = ngos.filter(n => n.verified);

  const approve = (id) => {
    setNgos(ns => ns.map(n => n.id === id ? { ...n, verified: true } : n));
    setSelected(null);
    setToast({ msg: '✅ NGO approved and verified!', type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  const requestDocs = () => {
    setToast({ msg: '📄 Document request sent to NGO', type: 'info' });
    setSelected(null);
    setTimeout(() => setToast(null), 3000);
  };

  const reject = (id) => {
    setNgos(ns => ns.filter(n => n.id !== id));
    setSelected(null);
    setToast({ msg: '❌ NGO application rejected', type: 'error' });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div>
      <PageHeader title="🏢 NGO Verification" subtitle={`${pending.length} pending applications, ${verified.length} verified NGOs`} />
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      {pending.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: 'var(--orange-600)' }}>⏳ Pending Verification</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {pending.map(n => (
              <Card key={n.id} style={{ padding: 20, border: '1px solid var(--orange-200)', background: 'var(--orange-50)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 700 }}>{n.name}</h3>
                      <Badge color="orange">Pending Review</Badge>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--gray-600)', marginTop: 4 }}>{n.description}</p>
                    <div style={{ display: 'flex', gap: 16, marginTop: 10, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 12, color: 'var(--gray-600)' }}>📍 {n.address}</span>
                      <span style={{ fontSize: 12, color: 'var(--gray-600)' }}>📞 {n.contactPhone}</span>
                      <span style={{ fontSize: 12, color: 'var(--gray-600)' }}>✉️ {n.contactEmail}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Button size="sm" onClick={() => approve(n.id)} icon="✅">Approve</Button>
                    <Button size="sm" variant="secondary" onClick={() => setSelected(n)}>👁️ Review</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: 'var(--green-700)' }}>✅ Verified NGOs</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {verified.map(n => (
            <Card key={n.id} style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700 }}>{n.name}</h3>
                <Badge color="blue">✓ Verified</Badge>
              </div>
              <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 10 }}>{n.description}</p>
              <div style={{ display: 'flex', gap: 14, fontSize: 12, color: 'var(--gray-600)', flexWrap: 'wrap' }}>
                <span><StarRating rating={Math.round(n.rating)} size={12} /> {n.rating}</span>
                <span>🍽️ {n.totalMeals.toLocaleString()} meals</span>
                <span>👥 {n.volunteers} volunteers</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="NGO Application Review" width={640}>
        {selected && (
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{selected.name}</h3>
            <p style={{ color: 'var(--gray-600)', marginBottom: 16 }}>{selected.description}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              {[
                { label: 'Category', value: selected.category.replace('_', ' ') },
                { label: 'Address', value: selected.address },
                { label: 'Operating Hours', value: selected.operatingHours },
                { label: 'Storage Capacity', value: selected.storageCapacity },
                { label: 'Vehicles Available', value: selected.vehiclesAvailable },
                { label: 'Contact', value: selected.contactPhone },
              ].map(item => (
                <div key={item.label} style={{ background: 'var(--gray-50)', padding: '12px 14px', borderRadius: 'var(--radius-sm)' }}>
                  <p style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 2 }}>{item.label}</p>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>{item.value}</p>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <Button variant="danger" onClick={() => reject(selected.id)}>❌ Reject</Button>
              <Button variant="secondary" onClick={requestDocs}>📄 Request Documents</Button>
              <Button onClick={() => approve(selected.id)} icon="✅">Approve NGO</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
