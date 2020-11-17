import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Item {
  @PrimaryColumn()
  asin: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  label: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  type: string;

  @Column({ default: false })
  watched: boolean;

  @Column({ default: "" })
  time: string;

  @Column({ nullable: true, type: "real" })
  suggestedPrice: number;

  @Column({ nullable: true, type: "real" })
  price: number;

  @Column({ nullable: true, type: "real" })
  warehousePrice: number;

  @Column({ nullable: true, type: "real" })
  average: number;

  @Column({ nullable: true, type: "real" })
  warehouseAverage: number;

  @Column({ default: 0 })
  iterations: number;
}
