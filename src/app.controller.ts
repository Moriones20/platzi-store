import { Controller, Get, Param, Query } from '@nestjs/common';
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

  @Get('products')
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return `products limit => ${limit}, offset => ${offset}, brand => ${brand}`;
  }

  @Get('categories/:id/products/:productId')
  getCategory(@Param('productId') productId: string, @Param('id') id: string) {
    return `product #${productId} of category #${id}`;
  }
}
