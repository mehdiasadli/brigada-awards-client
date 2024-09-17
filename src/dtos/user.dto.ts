import { z } from 'zod';
import { imageDto, nameDto, passwordDto, usernameDto } from './common.dto';

export const createUserDto = z.object({
  username: usernameDto.min(1, 'Username is required'),
  password: passwordDto.min(1, 'Password is required'),
  name: nameDto().min(1, 'Name is required'),
  image: imageDto('Invalid profile picture').nullable().optional(),
});

export const updateUserDto = createUserDto.partial().omit({
  password: true,
});

export const usernameParamDto = createUserDto.pick({
  username: true,
});

export type CreateUserDto = z.infer<typeof createUserDto>;
export type UpdateUserDto = z.infer<typeof updateUserDto>;
export type UsernameParamDto = z.infer<typeof usernameParamDto>;
