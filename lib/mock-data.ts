export interface Issue {
  id: string
  title: string
  description: string
  category: 'pothole' | 'graffiti' | 'lighting' | 'trash' | 'tree' | 'sidewalk'
  status: 'reported' | 'verified' | 'assigned' | 'in-progress' | 'resolved'
  imageUrl: string
  latitude: number
  longitude: number
  address: string
  reportedAt: Date
  verifyCount: number
  upvoteCount: number
  distanceFromUser: number
  createdBy: {
    id: string
    name: string
    avatar: string
  }
  agentNotes?: string
  assignedTo?: string
  timeline?: TimelineEntry[]
}

export interface TimelineEntry {
  id: string
  status: 'reported' | 'verified' | 'assigned' | 'in-progress' | 'resolved'
  timestamp: Date
  message: string
  author: string
  agentGenerated?: boolean
}

export interface User {
  id: string
  name: string
  avatar: string
  email: string
  civicPoints: number
  badges: string[]
  rank: number
  neighborhood: string
}

export const categoryLabels: Record<string, string> = {
  pothole: 'Road Damage',
  graffiti: 'Graffiti',
  lighting: 'Street Light',
  trash: 'Litter',
  tree: 'Tree Care',
  sidewalk: 'Sidewalk',
}

export const statusColors: Record<string, string> = {
  reported: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  verified: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200',
  assigned: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-200',
  'in-progress': 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200',
  resolved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200',
}

export const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Large pothole on Main Street',
    description: 'Deep pothole creating dangerous driving conditions, about 3 feet wide.',
    category: 'pothole',
    status: 'in-progress',
    imageUrl: '/issues/pothole-1.jpg',
    latitude: 40.7128,
    longitude: -74.006,
    address: 'Main Street & 5th Ave',
    reportedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    verifyCount: 23,
    upvoteCount: 47,
    distanceFromUser: 0.3,
    createdBy: {
      id: 'user-1',
      name: 'Sarah Chen',
      avatar: '/avatars/sarah.jpg',
    },
    agentNotes: 'Street maintenance team assigned. Expected repair within 1 week.',
    timeline: [
      {
        id: 'tl-1',
        status: 'reported',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        message: 'Issue reported by community member',
        author: 'System',
        agentGenerated: true,
      },
      {
        id: 'tl-2',
        status: 'verified',
        timestamp: new Date(Date.now() - 1.8 * 24 * 60 * 60 * 1000),
        message: 'Multiple community reports confirm the hazard',
        author: 'System',
        agentGenerated: true,
      },
      {
        id: 'tl-3',
        status: 'assigned',
        timestamp: new Date(Date.now() - 1.2 * 24 * 60 * 60 * 1000),
        message: 'Assigned to Street Maintenance Division',
        author: 'City System',
        agentGenerated: true,
      },
      {
        id: 'tl-4',
        status: 'in-progress',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        message: 'Repair crew on site, work started',
        author: 'City System',
        agentGenerated: true,
      },
    ],
  },
  {
    id: '2',
    title: 'Broken streetlight near library',
    description: 'Light is out, creating dark spot on the sidewalk at night.',
    category: 'lighting',
    status: 'verified',
    imageUrl: '/issues/light-1.jpg',
    latitude: 40.7138,
    longitude: -74.008,
    address: 'Library Plaza, 3rd Street',
    reportedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    verifyCount: 8,
    upvoteCount: 12,
    distanceFromUser: 0.5,
    createdBy: {
      id: 'user-2',
      name: 'Marcus Johnson',
      avatar: '/avatars/marcus.jpg',
    },
  },
  {
    id: '3',
    title: 'Graffiti on park wall',
    description: 'Excessive graffiti covering the east wall of the community center.',
    category: 'graffiti',
    status: 'reported',
    imageUrl: '/issues/graffiti-1.jpg',
    latitude: 40.7148,
    longitude: -74.004,
    address: 'Community Center Park',
    reportedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    verifyCount: 3,
    upvoteCount: 5,
    distanceFromUser: 0.8,
    createdBy: {
      id: 'user-3',
      name: 'Elena Rodriguez',
      avatar: '/avatars/elena.jpg',
    },
  },
  {
    id: '4',
    title: 'Tree branches blocking sidewalk',
    description: 'Low hanging branches force pedestrians into the street',
    category: 'tree',
    status: 'resolved',
    imageUrl: '/issues/tree-1.jpg',
    latitude: 40.7158,
    longitude: -74.001,
    address: 'Park Avenue',
    reportedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    verifyCount: 15,
    upvoteCount: 28,
    distanceFromUser: 1.2,
    createdBy: {
      id: 'user-4',
      name: 'David Kim',
      avatar: '/avatars/david.jpg',
    },
  },
  {
    id: '5',
    title: 'Trash accumulation in alley',
    description: 'Garbage bins overflowing, debris scattered around',
    category: 'trash',
    status: 'assigned',
    imageUrl: '/issues/trash-1.jpg',
    latitude: 40.7118,
    longitude: -74.009,
    address: 'Alley between 2nd & 3rd',
    reportedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    verifyCount: 11,
    upvoteCount: 19,
    distanceFromUser: 0.4,
    createdBy: {
      id: 'user-5',
      name: 'Lisa Park',
      avatar: '/avatars/lisa.jpg',
    },
  },
]

export const mockUser: User = {
  id: 'user-current',
  name: 'You',
  avatar: '/avatars/you.jpg',
  email: 'you@civic.local',
  civicPoints: 2840,
  badges: ['early-adopter', 'power-reporter', 'community-champion'],
  rank: 47,
  neighborhood: 'Downtown',
}
