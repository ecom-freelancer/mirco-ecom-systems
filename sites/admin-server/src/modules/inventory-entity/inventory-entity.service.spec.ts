import { Test, TestingModule } from '@nestjs/testing';
import { InventoryEntityService } from './inventory-entity.service';

describe('InventoryEntityService', () => {
  let service: InventoryEntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryEntityService],
    }).compile();

    service = module.get<InventoryEntityService>(InventoryEntityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
