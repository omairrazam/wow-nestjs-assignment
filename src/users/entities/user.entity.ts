import { Column, Entity, ObjectIdColumn, Index } from 'typeorm';
import { Exclude, instanceToPlain, Expose, Transform} from 'class-transformer';
import { UserRoles } from 'src/shared/enums/user-roles.enum';

@Entity()
export class User {
  @ObjectIdColumn()
  id: string;

  @Column()
  @Index({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column('enum', { enum: UserRoles, array: true })
  roles: UserRoles[] = [];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

export function productInstanceToPlain(user: User) {
  return instanceToPlain(user);
}
