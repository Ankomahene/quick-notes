export interface INote {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
}

export type LayoutType = 'list' | 'grid';

export interface IUser {
  id: number;
  name: string;
  pin?: string;
  username: string;
  created_at?: Date;
}
