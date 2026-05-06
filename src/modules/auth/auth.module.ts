import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AdminService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './models/auth.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AdminService],
})
export class AdminModule {}
