export interface ConsultantContextResponse {
  id?: number | string;
  profileId?: number | string;
  consultantProfileId?: number | string;
  data?: ConsultantContextResponse;
  item?: ConsultantContextResponse;
  result?: ConsultantContextResponse;
}

export function readStorage(key: string, fallback = ''): string {
  if (typeof localStorage === 'undefined') return fallback;
  return localStorage.getItem(key) ?? fallback;
}

export function writeStorage(key: string, value: string): void {
  if (typeof localStorage !== 'undefined') localStorage.setItem(key, value);
}

export function currentConsultantProfileId(): number {
  return Number(readStorage('consultantProfileId', '0')) || 0;
}

export function persistConsultantProfileId(profileId: number): void {
  if (profileId > 0) writeStorage('consultantProfileId', String(profileId));
}

export function currentUserPhone(): string {
  return readStorage('currentUserPhone') || readStorage('phoneNumber') || readStorage('userPhone');
}

export function extractConsultantProfileId(response: ConsultantContextResponse | ConsultantContextResponse[] | unknown): number {
  if (Array.isArray(response)) {
    return response.map(extractConsultantProfileId).find((id) => id > 0) ?? 0;
  }

  if (!response || typeof response !== 'object') return 0;
  const record = response as ConsultantContextResponse;
  const direct = Number(record.profileId ?? record.consultantProfileId ?? record.id ?? 0);
  if (direct > 0) return direct;

  return extractConsultantProfileId(record.data ?? record.item ?? record.result);
}
