import { Accesspoint } from 'src/accesspoints/entities/accesspoint.entity';
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
export class Apmetric {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Accesspoint, (accesspoint) => accesspoint.apmetrics)
  @JoinColumn({ name: 'accesspoint_id' })
  accesspoint: Accesspoint;

  @Column()
  timeStamp: Date;

  @Column({ type: 'decimal' })
  bandwithUsage: number;

  @Column({ type: 'decimal' })
  signalStrength: number;

  @Column({ type: 'decimal' })
  interferenceLevel: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
