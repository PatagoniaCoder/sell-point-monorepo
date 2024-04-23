import * as bcrypt from 'bcrypt';
import { UserEntity } from 'apps/auth-api/src/domain/entities/user.entity';
import { UserRepository } from 'apps/auth-api/src/domain/repository/user.repository';

export class DummyDBService implements UserRepository {
  private readonly users: {
    uuid: string;
    email: string;
    name: string;
    username: string;
    password: string;
    plainPassword?: string;
  }[] = [
    {
      uuid: '1',
      email: 'some@email.com',
      name: 'john',
      username: 'john',
      password: '$2b$10$2xF/8BaDvJZUfh9508ZBK.z0CkSBnQD1oUIM/CSop6/AzZcuTNOha',
      plainPassword: 'change',
    },
    {
      uuid: '2',
      email: 'other@email.com',
      name: 'maria',
      username: 'maria',
      password: '$2b$10$2ATVchGmszgaoN1DqGiy8e3uhwYq6QijbOvnSAmHJCu35CLoHpESK',
      plainPassword: 'guess',
    },
  ];

  async createUser(user: UserEntity): Promise<UserEntity> {
    const pass = await bcrypt.hash(user.password, 10);
    user.password = pass;
    return await new Promise((resolve) => {
      setTimeout(() => {
        this.users.push(user);
        resolve(user);
      }, 300);
    });
  }

  async findUserByUsername(username: string): Promise<UserEntity> {
    return await new Promise((resolve) => {
      setTimeout(() => {
        const user = this.users.find((user) => user.username === username);
        resolve(user);
      }, 300);
    });
  }
}
