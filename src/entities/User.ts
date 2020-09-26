import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  username: string;

  @Column()
  password: string;

  @Column()
  role: string;
}
