import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Product {
  @ObjectIdColumn()
  id: number;

  @Column()
  name: string;
}
