import { UserEntity } from '../entities/user.entity';

export interface UserRepository {
  createUser(user: UserEntity): Promise<UserEntity>;
  findUserByUsername(uuid: string): Promise<UserEntity>;
}
