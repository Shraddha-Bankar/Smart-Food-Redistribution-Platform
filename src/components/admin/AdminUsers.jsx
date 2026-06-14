import React, { useState } from 'react';
import { Card, Button, Badge, StatusBadge, SearchBar, PageHeader, Toast, Select } from '../shared/UI.jsx';
import { USERS_ADMIN } from '../../data/mockData.js';

const TYPE_ICONS = { donor: '🍽️', ngo: '🏢', volunteer: '🚴', admin: '⚙️' };

export default function AdminUsers() {
  const [users, setUsers] = useState(USERS_ADMIN);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [toast, setToast] = useState(null);

  const filtered = users.filter(u =>
    (typeFilter === 'all' || u.type === typeFilter) &&
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleSuspend = (id) => {
    setUsers(us => us.map(u => u.id === id ? { ...u, status: u.status === 'suspended' ? 'active' : 'suspended' } : u));
    setToast({ msg: 'User status updated', type: 'success' });
    setTimeout(() => setToast(null), 2000);
  };

  const approve = (id) => {
    setUsers(us => us.map(u => u.id === id ? { ...u, status: 'active' } : u));
    setToast({ msg: '✅ User approved', type: 'success' });
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <div>
      <PageHeader title="👥 User Management" subtitle={`${users.length} total users on the platform`} />
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <Card style={{ padding: 16, marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <SearchBar value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email..." />
          </div>
          <Select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} options={[
            { value: 'all', label: 'All Types' }, { value: 'donor', label: '🍽️ Donors' },
            { value: 'ngo', label: '🏢 NGOs' }, { value: 'volunteer', label: '🚴 Volunteers' },
          ]} />
        </div>
      </Card>

      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--gray-100)' }}>
              {['Name', 'Type', 'Email', 'Joined', 'Activity', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid var(--gray-50)' }}>
                <td style={{ padding: '14px 20px', fontWeight: 600 }}>{u.name}</td>
                <td style={{ padding: '14px 20px' }}><Badge color="gray">{TYPE_ICONS[u.type]} {u.type}</Badge></td>
                <td style={{ padding: '14px 20px', color: 'var(--gray-600)', fontSize: 13 }}>{u.email}</td>
                <td style={{ padding: '14px 20px', color: 'var(--gray-600)', fontSize: 13 }}>{u.joined}</td>
                <td style={{ padding: '14px 20px', color: 'var(--gray-600)', fontSize: 13 }}>{u.donations > 0 ? `${u.donations} donations` : '—'}</td>
                <td style={{ padding: '14px 20px' }}><StatusBadge status={u.status} /></td>
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {u.status === 'pending' && <Button size="sm" onClick={() => approve(u.id)}>✓ Approve</Button>}
                    {u.status !== 'pending' && (
                      <Button size="sm" variant={u.status === 'suspended' ? 'outline' : 'danger'} onClick={() => toggleSuspend(u.id)}>
                        {u.status === 'suspended' ? '✓ Reactivate' : '🚫 Suspend'}
                      </Button>
                    )}
                    <Button size="sm" variant="ghost">👁️ View</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
