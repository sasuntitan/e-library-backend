import { UserRole } from 'src/modules/users/models/user-role.enum';

export class TokenPayloadModel {
  constructor(public readonly sub: number, public readonly role: UserRole) {}
}
