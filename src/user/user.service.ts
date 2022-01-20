import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Stripe from 'stripe';

import { UserDTO, UserRO } from './user.dto';
import { UserEntity } from './user.entity';
import { STRIPE_CLIENT } from '../stripe/constants';
import { Role } from '../shared/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @Inject(STRIPE_CLIENT) private stripe: Stripe,
  ) {}

  async showAll(page = 1): Promise<UserRO[]> {
    const users = await this.userRepository.find({
      relations: ['ideas', 'bookmarks', 'photos'],
      take: 25,
      skip: 25 * (page - 1),
    });
    return users.map(user => user.toResponseObject(false));
  }

  async read(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['ideas', 'bookmarks'],
    });
    return user.toResponseObject(false);
  }

  async readUserById(userId: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.photos', 'photo')
      .leftJoinAndSelect('user.ideas', 'ideas')
      .leftJoinAndSelect('user.bookmarks', 'bookmarks')
      .where('user.id = :userId', { userId: userId })
      .getOne();
    return user.toResponseObject(false);
  }

  async setAdminRole(id: string) {
    await this.userRepository.update({ id }, { roles: [Role.Admin] });
    const user = await this.userRepository.findOne({
      where: { id },
    });
    return user.toResponseObject(false);
  }

  async login(data: UserDTO): Promise<UserRO> {
    const { username, password } = data;
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user.toResponseObject();
  }

  async register(data: UserDTO): Promise<UserRO> {
    const { username } = data;
    let user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    user = this.userRepository.create(data);
    await this.userRepository.save(user);
    return user.toResponseObject();
  }

  async getUserCount(): Promise<number> {
    return this.userRepository.count();
  }

  checkout() {
    return this.stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:4242/success.html',
      cancel_url: 'http://localhost:4242/cancel.html',
    });
  }

  getStripeCustomers() {
    return this.stripe.customers.list();
  }
}
