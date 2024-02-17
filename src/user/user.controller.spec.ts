import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Test } from '@nestjs/testing';
import { UserIdGuard } from '../guards/user.id.guard';
import { UserResponseDto } from './dto/user.response.dto';
import { UserUpsertDto } from './dto/user.upsert.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
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
    }).compile();

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

  describe('Get', () => {
    describe('findAll', () => {
      it('should return an array of users', async () => {
        const users: User[] = [createMockUser()];

        const responseExpected: UserResponseDto[] =
          UserResponseDto.toListDto(users);

        jest.spyOn(service, 'findAll').mockResolvedValue(users);

        const response = await controller.findAll();

        expect(response).toStrictEqual(responseExpected);
      });
    });

    describe('findById', () => {
      it('should return searched user', async () => {
        const user = createMockUser();

        jest.spyOn(service, 'findOne').mockResolvedValue(user);

        const response = await controller.findById('someId');

        expect(response).toStrictEqual(UserResponseDto.toDto(user));
      });
    });
  });

  describe('Post', () => {
    it('should create a user', async () => {
      const user = createMockUser();

      jest.spyOn(service, 'upsert').mockResolvedValue(user);

      const response = await controller.save({} as UserUpsertDto);

      expect(response).toStrictEqual(UserResponseDto.toDto(user));
    });
  });

  describe('Put', () => {
    it('should update a user', async () => {
      const user = createMockUser();

      jest.spyOn(service, 'upsert').mockResolvedValue(user);

      const response = await controller.update({} as UserUpsertDto);

      expect(response).toStrictEqual(UserResponseDto.toDto(user));
    });
  });

  describe('Delete', () => {
    it('should delete a user', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue();

      await controller.remove('someId');

      expect(service.remove).toHaveBeenCalledWith('someId');
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });
});
