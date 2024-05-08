import { Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export abstract class EntityBase {
  @PrimaryGeneratedColumn()
  id: number;
}
