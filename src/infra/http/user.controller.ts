import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from 'src/application/services/user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(
    @Body() body: { name: string; email: string; password: string },
  ) {
    const { email, name, password } = body;
    await this.userService.create({ email, name, password });
  }

  @Get('/:userId')
  async getByCnpj(@Param('userId') userId: string) {
    const { user } = await this.userService.getById(userId);

    return { user };
  }
}
