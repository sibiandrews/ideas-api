import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { ValidationPipe } from '../shared/validation.pipe';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '../shared/auth.guard';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('api/users')
  @UseGuards(new AuthGuard())
  showAllUsers(@Query('page') page: number) {
    return this.userService.showAll(page);
  }

  @Get('api/users/count')
  @UseGuards(new AuthGuard())
  getCount() {
    return this.userService.getUserCount();
  }

  @Get('checkout')
  @UseGuards(new AuthGuard())
  checkout() {
    return this.userService.checkout();
  }

  @Get('api/stripecustomers')
  @UseGuards(new AuthGuard())
  getStripeCustomers() {
    return this.userService.getStripeCustomers();
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: UserDTO) {
    return this.userService.login(data);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: UserDTO) {
    return this.userService.register(data);
  }
}
