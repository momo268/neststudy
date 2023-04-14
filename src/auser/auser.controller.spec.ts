import { Test, TestingModule } from '@nestjs/testing';
import { AuserController } from './auser.controller';
import { AuserService } from './auser.service';

describe('AuserController', () => {
  let controller: AuserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuserController],
      providers: [AuserService],
    }).compile();

    controller = module.get<AuserController>(AuserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
