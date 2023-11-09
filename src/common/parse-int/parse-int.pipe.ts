import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string) {
    const newValue = parseInt(value, 10);
    if (isNaN(newValue)) {
      throw new BadRequestException(`${value} is not a number`);
    }
    return value;
  }
}
