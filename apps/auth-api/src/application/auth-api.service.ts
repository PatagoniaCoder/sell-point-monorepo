import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../domain/repository/user.repository';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthApiService {
  constructor(private readonly userRepository: UserRepository) {}

  async validate({
    username,
    password,
  }: LoginDto): Promise<{ message: boolean }> {
    const user = await this.userRepository.findUserByUsername(username);
    if (!user) throw new NotFoundException('User not found');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException();
    return { message: isMatch };
  }
}
