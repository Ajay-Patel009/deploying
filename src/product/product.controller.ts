import { Controller, Post, Get, Put, Delete, Body, Param, Query, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { FilterProductDTO } from './dto/filter-product.dto';
import { CreateProductDTO } from './dto/create-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { Message } from 'src/utils/decorators/message.decorator';


@ApiTags('Products')
@Controller('store/products')
export class ProductController {
  constructor(private productService: ProductService) { }

  @Get('/')
  async getProducts(@Query() filterProductDTO: FilterProductDTO) {
    if (Object.keys(filterProductDTO).length) {
      const filteredProducts = await this.productService.getFilteredProducts(filterProductDTO);
      return filteredProducts;
    } else {
      const allProducts = await this.productService.getAllProducts();
      return allProducts;
    }
  }

  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    const product = await this.productService.getProduct(id);
    if (!product) throw new NotFoundException('Product does not exist!');
    return product;
  }

  @Post('/')
  @Message('Product added successfully')
  async addProduct(@Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.addProduct(createProductDTO);
    return product;
  }

  @Put('/:id')
  @Message('Product updated successfully')
  async updateProduct(@Param('id') id: string, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.updateProduct(id, createProductDTO);
    if (!product) throw new NotFoundException('Product does not exist!');
    return product;
  }

  @Delete('/:id')
  @Message("product deleted successfully")
  async deleteProduct(@Param('id') id: string) {
    const product = await this.productService.deleteProduct(id);
    if (!product) throw new NotFoundException('Product does not exist');
    return product;
  }
}