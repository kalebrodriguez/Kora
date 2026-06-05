// Realistic mock data for a high-school volunteer-hours dashboard.

export const student = {
  name: 'Maya Chen',
  firstName: 'Maya',
  grade: '11th Grade · Lincoln High',
  avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Maya&backgroundColor=ECEAFB',
  hoursLogged: 32,
  hoursRequired: 40,
  streakWeeks: 6,
}

// The three service categories, mapped to the Coursue stat-chip pattern.
export const categories = [
  {
    key: 'community',
    label: 'Community',
    logged: 12,
    goal: 15,
    tint: 'lavender', // accent-lavender bg + primary icon
  },
  {
    key: 'environment',
    label: 'Environment',
    logged: 11,
    goal: 15,
    tint: 'sky',
  },
  {
    key: 'education',
    label: 'Education',
    logged: 9,
    goal: 10,
    tint: 'pink',
  },
]

export const events = [
  {
    id: 1,
    title: 'Riverside Park Cleanup & Tree Planting',
    org: 'City Parks Dept.',
    category: 'Environment',
    categoryTint: 'sky',
    date: 'Sat, Jun 7 · 9:00 AM',
    spotsLeft: 4,
    hours: 4,
    img: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&q=70',
    saved: true,
  },
  {
    id: 2,
    title: 'Weekend Food Bank Sorting Shift',
    org: 'Hope Community Kitchen',
    category: 'Community',
    categoryTint: 'lavender',
    date: 'Sun, Jun 8 · 1:00 PM',
    spotsLeft: 9,
    hours: 3,
    img: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=70',
    saved: false,
  },
  {
    id: 3,
    title: 'After-School Reading Buddies (Grades 1–3)',
    org: 'Lincoln Public Library',
    category: 'Education',
    categoryTint: 'pink',
    date: 'Mon, Jun 9 · 3:30 PM',
    spotsLeft: 2,
    hours: 2,
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=70',
    saved: false,
  },
  {
    id: 4,
    title: 'Senior Center Tech Help Drop-in',
    org: 'Maplewood Senior Center',
    category: 'Community',
    categoryTint: 'lavender',
    date: 'Wed, Jun 11 · 4:00 PM',
    spotsLeft: 6,
    hours: 2,
    img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=70',
    saved: false,
  },
]

export const hoursLog = [
  {
    id: 1,
    org: 'Hope Community Kitchen',
    date: 'May 31, 2026',
    category: 'Community',
    categoryTint: 'lavender',
    activity: 'Served meals at the weekend shelter',
    hours: 4,
    status: 'verified',
    avatar: 'https://api.dicebear.com/9.x/shapes/svg?seed=Hope&backgroundColor=ECEAFB',
  },
  {
    id: 2,
    org: 'City Parks Dept.',
    date: 'May 24, 2026',
    category: 'Environment',
    categoryTint: 'sky',
    activity: 'Trail restoration & invasive plant removal',
    hours: 3,
    status: 'verified',
    avatar: 'https://api.dicebear.com/9.x/shapes/svg?seed=Parks&backgroundColor=DDF0FB',
  },
  {
    id: 3,
    org: 'Lincoln Public Library',
    date: 'May 20, 2026',
    category: 'Education',
    categoryTint: 'pink',
    activity: 'Tutored math for middle-schoolers',
    hours: 2,
    status: 'pending',
    avatar: 'https://api.dicebear.com/9.x/shapes/svg?seed=Library&backgroundColor=FBE4F1',
  },
  {
    id: 4,
    org: 'Maplewood Senior Center',
    date: 'May 16, 2026',
    category: 'Community',
    categoryTint: 'lavender',
    activity: 'Helped residents with smartphones',
    hours: 2,
    status: 'verified',
    avatar: 'https://api.dicebear.com/9.x/shapes/svg?seed=Senior&backgroundColor=ECEAFB',
  },
]

// Hours logged per month — drives the bar chart.
export const monthlyHours = [
  { label: 'Feb', value: 4 },
  { label: 'Mar', value: 7 },
  { label: 'Apr', value: 6 },
  { label: 'May', value: 11 },
  { label: 'Jun', value: 4 },
]

export const organizations = [
  {
    id: 1,
    name: 'Habitat for Humanity',
    role: 'Build Crew · 2.1 mi',
    avatar: 'https://api.dicebear.com/9.x/icons/svg?seed=Habitat&backgroundColor=ECEAFB',
    following: false,
  },
  {
    id: 2,
    name: 'Green City Coalition',
    role: 'Environment · 0.8 mi',
    avatar: 'https://api.dicebear.com/9.x/icons/svg?seed=Green&backgroundColor=DDF0FB',
    following: false,
  },
  {
    id: 3,
    name: 'Lincoln Public Library',
    role: 'Tutoring · 1.4 mi',
    avatar: 'https://api.dicebear.com/9.x/icons/svg?seed=LibraryOrg&backgroundColor=FBE4F1',
    following: true,
  },
]

export const friends = [
  {
    id: 1,
    name: 'Jordan Park',
    role: '38 hrs logged',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Jordan&backgroundColor=DDF0FB',
  },
  {
    id: 2,
    name: 'Sofia Reyes',
    role: '41 hrs logged',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sofia&backgroundColor=FBE4F1',
  },
  {
    id: 3,
    name: 'Devin Walters',
    role: '29 hrs logged',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Devin&backgroundColor=ECEAFB',
  },
]

// Maps a tint name to its bg + icon/fg color utility classes.
export const tints = {
  lavender: { bg: 'bg-accent-lavender', fg: 'text-primary' },
  pink: { bg: 'bg-accent-pink', fg: 'text-icon-pink' },
  sky: { bg: 'bg-accent-sky', fg: 'text-icon-sky' },
}
