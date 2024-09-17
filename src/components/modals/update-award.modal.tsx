import { useForm, zodResolver } from '@mantine/form';
import { useUpdateAward } from '../../api/mutations/award.mutations';
import { useModal } from '../../hooks/useModal';
import { TAward } from '../../types/models';
import { UpdateAwardDto, updateAwardDto } from '../../dtos/award.dto';
import { Button, Stack, Switch, TextInput, Title } from '@mantine/core';
import { primaryColor } from '../../app';

interface UpdateAwardModalProps {
  award: TAward;
}

export default function UpdateAwardModal({ award }: UpdateAwardModalProps) {
  const modal = useModal();
  const form = useForm<UpdateAwardDto>({
    initialValues: {
      name: award.name,
      description: award.description,
      isNegative: award.isNegative,
    },
    validate: zodResolver(updateAwardDto),
  });
  const { mutate, isPending } = useUpdateAward();

  const onSubmit = (values: UpdateAwardDto) => {
    mutate(
      {
        data: values,
        id: award.id,
      },
      {
        onSuccess() {
          modal.close('UPDATE_AWARD_MODAL');
        },
      }
    );
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <Title c={primaryColor} order={4} ta='center'>
          Update information of "{award.name}" award
        </Title>
        <TextInput label='Name' placeholder="Enter user's name" {...form.getInputProps('name')} />
        <TextInput
          label='Description'
          placeholder="Enter award's description"
          {...form.getInputProps('description')}
        />
        <Switch label='Is it a negative award' {...form.getInputProps('isNegative')} />

        <Button loading={isPending} disabled={!form.isDirty()} type='submit'>
          Update
        </Button>
      </Stack>
    </form>
  );
}
