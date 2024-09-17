import { useForm, zodResolver } from '@mantine/form';
import { useModal } from '../../hooks/useModal';
import { Button, FocusTrap, MultiSelect, Stack, Title } from '@mantine/core';
import { selectData } from '../../utils/select-data';
import { addParticipantDto, AddParticipantDto } from '../../dtos/participant.dto';
import { useCreateParticipant } from '../../api/mutations/participant.mutations';
import { useUsers } from '../../api/queries/user.queries';
import { primaryColor } from '../../app';

interface CreateParticipantModalProps {
  contestId: string;
  ignore?: string[];
}

export default function CreateParticipantModal({ contestId, ignore }: CreateParticipantModalProps) {
  const modal = useModal();
  const form = useForm<AddParticipantDto>({
    initialValues: {
      userIds: [],
      contestId: contestId,
    },
    validate: zodResolver(addParticipantDto),
  });
  const { mutate, isPending } = useCreateParticipant();

  const { data: users } = useUsers({
    take: 100,
  });

  const onSubmit = (values: AddParticipantDto) => {
    mutate(values, {
      onSuccess() {
        modal.close('CREATE_PARTICIPANT_MODAL');
      },
    });
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <FocusTrap.InitialFocus />
        <Title c={primaryColor} order={4} ta='center'>
          Create Participant
        </Title>
        <MultiSelect
          searchable
          label='User'
          placeholder='Pick a user'
          data={selectData(users, 'name').filter((v) => !ignore?.includes(v.value))}
          {...form.getInputProps('userIds')}
        />

        <Button loading={isPending} type='submit'>
          Create
        </Button>
      </Stack>
    </form>
  );
}
