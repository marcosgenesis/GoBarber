import 'reflect-metadata';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;
describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });
  it('should be able to upload a avatar file', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon doe',
      email: 'jhon@gmail.com',
      password: '123456',
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    await expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to upload a avatar file without been authenticated', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'nox-existing-user',
        avatarFileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delet old avatar when updating new one', async () => {
    // espiona a função e podemos verificar se a função foi chamada ou não
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'Jhon doe',
      email: 'jhon@gmail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg',
    });
    // expera que a função tenha sido chamada com o argumento do arquivo anterior
    await expect(deleteFile).toBeCalledWith('avatar.jpg');
    await expect(user.avatar).toBe('avatar2.jpg');
  });
});
