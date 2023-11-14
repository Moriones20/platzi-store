import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getHello(): string {
    return `<p>This is api key: ${this.configService.apiKey}</p>
    <p>This is the database: ${this.configService.database.name}</p>
    <p>This is the port: ${this.configService.database.port}</p>`;
  }
}
