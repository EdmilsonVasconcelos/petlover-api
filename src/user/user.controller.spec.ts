import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Test } from '@nestjs/testing';
import { UserIdGuard } from '../guards/user.id.guard';
import { UserResponseDto } from './dto/user.response.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: any;

  beforeEach(async () => {
    service = { findAll: jest.fn() };

    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            upsert: jest.fn().mockResolvedValue({}),
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    })
      .overrideGuard(UserIdGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = moduleRef.get<UserController>(UserController);
    service = moduleRef.get<UserService>(UserService);
  });

  function createMockUser() {
    const dateNow = new Date();

    const user = new User();
    user.id = 1;
    user.name = 'John Doe';
    user.email = 'someemail@gmail.com';
    user.password = 'password';
    user.createdAt = dateNow;
    user.updateAt = dateNow;
    return user;
  }

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const users: User[] = [createMockUser()];

      const responseExpected: UserResponseDto[] =
        UserResponseDto.toListDto(users);

      service.findAll.mockResolvedValue(users);

      const response = await controller.findAll();

      expect(response).toStrictEqual(responseExpected);
    });
  });
});
