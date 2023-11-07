import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('new-enpoint')
  newEnpoint() {
    return `Nuevo endpoint`;
  }

  @Get('products/:productId')
  getProduct(@Param('productId') productiId: string) {
    return `product #${productiId}`;
  }

  @Get('categories/:id/products/:productId')
  getCategory(@Param('productId') productId: string, @Param('id') id: string) {
    return `product #${productId} of category #${id}`;
  }
}
