import { useForm, zodResolver } from '@mantine/form';
import { createUserDto, CreateUserDto } from '../../dtos/user.dto';
import { useModal } from '../../hooks/useModal';
import { useCreateUser } from '../../api/mutations/user.mutations';
import { Button, FocusTrap, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { primaryColor } from '../../app';

export default function CreateUserModal() {
  const modal = useModal();
  const form = useForm<CreateUserDto>({
    initialValues: {
      name: '',
      image: null,
      password: '',
      username: '',
    },
    validate: zodResolver(createUserDto),
  });
  const { mutate, isPending } = useCreateUser();

  const onSubmit = (values: CreateUserDto) => {
    mutate(values, {
      onSuccess() {
        modal.close('CREATE_USER_MODAL');
      },
    });
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <FocusTrap.InitialFocus />
        <Title c={primaryColor} order={4} ta='center'>
          Create User
        </Title>
        <TextInput
          label='Username'
          placeholder="Enter user's username"
          {...form.getInputProps('username')}
        />
        <TextInput label='Name' placeholder="Enter user's name" {...form.getInputProps('name')} />
        <PasswordInput
          label='Password'
          placeholder='Enter your password'
          {...form.getInputProps('password')}
        />
        <TextInput
          label='Image'
          placeholder="Enter the url of the user's image"
          {...form.getInputProps('image')}
        />

        <Button loading={isPending} type='submit'>
          Create
        </Button>
      </Stack>
    </form>
  );
}
