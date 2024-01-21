import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Name of product' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Description of product' })
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Unique identifier of product' })
  sku: string;
}
