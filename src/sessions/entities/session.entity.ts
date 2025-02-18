import { Accesspoint } from 'src/accesspoints/entities/accesspoint.entity';
import { Device } from 'src/devices/entities/device.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Device, (device) => device.sessions)
  @JoinColumn({ name: 'device_id' })
  device: Device;

  @ManyToOne(() => Accesspoint, (accesspoint) => accesspoint.sessions)
  @JoinColumn({ name: 'accesspoint_id' })
  accesspoint: Accesspoint;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column({ type: 'decimal' })
  bandwithUsed: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
