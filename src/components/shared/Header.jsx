import React from 'react';

const PAGE_TITLES = {
  dashboard: 'Dashboard', 'post-donation': 'Post Donation', browse: 'Browse Donations',
  map: 'Live Map', tracking: 'Delivery Tracking', emergency: 'Emergency Feed',
  ai: 'AI Assistant', messages: 'Messages', notifications: 'Notifications',
  analytics: 'Analytics', impact: 'Impact Metrics', leaderboard: 'Leaderboard',
  reviews: 'Reviews', scheduled: 'Scheduled Donations', route: 'Route Navigation',
  profile: 'Profile', 'smart-match': 'Smart Matching', 'admin-users': 'User Management', 'ngo-verify': 'NGO Verification',
};

export default function Header({ role, page, sidebarOpen, setSidebarOpen, navigate, notifCount }) {
  return (
    <header style={{
      height: 60, background: 'var(--white)', borderBottom: '1px solid var(--gray-100)',
      display: 'flex', alignItems: 'center', padding: '0 24px',
      boxShadow: 'var(--shadow-sm)', flexShrink: 0, gap: 16, zIndex: 100
    }}>
      <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
        width: 36, height: 36, borderRadius: 'var(--radius-sm)', background: 'var(--gray-100)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, border: 'none', cursor: 'pointer'
      }}>☰</button>
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--gray-900)' }}>{PAGE_TITLES[page] || 'FoodBridge'}</h2>
        <p style={{ fontSize: 12, color: 'var(--gray-400)' }}>
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={() => navigate('emergency')} style={{
          padding: '6px 14px', borderRadius: 'var(--radius-full)', background: 'var(--red-50)',
          color: 'var(--red-600)', fontSize: 12, fontWeight: 700, border: '1px solid var(--red-200)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, animation: 'pulse 2s ease-in-out infinite'
        }}>🆘 Emergency</button>
        <button onClick={() => navigate('notifications')} style={{ position: 'relative', width: 36, height: 36, borderRadius: 'var(--radius-sm)', background: 'var(--gray-100)', border: 'none', cursor: 'pointer', fontSize: 18 }}>
          🔔
          {notifCount > 0 && (
            <span style={{ position: 'absolute', top: 4, right: 4, width: 16, height: 16, borderRadius: '50%', background: 'var(--red-500)', color: 'white', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>{notifCount}</span>
          )}
        </button>
        <button onClick={() => navigate('messages')} style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', background: 'var(--gray-100)', border: 'none', cursor: 'pointer', fontSize: 18 }}>💬</button>
        <button onClick={() => navigate('profile')} style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--green-600)', color: 'white', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 700 }}>
          {role === 'donor' ? 'D' : role === 'ngo' ? 'N' : role === 'volunteer' ? 'V' : 'A'}
        </button>
      </div>
    </header>
  );
}
