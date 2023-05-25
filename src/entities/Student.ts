import { Person } from "./Person"

export interface Student extends Person {
    registration:string;
    carrer:string;
    level:string;
}