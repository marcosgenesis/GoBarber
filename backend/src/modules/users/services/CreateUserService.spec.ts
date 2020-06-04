import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to create a user', async () => {
    const user = await createUserService.execute({
      name: 'Jhon Doe',
      email: 'jhongmail.com',
      password: '123456',
    });
    await expect(user).toHaveProperty('id');
  });

  it('should not be able to create a neww user with same email from another', async () => {
    await createUserService.execute({
      name: 'Jhon Doe',
      email: 'jhon@gmail.com',
      password: '123456',
    });
    await expect(
      createUserService.execute({
        name: 'Jhon Doe',
        email: 'jhon@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
