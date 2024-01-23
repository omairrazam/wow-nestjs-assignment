import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from '../decorators/roles.decorator';
import { UserRoles } from '../shared/enums/user-roles.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Add this import
import { AuthorizationGuard } from '../auth/authorization.guard';

@Controller('products')
@UseGuards(JwtAuthGuard, AuthorizationGuard) // Use JwtAuthGuard here
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles(UserRoles.Admin)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRoles.Admin)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @Roles(UserRoles.Admin)
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
