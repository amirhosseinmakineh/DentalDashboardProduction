import { Gender } from "../../enums/gender.enum";

export interface RegisterCommand
{
  firstName : string;
  lastName : string;
  phoneNumber : string;
  passwordHash : string;
  avatarImageName : string;
  Gender : Gender;
  birthDate : Date
}

