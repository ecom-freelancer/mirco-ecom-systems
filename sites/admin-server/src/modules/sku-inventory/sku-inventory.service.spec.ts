import { Test, TestingModule } from '@nestjs/testing';
import { SkuInventoryService } from './sku-inventory.service';

describe('SkuInventoryService', () => {
  let service: SkuInventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkuInventoryService],
    }).compile();

    service = module.get<SkuInventoryService>(SkuInventoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
