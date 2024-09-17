import { NotificationData, notifications } from '@mantine/notifications';
import { HttpError } from '../resources/HttpError';
import { SuccessResponse } from '../types/server';

const DEFAULTS = {
  error: 'Something went wrong',
  success: 'Success',
};

export type ToastOptions = Omit<NotificationData, 'id' | 'message'>;

export const useToast = () => {
  return {
    info: (message: string, options?: ToastOptions) => {
      notifications.show({
        message,
        position: 'top-center',
        ...options,
      });
    },
    error: (error?: string | HttpError, options?: ToastOptions) => {
      notifications.show({
        message: !error ? DEFAULTS.error : typeof error === 'string' ? error : error.message,
        color: 'red',
        position: 'top-center',
        ...options,
      });
    },
    success: (response?: string | SuccessResponse<unknown>, options?: ToastOptions) => {
      notifications.show({
        position: 'top-center',
        color: 'green',
        message: !response
          ? DEFAULTS.success
          : typeof response === 'string'
            ? response
            : response.message,
        ...options,
      });
    },
  };
};
