import { Apmetric } from 'src/apmetrics/entities/apmetric.entity';
import { Firmware } from 'src/firmwares/entities/firmware.entity';
import { Log } from 'src/logs/entities/log.entity';
import { Session } from 'src/sessions/entities/session.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Accesspoint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Firmware, (firmware) => firmware.accesspoints)
  @JoinColumn({ name: 'firmware_id' })
  firmware: Firmware;

  @OneToMany(() => Session, (session) => session.accesspoint)
  sessions: Session[];

  @OneToMany(() => Apmetric, (apmetric) => apmetric.accesspoint)
  apmetrics: Apmetric[];

  @OneToMany(() => Log, (log) => log.accesspoint)
  logs: Log[];

  @Column()
  name: string;

  @Column()
  status: string;

  @Column()
  location: string;

  @Column({ type: 'decimal' })
  temperature: number;

  @Column()
  powerStatus: string;

  @Column()
  ssid: string;

  @Column()
  vlan: string;

  @Column()
  accessPolicy: string;

  @Column()
  lastCheck: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
