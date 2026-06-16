import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RegisterCommand } from '../../requests/auth/registerCommand';
import { LoginCommand } from '../../requests/auth/loginCommand';
import { Result } from '../../../framwork/models/result';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = 'http://localhost:5182/api/auth';
  private readonly tokenKey = 'token';

  private readonly client = inject(HttpClient);

  register(command: RegisterCommand): Observable<Result<string>> {
    return this.client.post<Result<string>>(
      `${this.baseUrl}`,
      command
    );
  }

  login(command: LoginCommand): Observable<Result<string>> {
    return this.client.post<Result<string>>(
      `${this.baseUrl}/login`,
      command
    );
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
  logout(): void {
    this.removeToken();
  }
  extractRoleFromToken(token: string): string | null {

  try {

    const decoded: any = jwtDecode(token);

    return (
      decoded.role ??
      decoded.Role ??
      decoded.roleName ??
      decoded.RoleName ??
      decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ??
      null
    );

  } catch {

    return null;
  }
}
}
function jwtDecode(token: string): any {
  throw new Error('Function not implemented.');
}

