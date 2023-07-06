import { Module } from '@nestjs/common';
import { PrismaModule } from './config/db/prisma.module';
import { ConfigModule } from '@nestjs/config'
import { QrServiceModule } from './qr-service/qr-service.module';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, QrServiceModule]
})
export class AppModule {}
