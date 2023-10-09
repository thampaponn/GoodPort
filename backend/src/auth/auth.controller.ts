import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { AuthDto } from "./auth.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(
    @Body("username") username: string,
    @Body("password") password: string
  ) {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return user;
  }

  @Post("signin")
  async signIn(@Body() authDto: AuthDto) {
    const user = await this.authService.validateUser(
      authDto.username,
      authDto.password
    );
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const token = await this.authService.signIn(user._doc);
    return token;
  }
}
