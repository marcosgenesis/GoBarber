import { Router } from 'express';
import multer from 'multer';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import CreateUserService from '@modules/users/services/CreateUserService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import uploadConfig from '@config/upload';

const upload = multer(uploadConfig);
const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateAvatarUser = new UpdateUserAvatarService();
    const user = await updateAvatarUser.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });
    delete user.password;
    return response.json(user);
  },
);
export default usersRouter;
