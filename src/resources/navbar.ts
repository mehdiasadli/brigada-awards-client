import { IconConfetti, IconHome, IconMedal } from '@tabler/icons-react';

export const navbar = {
  links: [
    { Icon: IconHome, label: 'Səsvermə', link: '/' },
    { Icon: IconConfetti, label: 'Müsabiqələr', link: '/contests' },
    { Icon: IconMedal, label: 'Mükafatlar', link: '/awards' },
  ],
  collections: [
    { emoji: '💆', link: '/dashboard/users', label: 'İstifadəçilər' },
    { emoji: '🏆', link: '/dashboard/awards', label: 'Mükafatlar' },
  ],
};
