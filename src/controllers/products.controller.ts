import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProduct(@Param('productId') productiId: string) {
    return `product #${productiId}`;
  }

  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return `products limit => ${limit}, offset => ${offset}, brand => ${brand}`;
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'create action',
      data: payload,
    };
  }

  @Put(':id')
  update(@Param(':id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return id;
  }
}
