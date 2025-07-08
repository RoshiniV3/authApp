import { User, UserRole } from "../interfaces/user";


export const mockUsers: User[] = [
  {
    username: 'admin',
    password: 'admin123',
    role: UserRole.ADMIN
  },
  {
    username: 'sasha',
    password: 'mypassword',
    role: UserRole.USER
  },
    {
    username: 'roshini',
    password: 'roshini',
    role: UserRole.STUDENT
  },
  {
    username: 'guest',
    password: 'guest123',
    role: UserRole.GUEST
  }
]
