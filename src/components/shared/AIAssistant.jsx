import React, { useState, useRef, useEffect } from 'react';
import { Card, Button, PageHeader, Spinner, Badge } from '../shared/UI.jsx';

const SYSTEM_PROMPT = `You are FoodBridge AI, a helpful assistant for a food redistribution platform in Nagpur, India. You help:
- Food donors (restaurants, farms, shops) post and manage donations
- NGOs find and request food donations
- Volunteers navigate delivery routes
- Admins manage the platform

Key data: Platform serves Nagpur, MH. Active NGOs include Akshaya Patra Foundation, Robin Hood Army Nagpur, Shree Sai Sewa Sangh, Nagpur Food Bank. Current active donations include fresh vegetables, cooked rice & dal, bakery items, packaged foods, and fresh fruits.

Be concise, helpful, and action-oriented. Suggest specific features they can use. Use emojis naturally. Always encourage donation and volunteerism.`;

const SUGGESTIONS = [
  'What donations are available near me?',
  'How do I post a donation?',
  'Which NGO should I donate to?',
  'What\'s my impact this month?',
  'How does smart matching work?',
  'How can I become a volunteer?',
];

// Demo/offline response used when no API key is configured
const DEMO_RESPONSE = "🌱 I'm running in demo mode right now (no AI API key configured). Here's what I can tell you from FoodBridge data:\n\n• 5 active donations available in Nagpur right now\n• Top NGOs: Akshaya Patra Foundation, Robin Hood Army, Nagpur Food Bank\n• 2 emergency requests need urgent attention\n\nTo enable full AI conversations, add your OpenRouter API key as VITE_OPENROUTER_API_KEY in your .env file and redeploy.";

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_MODEL = import.meta.env.VITE_OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet';

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '👋 Hello! I\'m your FoodBridge AI assistant. I can help you find food donations, connect with NGOs, track deliveries, and maximize your impact. What can I help you with today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    if (!OPENROUTER_API_KEY) {
      await new Promise(r => setTimeout(r, 600));
      setMessages(prev => [...prev, { role: 'assistant', content: DEMO_RESPONSE }]);
      setLoading(false);
      return;
    }

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      history.push({ role: 'user', content: userMsg });

      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'FoodBridge',
        },
        body: JSON.stringify({
          model: OPENROUTER_MODEL,
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history],
          max_tokens: 1000,
        })
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not process that. Please try again.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ I\'m having trouble connecting right now. Please check your API key and network, then try again.' }]);
    }
    setLoading(false);
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: '👋 Hello! I\'m your FoodBridge AI assistant. How can I help you today?' }]);
  };

  return (
    <div style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
      <PageHeader title="✨ AI Assistant" subtitle="Powered by AI — your intelligent FoodBridge companion"
        actions={
          <>
            {!OPENROUTER_API_KEY && <Badge color="orange">Demo Mode — No API Key</Badge>}
            <Button variant="secondary" size="sm" onClick={clearChat}>🗑️ Clear Chat</Button>
          </>
        } />

      <Card style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              {m.role === 'assistant' && (
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--green-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>✨</div>
              )}
              <div style={{
                maxWidth: '70%', padding: '12px 16px', borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: m.role === 'user' ? 'var(--green-600)' : 'var(--gray-100)',
                color: m.role === 'user' ? 'white' : 'var(--gray-800)',
                fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-wrap'
              }}>
                {m.content}
              </div>
              {m.role === 'user' && (
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--blue-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, color: 'white', fontWeight: 700 }}>U</div>
              )}
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--green-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>✨</div>
              <div style={{ background: 'var(--gray-100)', padding: '14px 18px', borderRadius: '18px 18px 18px 4px', display: 'flex', gap: 8, alignItems: 'center' }}>
                <Spinner />
                <span style={{ fontSize: 13, color: 'var(--gray-500)' }}>Thinking...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {messages.length <= 1 && (
          <div style={{ padding: '0 20px 12px' }}>
            <p style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 8, fontWeight: 600 }}>SUGGESTED QUESTIONS</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => sendMessage(s)} style={{
                  padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: 13,
                  background: 'var(--green-50)', color: 'var(--green-700)',
                  border: '1px solid var(--green-200)', cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--green-100)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--green-50)'}
                >{s}</button>
              ))}
            </div>
          </div>
        )}

        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--gray-100)', display: 'flex', gap: 12 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Ask me anything about FoodBridge..."
            style={{
              flex: 1, padding: '12px 16px', borderRadius: 'var(--radius-full)',
              border: '1px solid var(--gray-200)', fontSize: 14, outline: 'none',
              background: 'var(--gray-50)'
            }}
            onFocus={e => e.target.style.borderColor = 'var(--green-500)'}
            onBlur={e => e.target.style.borderColor = 'var(--gray-200)'}
          />
          <Button onClick={() => sendMessage()} disabled={!input.trim() || loading} style={{ borderRadius: 'var(--radius-full)', padding: '12px 20px' }}>
            {loading ? <Spinner /> : '➤'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
