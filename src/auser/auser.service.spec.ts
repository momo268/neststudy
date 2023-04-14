import { Test, TestingModule } from '@nestjs/testing';
import { AuserService } from './auser.service';

describe('AuserService', () => {
  let service: AuserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuserService],
    }).compile();

    service = module.get<AuserService>(AuserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
