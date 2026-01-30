import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuración CORS
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
    credentials: true, 
  });

  // Middleware para validar API Key
  app.use((req, res, next) => {

    if (req.method === 'OPTIONS') {
      return next();
    }

    const apiKey = req.headers['x-api-key'];
    if (apiKey !== process.env.API_KEY) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
