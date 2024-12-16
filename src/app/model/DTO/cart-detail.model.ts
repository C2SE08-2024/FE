import { Course } from "../Course/course";
import { Cart } from "./cart.model";

export interface CartDetail {
    cartDetailId: number;
    cart: Cart;
    status: boolean; 
    course: Course;
  }
  