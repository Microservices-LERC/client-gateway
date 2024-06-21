import { Controller, Get, Post, Body, Patch, Param, Inject, ParseUUIDPipe, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE, ORDERS_SERVICE } from 'src/config/services';
import { CreateOrderDto } from './dto/create-order.dto';
import { firstValueFrom } from 'rxjs';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { StatusDto } from './dto/status.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send({cmd: 'create-order'}, createOrderDto)
  }

  @Get()
  async findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    try {
      const order = await firstValueFrom(this.client.send({cmd: 'get-orders'}, orderPaginationDto))
      return order
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(this.client.send({cmd: 'get-order'}, id))
      return order
    } catch (error) {
      throw new RpcException(error)
    }
  }


  @Get(':status')
  async findByAllStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto
  ) {
    try {
      return this.client.send({cmd: 'get-orders'}, {...paginationDto, status: statusDto.status})

    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Patch(':id')
  async updateOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto
  ){
    try {
      return this.client.send({cmd: 'update-order-status'}, {id, status: statusDto.status})
    } catch (error) {
      throw new RpcException(error)
    }
  }
}
