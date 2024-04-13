import { Test, TestingModule } from '@nestjs/testing';
import { SkuInventoryController } from './sku-inventory.controller';

describe('SkuInventoryController', () => {
  let controller: SkuInventoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkuInventoryController],
    }).compile();

    controller = module.get<SkuInventoryController>(SkuInventoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
