import { LoginDto } from '../dtos/auth.dto';
import { CreateAwardDto, UpdateAwardDto } from '../dtos/award.dto';
import { AddCategoryDto, GetCategoriesDto } from '../dtos/category.dto';
import { CreateCommentDto, GetCommentsQueryDto } from '../dtos/comment.dto';
import { CreateContestDto, GetContestsFiltersDto, UpdateContestDto } from '../dtos/contest.dto';
import { AddNomineeDto, GetNomineesDto } from '../dtos/nominee.dto';
import { AddParticipantDto, GetParticipantsDto } from '../dtos/participant.dto';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { AddVotesDto, DeleteVotesDto, GetVotesQueryDto } from '../dtos/vote.dto';
import { InputQuery } from './query';
import { Id } from './server';

// AUTH
export type TLoginInput = LoginDto;

// USERS
export type TGetUsersInput = { query: InputQuery };
export type TGetUserInput = { username: string };
export type TUpdateUserInput = Id & { data: UpdateUserDto };
export type TDeleteUserInput = Id;
export type TCreateUserInput = CreateUserDto;

// AWARDS
export type TGetAwardsInput = { query: InputQuery };
export type TGetAwardInput = Id;
export type TUpdateAwardInput = Id & { data: UpdateAwardDto };
export type TDeleteAwardInput = Id;
export type TCreateAwardInput = CreateAwardDto;

// CATEGORIES
export type TGetCategoriesInput = { query: InputQuery & GetCategoriesDto };
export type TGetCategoryInput = Id;
export type TDeleteCategoryInput = Id;
export type TCreateCategoryInput = AddCategoryDto;

// COMMENTS
export type TGetCommentsInput = { query: InputQuery & GetCommentsQueryDto };
export type TGetCommentInput = Id;
export type TUpdateCommentInput = Id & { data: unknown };
export type TDeleteCommentInput = Id;
export type TCreateCommentInput = CreateCommentDto;

// CONTESTS
export type TGetContestsInput = { query: InputQuery & GetContestsFiltersDto };
export type TGetContestInput = Id;
export type TUpdateContestInput = Id & { data: UpdateContestDto };
export type TDeleteContestInput = Id;
export type TCreateContestInput = CreateContestDto;

// VOTES
export type TGetVotesInput = { contestId: string; query: InputQuery & GetVotesQueryDto };
export type TGetVotesOfParticipantInput = Id;
export type TGetVoteInput = Id;
export type TDeleteVoteInput = DeleteVotesDto;
export type TCreateVoteInput = AddVotesDto;

// PARTICIPANTS
export type TGetParticipantsInput = { query: InputQuery & GetParticipantsDto };
export type TGetParticipationInput = { contestId: string };
export type TGetParticipantInput = Id;
export type TDeleteParticipantInput = Id;
export type TCreateParticipantInput = AddParticipantDto;

// NOMINEES
export type TGetNomineesInput = { query: InputQuery & GetNomineesDto };
export type TGetNomineeInput = Id;
export type TDeleteNomineeInput = Id;
export type TCreateNomineeInput = AddNomineeDto;

// RESULTS
export type TGetResultsInput = Id;
export type TGetCategoryResultsInput = Id;
export type TGetAwardResultsInput = Id;
export type TGetParticipantResultsInput = Id;
export type TGetContestResultsInput = Id;
export type TGetUserResultsInput = Id;
