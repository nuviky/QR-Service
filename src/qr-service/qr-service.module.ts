import { Module } from '@nestjs/common';
import { QrServiceService } from './qr-service.service';
import { QrServiceController } from './qr-service.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [QrServiceController],
  providers: [QrServiceService],
  imports: [JwtModule.register({})]
})
export class QrServiceModule {}
