import { Accesspoint } from 'src/accesspoints/entities/accesspoint.entity';
import { Device } from 'src/devices/entities/device.entity';
import { User } from 'src/users/entities/user.entity';
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
export class Log {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Accesspoint, (accesspoint) => accesspoint.logs)
  @JoinColumn({ name: 'accesspoint_id' })
  accesspoint: Accesspoint;

  @ManyToOne(() => Device, (device) => device.logs)
  @JoinColumn({ name: 'device_id' })
  device: Device;

  @ManyToOne(() => User, (user) => user.logs)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  eventType: string;

  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
