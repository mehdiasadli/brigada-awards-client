import { Button, Stack, TextInput, Title } from '@mantine/core';
import { TUser } from '../../types/models';
import { useUpdateUser } from '../../api/mutations/user.mutations';
import { useForm, zodResolver } from '@mantine/form';
import { updateUserDto, UpdateUserDto } from '../../dtos/user.dto';
import { useModal } from '../../hooks/useModal';
import { primaryColor } from '../../app';

export interface UpdateUserModalProps {
  user: TUser;
}

export default function UpdateUserModal({ user }: UpdateUserModalProps) {
  const modal = useModal();
  const form = useForm<UpdateUserDto>({
    initialValues: {
      name: user.name,
      image: user.image ?? '',
      username: user.username,
    },
    validate: zodResolver(updateUserDto),
    transformValues(values) {
      return {
        ...values,
        username: values.username === user.username ? undefined : values.username,
        image: values.image || null,
      };
    },
  });
  const { mutate, isPending } = useUpdateUser();

  const onSubmit = (values: UpdateUserDto) => {
    mutate(
      {
        data: values,
        id: user.id,
      },
      {
        onSuccess() {
          modal.close('UPDATE_USER_MODAL');
        },
      }
    );
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <Title c={primaryColor} order={4} ta='center'>
          Update information of {user.name}
        </Title>
        <TextInput
          label='Username'
          placeholder="Enter user's username"
          {...form.getInputProps('username')}
        />
        <TextInput label='Name' placeholder="Enter user's name" {...form.getInputProps('name')} />
        <TextInput
          label='Image'
          placeholder="Enter the url of the user's image"
          {...form.getInputProps('image')}
        />

        <Button loading={isPending} disabled={!form.isDirty()} type='submit'>
          Update
        </Button>
      </Stack>
    </form>
  );
}
