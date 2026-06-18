/* Seeds the local SQLite db with the Kora demo dataset.
 * Dates are relative to "now" so the demo always has upcoming shifts
 * and a believable hours history.
 *
 * Demo accounts (password for all: demo1234)
 *   student@demo.kora — Maya Chen (student)
 *   org@demo.kora     — Marcus Webb (Hope Community Kitchen moderator)
 *   jordan@demo.kora / sofia@demo.kora — extra students for the org roster
 */
import { prisma } from "./client";
import { toJsonArray } from "./json";
import { monogramAvatar } from "./avatar";
import { hashPassword } from "./password";

const DAY = 24 * 60 * 60 * 1000;

function daysFromNow(days: number, hour: number, minute = 0): Date {
  const d = new Date(Date.now() + days * DAY);
  d.setHours(hour, minute, 0, 0);
  return d;
}

const PASSWORD = hashPassword("demo1234");

const avatars = {
  maya: monogramAvatar("Maya Chen"),
  jordan: monogramAvatar("Jordan Park"),
  sofia: monogramAvatar("Sofia Reyes"),
};

interface ModeratorSeed {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roleTitle: string;
  avatarSeed: string;
  avatarBg: string;
}

const moderators: ModeratorSeed[] = [
  { id: "mod_parks", email: "parks@demo.kora", firstName: "Elena", lastName: "Vasquez", roleTitle: "Parks Volunteer Coordinator", avatarSeed: "Elena", avatarBg: "DDF0FB" },
  { id: "mod_hope", email: "org@demo.kora", firstName: "Marcus", lastName: "Webb", roleTitle: "Kitchen Operations Lead", avatarSeed: "Marcus", avatarBg: "ECEAFB" },
  { id: "mod_library", email: "library@demo.kora", firstName: "Priya", lastName: "Nair", roleTitle: "Youth Programs Director", avatarSeed: "Priya", avatarBg: "FBE4F1" },
  { id: "mod_maplewood", email: "maplewood@demo.kora", firstName: "James", lastName: "Okonkwo", roleTitle: "Community Engagement Manager", avatarSeed: "James", avatarBg: "ECEAFB" },
  { id: "mod_habitat", email: "habitat@demo.kora", firstName: "Rachel", lastName: "Kim", roleTitle: "Site Supervisor", avatarSeed: "Rachel", avatarBg: "ECEAFB" },
  { id: "mod_green", email: "green@demo.kora", firstName: "Tomás", lastName: "Herrera", roleTitle: "Garden Program Lead", avatarSeed: "Tomas", avatarBg: "DDF0FB" },
  { id: "mod_paws", email: "paws@demo.kora", firstName: "Avery", lastName: "Collins", roleTitle: "Shelter Volunteer Manager", avatarSeed: "Avery", avatarBg: "ECEAFB" },
  { id: "mod_youth", email: "youth@demo.kora", firstName: "Danielle", lastName: "Brooks", roleTitle: "Mentorship Coordinator", avatarSeed: "Danielle", avatarBg: "FBE4F1" },
];

interface OrgSeed {
  id: string;
  name: string;
  description: string;
  categories: string[];
  distance: string;
  avatarSeed: string;
  avatarBg: string;
  moderatorId: string;
}

const orgs: OrgSeed[] = [
  { id: "org_habitat", name: "Habitat for Humanity", description: "Build affordable housing with supervised construction crews open to student volunteers.", categories: ["community"], distance: "2.1 mi", avatarSeed: "Habitat", avatarBg: "ECEAFB", moderatorId: "mod_habitat" },
  { id: "org_green_city", name: "Green City Coalition", description: "Environmental stewardship through community gardens, cleanups, and tree planting.", categories: ["environment"], distance: "0.8 mi", avatarSeed: "Green", avatarBg: "DDF0FB", moderatorId: "mod_green" },
  { id: "org_lincoln_library", name: "Lincoln Public Library", description: "After-school tutoring, reading buddies, and literacy programs for K–12 students.", categories: ["education"], distance: "1.4 mi", avatarSeed: "LibraryOrg", avatarBg: "FBE4F1", moderatorId: "mod_library" },
  { id: "org_hope_kitchen", name: "Hope Community Kitchen", description: "Meal service and food pantry operations serving families across the county.", categories: ["community"], distance: "1.9 mi", avatarSeed: "HopeOrg", avatarBg: "ECEAFB", moderatorId: "mod_hope" },
  { id: "org_city_parks", name: "City Parks Dept.", description: "Park maintenance, trail restoration, and environmental conservation projects.", categories: ["environment"], distance: "3.2 mi", avatarSeed: "ParksOrg", avatarBg: "DDF0FB", moderatorId: "mod_parks" },
  { id: "org_maplewood_senior", name: "Maplewood Senior Center", description: "Tech help, companionship visits, and activity support for senior residents.", categories: ["community"], distance: "2.5 mi", avatarSeed: "SeniorOrg", avatarBg: "ECEAFB", moderatorId: "mod_maplewood" },
  { id: "org_paws_hearts", name: "Paws & Hearts Rescue", description: "Animal care, adoption events, and shelter enrichment for rescued pets.", categories: ["community"], distance: "4.0 mi", avatarSeed: "PawsOrg", avatarBg: "ECEAFB", moderatorId: "mod_paws" },
  { id: "org_youth_mentors", name: "Youth Mentors Network", description: "One-on-one mentoring and group workshops for at-risk middle school students.", categories: ["education", "community"], distance: "1.1 mi", avatarSeed: "YouthOrg", avatarBg: "FBE4F1", moderatorId: "mod_youth" },
];

interface ShiftSeed {
  id: string;
  title: string;
  description: string;
  orgId: string;
  category: string;
  categoryKey: string;
  categoryTint: string;
  slots: number;
  externalSignups: number;
  scheduledAt: Date;
  durationHrs: number;
  skills: string[];
  img: string;
}

const shifts: ShiftSeed[] = [
  { id: "shift_riverside_cleanup", title: "Riverside Park Cleanup & Tree Planting", description: "Help restore Riverside Park trails, remove invasive plants, and plant native trees.", orgId: "org_city_parks", category: "Environment", categoryKey: "environment", categoryTint: "sky", slots: 12, externalSignups: 8, scheduledAt: daysFromNow(2, 9), durationHrs: 4, skills: ["outdoor", "teamwork"], img: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&q=70" },
  { id: "shift_food_bank", title: "Weekend Food Bank Sorting Shift", description: "Sort and pack food donations for families in need at Hope Community Kitchen.", orgId: "org_hope_kitchen", category: "Community", categoryKey: "community", categoryTint: "lavender", slots: 15, externalSignups: 3, scheduledAt: daysFromNow(3, 13), durationHrs: 3, skills: ["organization", "communication"], img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=70" },
  { id: "shift_reading_buddies", title: "After-School Reading Buddies (Grades 1–3)", description: "Read aloud and help young students build literacy confidence.", orgId: "org_lincoln_library", category: "Education", categoryKey: "education", categoryTint: "pink", slots: 8, externalSignups: 6, scheduledAt: daysFromNow(4, 15, 30), durationHrs: 2, skills: ["tutoring", "patience"], img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=70" },
  { id: "shift_senior_tech", title: "Senior Center Tech Help Drop-in", description: "Assist seniors with smartphones, tablets, and video calls with family.", orgId: "org_maplewood_senior", category: "Community", categoryKey: "community", categoryTint: "lavender", slots: 10, externalSignups: 4, scheduledAt: daysFromNow(6, 16), durationHrs: 2, skills: ["technology", "communication"], img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=70" },
  { id: "shift_habitat_build", title: "Habitat Build Day — Framing Crew", description: "Join a supervised construction crew building affordable housing units.", orgId: "org_habitat", category: "Community", categoryKey: "community", categoryTint: "lavender", slots: 20, externalSignups: 15, scheduledAt: daysFromNow(9, 8), durationHrs: 6, skills: ["teamwork", "outdoor"], img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=70" },
  { id: "shift_green_coalition", title: "Community Garden Planting Day", description: "Plant vegetables and maintain raised beds at the Green City Coalition garden.", orgId: "org_green_city", category: "Environment", categoryKey: "environment", categoryTint: "sky", slots: 12, externalSignups: 4, scheduledAt: daysFromNow(10, 10), durationHrs: 3, skills: ["outdoor", "organization"], img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=70" },
  { id: "shift_math_tutoring", title: "Saturday Math Tutoring Lab", description: "Tutor middle school students in algebra and geometry prep sessions.", orgId: "org_lincoln_library", category: "Education", categoryKey: "education", categoryTint: "pink", slots: 6, externalSignups: 3, scheduledAt: daysFromNow(16, 9), durationHrs: 3, skills: ["tutoring", "communication"], img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=70" },
  { id: "shift_animal_shelter", title: "Animal Shelter Weekend Care", description: "Walk dogs, socialize cats, and help with shelter cleaning and enrichment.", orgId: "org_paws_hearts", category: "Community", categoryKey: "community", categoryTint: "lavender", slots: 10, externalSignups: 3, scheduledAt: daysFromNow(17, 11), durationHrs: 2, skills: ["patience", "teamwork"], img: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&q=70" },
];

interface LogSeed {
  id: string;
  shiftId: string;
  activity: string;
  hours: number;
  status: "verified" | "pending" | "flagged";
  daysAgo: number;
}

const mayaLogs: LogSeed[] = [
  { id: "log_hope_1", shiftId: "shift_food_bank", activity: "Served meals at the weekend shelter", hours: 4, status: "verified", daysAgo: 11 },
  { id: "log_parks_1", shiftId: "shift_riverside_cleanup", activity: "Trail restoration & invasive plant removal", hours: 3, status: "verified", daysAgo: 18 },
  { id: "log_library_1", shiftId: "shift_reading_buddies", activity: "Tutored math for middle-schoolers", hours: 2, status: "pending", daysAgo: 22 },
  { id: "log_senior_1", shiftId: "shift_senior_tech", activity: "Helped residents with smartphones", hours: 2, status: "flagged", daysAgo: 26 },
  { id: "log_habitat_1", shiftId: "shift_habitat_build", activity: "Framed exterior walls on Lot 14", hours: 6, status: "verified", daysAgo: 32 },
  { id: "log_green_1", shiftId: "shift_green_coalition", activity: "Planted tomatoes and maintained compost bins", hours: 3, status: "verified", daysAgo: 39 },
  { id: "log_math_1", shiftId: "shift_math_tutoring", activity: "Algebra review session for 8th graders", hours: 3, status: "verified", daysAgo: 46 },
  { id: "log_animal_1", shiftId: "shift_animal_shelter", activity: "Dog walking and kennel cleaning", hours: 2, status: "verified", daysAgo: 53 },
  { id: "log_parks_2", shiftId: "shift_riverside_cleanup", activity: "Mulched playground beds and picked up litter", hours: 2, status: "verified", daysAgo: 60 },
  { id: "log_hope_2", shiftId: "shift_food_bank", activity: "Sorted pantry donations and packed meal kits", hours: 3, status: "pending", daysAgo: 67 },
  { id: "log_library_2", shiftId: "shift_reading_buddies", activity: "Reading buddies session with 2nd graders", hours: 2, status: "verified", daysAgo: 74 },
  { id: "log_senior_2", shiftId: "shift_senior_tech", activity: "Set up video calls for residents", hours: 2, status: "flagged", daysAgo: 81 },
];

const orgByShift = new Map(shifts.map((s) => [s.id, s.orgId]));
const moderatorByOrg = new Map(orgs.map((o) => [o.id, o.moderatorId]));

async function main() {
  console.log("Clearing existing data...");
  await prisma.notification.deleteMany();
  await prisma.qrSession.deleteMany();
  await prisma.shiftLog.deleteMany();
  await prisma.commitment.deleteMany();
  await prisma.savedShift.deleteMany();
  await prisma.orgFollow.deleteMany();
  await prisma.shift.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.user.deleteMany();
  await prisma.school.deleteMany();

  console.log("Seeding school + users...");
  const school = await prisma.school.create({
    data: {
      id: "school_lincoln_high",
      name: "Lincoln High",
      state: "FL",
      district: "Hillsborough County Public Schools",
    },
  });

  await prisma.user.create({
    data: {
      id: "user_maya_chen",
      email: "student@demo.kora",
      passwordHash: PASSWORD,
      role: "STUDENT",
      firstName: "Maya",
      lastName: "Chen",
      avatar: avatars.maya,
      grade: "11th Grade · Lincoln High",
      skills: toJsonArray(["tutoring", "communication", "outdoor", "organization"]),
      streakWeeks: 6,
      schoolId: school.id,
    },
  });

  await prisma.user.create({
    data: {
      id: "user_jordan_park",
      email: "jordan@demo.kora",
      passwordHash: PASSWORD,
      role: "STUDENT",
      firstName: "Jordan",
      lastName: "Park",
      avatar: avatars.jordan,
      grade: "11th Grade · Lincoln High",
      skills: toJsonArray(["teamwork", "outdoor"]),
      streakWeeks: 4,
      schoolId: school.id,
    },
  });

  await prisma.user.create({
    data: {
      id: "user_sofia_reyes",
      email: "sofia@demo.kora",
      passwordHash: PASSWORD,
      role: "STUDENT",
      firstName: "Sofia",
      lastName: "Reyes",
      avatar: avatars.sofia,
      grade: "12th Grade · Lincoln High",
      skills: toJsonArray(["communication", "organization"]),
      streakWeeks: 8,
      schoolId: school.id,
    },
  });

  await prisma.user.create({
    data: {
      id: "user_admin_lincoln",
      email: "admin@demo.kora",
      passwordHash: PASSWORD,
      role: "SCHOOL_ADMIN",
      firstName: "Dana",
      lastName: "Whitfield",
      roleTitle: "Service Hours Coordinator",
      avatar: monogramAvatar("Dana Whitfield"),
      schoolId: school.id,
    },
  });

  for (const mod of moderators) {
    await prisma.user.create({
      data: {
        id: mod.id,
        email: mod.email,
        passwordHash: PASSWORD,
        role: "ORG_MODERATOR",
        firstName: mod.firstName,
        lastName: mod.lastName,
        roleTitle: mod.roleTitle,
        avatar: monogramAvatar(`${mod.firstName} ${mod.lastName}`),
      },
    });
  }

  console.log("Seeding organizations + shifts...");
  for (const org of orgs) {
    await prisma.organization.create({
      data: {
        id: org.id,
        name: org.name,
        description: org.description,
        avatar: monogramAvatar(org.name, { square: true }),
        verified: true,
        distance: org.distance,
        categories: toJsonArray(org.categories),
        moderatorId: org.moderatorId,
      },
    });
  }

  for (const shift of shifts) {
    await prisma.shift.create({
      data: {
        id: shift.id,
        title: shift.title,
        description: shift.description,
        orgId: shift.orgId,
        category: shift.category,
        categoryKey: shift.categoryKey,
        categoryTint: shift.categoryTint,
        slots: shift.slots,
        externalSignups: shift.externalSignups,
        scheduledAt: shift.scheduledAt,
        durationHrs: shift.durationHrs,
        skills: toJsonArray(shift.skills),
        img: shift.img,
      },
    });
  }

  console.log("Seeding commitments, saves, follows...");
  await prisma.commitment.createMany({
    data: [
      { userId: "user_maya_chen", shiftId: "shift_food_bank" },
      { userId: "user_jordan_park", shiftId: "shift_food_bank" },
      { userId: "user_sofia_reyes", shiftId: "shift_food_bank" },
      { userId: "user_jordan_park", shiftId: "shift_riverside_cleanup" },
    ],
  });
  await prisma.savedShift.createMany({
    data: [
      { userId: "user_maya_chen", shiftId: "shift_riverside_cleanup" },
      { userId: "user_maya_chen", shiftId: "shift_green_coalition" },
    ],
  });
  await prisma.orgFollow.createMany({
    data: [{ userId: "user_maya_chen", orgId: "org_lincoln_library" }],
  });

  console.log("Seeding hours history...");
  for (const log of mayaLogs) {
    const completedAt = new Date(Date.now() - log.daysAgo * DAY);
    completedAt.setHours(17, 0, 0, 0);
    const orgId = orgByShift.get(log.shiftId);
    const moderatorId = orgId ? moderatorByOrg.get(orgId) : undefined;

    await prisma.shiftLog.create({
      data: {
        id: log.id,
        userId: "user_maya_chen",
        shiftId: log.shiftId,
        activity: log.activity,
        hours: log.hours,
        status: log.status,
        completedAt,
        verifiedAt:
          log.status === "verified"
            ? new Date(completedAt.getTime() + 60 * 60 * 1000)
            : null,
        verifiedBy: log.status === "verified" ? moderatorId : null,
      },
    });
  }

  // Jordan missed the QR scan at a past food-bank shift → pending log for
  // Marcus (org@demo.kora) to verify in the org portal demo.
  const jordanCompleted = new Date(Date.now() - 2 * DAY);
  jordanCompleted.setHours(16, 0, 0, 0);
  await prisma.shiftLog.create({
    data: {
      id: "log_jordan_pending",
      userId: "user_jordan_park",
      shiftId: "shift_food_bank",
      activity: "Sorted weekend food donations",
      hours: 3,
      status: "pending",
      completedAt: jordanCompleted,
    },
  });

  console.log("Seeding notifications...");
  const notif = (daysAgo: number, hour: number) => {
    const d = new Date(Date.now() - daysAgo * DAY);
    d.setHours(hour, 0, 0, 0);
    return d;
  };
  await prisma.notification.createMany({
    data: [
      { userId: "user_maya_chen", kind: "hours_verified", title: "Hours verified", body: "Marcus Webb approved 4 hrs for Weekend Food Bank Sorting Shift at Hope Community Kitchen.", read: false, href: "/hours", createdAt: notif(3, 21) },
      { userId: "user_maya_chen", kind: "motivation", title: "Bright Futures progress", body: "You're getting closer to Bright Futures Silver — keep logging verified hours!", read: false, href: "/goals", createdAt: notif(4, 9) },
      { userId: "user_maya_chen", kind: "hours_verified", title: "Hours verified", body: "Elena Vasquez approved 3 hrs for Riverside Park Cleanup at City Parks Dept.", read: true, href: "/hours", createdAt: notif(18, 16) },
      { userId: "user_maya_chen", kind: "motivation", title: "Graduation requirement", body: "You're so close to your graduation service requirement — keep it up!", read: false, href: "/goals", createdAt: notif(6, 8) },
      { userId: "user_maya_chen", kind: "milestone", title: "6-week streak", body: "Nice work — you've logged service hours 6 weeks in a row. Don't break the chain!", read: true, href: "/", createdAt: notif(8, 12) },
    ],
  });

  const userCount = await prisma.user.count();
  const shiftCount = await prisma.shift.count();
  const logCount = await prisma.shiftLog.count();
  console.log(
    `Seed complete: ${userCount} users, ${shiftCount} shifts, ${logCount} logs.`,
  );
  console.log("Demo logins (password: demo1234):");
  console.log("  student@demo.kora — Maya Chen (student)");
  console.log("  org@demo.kora     — Marcus Webb (Hope Community Kitchen)");
  console.log("  admin@demo.kora   — Dana Whitfield (Lincoln High admin)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
