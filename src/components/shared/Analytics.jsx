import React from 'react';
import { Card, Button, Section, PageHeader, Grid, StatCard } from '../shared/UI.jsx';
import { ANALYTICS_DATA, IMPACT_DATA } from '../../data/mockData.js';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#16a34a', '#f97316', '#3b82f6', '#a855f7', '#eab308'];

export default function Analytics({ role }) {
  return (
    <div>
      <PageHeader title="📊 Analytics & Reports" subtitle="Data-driven insights into platform performance"
        actions={<Button variant="secondary" icon="📥">Export Report</Button>} />

      <Grid cols={4} gap={16} style={{ marginBottom: 24 }}>
        <StatCard label="Total Donations" value="291" icon="📦" color="green" trend={13} />
        <StatCard label="Total Meals" value={IMPACT_DATA.totalMeals.toLocaleString()} icon="🍽️" color="orange" trend={14} />
        <StatCard label="Avg. Delivery Time" value="34 min" icon="⏱️" color="blue" trend={-5} />
        <StatCard label="Success Rate" value="98.2%" icon="✅" color="purple" trend={2} />
      </Grid>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20, marginBottom: 24 }}>
        <Section title="📈 Meals & Donations (6 Months)">
          <Card style={{ padding: 20 }}>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={ANALYTICS_DATA.monthlyMeals}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-100)" />
                <XAxis dataKey="month" stroke="var(--gray-400)" fontSize={12} />
                <YAxis stroke="var(--gray-400)" fontSize={12} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="meals" name="Meals Served" stroke="var(--green-600)" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="donations" name="Donations" stroke="var(--blue-500)" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Section>

        <Section title="🍱 Category Breakdown">
          <Card style={{ padding: 20 }}>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={ANALYTICS_DATA.categoryBreakdown} dataKey="value" nameKey="category" cx="50%" cy="50%" outerRadius={90} label={({ category, value }) => `${category}: ${value}%`}>
                  {ANALYTICS_DATA.categoryBreakdown.map((entry, i) => (
                    <Cell key={entry.category} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Section>
      </div>

      <Section title="🚚 Weekly Delivery Volume">
        <Card style={{ padding: 20 }}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={ANALYTICS_DATA.dailyDeliveries}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-100)" />
              <XAxis dataKey="day" stroke="var(--gray-400)" fontSize={12} />
              <YAxis stroke="var(--gray-400)" fontSize={12} />
              <Tooltip />
              <Bar dataKey="deliveries" fill="var(--green-500)" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Section>

      {role === 'admin' && (
        <Section title="📋 Quick Reports">
          <Grid cols={3} gap={16}>
            {[
              { icon: '📦', title: 'Donations Report', desc: 'Full export of all donation records' },
              { icon: '👥', title: 'User Activity Report', desc: 'Engagement metrics for all user types' },
              { icon: '🚚', title: 'Delivery Performance', desc: 'Volunteer efficiency and delivery times' },
            ].map(r => (
              <Card key={r.title} style={{ padding: 20 }}>
                <p style={{ fontSize: 28, marginBottom: 10 }}>{r.icon}</p>
                <p style={{ fontWeight: 700, marginBottom: 4 }}>{r.title}</p>
                <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 14 }}>{r.desc}</p>
                <Button size="sm" variant="outline" icon="📥">Download CSV</Button>
              </Card>
            ))}
          </Grid>
        </Section>
      )}
    </div>
  );
}
