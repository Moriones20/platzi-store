import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { ProductsModule } from '@/modules/products/products.module';
import { UsersModule } from '@/modules/users/users.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    HttpModule,
    ProductsModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'DATA',
      useFactory: async (http: HttpService) => {
        const response = http.get('https://jsonplaceholder.typicode.com/todos');
        const { data } = await lastValueFrom(response);
        return data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
