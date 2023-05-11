import { Person } from "./person";
export interface Students extends Person {
 registrationCode: number;
 level: string;
}