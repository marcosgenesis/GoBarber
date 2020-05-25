import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
  token: string;
}
class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({ where: { email } });

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
