import { Course } from "../Course/course";
import { Cart } from "./cart.model";

export interface CartDetail {
    cartDetailId?: number;
    status?: boolean;
    cartId?: number; 
    course?: Course;
    
  }
  