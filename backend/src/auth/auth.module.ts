import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService],
  imports:[UserModule,
    JwtModule.register({
      global: true,
      secret: 'madara',
      signOptions: { expiresIn: '7d' },
    }),],
  controllers: [AuthController],
  
})
export class AuthModule {}
