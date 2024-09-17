import { z } from 'zod';

export const idDto = (field: string = 'Id') =>
  z
    .string({
      required_error: field + ' daxil edilməyib',
      invalid_type_error: field + ' tekst formatında olmalıdır',
    })
    .uuid('Invalid ' + field.toLowerCase());

export const usernameBaseDto = z.string({
  required_error: 'İstifadəçi adı daxil edilməyib',
  invalid_type_error: 'İstifadəçi adı tekst formatında olmalıdır',
});

export const usernameDto = usernameBaseDto
  .min(3, 'İstifadəçi adı minimum 3 simvoldan ibarət olmalıdır')
  .max(12, 'İstifadəçi adı maksimum 12 simvoldan ibarət olmalıdır');

export const passwordBaseDto = z.string({
  required_error: 'Şifrə daxil edilməyib',
  invalid_type_error: 'Şifrə tekst formatında olmalıdır',
});

export const passwordDto = passwordBaseDto.min(5, 'Şifrə minimum 5 simvoldan ibarət olmalıdır');

export const nameDto = (field: string = 'Ad') =>
  z
    .string({
      required_error: field + ' daxil edilməyib',
      invalid_type_error: field + ' tekst olmalıdır',
    })
    .min(6, field + ' minimum 6 simvoldan ibarət olmalıdır');

export const idParamDto = (field?: string) =>
  z.object({
    id: idDto(field),
  });

export const imageDto = (message: string = 'Şəkil linkinin formatı yanlışdır') =>
  z
    .string({
      required_error: 'Şəkil linki daxil edilməyib',
      invalid_type_error: 'Şəkil linki tekst olmalıdır',
    })
    .url(message);

export type UsernameBaseDto = z.infer<typeof usernameBaseDto>;
export type UsernameDto = z.infer<typeof usernameDto>;
export type PasswordBaseDto = z.infer<typeof passwordBaseDto>;
export type PasswordDto = z.infer<typeof passwordDto>;
export type NameDto = z.infer<ReturnType<typeof nameDto>>;
export type IdDto = z.infer<ReturnType<typeof idDto>>;
export type IdParamDto = z.infer<ReturnType<typeof idParamDto>>;
export type ImageDto = z.infer<ReturnType<typeof imageDto>>;
