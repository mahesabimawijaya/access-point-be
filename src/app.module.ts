import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AccesspointsModule } from './accesspoints/accesspoints.module';
import { FirmwaresModule } from './firmwares/firmwares.module';
import { DevicesModule } from './devices/devices.module';
import { SessionsModule } from './sessions/sessions.module';
import { ApmetricsModule } from './apmetrics/apmetrics.module';
import { LogsModule } from './logs/logs.module';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AccesspointsModule,
    FirmwaresModule,
    DevicesModule,
    SessionsModule,
    ApmetricsModule,
    LogsModule,
    UsersModule,
    NotificationsModule,
  ],
})
export class AppModule {}
