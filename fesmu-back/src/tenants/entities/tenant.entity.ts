import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum TenantFaculty {
  PEDIATRIC = 'pediatric',
  MEDICAL = 'medical',
  DENTAL = 'dental',
  PHARMACEUTICAL = 'pharmaceutical',
}

@Entity({ name: 'tenants' })
export class TenantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  patronymic: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  room: number;

  @Column()
  group: number;

  @Column({
    type: 'enum',
    enum: TenantFaculty,
    default: TenantFaculty.PEDIATRIC,
  })
  faculty: TenantFaculty;
}
