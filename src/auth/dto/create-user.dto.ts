import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'username of user' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'password of user' })
  password: string;
}
