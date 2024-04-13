import { Test, TestingModule } from '@nestjs/testing';
import { InventoryEntityController } from './inventory-entity.controller';

describe('InventoryEntityController', () => {
  let controller: InventoryEntityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryEntityController],
    }).compile();

    controller = module.get<InventoryEntityController>(InventoryEntityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
