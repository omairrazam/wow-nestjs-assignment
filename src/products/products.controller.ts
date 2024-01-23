import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  Logger
  // CanActivate,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from '../decorators/roles.decorator';
import { UserRoles } from '../shared/enums/user-roles.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  private readonly logger = new Logger('ProductsController');
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles(UserRoles.Admin)
  @UseGuards(AuthorizationGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Roles(UserRoles.Admin, UserRoles.Guest)
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':sku')
  findOne(@Param('sku') sku: string) {
    const product = this.productsService.findOne(sku);
    if (!product) {
      throw new NotFoundException(`Product with SKU "${sku}" not found.`);
    }
    return product;
  }

  @Patch(':sku')
  @Roles(UserRoles.Admin)
  @UseGuards(AuthorizationGuard)
  update(
    @Param('sku') sku: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    this.logger.log(`Inside product update for ${sku}`);
    return this.productsService.update(sku, updateProductDto);
  }

  @Delete(':sku')
  @Roles(UserRoles.Admin)
  remove(@Param('sku') sku: string) {
    return this.productsService.remove(sku);
  }
}
