import React, { useState } from 'react';
import { Card, Button, Input, Select, Tabs, PageHeader, Toast } from '../shared/UI.jsx';

const CATEGORIES = [
  { value: 'vegetables', label: '🥦 Vegetables' }, { value: 'fruits', label: '🍎 Fruits' },
  { value: 'cooked', label: '🍛 Cooked Food' }, { value: 'bakery', label: '🥖 Bakery' },
  { value: 'packaged', label: '📦 Packaged' }, { value: 'dairy', label: '🥛 Dairy' },
  { value: 'grains', label: '🌾 Grains/Pulses' }, { value: 'other', label: '🍱 Other' },
];

export default function PostDonation({ navigate }) {
  const [tab, setTab] = useState('food');
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    title: '', category: 'vegetables', quantity: '', unit: 'kg', servings: '',
    description: '', expiry: '', condition: 'good',
    address: '', landmark: '', pickupFrom: '', pickupTo: '', contactPhone: '',
    recurring: false, frequency: 'once', day: 'Monday', preferredNgo: '',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const inp = (k) => ({ value: form[k], onChange: e => set(k, e.target.value) });

  const handleSubmit = () => {
    if (!form.title || !form.quantity) { setToast({ msg: 'Please fill required fields', type: 'error' }); return; }
    setToast({ msg: '✅ Donation posted successfully! NGOs have been notified.', type: 'success' });
    setTimeout(() => { setToast(null); navigate('dashboard'); }, 2500);
  };

  const TABS = [
    { id: 'food', label: 'Food Info', icon: '🍽️' },
    { id: 'pickup', label: 'Pickup Details', icon: '📍' },
    { id: 'schedule', label: 'Schedule', icon: '📅' },
  ];

  return (
    <div>
      <PageHeader title="Post a Donation" subtitle="Share surplus food with those who need it most" />
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <Card style={{ padding: 28 }}>
        <div style={{ marginBottom: 28 }}>
          <Tabs tabs={TABS} active={tab} onChange={setTab} />
        </div>

        {tab === 'food' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <Input label="Donation Title" placeholder="e.g. Fresh Vegetables from Farm" required {...inp('title')} />
              <Select label="Food Category" required value={form.category} onChange={e => set('category', e.target.value)} options={CATEGORIES} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
              <Input label="Quantity" placeholder="e.g. 30" required {...inp('quantity')} />
              <Select label="Unit" value={form.unit} onChange={e => set('unit', e.target.value)} options={[{value:'kg',label:'Kg'},{value:'pieces',label:'Pieces'},{value:'litres',label:'Litres'},{value:'servings',label:'Servings'},{value:'packets',label:'Packets'}]} />
              <Input label="Estimated Servings" placeholder="e.g. 150" {...inp('servings')} />
            </div>
            <Input label="Description" placeholder="Describe the food, freshness, any special notes..." rows={3} {...inp('description')} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <Input label="Expiry / Best Before" type="date" required {...inp('expiry')} />
              <Select label="Condition" value={form.condition} onChange={e => set('condition', e.target.value)} options={[{value:'excellent',label:'Excellent - Just made/harvested'},{value:'good',label:'Good - Fresh'},{value:'fair',label:'Fair - Use soon'}]} />
            </div>
            <div style={{ background: 'var(--green-50)', border: '1px solid var(--green-200)', borderRadius: 'var(--radius)', padding: 16 }}>
              <p style={{ fontSize: 13, color: 'var(--green-700)', fontWeight: 600 }}>🤖 AI Smart Match</p>
              <p style={{ fontSize: 12, color: 'var(--green-600)', marginTop: 4 }}>Once posted, our AI will automatically match this donation with the best-suited NGO based on location, capacity, and food type.</p>
            </div>
          </div>
        )}

        {tab === 'pickup' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Input label="Pickup Address" placeholder="Full address with street, area, city" required rows={2} {...inp('address')} />
            <Input label="Landmark" placeholder="Near landmark for easy navigation" {...inp('landmark')} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <Input label="Pickup Available From" type="time" required {...inp('pickupFrom')} />
              <Input label="Pickup Available Until" type="time" required {...inp('pickupTo')} />
            </div>
            <Input label="Contact Phone" type="tel" placeholder="+91 XXXXX XXXXX" required {...inp('contactPhone')} />
            <div style={{ background: 'var(--blue-50)', border: '1px solid var(--blue-200)', borderRadius: 'var(--radius)', padding: 16 }}>
              <p style={{ fontSize: 13, color: 'var(--blue-700)', fontWeight: 600 }}>📍 Location Tips</p>
              <p style={{ fontSize: 12, color: 'var(--blue-600)', marginTop: 4 }}>Provide clear pickup instructions. Our volunteers will be directed to your location automatically.</p>
            </div>
          </div>
        )}

        {tab === 'schedule' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Select label="Frequency" value={form.frequency} onChange={e => set('frequency', e.target.value)} options={[{value:'once',label:'One-time donation'},{value:'daily',label:'Daily'},{value:'weekly',label:'Weekly'},{value:'biweekly',label:'Bi-weekly'},{value:'monthly',label:'Monthly'}]} />
            {form.frequency !== 'once' && (
              <Select label="Preferred Day" value={form.day} onChange={e => set('day', e.target.value)} options={['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(d => ({value:d,label:d}))} />
            )}
            <Input label="Preferred NGO (optional)" placeholder="Leave blank for AI auto-match" {...inp('preferredNgo')} />
            <div style={{ padding: 20, background: 'var(--purple-50)', borderRadius: 'var(--radius)', border: '1px solid var(--purple-100)' }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--purple-700)', marginBottom: 8 }}>📊 Impact Estimate</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                {[
                  { label: 'Est. Servings', value: form.servings ? `~${form.servings}` : 'TBD' },
                  { label: 'CO₂ Saved', value: form.quantity ? `~${Math.round(form.quantity * 1.5)} kg` : 'TBD' },
                  { label: 'Frequency', value: form.frequency === 'once' ? 'One-time' : form.frequency },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: 'center', padding: '12px 8px', background: 'white', borderRadius: 'var(--radius-sm)' }}>
                    <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--purple-600)' }}>{s.value}</p>
                    <p style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 2 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--gray-100)' }}>
          <Button variant="secondary" onClick={() => navigate('dashboard')}>Cancel</Button>
          <div style={{ display: 'flex', gap: 10 }}>
            {tab !== 'food' && <Button variant="outline" onClick={() => setTab(tab === 'schedule' ? 'pickup' : 'food')}>← Back</Button>}
            {tab !== 'schedule' ? (
              <Button onClick={() => setTab(tab === 'food' ? 'pickup' : 'schedule')}>Next →</Button>
            ) : (
              <Button onClick={handleSubmit} icon="✅">Post Donation</Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
