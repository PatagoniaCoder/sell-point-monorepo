import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  abstract createUser(user: UserEntity): Promise<UserEntity>;
  abstract findUserByUsername(uuid: string): Promise<UserEntity>;
}
