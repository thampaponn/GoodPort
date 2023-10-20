import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from "./auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(user: any): Promise<any> {
    const subData = {
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
    };
    const payload = { sub: subData, username: user.username };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
    };
  }
}
