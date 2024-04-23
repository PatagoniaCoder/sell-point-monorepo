import { v4 as uuid } from 'uuid';
import { UserEntity } from '../entities/user.entity';

export class VUser implements UserEntity {
  uuid: string;
  name: string;
  email: string;
  username: string;
  password: string;

  constructor(name: string, email: string, username: string, password: string) {
    this.name = name;
    this.email = email;
    this.username = username;
    this.password = password;
    this.uuid = uuid();
  }
}
