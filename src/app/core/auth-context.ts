import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { currentConsultantProfileId, readStorage, removeStorage, writeStorage } from './consultant-profile-context';

export type AppRole = 'Admin' | 'Patient' | 'Consultant' | 'Secretary' | 'NormalUser';

const roleById: Record<string, AppRole> = { '1': 'Admin', '2': 'Patient', '3': 'Consultant', '4': 'Secretary', '5': 'NormalUser' };
const dashboardByRole: Record<AppRole, string> = { Admin: '/admin', Patient: '/patient', Consultant: '/consultant', Secretary: '/', NormalUser: '/' };
const authStorageKeys = ['authToken','currentUserRole','currentUserId','currentUserPhone','currentUserFirstName','currentUserLastName','consultantProfileId','consultantIsAvailable','consultantIsOnline'];

export interface AuthLikeResponse { token?: string; accessToken?: string; jwtToken?: string; roleName?: string; role?: string | number; roleId?: string | number; userId?: string; id?: string; phoneNumber?: string; firstName?: string; lastName?: string; data?: AuthLikeResponse; result?: AuthLikeResponse; item?: AuthLikeResponse; }

export function token(): string { return readStorage('authToken'); }
export function dashboardForRole(role: string): string { return dashboardByRole[normalizeRole(role) as AppRole] ?? '/'; }
export function normalizeRole(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '';
  const raw = String(value).trim();
  return roleById[raw] ?? raw;
}
export function currentRole(): string {
  const stored = normalizeRole(readStorage('currentUserRole'));
  if (stored) return stored;
  return normalizeRole(jwtClaim('role') || jwtClaim('Role') || jwtClaim('roleId') || jwtClaim('RoleId') || jwtClaim('roleName') || jwtClaim('RoleName'));
}
export function currentFullName(): string {
  const firstName = readStorage('currentUserFirstName') || jwtClaim('firstName') || jwtClaim('FirstName') || jwtClaim('given_name') || jwtClaim('name');
  const lastName = readStorage('currentUserLastName') || jwtClaim('lastName') || jwtClaim('LastName') || jwtClaim('family_name') || jwtClaim('surname');
  return `${firstName} ${lastName}`.trim();
}
export function persistAuth(response: unknown, fallbackPhone = ''): string {
  const auth = flattenAuthResponse(response);
  const authToken = auth.token ?? auth.accessToken ?? auth.jwtToken ?? '';
  if (authToken) writeStorage('authToken', authToken);
  const resolvedRole = normalizeRole(auth.roleName ?? auth.role ?? auth.roleId ?? jwtClaim('role', authToken) ?? jwtClaim('Role', authToken) ?? jwtClaim('roleId', authToken) ?? jwtClaim('RoleId', authToken));
  if (resolvedRole) writeStorage('currentUserRole', resolvedRole);
  if (auth.userId ?? auth.id ?? jwtClaim('nameid', authToken)) writeStorage('currentUserId', String(auth.userId ?? auth.id ?? jwtClaim('nameid', authToken)));
  if (auth.phoneNumber ?? fallbackPhone) writeStorage('currentUserPhone', String(auth.phoneNumber ?? fallbackPhone));
  const firstName = auth.firstName ?? jwtClaim('firstName', authToken) ?? jwtClaim('FirstName', authToken) ?? jwtClaim('given_name', authToken) ?? jwtClaim('name', authToken);
  const lastName = auth.lastName ?? jwtClaim('lastName', authToken) ?? jwtClaim('LastName', authToken) ?? jwtClaim('family_name', authToken) ?? jwtClaim('surname', authToken);
  if (firstName) writeStorage('currentUserFirstName', firstName);
  if (lastName) writeStorage('currentUserLastName', lastName);
  return resolvedRole;
}

export function clearAuth(): void {
  if (typeof localStorage === 'undefined') return;
  ['authToken', 'currentUserRole', 'currentUserId', 'currentUserPhone', 'currentUserFirstName', 'currentUserLastName', 'consultantProfileId'].forEach(key => localStorage.removeItem(key));
}
export function isAuthenticated(): boolean { return Boolean(token()); }
export function roleGuard(allowedRoles: AppRole[]): CanActivateFn {
  return () => {
    const router = inject(Router);
    if (!isAuthenticated()) return router.parseUrl('/');
    const role = normalizeRole(currentRole());
    if (allowedRoles.includes(role as AppRole)) return true;
    return router.parseUrl(dashboardForRole(role));
  };
}
export const consultantProfileGuard: CanActivateFn = (_route, state) => {
  const router = inject(Router);
  if (state.url.startsWith('/consultant/profiles')) return true;
  return currentConsultantProfileId() > 0 ? true : router.parseUrl('/consultant/profiles');
};

function flattenAuthResponse(response: unknown): AuthLikeResponse {
  if (!response || typeof response !== 'object') return {};
  const record = response as AuthLikeResponse;
  if (record.token || record.accessToken || record.jwtToken || record.role || record.roleId || record.roleName) return record;
  return flattenAuthResponse(record.data ?? record.result ?? record.item);
}
function jwtClaim(name: string, customToken = token()): string {
  if (!customToken || typeof atob === 'undefined') return '';
  try {
    const payload = JSON.parse(atob(customToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))) as Record<string, unknown>;
    const value = payload[name] ?? payload[`http://schemas.xmlsoap.org/ws/2005/05/identity/claims/${name}`] ?? payload[`http://schemas.microsoft.com/ws/2008/06/identity/claims/${name}`] ?? (name.toLowerCase().includes('role') ? payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] : undefined);
    return Array.isArray(value) ? String(value[0] ?? '') : String(value ?? '');
  } catch { return ''; }
}
