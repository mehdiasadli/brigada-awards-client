import { useForm, zodResolver } from '@mantine/form';
import { useModal } from '../../hooks/useModal';
import { createAwardDto, CreateAwardDto } from '../../dtos/award.dto';
import { useCreateAward } from '../../api/mutations/award.mutations';
import { Button, FocusTrap, Stack, Switch, TextInput, Title } from '@mantine/core';
import { primaryColor } from '../../app';

export default function CreateAwardModal() {
  const modal = useModal();
  const form = useForm<CreateAwardDto>({
    initialValues: {
      name: '',
    },
    validate: zodResolver(createAwardDto),
  });
  const { mutate, isPending } = useCreateAward();

  const onSubmit = (values: CreateAwardDto) => {
    mutate(values, {
      onSuccess() {
        modal.close('CREATE_AWARD_MODAL');
      },
    });
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <FocusTrap.InitialFocus />
        <Title c={primaryColor} order={4} ta='center'>
          Create Award
        </Title>
        <TextInput label='Name' placeholder="Enter award's name" {...form.getInputProps('name')} />
        <TextInput
          label='Description'
          placeholder="Enter award's description"
          {...form.getInputProps('description')}
        />
        <Switch
          label='Is it a negative award'
          {...form.getInputProps('isNegative', { type: 'checkbox' })}
        />

        <Button loading={isPending} type='submit'>
          Create
        </Button>
      </Stack>
    </form>
  );
}
