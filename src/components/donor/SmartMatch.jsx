import React, { useState } from 'react';
import { Card, Button, Badge, StarRating, PageHeader, Select, Toast, ProgressBar } from '../shared/UI.jsx';
import { DONATIONS, NGOS } from '../../data/mockData.js';

// Simple scoring algorithm for "AI" matching
function scoreMatch(donation, ngo) {
  let score = 50;
  // Category preference mapping
  const categoryFit = {
    food_bank: ['packaged', 'grains', 'vegetables', 'fruits'],
    volunteer: ['cooked', 'bakery', 'vegetables', 'fruits'],
    shelter: ['cooked', 'packaged', 'bakery'],
  };
  if (categoryFit[ngo.category]?.includes(donation.category)) score += 20;
  // Distance proxy using lat/lng difference
  const dist = Math.sqrt(Math.pow(donation.lat - ngo.lat, 2) + Math.pow(donation.lng - ngo.lng, 2));
  score += Math.max(0, 20 - dist * 200);
  // Rating boost
  score += (ngo.rating - 4) * 15;
  // Verified boost
  if (ngo.verified) score += 10;
  // Urgency -> prefer high capacity & verified
  if (donation.urgency === 'high' && ngo.vehiclesAvailable >= 2) score += 5;
  return Math.max(0, Math.min(100, Math.round(score)));
}

export default function SmartMatch({ navigate }) {
  const matchable = DONATIONS.filter(d => d.status === 'available' || d.status === 'pending');
  const [selectedDonation, setSelectedDonation] = useState(matchable[0]?.id);
  const [toast, setToast] = useState(null);

  const donation = matchable.find(d => d.id === Number(selectedDonation));
  const matches = donation ? NGOS.map(ngo => ({ ngo, score: scoreMatch(donation, ngo) })).sort((a, b) => b.score - a.score) : [];

  const sendRequest = (ngoName) => {
    setToast({ msg: `✅ Match request sent to ${ngoName}! They'll be notified instantly.`, type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div>
      <PageHeader title="🤖 AI Smart Matching" subtitle="Let AI find the perfect NGO for your donation" />
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <Card style={{ padding: 20, marginBottom: 20, background: 'var(--green-50)', border: '1px solid var(--green-200)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ fontSize: 28 }}>✨</span>
          <div>
            <p style={{ fontWeight: 700, color: 'var(--green-700)' }}>Select a donation to find matches</p>
            <p style={{ fontSize: 13, color: 'var(--green-600)' }}>Our AI analyzes location, capacity, ratings, and food type to recommend the best NGO partners.</p>
          </div>
        </div>
        <Select
          value={String(selectedDonation)}
          onChange={e => setSelectedDonation(e.target.value)}
          options={matchable.map(d => ({ value: String(d.id), label: `${d.title} (${d.quantity})` }))}
        />
      </Card>

      {donation && (
        <>
          <Card style={{ padding: 16, marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: 16 }}>{donation.title}</p>
                <p style={{ fontSize: 13, color: 'var(--gray-500)' }}>{donation.quantity} · {donation.servings} servings · Expires {donation.expiry}</p>
              </div>
              <Badge color={donation.urgency === 'high' ? 'red' : donation.urgency === 'medium' ? 'orange' : 'green'}>
                {donation.urgency} urgency
              </Badge>
            </div>
          </Card>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {matches.map(({ ngo, score }, i) => (
              <Card key={ngo.id} style={{ padding: 20, border: i === 0 ? '2px solid var(--green-400)' : '1px solid var(--gray-100)', position: 'relative' }}>
                {i === 0 && (
                  <div style={{ position: 'absolute', top: -10, left: 20, background: 'var(--green-600)', color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 12px', borderRadius: 'var(--radius-full)' }}>
                    🏆 Best Match
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 700 }}>{ngo.name}</h3>
                      {ngo.verified && <Badge color="blue">✓ Verified</Badge>}
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 4 }}>{ngo.description}</p>
                    <div style={{ display: 'flex', gap: 16, marginTop: 10, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 12, color: 'var(--gray-600)' }}><StarRating rating={Math.round(ngo.rating)} size={12} /> {ngo.rating}</span>
                      <span style={{ fontSize: 12, color: 'var(--gray-600)' }}>📍 {ngo.address}</span>
                      <span style={{ fontSize: 12, color: 'var(--gray-600)' }}>🚐 {ngo.vehiclesAvailable} vehicles</span>
                      <span style={{ fontSize: 12, color: 'var(--gray-600)' }}>📦 {ngo.storageCapacity} capacity</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', minWidth: 120 }}>
                    <p style={{ fontSize: 24, fontWeight: 800, color: score >= 80 ? 'var(--green-600)' : score >= 60 ? 'var(--orange-500)' : 'var(--gray-500)' }}>{score}%</p>
                    <p style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 8 }}>match score</p>
                    <ProgressBar value={score} color={score >= 80 ? 'var(--green-500)' : score >= 60 ? 'var(--orange-400)' : 'var(--gray-400)'} />
                  </div>
                </div>
                <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
                  <Button size="sm" onClick={() => sendRequest(ngo.name)} icon="🤝">Send Match Request</Button>
                  <Button size="sm" variant="secondary" onClick={() => navigate('messages')}>💬 Message</Button>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {matchable.length === 0 && (
        <Card style={{ padding: 40, textAlign: 'center' }}>
          <p style={{ fontSize: 40, marginBottom: 12 }}>📭</p>
          <p style={{ fontWeight: 700 }}>No active donations to match</p>
          <p style={{ color: 'var(--gray-500)', marginTop: 4 }}>Post a donation to use AI Smart Matching</p>
          <Button style={{ marginTop: 16 }} onClick={() => navigate('post-donation')}>Post a Donation</Button>
        </Card>
      )}
    </div>
  );
}
