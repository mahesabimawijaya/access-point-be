import { Log } from 'src/logs/entities/log.entity';
import { Session } from 'src/sessions/entities/session.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Session, (session) => session.device)
  sessions: Session[];

  @OneToMany(() => Log, (log) => log.device)
  logs: Log[];

  @Column()
  macAddress: string;

  @Column()
  deviceType: string;
}
