import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });
  try {
    const count = await prisma.user.count();
    console.log('users count:', count);
    const admin = await prisma.user.findUnique({ where: { email: 'admin@maulanahafizali.com' } });
    if (!admin) {
      console.log('ADMIN NOT FOUND');
      process.exit(0);
    }
    console.log('admin found:', admin.name, '| active:', admin.active, '| role:', admin.role);
    const ok = await bcrypt.compare('ChangeMe123!', admin.passwordHash);
    console.log('password matches:', ok);
  } catch (e: unknown) {
    console.error('ERROR:', e instanceof Error ? e.message : e);
  } finally {
    await prisma.$disconnect();
  }
}
main();
