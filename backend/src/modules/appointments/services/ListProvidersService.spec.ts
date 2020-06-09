import 'reflect-metadata';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;
describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });
  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Jhon doe',
      email: 'jhon@gmail.com',
      password: '123456',
    });
    const user2 = await fakeUsersRepository.create({
      name: 'Jhon tre',
      email: 'jhontre@gmail.com',
      password: '123456534',
    });
    const loggedUser = await fakeUsersRepository.create({
      name: 'Jhon qua',
      email: 'jhonfor@gmail.com',
      password: '123456345435',
    });
    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });
    expect(providers).toEqual([user1, user2]);
  });
});
