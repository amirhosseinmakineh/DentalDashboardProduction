import { IPaginatedResult } from '../../../../framwork/models/iPaginatedResult';
import { ConsultantsDto } from '../../../dtos/consultants/consultantsDto';

export interface GetConsultantsQuery
  extends IPaginatedResult<ConsultantsDto> {

  firstName?: string | null;

  lastName?: string | null;

  phoneNumber?: string | null;

  pageNumber: number;

  pageSize: number;
}
