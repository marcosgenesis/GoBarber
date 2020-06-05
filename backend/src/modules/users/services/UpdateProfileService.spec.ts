import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon doe',
      email: 'jhon@gmail.com',
      password: '123456',
    });
    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Jhon Tre',
      email: 'jhontre@gmail.com',
    });
    expect(updatedUser.name).toBe('Jhon Tre');
    expect(updatedUser.email).toBe('jhontre@gmail.com');
  });
  it('should not be able to update the non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existing-user',
        name: 'Jhon Tre',
        email: 'jhontre@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Jhon doe',
      email: 'jhon@gmail.com',
      password: '123456',
    });
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@gmail.com',
      password: '123456',
    });
    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Jhon Doe',
        email: 'jhon@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon doe',
      email: 'jhon@gmail.com',
      password: '123456',
    });
    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Jhon Tre',
      email: 'jhontre@gmail.com',
      password: '123123',
      old_password: '123456',
    });
    expect(updatedUser.password).toBe('123123');
  });
  it('should not be able to update the password without the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon doe',
      email: 'jhon@gmail.com',
      password: '123456',
    });
    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Jhon Tre',
        email: 'jhontre@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon doe',
      email: 'jhon@gmail.com',
      password: '123456',
    });
    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Jhon Tre',
        email: 'jhontre@gmail.com',
        password: '123123',
        old_password: 'wrong-old-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
