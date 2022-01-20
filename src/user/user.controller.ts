import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ValidationPipe } from '../shared/validation.pipe';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '../shared/auth.guard';
import { RolesGuard } from '../shared/roles.guard';
import { Roles } from '../shared/roles.decorator';
import { Role } from '../shared/role.enum';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('api/users')
  @Roles(Role.Admin)
  @UseGuards(new AuthGuard(), new RolesGuard(new Reflector()))
  showAllUsers(@Query('page') page: number) {
    return this.userService.showAll(page);
  }

  @Get('api/users/:id')
  readUser(@Param('id') id: string) {
    return this.userService.readUserById(id);
  }

  @Put('api/users/:id')
  @Roles(Role.Admin)
  @UseGuards(new AuthGuard(), new RolesGuard(new Reflector()))
  setAdminRole(@Param('id') id: string) {
    return this.userService.setAdminRole(id);
  }

  @Get('api/users/count')
  @UseGuards(new AuthGuard())
  getCount() {
    return this.userService.getUserCount();
  }

  // @Get('checkout')
  // @UseGuards(new AuthGuard())
  // checkout() {
  //   return this.userService.checkout();
  // }

  // @Get('api/stripecustomers')
  // @UseGuards(new AuthGuard())
  // getStripeCustomers() {
  //   return this.userService.getStripeCustomers();
  // }

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
