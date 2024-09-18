type DateString = string;

export const ContestStatus = {
  Upcoming: 'Upcoming',
  Ongoing: 'Ongoing',
  Completed: 'Completed',
} as const;

export type ContestStatusEnum = typeof ContestStatus;
export type ContestStatus = keyof ContestStatusEnum;

export type Prisma = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type TUser = Prisma & {
  username: string;
  name: string;
  admin: boolean;
  image?: string;

  participations: TParticipant[];
};

export type TParticipant = Prisma & {
  userId: string;
  contestId: string;
  user: TUser;
  contest: TContest;
  allowEarlyVote?: boolean;

  nominations: TNominee[];
  votes: TVote[];
  comments: TComment[];
};

export type TContestConfig = Prisma & {
  maxNominationsPerCategory: number;
  canParticipantVoteHimself: boolean;
  pointing: string;
  contestId: string;
  contest: TContest;
};

export type TContest = Prisma & {
  name: string;
  year: number;
  startDate: DateString;
  endDate?: DateString;
  description?: string;
  image?: string;
  isMainContest: boolean;
  status: ContestStatus;

  categories: TCategory[];
  participants: TParticipant[];
  config: TContestConfig;
};

export type TNominee = Prisma & {
  participantId: string;
  participant: TParticipant;
  categoryId: string;
  category: TCategory;
  votes: TVote[];
};

export type TCategory = Prisma & {
  awardId: string;
  award: TAward;
  contestId: string;
  contest: TContest;
  nominees: TNominee[];
  comments: TComment[];
};

export type TVote = Prisma & {
  voterId: string;
  voter: TParticipant;
  nomineeId: string;
  nominee: TNominee;
  point: number;
};

export type TComment = Prisma & {
  participantId: string;
  participant: TParticipant;
  categoryId: string;
  category: TCategory;
  content: string;
};

export type TLog = Prisma & {
  method: string;
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
  userId?: string;
  username?: string;
};

export type TAward = Prisma & {
  name: string;
  description?: string;
  image?: string;
  isNegative: boolean;

  categories: TCategory[];
};

export type RankedNominee = {
  id: string;
  totalPoints: number;
  rank: number;
  votes: number;
  voters: TVote[];
  participant: {
    id: string;
    user: {
      id: string;
      name: string;
      username: string;
      image?: string | null;
    };
  };
};

export type CategoryInfo = {
  id: string;
  name: string;
  award: {
    id: string;
    name: string;
    isNegative: boolean;
  };
};

export type ContestInfo = {
  id: string;
  name: string;
  year: number;
};

export type VoteStats = {
  mean: number;
  median: number;
  mode: number;
  variance: number;
  standardDeviation: number;
  range: number;
  interquartileRange: number;
  skewness: number;
  kurtosis: number;
  giniCoefficient: number;
  herfindahlIndex: number;
  totalPoints: number;
  numberOfRecipients: number;
} | null;
