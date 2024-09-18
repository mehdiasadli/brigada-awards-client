import { IconCheckbox, IconConfetti, IconMedal } from '@tabler/icons-react';

export const navbar = {
  links: [
    { Icon: IconCheckbox, label: 'Səsvermə', link: '/' },
    { Icon: IconConfetti, label: 'Müsabiqələr', link: '/contests' },
    { Icon: IconMedal, label: 'Mükafatlar', link: '/awards' },
  ],
  collections: [
    { emoji: '🤷', link: '/dashboard/users', label: 'İstifadəçilər' },
    { emoji: '🏆', link: '/dashboard/awards', label: 'Mükafatlar' },
    { emoji: '💾', link: '/dashboard/logs', label: 'Loqlar' },
  ],
};
