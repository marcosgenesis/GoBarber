import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: User;
  token: string;
}
class AuthenticateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('Incorrect email/password combination', 401);

    const passwordMateched = await compare(password, user.password);
    if (!passwordMateched)
      throw new AppError('Incorrect email/password combination', 401);

    const token = sign({}, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
      subject: user.id,
    });
    return { user, token };
  }
}
export default AuthenticateUserService;
