import React, { useState } from 'react';
import { Card, Button, Input, Select, Tabs, PageHeader, Toast, Avatar, Badge } from '../shared/UI.jsx';

const ROLE_NAMES = { donor: 'Green Farms', ngo: 'Robin Hood Army Nagpur', volunteer: 'Rahul Sharma', admin: 'Platform Admin' };
const ROLE_ICONS = { donor: '🍽️', ngo: '🏢', volunteer: '🚴', admin: '⚙️' };

export default function Profile({ role }) {
  const [tab, setTab] = useState('info');
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    name: ROLE_NAMES[role], email: `${role}@foodbridge.org`, phone: '+91 9876543210',
    address: 'Nagpur, Maharashtra', bio: 'Passionate about reducing food waste and helping communities.',
    language: 'en', notifEmail: true, notifSms: true, notifPush: true,
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const save = () => {
    setToast({ msg: '✅ Profile updated successfully!', type: 'success' });
    setTimeout(() => setToast(null), 2500);
  };

  const TABS = [
    { id: 'info', label: 'Profile Info', icon: '👤' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' },
  ];

  return (
    <div>
      <PageHeader title="Profile" subtitle="Manage your account information and preferences" />
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20 }}>
        <Card style={{ padding: 24, textAlign: 'center' }}>
          <Avatar name={form.name} size={80} />
          <h3 style={{ marginTop: 12, fontWeight: 700, fontSize: 18 }}>{form.name}</h3>
          <Badge color="green" style={{ marginTop: 8 }}>{ROLE_ICONS[role]} {role.charAt(0).toUpperCase() + role.slice(1)}</Badge>
          <p style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 12 }}>{form.email}</p>
          <p style={{ fontSize: 13, color: 'var(--gray-500)' }}>{form.address}</p>
          <Button variant="outline" size="sm" style={{ marginTop: 16, width: '100%' }}>📷 Change Photo</Button>

          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--gray-100)', textAlign: 'left' }}>
            <p style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 8, fontWeight: 700, textTransform: 'uppercase' }}>Account Stats</p>
            {[
              { label: 'Member since', value: 'Jan 2024' },
              { label: 'Total activity', value: role === 'donor' ? '45 donations' : role === 'ngo' ? '78 requests' : role === 'volunteer' ? '87 deliveries' : '142 actions' },
              { label: 'Status', value: '✅ Verified' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: 'var(--gray-500)' }}>{s.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{s.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ padding: 28 }}>
          <Tabs tabs={TABS} active={tab} onChange={setTab} />

          <div style={{ marginTop: 24 }}>
            {tab === 'info' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <Input label="Full Name / Organization" value={form.name} onChange={e => set('name', e.target.value)} />
                  <Input label="Email" type="email" value={form.email} onChange={e => set('email', e.target.value)} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <Input label="Phone Number" type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} />
                  <Input label="Address" value={form.address} onChange={e => set('address', e.target.value)} />
                </div>
                <Input label="Bio / Description" rows={3} value={form.bio} onChange={e => set('bio', e.target.value)} />
              </div>
            )}

            {tab === 'security' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <Input label="Current Password" type="password" placeholder="••••••••" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <Input label="New Password" type="password" placeholder="••••••••" />
                  <Input label="Confirm New Password" type="password" placeholder="••••••••" />
                </div>
                <div style={{ background: 'var(--blue-50)', border: '1px solid var(--blue-200)', borderRadius: 'var(--radius)', padding: 16 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--blue-700)' }}>🔐 Two-Factor Authentication</p>
                  <p style={{ fontSize: 12, color: 'var(--blue-600)', marginTop: 4 }}>Add an extra layer of security to your account.</p>
                  <Button size="sm" variant="outline" style={{ marginTop: 10 }}>Enable 2FA</Button>
                </div>
              </div>
            )}

            {tab === 'notifications' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { key: 'notifEmail', label: 'Email Notifications', desc: 'Receive updates via email' },
                  { key: 'notifSms', label: 'SMS Alerts', desc: 'Get urgent alerts via SMS' },
                  { key: 'notifPush', label: 'Push Notifications', desc: 'Browser/app push notifications' },
                ].map(n => (
                  <div key={n.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: 'var(--gray-50)', borderRadius: 'var(--radius)' }}>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 14 }}>{n.label}</p>
                      <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>{n.desc}</p>
                    </div>
                    <button onClick={() => set(n.key, !form[n.key])} style={{
                      width: 44, height: 24, borderRadius: 99, background: form[n.key] ? 'var(--green-600)' : 'var(--gray-300)',
                      position: 'relative', border: 'none', cursor: 'pointer', transition: 'background 0.2s'
                    }}>
                      <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: form[n.key] ? 23 : 3, transition: 'left 0.2s' }} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {tab === 'preferences' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <Select label="Language" value={form.language} onChange={e => set('language', e.target.value)} options={[
                  { value: 'en', label: 'English' }, { value: 'hi', label: 'हिंदी (Hindi)' }, { value: 'mr', label: 'मराठी (Marathi)' },
                ]} />
                <Select label="Default Dashboard View" value="dashboard" onChange={() => {}} options={[
                  { value: 'dashboard', label: 'Dashboard' }, { value: 'browse', label: 'Browse' }, { value: 'map', label: 'Live Map' },
                ]} />
                <div style={{ background: 'var(--red-50)', border: '1px solid var(--red-100)', borderRadius: 'var(--radius)', padding: 16 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--red-600)' }}>⚠️ Danger Zone</p>
                  <p style={{ fontSize: 12, color: 'var(--gray-600)', marginTop: 4 }}>Permanently delete your account and all associated data.</p>
                  <Button size="sm" variant="danger" style={{ marginTop: 10 }}>Delete Account</Button>
                </div>
              </div>
            )}

            <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--gray-100)', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <Button variant="secondary">Cancel</Button>
              <Button onClick={save} icon="💾">Save Changes</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
