import { Module } from '@nestjs/common';
import { PaypalController } from './paypal.controller';

@Module({
  controllers: [PaypalController]
})
export class PaypalModule {}
