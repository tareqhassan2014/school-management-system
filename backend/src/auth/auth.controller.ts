import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signup(@Body() signupDto: { email: string; password: string; name: string }) {
    return this.authService.signup(signupDto.email, signupDto.password, signupDto.name);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  async refreshTokens(@Request() req) {
    const userId = req.user.sub;
    const refreshToken = req.user.refreshToken;
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @UseGuards(AuthGuard('google'))
  @Get('google')
  googleAuth() {}

  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  googleAuthRedirect(@Request() req) {
    return this.authService.validateOAuthLogin(req.user, 'google');
  }

  @UseGuards(AuthGuard('facebook'))
  @Get('facebook')
  facebookAuth() {}

  @UseGuards(AuthGuard('facebook'))
  @Get('facebook/callback')
  facebookAuthRedirect(@Request() req) {
    return this.authService.validateOAuthLogin(req.user, 'facebook');
  }

  @UseGuards(AuthGuard('apple'))
  @Get('apple')
  appleAuth() {}

  @UseGuards(AuthGuard('apple'))
  @Get('apple/callback')
  appleAuthRedirect(@Request() req) {
    return this.authService.validateOAuthLogin(req.user, 'apple');
  }

  @Get('verify-email')
  async verifyEmail(@Body('token') token: string) {
    await this.authService.verifyEmail(token);
    return { message: 'Email verified successfully' };
  }
}