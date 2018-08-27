export class UserMarinaRole {
  id: number;
  userId: number;
  userName: string;
  marinaId: number;
  marinaName: string;
  location: string;
  adminRoleId: number;
  adminRoleName: string;
  assignedPos: number;
  currentPos: number;  
  isEditable?: boolean = false;
}
