import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { NatsModule } from './nats/nats.module';
import { HealthCheckModule } from './health-check/health-check.module';

@Module({
  imports: [ProductsModule, OrdersModule, NatsModule, HealthCheckModule],
})
export class AppModule {}
