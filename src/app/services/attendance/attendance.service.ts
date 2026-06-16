import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaginatedResult } from '../../../framwork/models/iPaginatedResult';
import { AttendanceDto } from '../../dtos/attendance/attendanceDto';
import { GetAttendanceQuery } from '../../requests/attendances/queries/getAttendanceQuery';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
    private readonly baseUrl = 'http://localhost:5182/api';

  constructor(private http: HttpClient) {}
getAttendanceByConsultantId(
  query: GetAttendanceQuery
): Observable<IPaginatedResult<AttendanceDto>> {
debugger;
  return this.http.get<IPaginatedResult<AttendanceDto>>(
    `${this.baseUrl}/Attendance`,
    {
      params: {
        consultantProfileId: query.consultantProfileId,
        pageNumber: query.pageNumber,
        pageSize: query.pageSize
      }
    }
  );
}
}
