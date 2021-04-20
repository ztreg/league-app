export interface User {
  id: number;
  name: string;
  status?: "Happy" | "Sad";
  following?: string[];
}