// Static client-side demo data that is not part of the MVP database loop:
// friends rail, message threads, and shared tint styling.
import type {
  ConversationThread,
  Friend,
  TintKey,
} from "@/lib/types/student";

export const DEFAULT_SKILLS = [
  "tutoring",
  "communication",
  "outdoor",
  "organization",
];

export const friends: Friend[] = [
  {
    id: "friend_jordan",
    name: "Jordan Park",
    role: "38 hrs logged",
    avatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=Jordan&backgroundColor=DDF0FB",
  },
  {
    id: "friend_sofia",
    name: "Sofia Reyes",
    role: "41 hrs logged",
    avatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=Sofia&backgroundColor=FBE4F1",
  },
  {
    id: "friend_devin",
    name: "Devin Walters",
    role: "29 hrs logged",
    avatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=Devin&backgroundColor=ECEAFB",
  },
];

export const messageTemplates = [
  "I missed the QR scan, please manually verify my hours",
  "I have a question about this shift",
] as const;

export const conversationThreads: ConversationThread[] = [
  {
    id: "thread_friend_jordan",
    kind: "friend",
    pinned: true,
    unread: true,
    contactId: "friend_jordan",
    contactName: "Jordan Park",
    contactAvatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=Jordan&backgroundColor=DDF0FB",
    contactSubtitle: "38 hrs logged",
    messages: [
      {
        id: "msg_jordan_1",
        sender: "friend",
        body: "Are you doing the food bank shift this weekend?",
        sentAt: "2026-06-05T19:10:00.000Z",
      },
      {
        id: "msg_jordan_2",
        sender: "student",
        body: "Yes — I committed yesterday!",
        sentAt: "2026-06-05T19:24:00.000Z",
      },
      {
        id: "msg_jordan_3",
        sender: "friend",
        body: "Nice, see you there!",
        sentAt: "2026-06-05T20:01:00.000Z",
      },
    ],
    updatedAt: "2026-06-05T20:01:00.000Z",
  },
  {
    id: "thread_food_bank",
    kind: "moderator",
    pinned: true,
    unread: false,
    contactId: "mod_hope",
    contactName: "Marcus Webb",
    contactAvatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=Marcus&backgroundColor=ECEAFB",
    contactSubtitle: "Kitchen Operations Lead",
    shiftId: "shift_food_bank",
    shiftTitle: "Weekend Food Bank Sorting Shift",
    shiftDate: "Sun, Jun 8 · 1:00 PM",
    messages: [
      {
        id: "msg_food_bank_1",
        sender: "moderator",
        body: "Thanks for committing to this shift. Check-in code will be displayed at the end.",
        sentAt: "2026-06-05T14:10:00.000Z",
      },
      {
        id: "msg_food_bank_2",
        sender: "student",
        body: "I missed the QR scan, please manually verify my hours",
        sentAt: "2026-06-08T20:15:00.000Z",
      },
      {
        id: "msg_food_bank_3",
        sender: "moderator",
        body: "Got it — I’ll review your check-in and update your hours shortly.",
        sentAt: "2026-06-08T20:42:00.000Z",
      },
    ],
    updatedAt: "2026-06-08T20:42:00.000Z",
  },
  {
    id: "thread_friend_sofia",
    kind: "friend",
    pinned: false,
    unread: true,
    contactId: "friend_sofia",
    contactName: "Sofia Reyes",
    contactAvatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=Sofia&backgroundColor=FBE4F1",
    contactSubtitle: "41 hrs logged",
    messages: [
      {
        id: "msg_sofia_1",
        sender: "friend",
        body: "Did you finish your Bright Futures paperwork yet?",
        sentAt: "2026-06-04T15:30:00.000Z",
      },
    ],
    updatedAt: "2026-06-04T15:30:00.000Z",
  },
  {
    id: "thread_reading_buddies",
    kind: "moderator",
    pinned: false,
    unread: true,
    contactId: "mod_library",
    contactName: "Priya Nair",
    contactAvatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=Priya&backgroundColor=FBE4F1",
    contactSubtitle: "Youth Programs Director",
    shiftId: "shift_reading_buddies",
    shiftTitle: "After-School Reading Buddies (Grades 1–3)",
    shiftDate: "Mon, Jun 9 · 3:30 PM",
    messages: [
      {
        id: "msg_reading_1",
        sender: "student",
        body: "I have a question about this shift",
        sentAt: "2026-06-07T16:05:00.000Z",
      },
      {
        id: "msg_reading_2",
        sender: "moderator",
        body: "Happy to help — what would you like to know?",
        sentAt: "2026-06-07T16:18:00.000Z",
      },
      {
        id: "msg_reading_3",
        sender: "student",
        body: "Do I need to bring anything for the reading session?",
        sentAt: "2026-06-07T16:22:00.000Z",
      },
      {
        id: "msg_reading_4",
        sender: "moderator",
        body: "Just yourself. We provide all books and materials at the front desk.",
        sentAt: "2026-06-07T16:30:00.000Z",
      },
    ],
    updatedAt: "2026-06-07T16:30:00.000Z",
  },
  {
    id: "thread_riverside_cleanup",
    kind: "moderator",
    pinned: false,
    unread: true,
    contactId: "mod_parks",
    contactName: "Elena Vasquez",
    contactAvatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=Elena&backgroundColor=DDF0FB",
    contactSubtitle: "Parks Volunteer Coordinator",
    shiftId: "shift_riverside_cleanup",
    shiftTitle: "Riverside Park Cleanup & Tree Planting",
    shiftDate: "Sat, Jun 7 · 9:00 AM",
    messages: [
      {
        id: "msg_parks_1",
        sender: "moderator",
        body: "Reminder: wear closed-toe shoes and bring a water bottle.",
        sentAt: "2026-06-06T18:00:00.000Z",
      },
    ],
    updatedAt: "2026-06-06T18:00:00.000Z",
  },
];

export const tints: Record<TintKey, { bg: string; fg: string }> = {
  lavender: { bg: "bg-accent-lavender", fg: "text-primary" },
  pink: { bg: "bg-accent-pink", fg: "text-icon-pink" },
  sky: { bg: "bg-accent-sky", fg: "text-icon-sky" },
};
