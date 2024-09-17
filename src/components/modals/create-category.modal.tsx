import { useForm, zodResolver } from '@mantine/form';
import { addCategoryDto, AddCategoryDto } from '../../dtos/category.dto';
import { useCreateCategory } from '../../api/mutations/category.mutations';
import { useModal } from '../../hooks/useModal';
import { Button, Flex, FocusTrap, MultiSelect, Stack, Title } from '@mantine/core';
import { useAwards } from '../../api/queries/award.queries';
import { selectData } from '../../utils/select-data';
import { primaryColor } from '../../app';

interface CreateCategoryModalProps {
  contestId: string;
  ignore?: string[];
}

export default function CreateCategoryModal({ contestId, ignore }: CreateCategoryModalProps) {
  const modal = useModal();
  const form = useForm<AddCategoryDto>({
    initialValues: {
      awardIds: [],
      contestId: contestId,
    },
    validate: zodResolver(addCategoryDto),
  });
  const { mutate, isPending } = useCreateCategory();

  const { data: awards } = useAwards({
    take: 100,
  });

  const onSubmit = (values: AddCategoryDto) => {
    mutate(values, {
      onSuccess() {
        modal.close('CREATE_CATEGORY_MODAL');
      },
    });
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <FocusTrap.InitialFocus />
        <Title c={primaryColor} order={4} ta='center'>
          Create Category
        </Title>
        <Flex align='flex-end' gap={20}>
          <MultiSelect
            flex={1}
            searchable
            label='Award'
            placeholder='Pick an award'
            data={selectData(awards, 'name').filter((v) => !ignore?.includes(v.value))}
            {...form.getInputProps('awardIds')}
          />
          <Button
            onClick={() => {
              modal.openCreateAward({});
            }}
            variant='light'
          >
            Add
          </Button>
        </Flex>

        <Button loading={isPending} type='submit'>
          Create
        </Button>
      </Stack>
    </form>
  );
}
