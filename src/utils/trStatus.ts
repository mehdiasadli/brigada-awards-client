import { ContestStatus } from '../types/models';

export function trStatus(status: ContestStatus) {
  return status === 'Completed' ? 'Bitdi' : status === 'Ongoing' ? 'Davam edir' : 'Yaxında';
}
