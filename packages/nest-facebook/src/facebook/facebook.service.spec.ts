import { Test, TestingModule } from '@nestjs/testing';
import { FacebookStrategy } from './facebook.strategy';

describe('FacebookStrategy', () => {
  let service: FacebookStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacebookStrategy],
    }).compile();

    service = module.get<FacebookStrategy>(FacebookStrategy);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
