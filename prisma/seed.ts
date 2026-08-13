import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const DEFAULT_STATUSES = [
  { name: 'Pending to Call', color: '#f59e0b', sortOrder: 1, isDefault: true, isSystem: true },
  { name: 'Called', color: '#3b82f6', sortOrder: 2, isSystem: true },
  { name: 'Transferred to WhatsApp', color: '#10b981', sortOrder: 3, isSystem: true },
  { name: 'Transferred to Imo', color: '#14b8a6', sortOrder: 4, isSystem: true },
  { name: 'Follow Up', color: '#8b5cf6', sortOrder: 5, isSystem: true },
  { name: 'Interested', color: '#22c55e', sortOrder: 6, isSystem: true },
  { name: 'Not Interested', color: '#ef4444', sortOrder: 7, isSystem: true },
  { name: 'No Response', color: '#64748b', sortOrder: 8, isSystem: true },
  { name: 'Converted', color: '#059669', sortOrder: 9, isSystem: true },
  { name: 'Closed', color: '#475569', sortOrder: 10, isSystem: true },
];

const DEFAULT_TAGS = [
  { name: 'Urgent', color: '#ef4444' },
  { name: 'VIP', color: '#f59e0b' },
  { name: 'High Priority', color: '#dc2626' },
  { name: 'Dubai', color: '#8b5cf6' },
  { name: 'Kuwait', color: '#14b8a6' },
  { name: 'Saudi', color: '#3b82f6' },
  { name: 'Marriage', color: '#ec4899' },
  { name: 'Love Problem', color: '#f43f5e' },
];

async function main() {
  for (const s of DEFAULT_STATUSES) {
    await prisma.leadStatus.upsert({
      where: { name: s.name },
      update: { color: s.color, sortOrder: s.sortOrder, isSystem: s.isSystem },
      create: s,
    });
  }
  console.log('Statuses seeded');

  for (const t of DEFAULT_TAGS) {
    await prisma.tag.upsert({
      where: { name: t.name },
      update: { color: t.color },
      create: t,
    });
  }
  console.log('Tags seeded');

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@maulanahafizali.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.user.create({
      data: {
        name: 'Super Admin',
        email: adminEmail,
        passwordHash,
        role: 'SUPER_ADMIN',
      },
    });
    console.log(`Admin created: ${adminEmail}`);
  } else {
    console.log('Admin already exists');
  }

  const statuses = await prisma.leadStatus.findMany({ orderBy: { sortOrder: 'asc' } });
  const pending = statuses.find((s) => s.name === 'Pending to Call')!;
  const users = await prisma.user.findMany({ where: { role: { not: 'SUPER_ADMIN' } } });
  const agent = users[0];

  if ((await prisma.lead.count()) === 0) {
    for (let i = 0; i < 12; i++) {
      const createdAt = new Date(Date.now() - i * 3 * 24 * 60 * 60 * 1000);
      const names = ['Aisha Rahman', 'Mohammed Khan', 'Fatima Noor', 'Omar Farooq', 'Zainab Ali', 'Hassan Mehmood'];
      const countries = ['UAE', 'India', 'Saudi Arabia', 'Kuwait', 'UK', 'Pakistan'];
      const name = names[i % names.length];
      const country = countries[i % countries.length];
      await prisma.lead.create({
        data: {
          name,
          phone: `+971 50 ${1000000 + i * 111111}`,
          email: `lead${i + 1}@example.com`,
          country,
          city: i % 2 ? 'Dubai' : 'Mumbai',
          message: 'Seeking spiritual guidance for family matters.',
          sourcePage: i % 2 ? '/services/wazifa' : '/online-consultation',
          formName: 'consultation-form',
          statusId: pending.id,
          assignedToId: agent?.id,
          priority: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'][i % 4] as never,
          createdAt,
          updatedAt: createdAt,
        },
      });
    }
    console.log('Sample leads created');
  }

  console.log('Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());