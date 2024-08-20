import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  userId: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
