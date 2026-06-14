import React from 'react';

export function Card({ children, style = {}, className = '' }) {
  return (
    <div style={{
      background: 'var(--white)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow)',
      border: '1px solid var(--gray-100)',
      ...style
    }} className={className}>
      {children}
    </div>
  );
}

export function Badge({ children, color = 'green', style = {} }) {
  const colors = {
    green: { bg: 'var(--green-100)', text: 'var(--green-700)' },
    orange: { bg: 'var(--orange-100)', text: 'var(--orange-600)' },
    red: { bg: 'var(--red-100)', text: 'var(--red-600)' },
    blue: { bg: 'var(--blue-100)', text: 'var(--blue-600)' },
    purple: { bg: 'var(--purple-100)', text: 'var(--purple-600)' },
    yellow: { bg: 'var(--yellow-100)', text: 'var(--yellow-500)' },
    gray: { bg: 'var(--gray-100)', text: 'var(--gray-600)' },
  };
  const c = colors[color] || colors.gray;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2px 10px', borderRadius: 'var(--radius-full)',
      fontSize: 12, fontWeight: 600,
      background: c.bg, color: c.text,
      ...style
    }}>
      {children}
    </span>
  );
}

export function Button({ children, variant = 'primary', size = 'md', onClick, disabled, style = {}, icon }) {
  const sizes = { sm: { padding: '6px 14px', fontSize: 13 }, md: { padding: '10px 20px', fontSize: 14 }, lg: { padding: '13px 28px', fontSize: 16 } };
  const variants = {
    primary: { background: 'var(--green-600)', color: 'white', border: 'none' },
    secondary: { background: 'var(--gray-100)', color: 'var(--gray-700)', border: '1px solid var(--gray-200)' },
    danger: { background: 'var(--red-600)', color: 'white', border: 'none' },
    outline: { background: 'transparent', color: 'var(--green-600)', border: '1px solid var(--green-600)' },
    ghost: { background: 'transparent', color: 'var(--gray-600)', border: 'none' },
    warning: { background: 'var(--orange-500)', color: 'white', border: 'none' },
  };
  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        ...s, ...v,
        borderRadius: 'var(--radius)',
        fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.15s ease',
        whiteSpace: 'nowrap',
        ...style
      }}
      onMouseEnter={e => !disabled && (e.currentTarget.style.filter = 'brightness(0.92)')}
      onMouseLeave={e => (e.currentTarget.style.filter = 'none')}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

export function Input({ label, type = 'text', value, onChange, placeholder, required, style = {}, rows }) {
  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: 'var(--radius)',
    border: '1px solid var(--gray-300)', fontSize: 14, color: 'var(--gray-800)',
    outline: 'none', transition: 'border 0.15s',
    background: 'var(--white)', ...style
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)' }}>{label}{required && <span style={{ color: 'var(--red-500)' }}> *</span>}</label>}
      {rows ? (
        <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows}
          style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
          onFocus={e => e.target.style.borderColor = 'var(--green-500)'}
          onBlur={e => e.target.style.borderColor = 'var(--gray-300)'}
        />
      ) : (
        <input type={type} value={value} onChange={onChange} placeholder={placeholder}
          style={inputStyle}
          onFocus={e => e.target.style.borderColor = 'var(--green-500)'}
          onBlur={e => e.target.style.borderColor = 'var(--gray-300)'}
        />
      )}
    </div>
  );
}

export function Select({ label, value, onChange, options, required, style = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)' }}>{label}{required && <span style={{ color: 'var(--red-500)' }}> *</span>}</label>}
      <select value={value} onChange={onChange} style={{
        width: '100%', padding: '10px 14px', borderRadius: 'var(--radius)',
        border: '1px solid var(--gray-300)', fontSize: 14, color: 'var(--gray-800)',
        background: 'var(--white)', outline: 'none', cursor: 'pointer', ...style
      }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

export function Modal({ open, onClose, title, children, width = 600 }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: 24, backdropFilter: 'blur(2px)'
    }} onClick={onClose}>
      <div style={{
        background: 'var(--white)', borderRadius: 'var(--radius-lg)',
        width: '100%', maxWidth: width, maxHeight: '90vh',
        overflow: 'auto', boxShadow: 'var(--shadow-xl)',
        animation: 'fadeIn 0.2s ease'
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid var(--gray-100)' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--gray-900)' }}>{title}</h3>
          <button onClick={onClose} style={{ fontSize: 20, color: 'var(--gray-400)', cursor: 'pointer', background: 'none', border: 'none', padding: 4, borderRadius: 'var(--radius-sm)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-100)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}>✕</button>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>
  );
}

export function StatCard({ label, value, icon, color = 'green', trend, sub }) {
  const colors = {
    green: { bg: 'var(--green-50)', icon: 'var(--green-100)', text: 'var(--green-600)' },
    orange: { bg: 'var(--orange-50)', icon: 'var(--orange-100)', text: 'var(--orange-500)' },
    blue: { bg: 'var(--blue-50)', icon: 'var(--blue-100)', text: 'var(--blue-500)' },
    purple: { bg: 'var(--purple-50)', icon: 'var(--purple-100)', text: 'var(--purple-500)' },
    red: { bg: 'var(--red-50)', icon: 'var(--red-100)', text: 'var(--red-500)' },
  };
  const c = colors[color] || colors.green;
  return (
    <Card style={{ padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: 13, color: 'var(--gray-500)', fontWeight: 500, marginBottom: 6 }}>{label}</p>
          <p style={{ fontSize: 28, fontWeight: 800, color: 'var(--gray-900)', lineHeight: 1 }}>{value}</p>
          {sub && <p style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 4 }}>{sub}</p>}
          {trend && <p style={{ fontSize: 12, color: trend > 0 ? 'var(--green-600)' : 'var(--red-500)', marginTop: 4, fontWeight: 600 }}>{trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% this month</p>}
        </div>
        <div style={{ background: c.icon, borderRadius: 'var(--radius)', padding: 12, fontSize: 22 }}>{icon}</div>
      </div>
    </Card>
  );
}

export function EmptyState({ icon, title, description, action }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>{icon}</div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--gray-800)', marginBottom: 8 }}>{title}</h3>
      <p style={{ color: 'var(--gray-500)', fontSize: 14, maxWidth: 300, margin: '0 auto 20px' }}>{description}</p>
      {action}
    </div>
  );
}

export function Spinner() {
  return <div style={{ width: 20, height: 20, border: '2px solid var(--gray-200)', borderTopColor: 'var(--green-600)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />;
}

export function Avatar({ name, size = 36, color = 'var(--green-600)' }) {
  const initials = name ? name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : '?';
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color, color: 'white',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.38, fontWeight: 700, flexShrink: 0
    }}>{initials}</div>
  );
}

export function Tabs({ tabs, active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 2, background: 'var(--gray-100)', borderRadius: 'var(--radius)', padding: 4 }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{
          padding: '8px 18px', borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 600,
          background: active === t.id ? 'var(--white)' : 'transparent',
          color: active === t.id ? 'var(--gray-900)' : 'var(--gray-500)',
          boxShadow: active === t.id ? 'var(--shadow-sm)' : 'none',
          border: 'none', cursor: 'pointer', transition: 'all 0.15s',
          display: 'flex', alignItems: 'center', gap: 6
        }}>{t.icon && <span>{t.icon}</span>}{t.label}</button>
      ))}
    </div>
  );
}

export function UrgencyBadge({ urgency }) {
  const map = { high: { color: 'red', label: '🔴 Urgent' }, medium: { color: 'orange', label: '🟡 Medium' }, low: { color: 'green', label: '🟢 Low' } };
  const m = map[urgency] || map.low;
  return <Badge color={m.color}>{m.label}</Badge>;
}

export function StatusBadge({ status }) {
  const map = {
    available: { color: 'green', label: 'Available' },
    pending: { color: 'orange', label: 'Pending' },
    completed: { color: 'blue', label: 'Completed' },
    cancelled: { color: 'red', label: 'Cancelled' },
    in_transit: { color: 'purple', label: 'In Transit' },
    scheduled: { color: 'yellow', label: 'Scheduled' },
    active: { color: 'green', label: 'Active' },
    paused: { color: 'orange', label: 'Paused' },
    suspended: { color: 'red', label: 'Suspended' },
    verified: { color: 'blue', label: 'Verified' },
    on_delivery: { color: 'purple', label: 'On Delivery' },
    offline: { color: 'gray', label: 'Offline' },
    pending_verify: { color: 'yellow', label: 'Pending' },
  };
  const m = map[status] || { color: 'gray', label: status };
  return <Badge color={m.color}>{m.label}</Badge>;
}

export function PageHeader({ title, subtitle, actions }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--gray-900)', fontFamily: 'Sora, sans-serif' }}>{title}</h1>
        {subtitle && <p style={{ color: 'var(--gray-500)', fontSize: 14, marginTop: 4 }}>{subtitle}</p>}
      </div>
      {actions && <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>{actions}</div>}
    </div>
  );
}

export function Grid({ children, cols = 3, gap = 20 }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap,
    }}>
      {children}
    </div>
  );
}

export function Section({ title, children, action, style = {} }) {
  return (
    <div style={{ marginBottom: 28, ...style }}>
      {(title || action) && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          {title && <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--gray-800)' }}>{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

export function Timeline({ steps }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: 'flex', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
              background: step.done ? 'var(--green-600)' : step.active ? 'var(--blue-500)' : 'var(--gray-200)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: 'white', fontWeight: 700
            }}>{step.done ? '✓' : step.active ? '●' : i + 1}</div>
            {i < steps.length - 1 && <div style={{ width: 2, flex: 1, background: step.done ? 'var(--green-300)' : 'var(--gray-200)', margin: '4px 0', minHeight: 28 }} />}
          </div>
          <div style={{ paddingBottom: 24, flex: 1 }}>
            <p style={{ fontWeight: 600, fontSize: 14, color: step.done ? 'var(--green-700)' : step.active ? 'var(--blue-600)' : 'var(--gray-600)' }}>{step.label}</p>
            {step.time && <p style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 2 }}>{step.time}</p>}
            {step.note && <p style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 4 }}>{step.note}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

export function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div style={{ position: 'relative' }}>
      <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🔍</span>
      <input value={value} onChange={onChange} placeholder={placeholder}
        style={{ paddingLeft: 40, paddingRight: 14, paddingTop: 10, paddingBottom: 10, borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)', fontSize: 14, background: 'var(--white)', outline: 'none', width: '100%' }}
        onFocus={e => e.target.style.borderColor = 'var(--green-500)'}
        onBlur={e => e.target.style.borderColor = 'var(--gray-200)'}
      />
    </div>
  );
}

export function StarRating({ rating, size = 16 }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ fontSize: size, color: i <= rating ? 'var(--yellow-400)' : 'var(--gray-300)' }}>★</span>
      ))}
    </span>
  );
}

export function ProgressBar({ value, max = 100, color = 'var(--green-500)', height = 8 }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ height, background: 'var(--gray-100)', borderRadius: 99, overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 99, transition: 'width 0.5s ease' }} />
    </div>
  );
}

export function Toast({ message, type = 'success', onClose }) {
  const types = { success: { bg: 'var(--green-600)', icon: '✓' }, error: { bg: 'var(--red-600)', icon: '✕' }, info: { bg: 'var(--blue-600)', icon: 'ℹ' } };
  const t = types[type] || types.success;
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      background: t.bg, color: 'white', padding: '14px 20px',
      borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-xl)',
      display: 'flex', alignItems: 'center', gap: 10,
      fontSize: 14, fontWeight: 500, animation: 'fadeIn 0.3s ease'
    }}>
      <span style={{ fontSize: 16 }}>{t.icon}</span>
      {message}
      {onClose && <button onClick={onClose} style={{ marginLeft: 8, color: 'rgba(255,255,255,0.7)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16 }}>✕</button>}
    </div>
  );
}
