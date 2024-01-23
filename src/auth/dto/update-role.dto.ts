import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from 'src/shared/enums/user-roles.enum';

export class UpdateRoleDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'roles of user' })
  roles: UserRoles[];
}
