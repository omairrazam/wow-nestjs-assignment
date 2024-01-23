import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Product } from './entities/product.entity';
import { productInstanceToPlain } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: MongoRepository<Product>,
  ) {}

  // Create a product
  create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  // Find all products
  async findAll() {
    const products = await this.productsRepository.find();
    return products.map((product: Product) => productInstanceToPlain(product));
  }

  // Find one product by SKU
  async findOne(sku: string) {
    const product = await this.productsRepository.findOne({
      where: { sku: sku },
    });
    return product ? productInstanceToPlain(product) : undefined;
  }

  // Update a product
  async update(sku: string, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.findOne({
      where: { sku: sku },
    });
    if (!product) {
      throw new NotFoundException(`Product with SKU ${sku} not found`);
    }
    Object.assign(product, updateProductDto); // Update product properties
    return this.productsRepository.save(product);
  }

  // Remove a product
  async remove(sku: string) {
    const deleted = await this.productsRepository.delete({ sku });
    if (!deleted) {
      throw new NotFoundException(`Product with SKU "${sku}" not found.`);
    }
  }
}
