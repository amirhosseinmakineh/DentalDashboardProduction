import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastrService {
  success(message: string): void { console.log(message); }
  error(message: string): void { console.error(message); }
  warning(message: string): void { console.warn(message); }
}
