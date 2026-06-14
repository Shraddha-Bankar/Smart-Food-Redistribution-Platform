import React, { useState } from 'react';
import { Card, Button, PageHeader } from '../shared/UI.jsx';
import { NOTIFICATIONS } from '../../data/mockData.js';

export default function Notifications() {
  const [notifs, setNotifs] = useState(NOTIFICATIONS);

  const markAllRead = () => setNotifs(ns => ns.map(n => ({ ...n, unread: false })));
  const dismiss = (id) => setNotifs(ns => ns.filter(n => n.id !== id));

  const unreadCount = notifs.filter(n => n.unread).length;

  return (
    <div>
      <PageHeader title="🔔 Notifications" subtitle={`${unreadCount} unread notifications`}
        actions={<Button variant="secondary" size="sm" onClick={markAllRead}>✓ Mark all read</Button>} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {notifs.map(n => (
          <Card key={n.id} style={{ padding: 16, background: n.unread ? 'var(--blue-50)' : 'white', borderLeft: n.unread ? '3px solid var(--blue-500)' : '3px solid transparent' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 'var(--radius)', background: n.unread ? 'var(--blue-100)' : 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                {n.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <p style={{ fontWeight: 700, fontSize: 14, color: 'var(--gray-900)' }}>{n.title}</p>
                  <span style={{ fontSize: 12, color: 'var(--gray-400)', flexShrink: 0, marginLeft: 12 }}>{n.time}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--gray-600)', marginTop: 4 }}>{n.message}</p>
              </div>
              <button onClick={() => dismiss(n.id)} style={{ color: 'var(--gray-300)', background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', flexShrink: 0 }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--gray-600)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--gray-300)'}
              >✕</button>
            </div>
          </Card>
        ))}

        {notifs.length === 0 && (
          <Card style={{ padding: 40, textAlign: 'center' }}>
            <p style={{ fontSize: 40 }}>🔔</p>
            <p style={{ fontWeight: 700, marginTop: 12 }}>All caught up!</p>
            <p style={{ color: 'var(--gray-500)', marginTop: 4 }}>No notifications to show</p>
          </Card>
        )}
      </div>
    </div>
  );
}
