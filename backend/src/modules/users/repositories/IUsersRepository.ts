import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTo';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(user_id: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}
