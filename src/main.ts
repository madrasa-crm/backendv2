import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './exceptions/exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['warn', 'error'],
    });

    app.enableCors();
    app.setGlobalPrefix('/api');
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    );

    const configService = app.get(ConfigService);
    const PORT = configService.get('PORT') || 3000;
    const HOST = configService.get('HOST') || 'localhost';

    await app.listen(PORT, () =>
        console.log(`Server running on http://${HOST}:${PORT} 🚀`),
    );
}
bootstrap();
