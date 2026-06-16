import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedResult } from '../../../framwork/services/paginated-result';
import { IPaginatedResult } from '../../../framwork/models/iPaginatedResult';
import { ConsultantsDto } from '../../dtos/consultants/consultantsDto';

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {

  private readonly baseUrl = 'http://localhost:5182/api';

  constructor(private http: HttpClient) {}
  getConsultants():Observable<IPaginatedResult<ConsultantsDto>>{
    return this.http.get<IPaginatedResult<ConsultantsDto>>(`${this.baseUrl}/Consultant/GetConsultants`);
  }
}
