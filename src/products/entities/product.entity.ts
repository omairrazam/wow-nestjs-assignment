import { Column, Entity, ObjectIdColumn, ObjectId Index } from 'typeorm';
import { Exclude, instanceToPlain, Expose, Transform} from 'class-transformer';

@Entity()
export class Product {
  @ObjectIdColumn()
  id: string;

  @Column()
  @Index({ unique: true })
  sku: string;

  @Column()
  name: string;

  @Column()
  description: string;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}

export function productInstanceToPlain(product: Product) {
  return instanceToPlain(product, { excludePrefixes: [''] });
}
