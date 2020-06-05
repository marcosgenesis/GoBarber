import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let authenticateUser: AuthenticateUserService;
describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    await createUserService.execute({
      name: 'Jhon Doe',
      email: 'jhongmail.com',
      password: '123456',
    });
    const response = await authenticateUser.execute({
      email: 'jhongmail.com',
      password: '123456',
    });

    await expect(response).toHaveProperty('token');
  });
  it('should not be able to authenticate with not existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'jhongmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to authenticate with wrong password', async () => {
    await createUserService.execute({
      name: 'Jhon Doe',
      email: 'jhongmail.com',
      password: '123456',
    });

    expect(
      authenticateUser.execute({
        email: 'jhongmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
