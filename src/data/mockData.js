export const DONATIONS = [
  { id: 1, title: 'Fresh Vegetables Assortment', category: 'vegetables', quantity: '50 kg', servings: 200, status: 'available', urgency: 'high', donor: 'Green Farms', donorId: 1, location: 'Nagpur, MH', address: '12 MG Road, Nagpur', lat: 21.1458, lng: 79.0882, expiry: '2026-06-14', postedAt: '2026-06-13T08:00:00', description: 'Mixed vegetables: tomatoes, onions, spinach, carrots. Fresh from farm.', image: null, pickupTime: '10:00 AM - 2:00 PM', contactPhone: '+91 9876543210' },
  { id: 2, title: 'Cooked Rice & Dal', category: 'cooked', quantity: '30 servings', servings: 30, status: 'pending', urgency: 'high', donor: 'Hotel Ashoka', donorId: 2, location: 'Nagpur, MH', address: '45 Civil Lines, Nagpur', lat: 21.1588, lng: 79.0763, expiry: '2026-06-13', postedAt: '2026-06-13T10:30:00', description: 'Leftover catering food. Freshly cooked, must be picked up within 3 hours.', image: null, pickupTime: '12:00 PM - 1:00 PM', contactPhone: '+91 9123456789' },
  { id: 3, title: 'Bakery Items - Bread & Pastries', category: 'bakery', quantity: '80 pieces', servings: 80, status: 'available', urgency: 'medium', donor: 'City Bakery', donorId: 3, location: 'Nagpur, MH', address: '7 Dharampeth, Nagpur', lat: 21.1393, lng: 79.0825, expiry: '2026-06-15', postedAt: '2026-06-13T07:00:00', description: 'Unsold bread, buns, and pastries from yesterday. Good quality.', image: null, pickupTime: '6:00 PM - 8:00 PM', contactPhone: '+91 9988776655' },
  { id: 4, title: 'Packaged Dry Foods', category: 'packaged', quantity: '100 packets', servings: 100, status: 'available', urgency: 'low', donor: 'Reliance Fresh', donorId: 4, location: 'Nagpur, MH', address: '23 Sitabuldi, Nagpur', lat: 21.1470, lng: 79.0943, expiry: '2026-09-01', postedAt: '2026-06-12T14:00:00', description: 'Assorted packaged items near expiry: biscuits, noodles, dal packets.', image: null, pickupTime: '9:00 AM - 6:00 PM', contactPhone: '+91 9000111222' },
  { id: 5, title: 'Fresh Fruits', category: 'fruits', quantity: '40 kg', servings: 160, status: 'available', urgency: 'medium', donor: 'Nandanvan Market', donorId: 5, location: 'Nagpur, MH', address: '56 Nandanvan, Nagpur', lat: 21.1321, lng: 79.1012, expiry: '2026-06-16', postedAt: '2026-06-13T06:00:00', description: 'Mixed fruits: bananas, apples, oranges, guavas.', image: null, pickupTime: '8:00 AM - 12:00 PM', contactPhone: '+91 9222333444' },
  { id: 6, title: 'Restaurant Buffet Surplus', category: 'cooked', quantity: '60 servings', servings: 60, status: 'completed', urgency: 'high', donor: 'Taj Gateway', donorId: 6, location: 'Nagpur, MH', address: '1 Central Avenue, Nagpur', lat: 21.1505, lng: 79.0801, expiry: '2026-06-12', postedAt: '2026-06-12T18:00:00', description: 'Buffet leftovers. Multi-cuisine.', image: null, pickupTime: '9:00 PM - 10:00 PM', contactPhone: '+91 9555666777' },
];

export const NGOS = [
  { id: 1, name: 'Akshaya Patra Foundation', category: 'food_bank', location: 'Nagpur, MH', address: '34 Reshimbagh, Nagpur', lat: 21.1601, lng: 79.0892, rating: 4.9, totalMeals: 45000, volunteers: 28, verified: true, contactPhone: '+91 9111222333', contactEmail: 'nagpur@akshayapatra.org', description: 'Mid-day meal program serving school children across Maharashtra.', operatingHours: '7:00 AM - 7:00 PM', storageCapacity: '500 kg', vehiclesAvailable: 3 },
  { id: 2, name: 'Robin Hood Army Nagpur', category: 'volunteer', location: 'Nagpur, MH', address: '89 Sadar, Nagpur', lat: 21.1432, lng: 79.0756, rating: 4.8, totalMeals: 28000, volunteers: 45, verified: true, contactPhone: '+91 9333444555', contactEmail: 'nagpur@robinhoodarmy.com', description: 'Weekend food redistribution drives across the city.', operatingHours: '6:00 AM - 10:00 PM', storageCapacity: '200 kg', vehiclesAvailable: 5 },
  { id: 3, name: 'Shree Sai Sewa Sangh', category: 'shelter', location: 'Nagpur, MH', address: '12 Mahal, Nagpur', lat: 21.1489, lng: 79.1023, rating: 4.7, totalMeals: 15000, volunteers: 12, verified: true, contactPhone: '+91 9444555666', contactEmail: 'saisewa@gmail.com', description: 'Serving homeless and destitute population in Nagpur.', operatingHours: '8:00 AM - 8:00 PM', storageCapacity: '150 kg', vehiclesAvailable: 1 },
  { id: 4, name: 'Nagpur Food Bank', category: 'food_bank', location: 'Nagpur, MH', address: '67 Wardha Road, Nagpur', lat: 21.1198, lng: 79.0654, rating: 4.6, totalMeals: 32000, volunteers: 20, verified: false, contactPhone: '+91 9666777888', contactEmail: 'info@nagpurfoodbank.org', description: 'Collecting and distributing food to underprivileged families.', operatingHours: '9:00 AM - 6:00 PM', storageCapacity: '300 kg', vehiclesAvailable: 2 },
];

export const VOLUNTEERS = [
  { id: 1, name: 'Rahul Sharma', rating: 4.9, deliveries: 87, status: 'available', location: 'Dharampeth', phone: '+91 9876543210', vehicle: 'bike', joinedDate: '2024-03-15' },
  { id: 2, name: 'Priya Deshmukh', rating: 4.8, deliveries: 63, status: 'on_delivery', location: 'Sadar', phone: '+91 9765432109', vehicle: 'scooter', joinedDate: '2024-05-20' },
  { id: 3, name: 'Amit Kale', rating: 4.7, deliveries: 42, status: 'available', location: 'Sitabuldi', phone: '+91 9654321098', vehicle: 'car', joinedDate: '2024-07-10' },
  { id: 4, name: 'Sneha Patil', rating: 5.0, deliveries: 121, status: 'available', location: 'Civil Lines', phone: '+91 9543210987', vehicle: 'bike', joinedDate: '2023-11-05' },
  { id: 5, name: 'Vikram Naidu', rating: 4.6, deliveries: 29, status: 'offline', location: 'Nandanvan', phone: '+91 9432109876', vehicle: 'scooter', joinedDate: '2025-01-18' },
];

export const DELIVERIES = [
  { id: 1, donationId: 2, donationTitle: 'Cooked Rice & Dal', donor: 'Hotel Ashoka', ngo: 'Robin Hood Army', volunteer: 'Rahul Sharma', status: 'in_transit', pickupTime: '12:15 PM', estimatedDelivery: '12:45 PM', pickupAddress: '45 Civil Lines', deliveryAddress: '89 Sadar', distance: '3.2 km', weight: '15 kg', servings: 30 },
  { id: 2, donationId: 1, donationTitle: 'Fresh Vegetables', donor: 'Green Farms', ngo: 'Akshaya Patra', volunteer: 'Sneha Patil', status: 'completed', pickupTime: '10:30 AM', estimatedDelivery: '11:00 AM', pickupAddress: '12 MG Road', deliveryAddress: '34 Reshimbagh', distance: '5.1 km', weight: '50 kg', servings: 200 },
  { id: 3, donationId: 3, donationTitle: 'Bakery Items', donor: 'City Bakery', ngo: 'Nagpur Food Bank', volunteer: 'Amit Kale', status: 'scheduled', pickupTime: '6:00 PM', estimatedDelivery: '6:45 PM', pickupAddress: '7 Dharampeth', deliveryAddress: '67 Wardha Road', distance: '7.8 km', weight: '12 kg', servings: 80 },
];

export const MESSAGES = [
  { id: 1, from: 'Robin Hood Army Nagpur', fromId: 2, fromType: 'ngo', avatar: 'R', content: 'Hi! We saw your fresh vegetables donation. Can we request it for our weekend drive?', time: '10:32 AM', unread: true, thread: [
    { role: 'them', content: 'Hi! We saw your fresh vegetables donation. Can we request it for our weekend drive?', time: '10:32 AM' },
    { role: 'them', content: 'We can send a volunteer to pick up by 11 AM. We have capacity for up to 60 kg.', time: '10:33 AM' },
  ]},
  { id: 2, from: 'Akshaya Patra Foundation', fromId: 1, fromType: 'ngo', avatar: 'A', content: 'Thank you for your donation last week! The children loved the food.', time: 'Yesterday', unread: false, thread: [
    { role: 'them', content: 'Thank you for your donation last week! The children loved the food.', time: 'Yesterday 4:00 PM' },
    { role: 'me', content: 'Happy to hear that! We\'ll have more vegetables next week too.', time: 'Yesterday 4:15 PM' },
    { role: 'them', content: 'Wonderful! Can we schedule a regular pickup every Tuesday?', time: 'Yesterday 4:30 PM' },
  ]},
  { id: 3, from: 'AI Assistant', fromId: 0, fromType: 'ai', avatar: '🤖', content: 'Hello! I\'m your FoodBridge AI assistant. How can I help you today?', time: '9:00 AM', unread: false, thread: [] },
];

export const NOTIFICATIONS = [
  { id: 1, type: 'request', title: 'New donation request', message: 'Robin Hood Army requested your vegetable donation', time: '10 min ago', unread: true, icon: '📦' },
  { id: 2, type: 'delivery', title: 'Delivery completed', message: 'Rahul Sharma delivered your rice donation to Robin Hood Army', time: '2 hours ago', unread: true, icon: '✅' },
  { id: 3, type: 'match', title: 'Smart match found', message: 'AI found a perfect NGO match for your bakery items', time: '3 hours ago', unread: false, icon: '🤖' },
  { id: 4, type: 'impact', title: 'Impact milestone!', message: 'You\'ve helped serve 500 meals this month! 🎉', time: '1 day ago', unread: false, icon: '🏆' },
  { id: 5, type: 'reminder', title: 'Scheduled pickup tomorrow', message: 'City Bakery pickup scheduled for 6:00 PM tomorrow', time: '1 day ago', unread: false, icon: '📅' },
  { id: 6, type: 'verify', title: 'NGO verified', message: 'Nagpur Food Bank has been approved by admin', time: '2 days ago', unread: false, icon: '🏢' },
];

export const REVIEWS = [
  { id: 1, from: 'Robin Hood Army', fromType: 'ngo', to: 'Green Farms', toType: 'donor', rating: 5, comment: 'Excellent quality vegetables! Very fresh and well-packaged. Will definitely request again.', date: '2026-06-10', donationTitle: 'Fresh Vegetables' },
  { id: 2, from: 'Akshaya Patra', fromType: 'ngo', to: 'Hotel Ashoka', toType: 'donor', rating: 4, comment: 'Good food, but pickup window was a bit short. Overall great experience!', date: '2026-06-08', donationTitle: 'Buffet Surplus' },
  { id: 3, from: 'Green Farms', fromType: 'donor', to: 'Akshaya Patra', toType: 'ngo', rating: 5, comment: 'Very professional team. Quick pickup and provided impact report same day.', date: '2026-06-05', donationTitle: 'Fresh Vegetables' },
];

export const SCHEDULED_DONATIONS = [
  { id: 1, title: 'Weekly Vegetables', frequency: 'weekly', day: 'Tuesday', time: '9:00 AM', quantity: '30 kg', status: 'active', nextPickup: '2026-06-17', assignedNgo: 'Akshaya Patra Foundation' },
  { id: 2, title: 'Daily Bakery Items', frequency: 'daily', day: 'Everyday', time: '7:00 PM', quantity: '40 pieces', status: 'active', nextPickup: '2026-06-14', assignedNgo: 'Robin Hood Army' },
  { id: 3, title: 'Monthly Dry Food Drive', frequency: 'monthly', day: '1st Saturday', time: '10:00 AM', quantity: '100 packets', status: 'paused', nextPickup: '2026-07-04', assignedNgo: 'Nagpur Food Bank' },
];

export const LEADERBOARD = [
  { rank: 1, name: 'Green Farms', type: 'donor', meals: 4500, co2: 225, badge: '🥇' },
  { rank: 2, name: 'Hotel Ashoka', type: 'donor', meals: 3200, co2: 160, badge: '🥈' },
  { rank: 3, name: 'Akshaya Patra', type: 'ngo', meals: 2800, co2: 140, badge: '🥉' },
  { rank: 4, name: 'City Bakery', type: 'donor', meals: 2100, co2: 105, badge: '⭐' },
  { rank: 5, name: 'Robin Hood Army', type: 'ngo', meals: 1900, co2: 95, badge: '⭐' },
  { rank: 6, name: 'Sneha Patil', type: 'volunteer', meals: 1500, co2: 75, badge: '⭐' },
];

export const IMPACT_DATA = {
  totalMeals: 12450,
  co2Saved: 622,
  familiesHelped: 1245,
  activeVolunteers: 47,
  donationStreak: 23,
  badges: ['First Donation', '100 Meals', '500 Meals', 'Week Streak', 'Top Donor'],
};

export const ANALYTICS_DATA = {
  monthlyMeals: [
    { month: 'Jan', meals: 820, donations: 34 },
    { month: 'Feb', meals: 940, donations: 41 },
    { month: 'Mar', meals: 1100, donations: 48 },
    { month: 'Apr', meals: 980, donations: 43 },
    { month: 'May', meals: 1350, donations: 58 },
    { month: 'Jun', meals: 1580, donations: 67 },
  ],
  categoryBreakdown: [
    { category: 'Vegetables', value: 35 },
    { category: 'Cooked Food', value: 28 },
    { category: 'Bakery', value: 18 },
    { category: 'Packaged', value: 12 },
    { category: 'Fruits', value: 7 },
  ],
  dailyDeliveries: [
    { day: 'Mon', deliveries: 8 },
    { day: 'Tue', deliveries: 12 },
    { day: 'Wed', deliveries: 9 },
    { day: 'Thu', deliveries: 14 },
    { day: 'Fri', deliveries: 11 },
    { day: 'Sat', deliveries: 18 },
    { day: 'Sun', deliveries: 7 },
  ],
};

export const USERS_ADMIN = [
  { id: 1, name: 'Green Farms', type: 'donor', email: 'green@farms.com', status: 'active', joined: '2024-01-15', donations: 45 },
  { id: 2, name: 'Hotel Ashoka', type: 'donor', email: 'ashoka@hotel.com', status: 'active', joined: '2024-02-20', donations: 32 },
  { id: 3, name: 'Akshaya Patra', type: 'ngo', email: 'ap@ngo.org', status: 'active', joined: '2023-11-10', donations: 0 },
  { id: 4, name: 'Rahul Sharma', type: 'volunteer', email: 'rahul@email.com', status: 'active', joined: '2024-03-15', donations: 0 },
  { id: 5, name: 'Nagpur Food Bank', type: 'ngo', email: 'nfb@org.com', status: 'pending', joined: '2026-06-01', donations: 0 },
  { id: 6, name: 'Spam User', type: 'donor', email: 'spam@bad.com', status: 'suspended', joined: '2026-05-15', donations: 0 },
];

export const EMERGENCY_REQUESTS = [
  { id: 1, ngo: 'Shree Sai Sewa Sangh', urgent: true, needed: 'Cooked food for 80 people', deadline: '3 hours', location: 'Mahal, Nagpur', contact: '+91 9444555666', reason: 'Flood relief camp set up' },
  { id: 2, ngo: 'Robin Hood Army', urgent: true, needed: 'Rice and dal (50+ servings)', deadline: '5 hours', location: 'Sadar, Nagpur', contact: '+91 9333444555', reason: 'Unexpected surge of beneficiaries' },
];

export const ROUTE_DATA = {
  pickup: { address: '45 Civil Lines, Nagpur', lat: 21.1588, lng: 79.0763 },
  delivery: { address: '89 Sadar, Nagpur', lat: 21.1432, lng: 79.0756 },
  distance: '3.2 km',
  duration: '12 min',
  waypoints: [],
};
