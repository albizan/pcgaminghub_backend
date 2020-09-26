import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Item } from "./Item";

@Entity()
export class Build {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true, type: "real" })
  price: number;

  @Column({ default: "https://i.ytimg.com/vi/DDhmv2uX2Rs/maxresdefault.jpg" })
  imageUrl: string;

  @Column({ unique: true })
  name: string;

  @Column()
  cpuBrand: string;

  @Column()
  gpuBrand: string;

  @Column({ nullable: true })
  subTitle: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: "" })
  date: string;

  @ManyToMany((type) => Item)
  @JoinTable({ name: "build_item" })
  items: Item[];
}
