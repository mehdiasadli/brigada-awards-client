import {
  CategoryInfo,
  ContestInfo,
  RankedNominee,
  TAward,
  TCategory,
  TComment,
  TContest,
  TNominee,
  TParticipant,
  TUser,
  TVote,
} from './models';
import { Id, SuccessResponse } from './server';

// AUTH
export type TLoginResponse = SuccessResponse<TUser & { token: string }>;

// USERS
export type TGetUsersResponse = SuccessResponse<TUser, true>;
export type TGetUserResponse = SuccessResponse<
  Omit<TUser, 'participations'> & {
    participations: (TParticipant & {
      _count: { comments: number; votes: number; nominations: number };
    })[];
  } & {
    _count: { participations: number };
    givenTotals: { total: number; user: TUser }[];
    ranks: {
      contest: ContestInfo;
      category: CategoryInfo;
      rank: number;
    }[];
  }
>;
export type TUpdateUserResponse = SuccessResponse<TUser>;
export type TDeleteUserResponse = SuccessResponse<Id>;
export type TCreateUserResponse = SuccessResponse<TUser>;

// AWARDS
export type TGetAwardsResponse = SuccessResponse<TAward, true>;
export type TGetAwardResponse = SuccessResponse<TAward>;
export type TUpdateAwardResponse = SuccessResponse<TAward>;
export type TDeleteAwardResponse = SuccessResponse<Id>;
export type TCreateAwardResponse = SuccessResponse<TAward>;

// CATEGORIES
export type TGetCategoriesResponse = SuccessResponse<TCategory, true>;
export type TGetCategoryResponse = SuccessResponse<TCategory>;
export type TDeleteCategoryResponse = SuccessResponse<Id>;
export type TCreateCategoryResponse = SuccessResponse<TCategory[]>;

// COMMENTS
export type TGetCommentsResponse = SuccessResponse<TComment, true>;
export type TGetCommentResponse = SuccessResponse<TComment>;
export type TUpdateCommentResponse = SuccessResponse<TComment>;
export type TDeleteCommentResponse = SuccessResponse<Id>;
export type TCreateCommentResponse = SuccessResponse<TComment>;

// CONTESTS
export type TGetContestsResponse = SuccessResponse<TContest, true>;
export type TGetContestResponse = SuccessResponse<TContest>;
export type TGetOngoingContestResponse = SuccessResponse<TContest | null>;
export type TUpdateContestResponse = SuccessResponse<TContest>;
export type TDeleteContestResponse = SuccessResponse<Id>;
export type TCreateContestResponse = SuccessResponse<TContest>;

// VOTES
export type TGetVotesResponse = SuccessResponse<TVote, true>;
export type TGetVotesOfParticipantResponse = SuccessResponse<TVote[]>;
export type TGetVoteResponse = SuccessResponse<TVote>;
export type TDeleteVoteResponse = SuccessResponse<{ count: number }>;
export type TCreateVoteResponse = SuccessResponse<TVote[]>;

// PARTICIPANTS
export type TGetParticipantsResponse = SuccessResponse<TParticipant, true>;
export type TGetParticipationResponse = SuccessResponse<TParticipant | null>;
export type TGetParticipantResponse = SuccessResponse<TParticipant>;
export type TDeleteParticipantResponse = SuccessResponse<Id>;
export type TCreateParticipantResponse = SuccessResponse<TParticipant>;

// NOMINEES
export type TGetNomineesResponse = SuccessResponse<TNominee, true>;
export type TGetNomineeResponse = SuccessResponse<TNominee>;
export type TDeleteNomineeResponse = SuccessResponse<Id>;
export type TCreateNomineeResponse = SuccessResponse<TNominee>;

// RESULTS
export type TGetCategoryResultsResponse = SuccessResponse<{
  category: CategoryInfo;
  nominees: RankedNominee[];
} | null>;
export type TGetAwardResultsResponse = SuccessResponse<
  {
    contest: ContestInfo;
    category: CategoryInfo;
    nominees: RankedNominee[];
  }[]
>;
export type TGetParticipantResultsResponse = SuccessResponse<
  {
    contest: ContestInfo;
    category: CategoryInfo;
    votes: TVote[];
    rank: number;
  }[]
>;
export type TGetContestResultsResponse = SuccessResponse<
  | {
      category: CategoryInfo;
      nominees: RankedNominee[];
    }[]
  | null
>;
export type TGetUserResultsResponse = SuccessResponse<
  {
    contest: ContestInfo;
    category: CategoryInfo;
    votes: TVote[];
    rank: number;
  }[]
>;
