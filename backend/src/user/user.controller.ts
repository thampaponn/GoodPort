import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { User } from "./user.model";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('user')
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() user: User) {
    const createdUser = await this.userService.createUser(user);
    return createdUser;
  }

  @Get()
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    return users;
  }

  @Post(":id")
  async getUserById(@Param("id") id: string) {
    const user = await this.userService.getUserById(id);
    return user;
  }

  @Get('with-roles')
  async getUsersWithRoles() {
    try {
      const users = await this.userService.getUsersWithRoles();
      return users;
    } catch (error) {
      throw error;
    }
  }

  @Put(":id")
  async updateUser(
    @Param("id") id: string,
    @Body() updatedData: Partial<User>
  ) {
    const updatedUser = await this.userService.updateUser(id, updatedData);
    if (!updatedUser) {
      throw new NotFoundException(`ไม่พบ ${id}`);
    }
    return updatedUser;
  }

  @Delete(":id")
  async delUserById(@Param("id") id: string) {
    const user = await this.userService.delUserById(id);
    return "delete success";
  }

  @Get("search")
  async searchUsers(@Query("q") query: string) {
    const users = await this.userService.searchUsers(query);
    return users;
  }
}
