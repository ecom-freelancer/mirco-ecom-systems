import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { isNumber } from 'class-validator';
import { ProductService } from '../services/product.service';

export const ROUTE_IS_PROTECTED = 'ROUTE_IS_PROTECTED';

export const ProductProtected = () => UseGuards(ProductGuard);

@Injectable()
export class ProductGuard implements CanActivate {
  constructor(private productService: ProductService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const productId = request.params['productId'];

    if (isNumber(productId)) {
      throw new BadRequestException('Product id must be a number');
    }

    const productIsExits = await this.productService.isExitProductById(
      Number(productId),
    );

    if (!productIsExits) {
      throw new NotFoundException('Product not found');
    }

    return true;
  }
}
