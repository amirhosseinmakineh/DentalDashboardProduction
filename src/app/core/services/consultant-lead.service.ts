import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiResponse, ConsultantLeadDto, GetLeadsQuery, PaginatedResult, SubmitLeadCallReportCommand } from '../models/consultant-lead.models';

@Injectable({ providedIn: 'root' })
export class ConsultantLeadService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/Consultant';

  getLeads(query: GetLeadsQuery): Observable<PaginatedResult<ConsultantLeadDto>> {
    let params = new HttpParams()
      .set('profileId', query.profileId)
      .set('pageNumber', query.pageNumber)
      .set('pageSize', query.pageSize);

    if (query.consultantProfileId) params = params.set('consultantProfileId', query.consultantProfileId);
    if (query.search) params = params.set('search', query.search);

    return this.http.get<PaginatedResult<ConsultantLeadDto> | ApiResponse<ConsultantLeadDto[]> | ConsultantLeadDto[]>(`${this.baseUrl}/GetLeads`, { params })
      .pipe(map((response) => this.normalizeLeads(response)));
  }

  submitLeadCallReport(command: SubmitLeadCallReportCommand): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/SubmitLeadCallReport`, command);
  }

  private normalizeLeads(response: PaginatedResult<ConsultantLeadDto> | ApiResponse<ConsultantLeadDto[]> | ConsultantLeadDto[]): PaginatedResult<ConsultantLeadDto> {
    if (Array.isArray(response)) return { items: response, totalCount: response.length };
    const record = response as ApiResponse<ConsultantLeadDto[]> & PaginatedResult<ConsultantLeadDto>;
    const items = record.items ?? record.data ?? record.result ?? [];
    return { items, totalCount: record.totalCount ?? items.length };
  }
}
