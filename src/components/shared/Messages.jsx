import React, { useState } from 'react';
import { Card, Button, PageHeader } from '../shared/UI.jsx';
import { MESSAGES } from '../../data/mockData.js';

export default function Messages() {
  const [msgs, setMsgs] = useState(MESSAGES);
  const [active, setActive] = useState(MESSAGES[0]);
  const [reply, setReply] = useState('');

  const selectMsg = (m) => {
    setActive(m);
    setMsgs(prev => prev.map(x => x.id === m.id ? { ...x, unread: false } : x));
  };

  const sendReply = () => {
    if (!reply.trim()) return;
    const newThread = [...(active.thread || []), { role: 'me', content: reply, time: 'Now' }];
    const updated = { ...active, thread: newThread, content: reply };
    setMsgs(prev => prev.map(m => m.id === active.id ? updated : m));
    setActive(updated);
    setReply('');
  };

  return (
    <div>
      <PageHeader title="Messages" subtitle="Communicate with NGOs, donors, and your AI assistant" />

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20, height: 'calc(100vh - 180px)' }}>
        {/* Inbox */}
        <Card style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--gray-100)', fontWeight: 700 }}>Inbox</div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {msgs.map(m => (
              <div key={m.id} onClick={() => selectMsg(m)} style={{
                padding: '14px 16px', cursor: 'pointer', borderBottom: '1px solid var(--gray-50)',
                background: active?.id === m.id ? 'var(--green-50)' : m.unread ? 'var(--blue-50)' : 'white',
                transition: 'background 0.15s'
              }}
              onMouseEnter={e => active?.id !== m.id && (e.currentTarget.style.background = 'var(--gray-50)')}
              onMouseLeave={e => e.currentTarget.style.background = active?.id === m.id ? 'var(--green-50)' : m.unread ? 'var(--blue-50)' : 'white'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: m.fromType === 'ai' ? 'var(--purple-500)' : 'var(--green-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: m.fromType === 'ai' ? 20 : 16, color: 'white', fontWeight: 700, flexShrink: 0 }}>
                    {m.fromType === 'ai' ? '✨' : m.avatar}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontWeight: m.unread ? 700 : 500, fontSize: 14, color: 'var(--gray-900)', truncate: true }}>{m.from}</p>
                      <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>{m.time}</span>
                    </div>
                    <p style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.content}</p>
                  </div>
                  {m.unread && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--blue-500)', flexShrink: 0 }} />}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Conversation */}
        <Card style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {active ? (
            <>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--gray-100)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: active.fromType === 'ai' ? 'var(--purple-500)' : 'var(--green-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: 'white', fontWeight: 700 }}>
                  {active.fromType === 'ai' ? '✨' : active.avatar}
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 15 }}>{active.from}</p>
                  <p style={{ fontSize: 12, color: 'var(--green-600)' }}>● Online</p>
                </div>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {active.thread && active.thread.length > 0 ? (
                  active.thread.map((t, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: t.role === 'me' ? 'flex-end' : 'flex-start', gap: 10 }}>
                      {t.role !== 'me' && (
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--green-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: 'white', fontWeight: 700, flexShrink: 0 }}>{active.avatar}</div>
                      )}
                      <div>
                        <div style={{
                          padding: '10px 14px', borderRadius: t.role === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                          background: t.role === 'me' ? 'var(--green-600)' : 'var(--gray-100)',
                          color: t.role === 'me' ? 'white' : 'var(--gray-800)',
                          fontSize: 14, maxWidth: 400
                        }}>{t.content}</div>
                        <p style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 4, textAlign: t.role === 'me' ? 'right' : 'left' }}>{t.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', color: 'var(--gray-400)', marginTop: 40 }}>
                    <p style={{ fontSize: 32, marginBottom: 8 }}>💬</p>
                    <p>Start the conversation</p>
                  </div>
                )}
              </div>

              <div style={{ padding: '16px 20px', borderTop: '1px solid var(--gray-100)', display: 'flex', gap: 10 }}>
                <input value={reply} onChange={e => setReply(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendReply()}
                  placeholder="Type a message..."
                  style={{ flex: 1, padding: '10px 16px', borderRadius: 'var(--radius-full)', border: '1px solid var(--gray-200)', fontSize: 14, outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = 'var(--green-500)'}
                  onBlur={e => e.target.style.borderColor = 'var(--gray-200)'}
                />
                <Button onClick={sendReply} style={{ borderRadius: 'var(--radius-full)' }}>Send ➤</Button>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, color: 'var(--gray-400)' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 48, marginBottom: 12 }}>💬</p>
                <p style={{ fontSize: 16, fontWeight: 600 }}>Select a conversation</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
