// src/common/shared.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './guards/jwt.strategy'; // JWT Strategy implementation
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.SECRET_KEY,
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [JwtStrategy], // Provide the JWT strategy globally
  exports: [JwtModule, PassportModule, JwtStrategy], // Export for other modules
})
export class SharedModule {}
