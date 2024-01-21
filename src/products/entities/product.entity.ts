import { Column, Entity, ObjectIdColumn, Index } from 'typeorm';

@Entity()
export class Product {
  @ObjectIdColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  sku: string;

  @Column()
  name: string;

  @Column()
  description: string;
}
