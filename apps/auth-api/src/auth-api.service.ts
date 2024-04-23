import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthApiService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'change',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async validate({
    username,
    password,
  }: LoginDto): Promise<{ message: boolean }> {
    const user = this.users.find((user) => user.username === username);
    if (!user) throw new NotFoundException('User not found');
    const pass = await bcrypt.hash(user.password, 10); //delete on db
    const isMatch = await bcrypt.compare(password, pass);
    if (!isMatch) throw new UnauthorizedException();
    return { message: isMatch };
  }
}
