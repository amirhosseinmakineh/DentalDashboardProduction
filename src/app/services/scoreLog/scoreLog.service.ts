import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddScoreLogCommand } from '../../requests/scoreLog/AddScoreLogCommand';

@Injectable({
  providedIn: 'root'
})
export class ScoreLogService {
  private baseUrl = 'http://localhost:5182/api/ScoreLog';

  constructor(private http: HttpClient) {}

  addScore(command: AddScoreLogCommand) {
    return this.http.post<any>(
      `${this.baseUrl}`,
      command
    );
  }
}
