import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/services';
import { envs } from 'src/config/envs';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  imports: [
    NatsModule
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
