import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: any): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id).exec();
  }

  async findOrCreateUser(profile: any, provider: string): Promise<User> {
    let user = await this.userModel.findOne({ [`${provider}Id`]: profile.id }).exec();

    if (!user) {
      user = await this.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        [`${provider}Id`]: profile.id,
        isEmailVerified: true, // Social logins are considered verified
      });
    }

    return user;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findOne(email);
    if (user && user.password && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async setRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, { refreshToken });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string): Promise<User | null> {
    const user = await this.findById(userId);
    if (!user || !user.refreshToken) return null;
    
    const isRefreshTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (isRefreshTokenValid) {
      return user;
    }
    return null;
  }

  async markEmailAsVerified(email: string): Promise<void> {
    await this.userModel.findOneAndUpdate({ email }, { isEmailVerified: true });
  }
}