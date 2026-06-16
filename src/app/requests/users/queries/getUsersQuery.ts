import { Gender } from './../../../enums/gender.enum';
import { IPaginatedResult } from '../../../../framwork/models/iPaginatedResult';
import { UserDto } from '../../../dtos/users/userDto';
export interface GetUsersQuery extends IPaginatedResult<UserDto>{
  firstName?: string;
  lastName?: string;
  roleName?: string;
  phoneNumber?: string;
  gender?: Gender | null;
  isActive?: boolean | null;
  pageNumber: number;
  pageSize: number;
}
