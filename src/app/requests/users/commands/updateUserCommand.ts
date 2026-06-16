export interface UpdateUserCommand {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isCompleteProfile: boolean;
  avatarImageName?: string | null;
  gender: number;
  isActive: boolean;
  roleName: string;
}
