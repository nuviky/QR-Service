import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { PrismaService } from './config/db/prisma.service';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors();
	app.setGlobalPrefix('api');

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true
		})
	);
	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

	const prismaService = app.get(PrismaService);
	await prismaService.enableShutdownHooks(app);

	await app.listen(process.env.PORT);
}

bootstrap();
