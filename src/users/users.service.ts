import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MongoRepository } from 'typeorm';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UserRoles } from 'src/shared/enums/user-roles.enum';
import { UpdateRoleDto } from 'src/auth/dto/update-role.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: MongoRepository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: {
        username,
      },
    });
  }

  async save(createUserDto: CreateUserDto): Promise<User | undefined> {
    const userObj = { ...createUserDto, roles: [UserRoles.Guest] };
    return this.usersRepository.save(userObj);
  }

  async updateRole(
    id: string,
    updateRoleDto: UpdateRoleDto,
  ): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { _id: new ObjectId(id) },
    });

    if (!user) {
      throw new NotFoundException(`user not found`);
    }

    const userObj = { ...user, roles: updateRoleDto.roles };

    return this.usersRepository.save(userObj);
  }
}
