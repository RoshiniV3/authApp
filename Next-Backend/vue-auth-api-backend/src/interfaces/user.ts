

export interface User {
  username: string
  password: string
  role: UserRole
}


export const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
  STUDENT: 'student'
} as const

export type UserRole = typeof UserRole[keyof typeof UserRole]