import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'duty' })
export class DutyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  user_id: number;

  @Column()
  floor_id: number;
}
