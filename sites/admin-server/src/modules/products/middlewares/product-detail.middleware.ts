import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { ProductService } from '../services/product.service';
import { isNumber } from 'class-validator';

@Injectable()
export class ProductDetailMiddleware implements NestMiddleware {
  constructor(private readonly productService: ProductService) {}

  async use(req: Request, _, next: NextFunction) {
    const productId = req.params['productId'];

    if (isNumber(productId)) {
      throw new BadRequestException('Product id must be a number');
    }

    const productIsExits = await this.productService.isExitProductById(
      Number(productId),
    );

    if (!productIsExits) {
      throw new BadRequestException('Product not found');
    }

    next();
  }
}
