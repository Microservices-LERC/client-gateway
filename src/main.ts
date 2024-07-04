import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common/exceptions/rpc-custom-exception.filter';

async function bootstrap() {

  const logger = new Logger('Main-Gateway');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', {
    exclude: [{
      path: '',
      method: RequestMethod.GET
    }]
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  )
  app.useGlobalFilters(new RpcCustomExceptionFilter())
  await app.listen(envs.port);
  
  logger.log(`Server running on http://localhost:${envs.port}`);
}
bootstrap();
