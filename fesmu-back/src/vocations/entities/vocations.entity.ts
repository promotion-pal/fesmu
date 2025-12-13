import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'vocations' })
export class VocationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'floor_number' })
  floorNumber: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ nullable: true })
  patronymic: string;

  @Column()
  room: string;

  @Column({ name: 'arrival_date' })
  arrivalDate: Date;

  @Column({ name: 'departure_date' })
  departureDate: Date;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}

// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   CreateDateColumn,
// } from 'typeorm';

// @Entity({ name: 'vocations' })
// export class VocationEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   floor_number: number;

//   @Column()
//   first_name: string;

//   @Column()
//   last_name: string;

//   @Column({ nullable: true })
//   patronymic: string;

//   @Column()
//   room: string;

//   @Column()
//   arrivalDate: Date;

//   @Column()
//   departureDate: Date;

//   @CreateDateColumn({
//     type: 'timestamp',
//     name: 'created_at',
//     default: () => 'CURRENT_TIMESTAMP',
//   })
//   createdAt: Date;
// }
