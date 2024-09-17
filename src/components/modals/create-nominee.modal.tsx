import { useForm, zodResolver } from '@mantine/form';
import { useModal } from '../../hooks/useModal';
import { Button, Flex, FocusTrap, MultiSelect, Stack, Title } from '@mantine/core';
import { selectData } from '../../utils/select-data';
import { addNomineeDto, AddNomineeDto } from '../../dtos/nominee.dto';
import { useCreateNominee } from '../../api/mutations/nominee.mutations';
import { useParticipants } from '../../api/queries/participant.queries';
import { primaryColor } from '../../app';

interface CreateNomineeModalProps {
  contestId: string;
  categoryId: string;
}

export default function CreateNomineeModal({ contestId, categoryId }: CreateNomineeModalProps) {
  const modal = useModal();
  const form = useForm<AddNomineeDto>({
    initialValues: {
      participantIds: [],
      categoryId,
    },
    validate: zodResolver(addNomineeDto),
  });
  const { mutate, isPending } = useCreateNominee();

  const { data: participants } = useParticipants(contestId, {
    take: 100,
  });

  const onSubmit = (values: AddNomineeDto) => {
    mutate(values, {
      onSuccess() {
        modal.close('CREATE_NOMINEE_MODAL');
      },
    });
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <FocusTrap.InitialFocus />
        <Title c={primaryColor} order={4} ta='center'>
          Create Nominee
        </Title>
        <Flex>
          <MultiSelect
            flex={1}
            searchable
            label='Participant'
            placeholder='Pick participants'
            data={selectData(participants, 'user.name')}
            {...form.getInputProps('participantIds')}
          />
        </Flex>

        <Button loading={isPending} type='submit'>
          Create
        </Button>
      </Stack>
    </form>
  );
}
