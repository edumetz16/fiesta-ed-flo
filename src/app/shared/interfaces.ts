export type Invitee = {
  code: string;
  name: string; 
  gender: 'male' | 'female' | 'other';
  quantity: number;
  assists?: number;
}