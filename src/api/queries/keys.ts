import { GetNomineesDto } from '../../dtos/nominee.dto';
import { InputQueryWithoutPage } from '../../types/query';

export const userKeys = {
  index: ['users'] as const,

  list: () => [...userKeys.index, 'list'] as const,
  listWithQuery: (query: InputQueryWithoutPage) => [...userKeys.list(), query] as const,
  profile: () => [...userKeys.index, 'profile'] as const,
  profileWithUsername: (username: string) => [...userKeys.profile(), username] as const,
  profileWithId: (id: string) => [...userKeys.profile(), id] as const,
};

export const awardKeys = {
  index: ['awards'] as const,

  list: () => [...awardKeys.index, 'list'] as const,
  listWithQuery: (query: InputQueryWithoutPage) => [...awardKeys.list(), query] as const,
  single: () => [...awardKeys.index, 'single'] as const,
  singleWithId: (id: string) => [...awardKeys.single(), id] as const,
};

export const categoryKeys = {
  index: ['categories'] as const,

  list: () => [...categoryKeys.index, 'list'] as const,
  listWithQuery: (query: InputQueryWithoutPage) => [...categoryKeys.list(), query] as const,
  listWithQueryAndContestId: (contestId: string, query: InputQueryWithoutPage) =>
    [...categoryKeys.listWithQuery(query), contestId] as const,
  single: () => [...categoryKeys.index, 'single'] as const,
  singleWithId: (id: string) => [...categoryKeys.single(), id] as const,
};

export const commentKeys = {
  index: ['comments'] as const,

  list: () => [...commentKeys.index, 'list'] as const,
  listWithQuery: (query: InputQueryWithoutPage) => [...commentKeys.list(), query] as const,
  single: () => [...commentKeys.index, 'single'] as const,
  singleWithId: (id: string) => [...commentKeys.single(), id] as const,
};

export const contestKeys = {
  index: ['contests'] as const,

  list: () => [...contestKeys.index, 'list'] as const,
  listWithQuery: (query: InputQueryWithoutPage) => [...contestKeys.list(), query] as const,
  single: () => [...contestKeys.index, 'single'] as const,
  singleWithId: (id: string) => [...contestKeys.single(), id] as const,
};

export const nomineeKeys = {
  index: ['nominees'] as const,

  list: () => [...nomineeKeys.index, 'list'] as const,
  listWithQuery: (query: InputQueryWithoutPage & GetNomineesDto) =>
    [...nomineeKeys.list(), query] as const,
  listWithQueryAndCategoryId: (categoryId: string, query: InputQueryWithoutPage) =>
    [...nomineeKeys.listWithQuery(query), categoryId] as const,
  single: () => [...nomineeKeys.index, 'single'] as const,
  singleWithId: (id: string) => [...nomineeKeys.single(), id] as const,
};

export const participantKeys = {
  index: ['participants'] as const,

  list: () => [...participantKeys.index, 'list'] as const,
  listWithQuery: (query: InputQueryWithoutPage) => [...participantKeys.list(), query] as const,
  listWithQueryAndContestId: (contestId: string, query: InputQueryWithoutPage) =>
    [...participantKeys.listWithQuery(query), contestId] as const,
  single: () => [...participantKeys.index, 'single'] as const,
  singleWithId: (id?: string) => [...participantKeys.single(), id] as const,
};

export const voteKeys = {
  index: ['votes'] as const,

  list: () => [...voteKeys.index, 'list'] as const,
  listWithQuery: (query: InputQueryWithoutPage) => [...voteKeys.list(), query] as const,
  listWithQueryAndId: (categoryId: string | null, query: InputQueryWithoutPage) =>
    [...voteKeys.listWithQuery(query), categoryId] as const,
  single: () => [...voteKeys.index, 'single'] as const,
  singleWithId: (id?: string) => [...voteKeys.single(), id] as const,
};

export const resultKeys = {
  index: ['results'] as const,

  byContest: (id: string) => [...resultKeys.index, 'by-contest', id] as const,
  byParticipant: (id: string) => [...resultKeys.index, 'by-participant', id] as const,
  byUser: (id: string) => [...resultKeys.index, 'by-user', id] as const,
  byAward: (id: string) => [...resultKeys.index, 'by-award', id] as const,
  byCategory: (id: string) => [...resultKeys.index, 'by-category', id] as const,
};
