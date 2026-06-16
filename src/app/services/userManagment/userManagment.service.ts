import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetUsersQuery } from '../../requests/users/queries/getUsersQuery';
import { IPaginatedResult } from '../../../framwork/models/iPaginatedResult';
import { UserDto } from '../../dtos/users/userDto';
import { RoleDto } from '../../dtos/role/roleDto';
import { Result } from '../../../framwork/models/result';
import { CreateUserCommand } from '../../requests/users/commands/createUserCommand';
import { DeleteUserCommand } from '../../requests/users/commands/deleteUserCommand';
import { UpdateUserCommand } from '../../requests/users/commands/updateUserCommand';

@Injectable({
  providedIn: 'root'
})
export class UserManagmentService {
  private readonly baseUrl = 'http://localhost:5182/api';

  constructor(private http: HttpClient) {}

getUsers(query: GetUsersQuery): Observable<IPaginatedResult<UserDto>> {

  let params = new HttpParams()
    .set('pageNumber', query.pageNumber)
    .set('pageSize', query.pageSize);

  if (query.firstName) {
    params = params.set('firstName', query.firstName);
  }

  if (query.lastName) {
    params = params.set('lastName', query.lastName);
  }

  if (query.phoneNumber) {
    params = params.set('phoneNumber', query.phoneNumber);
  }

  if (query.roleName) {
    params = params.set('roleName', query.roleName);
  }

  return this.http.get<IPaginatedResult<UserDto>>(
    `${this.baseUrl}/User`,
    { params }
  );
}
getRoles():Observable<any>{
  return this.http.get<any>(`${this.baseUrl}/Role`);
}
createUser(command: CreateUserCommand) {
  return this.http.post<any>(
    `${this.baseUrl}/User`,
    command
  );
}
updateUser( command: UpdateUserCommand) {
  return this.http.put<any>(
    `${this.baseUrl}/User`,
    command
  );
}

deleteUser(command: DeleteUserCommand) {
  return this.http.delete<any>(
    `${this.baseUrl}/User?userId=${command.userId}`
  );
}
}
