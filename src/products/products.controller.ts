import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PRODUCT_SERVICE } from 'src/config/services';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send({cmd: 'create-product'}, createProductDto)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      )
  }

  @Get()
  getAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({cmd: 'get-products'}, paginationDto)
  }

  @Get(':id')
  async getProduct(@Param('id') id: string){
    return this.productsClient.send({cmd: 'get-product'}, {id})
      .pipe(
        catchError(error => { throw new RpcException(error) })
      )
    // try {
    //   const product = await firstValueFrom(this.productsClient.send({cmd: 'get-product'}, {id}))
    //   return product;
    // } catch (error) {
    //   throw new RpcException(error)
    // }
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto){
    return this.productsClient.send({cmd: 'update-product'}, {id: +id, ...updateProductDto})
      .pipe(
        catchError(error => { throw new RpcException(error) })
      )
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string){
    return this.productsClient.send({cmd: 'delete-product'}, {id: +id})
      .pipe(
        catchError(error => { throw new RpcException(error) })
      )
  }

}
