import { z } from 'zod';
import { passwordBaseDto, usernameBaseDto } from './common.dto';

export const loginDto = z.object({
  username: usernameBaseDto.min(1, 'İstifadəçi adınızı daxil edin'),
  password: passwordBaseDto.min(1, 'Şifrənizi daxil edin'),
});

export type LoginDto = z.infer<typeof loginDto>;
