import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiResponse, ConsultantStatusDto, SetAvailableConsultantCommand, SetOnlineOfflineConsultantCommand } from '../models/consultant-lead.models';

@Injectable({ providedIn: 'root' })
export class ConsultantService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/Consultant';

  setAvailable(command: SetAvailableConsultantCommand): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/SetAvalableConsultant`, command);
  }

  setOnlineOffline(command: SetOnlineOfflineConsultantCommand): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/SetOnlineOfflineConsultant`, command);
  }

  getStatus(profileId: number): Observable<ConsultantStatusDto> {
    const params = new HttpParams().set('profileId', profileId);
    return this.http.get<ApiResponse<ConsultantStatusDto> | ConsultantStatusDto>(`${this.baseUrl}/GetStatus`, { params })
      .pipe(map((response) => ('data' in response && response.data ? response.data : response as ConsultantStatusDto)));
  }
}
