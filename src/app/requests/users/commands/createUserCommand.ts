import { Gender } from "../../../enums/gender.enum";

export interface CreateUserCommand {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  passwordHash: string;
  isCompleteProfile: boolean;
  avatarImageName?: string | null;
  gender: Gender;
  birthDate: Date;
  roleName: string;
}
