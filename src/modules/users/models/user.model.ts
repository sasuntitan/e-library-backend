import { UserRole } from './user-role.enum';

export class UserModel {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  phoneNumber: string;
  profilePictureUrl: string | null;
}
