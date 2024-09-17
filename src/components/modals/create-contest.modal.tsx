import { useForm, zodResolver } from '@mantine/form';
import { useModal } from '../../hooks/useModal';
import {
  ActionIcon,
  Button,
  FocusTrap,
  Grid,
  NumberInput,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { createContestDto, CreateContestDto } from '../../dtos/contest.dto';
import { useCreateContest } from '../../api/mutations/contest.mutations';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';
import { primaryColor } from '../../app';

export default function CreateContestModal() {
  const modal = useModal();
  const form = useForm<CreateContestDto>({
    initialValues: {
      name: '',
      year: new Date().getFullYear(),
      description: '',
      isMainContest: false,
      config: {
        canParticipantVoteHimself: false,
        maxNominationsPerCategory: 5,
        pointing: [],
      },
      image: null,
    },
    onValuesChange(values) {
      values.image = values.image || null;
    },
    transformValues(values) {
      const finalPointing =
        values.config?.pointing === undefined
          ? undefined
          : [...new Set(values.config.pointing ?? [])].length < 1
            ? undefined
            : [...new Set(values.config.pointing ?? [])];

      return {
        ...values,
        image: values.image || null,
        config: {
          ...values.config,
          pointing: finalPointing,
        },
      };
    },
    validate: zodResolver(createContestDto),
  });
  const { mutate, isPending } = useCreateContest();

  const onSubmit = (values: CreateContestDto) => {
    mutate(values, {
      onSuccess() {
        modal.close('CREATE_CONTEST_MODAL');
      },
    });
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack py={20}>
        <FocusTrap.InitialFocus />
        <Title c={primaryColor} order={4} ta='center'>
          Create Contest
        </Title>
        <TextInput
          label='Name'
          placeholder="Enter contest's name"
          {...form.getInputProps('name')}
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
        <NumberInput
          label='Maximum nominations'
          placeholder='Enter maximum nomination per category limit'
          {...form.getInputProps('config.maxNominationsPerCategory')}
        />
        <Switch
          label='Is it a main annual contest'
          {...form.getInputProps('isMainContest', { type: 'checkbox' })}
        />
        <Switch
          label='Can participant vote for himself'
          {...form.getInputProps('config.canParticipantVoteHimself', { type: 'checkbox' })}
        />

        <Button loading={isPending} type='submit'>
          Create
        </Button>
      </Stack>
    </form>
  );
}
