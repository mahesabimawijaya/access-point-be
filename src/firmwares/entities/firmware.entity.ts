import { Accesspoint } from 'src/accesspoints/entities/accesspoint.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Firmware {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Accesspoint, (accesspoint) => accesspoint.firmware)
  accesspoints: Accesspoint[];

  @Column()
  version: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
