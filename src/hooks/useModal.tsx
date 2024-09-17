import { ButtonProps, GroupProps, ModalProps } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { modalIds } from '../resources/modals';
import UpdateUserModal from '../components/modals/update-user.modal';
import CreateUserModal from '../components/modals/create-user.modal';
import UpdateAwardModal from '../components/modals/update-award.modal';
import CreateAwardModal from '../components/modals/create-award.modal';
import CreateCategoryModal from '../components/modals/create-category.modal';
import CreateContestModal from '../components/modals/create-contest.modal';
import CreateParticipantModal from '../components/modals/create-participant.modal';
import CreateNomineeModal from '../components/modals/create-nominee.modal';
import InfoParticipantModal from '../components/modals/info-participant.modal';
import AwardRanksModal from '../components/modals/award-ranks.modal';

type ModalSettings = Partial<Omit<ModalProps, 'opened' | 'children'>>;
type ConfirmModalSettings = ModalSettings & {
  onCancel?: () => void;
  onConfirm?: () => void;
  closeOnConfirm?: boolean;
  closeOnCancel?: boolean;
  cancelProps?: ButtonProps & React.ComponentPropsWithoutRef<'button'>;
  confirmProps?: ButtonProps & React.ComponentPropsWithoutRef<'button'>;
  groupProps?: GroupProps;
  labels?: Record<'confirm' | 'cancel', React.ReactNode>;
};

export const commonModalProps: Partial<ModalSettings> = {
  radius: 'lg',
  withCloseButton: false,
  overlayProps: {
    blur: 6,
  },
  centered: true,
  transitionProps: {
    transition: 'slide-up',
  },
  size: 'lg',
};

type ModalIds = (typeof modalIds)[keyof typeof modalIds];

export const useModal = () => {
  const modals = useModals();

  const close = (id?: ModalIds | (string & {})) => {
    if (id) {
      modals.closeModal(id);
    } else {
      modals.closeAll();
    }
  };

  const confirm = (id: string, overrideSettings?: ConfirmModalSettings) => {
    return (title: string, onConfirm: () => void, settings?: ConfirmModalSettings) =>
      modals.openConfirmModal({
        modalId: id,
        title,
        onConfirm,
        labels: {
          cancel: 'Cancel',
          confirm: 'Delete',
        },
        ...settings,
        ...overrideSettings,
      });
  };

  const open = <T,>(
    id: string,
    Modal: React.FC<T & JSX.IntrinsicAttributes>,
    overrideSettings?: ModalSettings
  ) => {
    return (props: T & JSX.IntrinsicAttributes, settings?: ModalSettings) =>
      modals.openModal({
        modalId: id,
        children: <Modal {...props} />,
        ...commonModalProps,
        ...settings,
        ...overrideSettings,
      });
  };

  return {
    close,

    confirmDelete: confirm(modalIds.deleteConfirm),

    openUpdateUser: open(modalIds.updateUser, UpdateUserModal),
    openUpdateAward: open(modalIds.updateAward, UpdateAwardModal),

    openCreateUser: open(modalIds.createUser, CreateUserModal),
    openCreateAward: open(modalIds.createAward, CreateAwardModal),
    openCreateCategory: open(modalIds.createCategory, CreateCategoryModal),
    openCreateContest: open(modalIds.createContest, CreateContestModal),
    openCreateParticipant: open(modalIds.createParticipant, CreateParticipantModal),
    openCreateNominee: open(modalIds.createNominee, CreateNomineeModal),

    getInfoParticipant: open(modalIds.infoParticipant, InfoParticipantModal, {
      fullScreen: true,
      withCloseButton: true,
    }),
    getAwardRanks: open(modalIds.awardRanks, AwardRanksModal),
  };
};
