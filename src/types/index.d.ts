export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface Friend {
  id: number;
  userId: number;
  user: User;
  name: string;
  mbti: string;
  age: number;
  gender: string;
  profilePictureUrl?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface Room {
  id: number;
  userId: number;
  user: User;
  friendId: number;
  friend: Friend;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface Message {
  id: number;
  roomId: number;
  room: Room;
  userId?: number;
  user?: User;
  friendId?: number;
  friend?: Friend;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
