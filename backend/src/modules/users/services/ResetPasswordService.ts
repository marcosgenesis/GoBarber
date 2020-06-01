// import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import IHashProvider from '../providers/models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}
@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserToken')
    private userTokensRepository: IUserTokenRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) throw new AppError('user does not exists.');
    const user = await this.usersRepository.findById(userToken.user_id);
    if (!user) throw new AppError('user does not exists.');

    user.password = await this.hashProvider.generateHash(password);
    await this.usersRepository.save(user);
  }
}
export default ResetPasswordService;
