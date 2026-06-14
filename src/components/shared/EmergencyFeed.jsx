import React, { useState } from 'react';
import { Card, Button, PageHeader, Toast } from '../shared/UI.jsx';
import { EMERGENCY_REQUESTS } from '../../data/mockData.js';

export default function EmergencyFeed({ navigate }) {
  const [requests, setRequests] = useState(EMERGENCY_REQUESTS);
  const [toast, setToast] = useState(null);

  const respond = (id) => {
    setRequests(rs => rs.filter(r => r.id !== id));
    setToast({ msg: '✅ Response sent! Volunteer being dispatched.', type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div>
      <PageHeader title="🆘 Emergency Feed" subtitle="Urgent food requests requiring immediate action" />
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <div style={{ background: 'var(--red-50)', border: '1px solid var(--red-200)', borderRadius: 'var(--radius-md)', padding: 16, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 24 }}>🚨</span>
        <div>
          <p style={{ fontWeight: 700, color: 'var(--red-700)', fontSize: 15 }}>Active Emergency Requests: {requests.length}</p>
          <p style={{ fontSize: 13, color: 'var(--red-600)' }}>These requests need immediate attention. Please respond as soon as possible.</p>
        </div>
      </div>

      {requests.length === 0 ? (
        <Card style={{ padding: 40, textAlign: 'center' }}>
          <p style={{ fontSize: 40, marginBottom: 12 }}>✅</p>
          <p style={{ fontWeight: 700, fontSize: 16, color: 'var(--green-700)' }}>All emergency requests addressed!</p>
          <p style={{ color: 'var(--gray-500)', marginTop: 8 }}>No active emergencies at this time.</p>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {requests.map(r => (
            <Card key={r.id} style={{ padding: 0, overflow: 'hidden', border: '2px solid var(--red-200)' }}>
              <div style={{ background: 'var(--red-600)', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 20 }}>🆘</span>
                  <span style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>URGENT REQUEST</span>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>⏰ Within {r.deadline}</span>
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{r.ngo}</h3>
                    <p style={{ color: 'var(--red-600)', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>📋 {r.needed}</p>
                    <p style={{ color: 'var(--gray-600)', fontSize: 13 }}>📍 {r.location}</p>
                    <p style={{ color: 'var(--gray-600)', fontSize: 13, marginTop: 4 }}>💬 Reason: {r.reason}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <Button onClick={() => respond(r.id)} variant="danger" icon="✅">Respond Now</Button>
                  <Button variant="secondary" onClick={() => navigate('post-donation')}>Post Food</Button>
                  <Button variant="outline">📞 {r.contact}</Button>
                  <Button variant="ghost" onClick={() => navigate('messages')}>💬 Message</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Card style={{ padding: 20, marginTop: 24, background: 'var(--orange-50)', border: '1px solid var(--orange-100)' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--orange-600)', marginBottom: 8 }}>⚡ Post an Emergency Request</h3>
        <p style={{ fontSize: 13, color: 'var(--gray-600)', marginBottom: 16 }}>If your organization needs urgent food supplies, post an emergency request and get responses within minutes.</p>
        <Button variant="warning">🆘 Post Emergency Request</Button>
      </Card>
    </div>
  );
}
