import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session'
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api'); // 设置全局路由前缀
  app.use(session({ secret: "xxxx", rolling: true }))
  app.useGlobalFilters(new HttpExceptionFilter()) // 全局注册过滤器（报错信息）
  app.useGlobalInterceptors(new TransformInterceptor())  //全局拦截器（成功信息）
  const swaggeroption = new DocumentBuilder().setTitle('nest-swaagger').setDescription('nest-api')
    .setVersion('1').addBearerAuth().build()
  const document = SwaggerModule.createDocument(app, swaggeroption)
  SwaggerModule.setup('docs', app, document)
  await app.listen(3000);
}
bootstrap();
