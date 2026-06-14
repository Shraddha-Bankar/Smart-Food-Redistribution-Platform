import React, { useState } from 'react';
import { Card, Button, UrgencyBadge, StatusBadge, SearchBar, PageHeader, Modal, Toast } from '../shared/UI.jsx';
import { DONATIONS } from '../../data/mockData.js';

const CATEGORY_ICONS = {
  vegetables: '🥦', fruits: '🍎', cooked: '🍛', bakery: '🥖',
  packaged: '📦', dairy: '🥛', grains: '🌾', other: '🍱'
};

export default function BrowseDonations({ role }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [urgency, setUrgency] = useState('all');
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);

  const filtered = DONATIONS.filter(d => {
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase()) || d.donor.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || d.category === filter;
    const matchUrgency = urgency === 'all' || d.urgency === urgency;
    return matchSearch && matchFilter && matchUrgency;
  });

  const requestDonation = () => {
    setToast({ msg: '✅ Request sent! The donor will be notified.', type: 'success' });
    setSelected(null);
    setTimeout(() => setToast(null), 3000);
  };

  const categories = ['all', 'vegetables', 'fruits', 'cooked', 'bakery', 'packaged', 'grains'];

  return (
    <div>
      <PageHeader title={role === 'admin' ? 'All Donations' : 'Browse Available Food'} subtitle="Find food donations near you" />
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <Card style={{ padding: 16, marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <SearchBar value={search} onChange={e => setSearch(e.target.value)} placeholder="Search donations..." />
          </div>
          <select value={urgency} onChange={e => setUrgency(e.target.value)} style={{ padding: '10px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)', fontSize: 13, background: 'white' }}>
            <option value="all">All Urgency</option>
            <option value="high">🔴 Urgent</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{
              padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: 13, fontWeight: 600,
              background: filter === c ? 'var(--green-600)' : 'var(--gray-100)',
              color: filter === c ? 'white' : 'var(--gray-600)',
              border: 'none', cursor: 'pointer', transition: 'all 0.15s'
            }}>
              {c === 'all' ? '🍱 All' : `${CATEGORY_ICONS[c]} ${c.charAt(0).toUpperCase() + c.slice(1)}`}
            </button>
          ))}
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {filtered.map(d => (
          <Card key={d.id} style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }} onClick={() => setSelected(d)}>
            <div style={{ background: d.urgency === 'high' ? 'var(--red-50)' : d.urgency === 'medium' ? 'var(--orange-50)' : 'var(--green-50)', padding: '12px 16px', borderBottom: '1px solid var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 24 }}>{CATEGORY_ICONS[d.category] || '🍱'}</span>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 14 }}>{d.title}</p>
                  <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>by {d.donor}</p>
                </div>
              </div>
              <UrgencyBadge urgency={d.urgency} />
            </div>
            <div style={{ padding: 16 }}>
              <p style={{ fontSize: 13, color: 'var(--gray-600)', marginBottom: 12, lineHeight: 1.5 }}>{d.description}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                {[
                  { icon: '📦', label: d.quantity },
                  { icon: '🍽️', label: `${d.servings} servings` },
                  { icon: '📍', label: d.address.split(',')[0] },
                  { icon: '⏰', label: d.pickupTime },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 14 }}>{item.icon}</span>
                    <span style={{ fontSize: 12, color: 'var(--gray-600)' }}>{item.label}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <StatusBadge status={d.status} />
                <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>Expires: {d.expiry}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card style={{ padding: 40, textAlign: 'center' }}>
          <p style={{ fontSize: 40, marginBottom: 12 }}>🔍</p>
          <p style={{ fontWeight: 700, fontSize: 16 }}>No donations found</p>
          <p style={{ color: 'var(--gray-500)' }}>Try adjusting your filters</p>
        </Card>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Donation Details" width={640}>
        {selected && (
          <div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 40 }}>{CATEGORY_ICONS[selected.category]}</span>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 700 }}>{selected.title}</h3>
                <p style={{ color: 'var(--gray-500)' }}>by {selected.donor}</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  <StatusBadge status={selected.status} />
                  <UrgencyBadge urgency={selected.urgency} />
                </div>
              </div>
            </div>
            <p style={{ color: 'var(--gray-600)', marginBottom: 20, lineHeight: 1.6 }}>{selected.description}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              {[
                { label: 'Quantity', value: selected.quantity },
                { label: 'Servings', value: `${selected.servings} people` },
                { label: 'Address', value: selected.address },
                { label: 'Pickup Time', value: selected.pickupTime },
                { label: 'Expiry', value: selected.expiry },
                { label: 'Contact', value: selected.contactPhone },
              ].map(item => (
                <div key={item.label} style={{ background: 'var(--gray-50)', padding: '12px 14px', borderRadius: 'var(--radius-sm)' }}>
                  <p style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 2 }}>{item.label}</p>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>{item.value}</p>
                </div>
              ))}
            </div>
            {role === 'ngo' && selected.status === 'available' && (
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <Button variant="secondary" onClick={() => setSelected(null)}>Close</Button>
                <Button onClick={requestDonation} icon="📩">Request This Donation</Button>
              </div>
            )}
            {role !== 'ngo' && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="secondary" onClick={() => setSelected(null)}>Close</Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
