import { IPaginatedResult } from '../../../../framwork/models/iPaginatedResult';
import { AttendanceDto } from '../../../dtos/attendance/attendanceDto';
export interface GetAttendanceQuery extends IPaginatedResult<AttendanceDto>
{
  consultantProfileId : number
}
