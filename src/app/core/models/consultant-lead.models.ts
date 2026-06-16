export interface ConsultantLeadDto {
  id: number;
  userName: string;
  phoneNumber: string;
  leadAssignmentState: number;
  assignmentType: number;
  assignedAt?: string;
  createdAt?: string;
  callDeadlineAt?: string;
  requiresThreeMinuteCall: boolean;
  reportSubmittedAt?: string | null;
  callResult?: number;
  reportDescription?: string;
}

export interface GetLeadsQuery {
  profileId: number;
  consultantProfileId?: number;
  pageNumber: number;
  pageSize: number;
  search?: string;
}

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
}

export interface SubmitLeadCallReportCommand {
  leadAssignmentId: number;
  consultantProfileId: number;
  callResult: number;
  reportDescription: string;
}

export interface SetAvailableConsultantCommand {
  profileId: number;
  isAvailable: boolean;
}

export interface SetOnlineOfflineConsultantCommand {
  profileId: number;
  isOnline: boolean;
}

export interface ConsultantStatusDto {
  profileId: number;
  isAvailable: boolean;
  isOnline: boolean;
  currentScore?: number;
}

export interface ApiResponse<T = unknown> {
  data?: T;
  result?: T;
  items?: T extends Array<infer U> ? U[] : never;
  totalCount?: number;
  message?: string;
  isSuccess?: boolean;
  success?: boolean;
}
