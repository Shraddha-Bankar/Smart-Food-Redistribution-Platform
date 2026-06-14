import React, { useState } from 'react';
import { Card, Button, StarRating, PageHeader, Input, Select, Modal, Toast } from '../shared/UI.jsx';
import { REVIEWS } from '../../data/mockData.js';

export default function Reviews({ role }) {
  const [reviews, setReviews] = useState(REVIEWS);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ to: '', rating: 5, comment: '' });

  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  const submit = () => {
    if (!form.to || !form.comment) { setToast({ msg: 'Please fill all fields', type: 'error' }); return; }
    const newReview = {
      id: reviews.length + 1, from: 'You', fromType: role, to: form.to, toType: 'ngo',
      rating: Number(form.rating), comment: form.comment, date: new Date().toISOString().slice(0,10), donationTitle: 'Recent donation'
    };
    setReviews([newReview, ...reviews]);
    setModalOpen(false);
    setForm({ to: '', rating: 5, comment: '' });
    setToast({ msg: '✅ Review submitted! Thank you for your feedback.', type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div>
      <PageHeader title="⭐ Reviews & Ratings" subtitle="Feedback between donors, NGOs, and volunteers"
        actions={<Button onClick={() => setModalOpen(true)} icon="✍️">Write Review</Button>} />
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <Card style={{ padding: 24, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 32 }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 40, fontWeight: 800, color: 'var(--gray-900)' }}>{avgRating}</p>
          <StarRating rating={Math.round(avgRating)} size={20} />
          <p style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 4 }}>{reviews.length} reviews</p>
        </div>
        <div style={{ flex: 1 }}>
          {[5,4,3,2,1].map(star => {
            const count = reviews.filter(r => r.rating === star).length;
            const pct = (count / reviews.length) * 100;
            return (
              <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <span style={{ fontSize: 12, width: 40, color: 'var(--gray-600)' }}>{star} star</span>
                <div style={{ flex: 1, height: 6, background: 'var(--gray-100)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: 'var(--yellow-400)' }} />
                </div>
                <span style={{ fontSize: 12, color: 'var(--gray-400)', width: 24 }}>{count}</span>
              </div>
            );
          })}
        </div>
      </Card>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {reviews.map(r => (
          <Card key={r.id} style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: 15 }}>{r.from} → {r.to}</p>
                <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>{r.donationTitle} · {r.date}</p>
              </div>
              <StarRating rating={r.rating} />
            </div>
            <p style={{ fontSize: 14, color: 'var(--gray-700)', lineHeight: 1.6 }}>{r.comment}</p>
          </Card>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Write a Review">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input label="Recipient (NGO/Donor name)" placeholder="e.g. Robin Hood Army" required value={form.to} onChange={e => setForm(f => ({ ...f, to: e.target.value }))} />
          <Select label="Rating" value={String(form.rating)} onChange={e => setForm(f => ({ ...f, rating: e.target.value }))} options={[5,4,3,2,1].map(n => ({ value: String(n), label: `${'★'.repeat(n)}${'☆'.repeat(5-n)} (${n})` }))} />
          <Input label="Your Review" rows={4} placeholder="Share your experience..." required value={form.comment} onChange={e => setForm(f => ({ ...f, comment: e.target.value }))} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={submit} icon="✅">Submit Review</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
