import { Entity, PrimaryGeneratedColumn } from 'typeorm';

export abstract class EntityBase {
  @PrimaryGeneratedColumn()
  id: number;
}
