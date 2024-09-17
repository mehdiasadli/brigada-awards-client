import {
  ActionIcon,
  Alert,
  Center,
  CenterProps,
  Group,
  Loader,
  LoaderProps,
  Title,
} from '@mantine/core';
import { IconReload } from '@tabler/icons-react';
import { HttpError } from '../resources/HttpError';
import { primaryColor } from '../app';

export interface UseStatusOptions {
  containerProps?: CenterProps;
  loaderProps?: LoaderProps;
  LoadingComponent?: JSX.Element;
  ErrorComponent?: JSX.Element;
  error?: HttpError | null;
  refetch?: () => void;
}

type Status = 'error' | 'pending' | 'success';

export function useStatus(status: Status | Status[], options: UseStatusOptions = {}) {
  const DefaultLoadingComponent = (
    <Center {...options.containerProps}>
      <Loader type='dots' color={primaryColor} {...options.loaderProps} />
    </Center>
  );

  const DefaultErrorComponent = (
    <Center {...options.containerProps}>
      <Alert
        color='red'
        variant='light'
        title={options.error?.status ? <Title order={4}>{options.error.status}</Title> : undefined}
      >
        <Group align='center' gap={50}>
          {options.error?.message || 'Error occured. Try again'}
          {!!options.refetch && (
            <ActionIcon
              size='lg'
              radius='lg'
              variant='filled'
              color='red'
              onClick={options.refetch}
            >
              <IconReload size={20} />
            </ActionIcon>
          )}
        </Group>
      </Alert>
    </Center>
  );

  const { ErrorComponent = DefaultErrorComponent, LoadingComponent = DefaultLoadingComponent } =
    options;

  return {
    success: status === 'success',
    Loader: LoadingComponent,
    Error: ErrorComponent,
    Component:
      typeof status === 'string'
        ? status === 'error'
          ? ErrorComponent
          : status === 'pending'
            ? LoadingComponent
            : undefined
        : status.includes('error')
          ? ErrorComponent
          : status.includes('pending')
            ? LoadingComponent
            : undefined,
  };
}
