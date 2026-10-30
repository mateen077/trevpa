import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly pool: Pool;

  constructor() {
    // 1. PostgreSQL connection pool banao
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    // 2. Pool ko Prisma Adapter mein pass karo
    const adapter = new PrismaPg(pool);
    // 3. Prisma Client ko adapter ke saath initialize karo
    super({ adapter });
    this.pool = pool;
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
    await this.pool.end();
  }
}
