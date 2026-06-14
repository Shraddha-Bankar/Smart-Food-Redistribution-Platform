import React from 'react';

const NAV_ITEMS = {
  donor: [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'post-donation', icon: '➕', label: 'Post Donation' },
    { id: 'scheduled', icon: '📅', label: 'Scheduled' },
    { id: 'tracking', icon: '🚚', label: 'Tracking' },
    { id: 'smart-match', icon: '🤖', label: 'Smart Match' },
    { id: 'impact', icon: '🌱', label: 'My Impact' },
    { id: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
    { id: 'reviews', icon: '⭐', label: 'Reviews' },
    { id: 'analytics', icon: '📊', label: 'Analytics' },
    { id: 'map', icon: '🗺️', label: 'Live Map' },
    { id: 'messages', icon: '💬', label: 'Messages' },
    { id: 'ai', icon: '✨', label: 'AI Assistant' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ],
  ngo: [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'browse', icon: '🔍', label: 'Browse Food' },
    { id: 'emergency', icon: '🆘', label: 'Emergency' },
    { id: 'tracking', icon: '🚚', label: 'Tracking' },
    { id: 'map', icon: '🗺️', label: 'Live Map' },
    { id: 'impact', icon: '🌱', label: 'Impact' },
    { id: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
    { id: 'reviews', icon: '⭐', label: 'Reviews' },
    { id: 'analytics', icon: '📊', label: 'Analytics' },
    { id: 'messages', icon: '💬', label: 'Messages' },
    { id: 'ai', icon: '✨', label: 'AI Assistant' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ],
  volunteer: [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'route', icon: '🧭', label: 'Navigation' },
    { id: 'tracking', icon: '🚚', label: 'My Deliveries' },
    { id: 'map', icon: '🗺️', label: 'Live Map' },
    { id: 'emergency', icon: '🆘', label: 'Emergency' },
    { id: 'impact', icon: '🌱', label: 'My Impact' },
    { id: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
    { id: 'messages', icon: '💬', label: 'Messages' },
    { id: 'ai', icon: '✨', label: 'AI Assistant' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ],
  admin: [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'admin-users', icon: '👥', label: 'Users' },
    { id: 'ngo-verify', icon: '🏢', label: 'NGO Verify' },
    { id: 'browse', icon: '🔍', label: 'All Donations' },
    { id: 'tracking', icon: '🚚', label: 'Deliveries' },
    { id: 'map', icon: '🗺️', label: 'Live Map' },
    { id: 'analytics', icon: '📊', label: 'Analytics' },
    { id: 'emergency', icon: '🆘', label: 'Emergency' },
    { id: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
    { id: 'messages', icon: '💬', label: 'Messages' },
    { id: 'ai', icon: '✨', label: 'AI Assistant' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ],
};

const ROLE_LABELS = {
  donor: { label: 'Donor', icon: '🍽️', color: 'var(--green-600)' },
  ngo: { label: 'NGO', icon: '🏢', color: 'var(--blue-600)' },
  volunteer: { label: 'Volunteer', icon: '🚴', color: 'var(--orange-500)' },
  admin: { label: 'Admin', icon: '⚙️', color: 'var(--purple-600)' }
};

export default function Sidebar({ role, setRole, page, navigate, open, setOpen, roles }) {
  const items = NAV_ITEMS[role] || NAV_ITEMS.donor;
  const roleInfo = ROLE_LABELS[role];

  if (!open) {
    return (
      <div style={{ width: 60, background: 'var(--gray-900)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0', gap: 4, flexShrink: 0, overflowY: 'auto' }}>
        <button onClick={() => setOpen(true)} title="Expand sidebar" style={{ fontSize: 22, marginBottom: 12, background: 'none', border: 'none', cursor: 'pointer', color: 'white', width: 44, height: 44, borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >🌱</button>
        {items.map(item => (
          <button key={item.id} onClick={() => navigate(item.id)} title={item.label} style={{
            width: 44, height: 44, borderRadius: 'var(--radius)', background: page === item.id ? 'var(--green-600)' : 'transparent',
            color: page === item.id ? 'white' : 'var(--gray-400)', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: 'none', cursor: 'pointer', transition: 'all 0.15s'
          }}
          onMouseEnter={e => page !== item.id && (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
          onMouseLeave={e => page !== item.id && (e.currentTarget.style.background = 'transparent')}
          >{item.icon}</button>
        ))}
      </div>
    );
  }

  return (
    <div style={{ width: 240, background: 'var(--gray-900)', display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden' }}>
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--green-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🌱</div>
          <div>
            <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, color: 'white', fontSize: 16, lineHeight: 1 }}>FoodBridge</div>
            <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 2 }}>Smart Food Redistribution</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 20 }}>{roleInfo.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>Logged in as</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{roleInfo.label}</div>
          </div>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green-400)', animation: 'pulse 2s ease-in-out infinite' }} />
        </div>
      </div>

      <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 12px' }}>
        {items.map(item => {
          const active = page === item.id;
          return (
            <button key={item.id} onClick={() => navigate(item.id)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 12px', borderRadius: 'var(--radius)',
              background: active ? 'var(--green-600)' : 'transparent',
              color: active ? 'white' : 'var(--gray-400)',
              border: 'none', cursor: 'pointer', transition: 'all 0.15s',
              fontSize: 14, fontWeight: active ? 600 : 400,
              marginBottom: 2, textAlign: 'left'
            }}
            onMouseEnter={e => !active && (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
            onMouseLeave={e => !active && (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <p style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 8, paddingLeft: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Switch Role</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {roles.map(r => {
            const ri = ROLE_LABELS[r];
            return (
              <button key={r} onClick={() => setRole(r)} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                padding: '8px 4px', borderRadius: 'var(--radius-sm)',
                background: role === r ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.04)',
                border: role === r ? '1px solid var(--green-600)' : '1px solid transparent',
                color: role === r ? 'var(--green-400)' : 'var(--gray-400)',
                cursor: 'pointer', fontSize: 12, fontWeight: role === r ? 700 : 400, transition: 'all 0.15s'
              }}>
                <span style={{ fontSize: 16 }}>{ri.icon}</span>
                {ri.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
