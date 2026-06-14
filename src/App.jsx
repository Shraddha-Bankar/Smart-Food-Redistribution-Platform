import React, { useState } from 'react';
import Sidebar from './components/shared/Sidebar.jsx';
import Header from './components/shared/Header.jsx';

import DonorDashboard from './components/donor/DonorDashboard.jsx';
import PostDonation from './components/donor/PostDonation.jsx';
import ScheduledDonations from './components/donor/ScheduledDonations.jsx';
import SmartMatch from './components/donor/SmartMatch.jsx';

import NGODashboard from './components/ngo/NGODashboard.jsx';

import VolunteerDashboard from './components/volunteer/VolunteerDashboard.jsx';
import RouteNavigation from './components/volunteer/RouteNavigation.jsx';

import AdminDashboard from './components/admin/AdminDashboard.jsx';
import AdminUsers from './components/admin/AdminUsers.jsx';
import NGOVerify from './components/admin/NGOVerify.jsx';

import BrowseDonations from './components/shared/BrowseDonations.jsx';
import DeliveryTracking from './components/shared/DeliveryTracking.jsx';
import EmergencyFeed from './components/shared/EmergencyFeed.jsx';
import LiveMap from './components/shared/LiveMap.jsx';
import AIAssistant from './components/shared/AIAssistant.jsx';
import Messages from './components/shared/Messages.jsx';
import Notifications from './components/shared/Notifications.jsx';
import Analytics from './components/shared/Analytics.jsx';
import ImpactMetrics from './components/shared/ImpactMetrics.jsx';
import Leaderboard from './components/shared/Leaderboard.jsx';
import Reviews from './components/shared/Reviews.jsx';
import Profile from './components/shared/Profile.jsx';

import { NOTIFICATIONS } from './data/mockData.js';

const ROLES = ['donor', 'ngo', 'volunteer', 'admin'];

const DEFAULT_PAGE = {
  donor: 'dashboard', ngo: 'dashboard', volunteer: 'dashboard', admin: 'dashboard',
};

export default function App() {
  const [role, setRole] = useState('donor');
  const [page, setPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigate = (p) => setPage(p);

  const handleSetRole = (r) => {
    setRole(r);
    setPage(DEFAULT_PAGE[r]);
  };

  const notifCount = NOTIFICATIONS.filter(n => n.unread).length;

  const renderPage = () => {
    // Shared pages across roles
    switch (page) {
      case 'browse': return <BrowseDonations role={role} navigate={navigate} />;
      case 'tracking': return <DeliveryTracking role={role} navigate={navigate} />;
      case 'emergency': return <EmergencyFeed navigate={navigate} />;
      case 'map': return <LiveMap />;
      case 'ai': return <AIAssistant />;
      case 'messages': return <Messages />;
      case 'notifications': return <Notifications />;
      case 'analytics': return <Analytics role={role} />;
      case 'impact': return <ImpactMetrics role={role} />;
      case 'leaderboard': return <Leaderboard />;
      case 'reviews': return <Reviews role={role} />;
      case 'profile': return <Profile role={role} />;
      default: break;
    }

    // Role-specific pages
    if (role === 'donor') {
      switch (page) {
        case 'dashboard': return <DonorDashboard navigate={navigate} />;
        case 'post-donation': return <PostDonation navigate={navigate} />;
        case 'scheduled': return <ScheduledDonations navigate={navigate} />;
        case 'smart-match': return <SmartMatch navigate={navigate} />;
        default: return <DonorDashboard navigate={navigate} />;
      }
    }

    if (role === 'ngo') {
      switch (page) {
        case 'dashboard': return <NGODashboard navigate={navigate} />;
        default: return <NGODashboard navigate={navigate} />;
      }
    }

    if (role === 'volunteer') {
      switch (page) {
        case 'dashboard': return <VolunteerDashboard navigate={navigate} />;
        case 'route': return <RouteNavigation />;
        default: return <VolunteerDashboard navigate={navigate} />;
      }
    }

    if (role === 'admin') {
      switch (page) {
        case 'dashboard': return <AdminDashboard navigate={navigate} />;
        case 'admin-users': return <AdminUsers />;
        case 'ngo-verify': return <NGOVerify />;
        default: return <AdminDashboard navigate={navigate} />;
      }
    }

    return <DonorDashboard navigate={navigate} />;
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar role={role} setRole={handleSetRole} page={page} navigate={navigate} open={sidebarOpen} setOpen={setSidebarOpen} roles={ROLES} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header role={role} page={page} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} navigate={navigate} notifCount={notifCount} />
        <main style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
