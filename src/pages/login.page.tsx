import { useForm, zodResolver } from '@mantine/form';
import {
  Button,
  Center,
  Container,
  Image,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { loginDto, LoginDto } from '../dtos/auth.dto';
import { assets } from '../assets';
import { useLogin } from '../api/mutations/auth.mutations';
import { primaryColor } from '../app';

export default function LoginPage() {
  const form = useForm<LoginDto>({
    initialValues: {
      username: '',
      password: '',
    },
    validate: zodResolver(loginDto),
  });
  const { mutate, isPending } = useLogin();

  const onSubmit = (values: LoginDto) => {
    mutate(values);
  };

  return (
    <Container size='xs'>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Center h='100vh'>
          <Stack w='100%'>
            <Title c={primaryColor} fz={60} ta='center'>
              Hesabınıza Daxil Olun
            </Title>
            <Image mb={25} mx='auto' src={assets.icons.awardsTextColored} w={120} />
            <TextInput
              label='İstifadəçi adı'
              placeholder='Sizə verilən adı daxil edin'
              {...form.getInputProps('username')}
            />
            <PasswordInput
              label='Şifrə'
              placeholder='Sizə verilən şifrəni daxil edin'
              {...form.getInputProps('password')}
            />

            <Button loading={isPending} type='submit'>
              Daxil Ol
            </Button>
          </Stack>
        </Center>
      </form>
    </Container>
  );
}
