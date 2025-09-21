import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'floors' })
export class FloorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @Column({ nullable: true })
  elder: string;
}
