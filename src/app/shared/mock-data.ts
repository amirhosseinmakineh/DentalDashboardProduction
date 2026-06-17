export enum UserRole { Patient = 'بیمار', Consultant = 'مشاور', Admin = 'مدیر' }
export enum UserStatus { Active = 'فعال', Pending = 'در انتظار' }
export enum ConsultantStatus { Online = 'آنلاین', Present = 'حاضر', Absent = 'غایب' }
export enum LeadStatus { New = 'جدید', Called = 'تماس گرفته' }
export enum ReservationStatus { Confirmed = 'تاییدشده', Pending = 'در انتظار' }

export const users = [
  { name: 'سارا احمدی', phone: '09120001111', role: UserRole.Patient, status: UserStatus.Active },
  { name: 'علی محمدی', phone: '09123334444', role: UserRole.Consultant, status: UserStatus.Active },
  { name: 'مریم رضایی', phone: '09125556666', role: UserRole.Admin, status: UserStatus.Pending }
];
export const consultants = [
  { id: 'c-1001', name: 'دکتر نادری', phone: '09127778888', status: ConsultantStatus.Online, specialty: 'ایمپلنت' },
  { id: 'c-1002', name: 'مشاور کیانی', phone: '09129990000', status: ConsultantStatus.Present, specialty: 'ارتودنسی' }
];
export const leads = [
  { id: 'l-2001', consultantId: 'c-1002', name: 'نیما کریمی', phone: '09121112222', status: LeadStatus.New, assigned: 'مشاور کیانی', description: 'ایمپلنت' },
  { id: 'l-2002', consultantId: 'c-1001', name: 'الهام شریفی', phone: '09124445555', status: LeadStatus.Called, assigned: 'دکتر نادری', description: 'ارتودنسی' }
];
export const profiles = [{ name: 'رضا رستمی', phone: '09128889999', treatment: 'لمینت' }];
export const reservations = [
  { date: '1405/03/30', time: '10:00', consultant: 'مشاور کیانی', status: ReservationStatus.Confirmed },
  { date: '1405/04/04', time: '16:30', consultant: 'دکتر نادری', status: ReservationStatus.Pending }
];

export const consultantAttendance = [
  { consultantId: 'c-1001', consultant: 'دکتر نادری', date: '1405/03/28', checkIn: '08:45', checkOut: '16:20', status: ConsultantStatus.Present },
  { consultantId: 'c-1002', consultant: 'مشاور کیانی', date: '1405/03/28', checkIn: '09:10', checkOut: 'در حال کار', status: ConsultantStatus.Online },
  { consultantId: 'c-1001', consultant: 'دکتر نادری', date: '1405/03/27', checkIn: '-', checkOut: '-', status: ConsultantStatus.Absent }
];
