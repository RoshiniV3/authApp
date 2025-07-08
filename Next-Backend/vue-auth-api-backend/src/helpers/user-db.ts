import { User, UserRole } from "../interfaces/user";


export const mockUsers: User[] = [
  {
    username: 'admin',
    password: 'admin123',
    role: UserRole.ADMIN
  },
  {
    username: 'roshni',
    password: 'mypassword',
    role: UserRole.USER
  },
  {
    username: 'guest',
    password: 'guest123',
    role: UserRole.GUEST
  }
]
