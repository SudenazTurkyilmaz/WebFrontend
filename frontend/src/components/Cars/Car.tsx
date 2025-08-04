import { Category } from "../Categories/Category";
import { Service } from "../Services/Service";

export type Car = {
  Services: string;
  id: number;
  name: string;
  categoryId: number;
  count: number;
  category: Category;
  services: Service[];
};
