export const users = [
  { name: 'سارا احمدی', phone: '09120001111', role: 'Patient', status: 'Active' },
  { name: 'علی محمدی', phone: '09123334444', role: 'Consultant', status: 'Active' },
  { name: 'مریم رضایی', phone: '09125556666', role: 'Admin', status: 'Pending' }
];
export const consultants = [
  { name: 'دکتر نادری', phone: '09127778888', status: 'Online', specialty: 'ایمپلنت' },
  { name: 'مشاور کیانی', phone: '09129990000', status: 'Present', specialty: 'ارتودنسی' }
];
export const leads = [
  { name: 'نیما کریمی', phone: '09121112222', status: 'New', assigned: 'مشاور کیانی', description: 'ایمپلنت' },
  { name: 'الهام شریفی', phone: '09124445555', status: 'Called', assigned: 'دکتر نادری', description: 'ارتودنسی' }
];
export const profiles = [{ name: 'رضا رستمی', phone: '09128889999', treatment: 'لمینت' }];
export const reservations = [
  { date: '2026-06-20', time: '10:00', consultant: 'مشاور کیانی', status: 'Confirmed' },
  { date: '2026-06-25', time: '16:30', consultant: 'دکتر نادری', status: 'Pending' }
];
