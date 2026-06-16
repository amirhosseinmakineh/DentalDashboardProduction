export interface AttendanceDto {
  id: number;
  attendanceDate: string;
  checkInTime: string;
  checkOutTime: string;
  status: number;
  description?: string | null;
}
