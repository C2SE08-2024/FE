import { Course } from "../Course/course";

export interface CartDetail {
  cartDetailId?: number;
  status?: boolean;
  cartId?: number; 
  course?: Course;
}
  