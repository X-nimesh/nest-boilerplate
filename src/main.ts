import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
config();
const PORT = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  //   swagger
  if (process.env.NODE_ENV === 'development') {
    //  Swagger intialization
    // app.setGlobalPrefix(process.env.BASE_PATH || '/');
    const config = new DocumentBuilder()
      .setTitle('BoilerPlate Nest JS')
      .setDescription('Boiler plate for the nest js')
      .addBearerAuth()
      .setExternalDoc('Postman Collection', '/docs-json')
      .setVersion('beta')
      .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document);

    // resetting global prefix
    // app.setGlobalPrefix('/');
  }
  await app.listen(PORT);
}
bootstrap().then(() => {
  console.log(`|--------Server is running on port ${PORT}--------|`);
});
