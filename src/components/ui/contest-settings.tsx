import { useForm, zodResolver } from '@mantine/form';
import { useModal } from '../../hooks/useModal';
import { ContestStatus, TContest } from '../../types/models';
import { updateContestDto, UpdateContestDto } from '../../dtos/contest.dto';
import { useDeleteContest, useUpdateContest } from '../../api/mutations/contest.mutations';
import { DatePickerInput } from '@mantine/dates';
import {
  ActionIcon,
  Button,
  Grid,
  NumberInput,
  SegmentedControl,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { primaryColor } from '../../app';
import { useNavigate } from 'react-router-dom';

interface ContestSettingsProps {
  contest: TContest;
}

export default function ContestSettings({ contest }: ContestSettingsProps) {
  const modal = useModal();
  const navigate = useNavigate();
  const mutation = useDeleteContest();
  const form = useForm<UpdateContestDto>({
    initialValues: {
      name: contest.name,
      config: {
        canParticipantVoteHimself: contest.config.canParticipantVoteHimself,
        pointing: contest.config.pointing.split(',').map(Number),
        maxNominationsPerCategory: contest.config.maxNominationsPerCategory,
      },
      description: contest.description,
      image: contest.image,
      year: contest.year,
      isMainContest: contest.isMainContest,
      status: contest.status,
      startDate: new Date(contest.startDate),
      endDate: contest.endDate ? new Date(contest.endDate) : undefined,
    },
    validate: zodResolver(updateContestDto),
  });
  const { mutate, isPending } = useUpdateContest();

  const onSubmit = (values: UpdateContestDto) => {
    mutate(
      {
        data: values,
        id: contest.id,
      },
      {
        onSuccess() {
          modal.close('UPDATE_CONTEST_MODAL');
        },
      }
    );
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <Title>Update Contest</Title>
        <TextInput
          label='Name'
          placeholder="Enter contest's name"
          {...form.getInputProps('name')}
        />
        <SegmentedControl
          color={primaryColor}
          radius='lg'
          data={Object.values(ContestStatus)}
          {...form.getInputProps('status')}
        />
        <TextInput
          label='Description'
          placeholder="Enter contest's description"
          {...form.getInputProps('description')}
        />
        <NumberInput
          label='Year'
          placeholder="Enter contest's year"
          {...form.getInputProps('year')}
        />
        <TextInput
          label='Image'
          placeholder="Enter the url of the contest's image"
          {...form.getInputProps('image')}
        />

        <Stack gap={0}>
          <Text fz='sm' fw='bold'>
            Pointing
          </Text>
          <Grid mt='xs'>
            {form.getValues().config?.pointing?.map((_, index) => (
              <Grid.Col key={index} span={4}>
                <NumberInput
                  withAsterisk
                  styles={{
                    input: {
                      paddingLeft: 50,
                    },
                  }}
                  leftSection={
                    <ActionIcon
                      color='red'
                      onClick={() => form.removeListItem('config.pointing', index)}
                    >
                      <IconTrash size='1rem' />
                    </ActionIcon>
                  }
                  style={{ flex: 1 }}
                  key={form.key(`config.pointing.${index}`)}
                  {...form.getInputProps(`config.pointing.${index}`)}
                />
              </Grid.Col>
            ))}
            <Grid.Col span={4}>
              <ActionIcon size='lg' onClick={() => form.insertListItem('config.pointing', 0)}>
                <IconPlus size={16} />
              </ActionIcon>
            </Grid.Col>
          </Grid>
        </Stack>
        <NumberInput
          label='Maximum nominations'
          placeholder='Enter maximum nomination per category limit'
          {...form.getInputProps('config.maxNominationsPerCategory')}
        />
        <DatePickerInput
          label='Start date'
          placeholder='Pick start date of the contest'
          {...form.getInputProps('startDate')}
        />
        <DatePickerInput
          label='End date'
          placeholder='Pick end date of the contest'
          {...form.getInputProps('endDate')}
        />

        <Switch
          label='Is it a main annual contest'
          {...form.getInputProps('isMainContest', { type: 'checkbox' })}
        />
        <Switch
          label='Can participant vote for himself'
          {...form.getInputProps('config.canParticipantVoteHimself', { type: 'checkbox' })}
        />

        <Button loading={isPending} disabled={!form.isDirty()} type='submit'>
          Update
        </Button>
        <Button
          loading={mutation.isPending}
          variant='light'
          w='min(100%, 20rem)'
          mx='auto'
          color='red'
          onClick={() =>
            modal.confirmDelete('You are deleting this contest', () => {
              mutation.mutate(
                { id: contest.id },
                {
                  onSuccess() {
                    navigate('/');
                  },
                }
              );
            })
          }
        >
          Delete
        </Button>
      </Stack>
    </form>
  );
}
