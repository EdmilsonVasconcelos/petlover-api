import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create a user', async () => {
    const user = createMockUser();
    user.id = undefined;

    jest.spyOn(repository, 'save').mockResolvedValue(user);

    const response = await service.upsert(user);

    expect(response).toEqual(user);
  });

  it('should be able to update a user', async () => {
    const user = createMockUser();

    jest.spyOn(repository, 'save').mockResolvedValue(user);

    const response = await service.upsert(user);

    expect(response).toEqual(user);
  });

  it('should be able to find all users', async () => {
    const users: User[] = [createMockUser()];

    jest.spyOn(repository, 'find').mockResolvedValue(users);

    const response = await service.findAll();

    expect(response).toEqual(users);
  });

  it('should throw not found exception when no users are found', async () => {
    jest.spyOn(repository, 'find').mockResolvedValue([]);

    await expect(service.findAll()).rejects.toThrowError('No users found');
  });

  it('should be able to find a user by id', async () => {
    const user = createMockUser();

    jest.spyOn(repository, 'findOne').mockResolvedValue(user);

    const response = await service.findOne('1');

    expect(response).toEqual(user);
  });

  it('should throw not found exception when no user is found by id', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

    await expect(service.findOne('1')).rejects.toThrowError('No users found');
  });

  it('should be able to find a user by email', async () => {
    const user = createMockUser();

    jest.spyOn(repository, 'findOne').mockResolvedValue(user);

    const response = await service.findOneByEmail('someemail@gmail.com');

    expect(response).toEqual(user);
  });

  it('should throw not found exception when no user is found by email', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

    await expect(
      service.findOneByEmail('someemail@gmail.com'),
    ).rejects.toThrowError('No users found for email');
  });
});
