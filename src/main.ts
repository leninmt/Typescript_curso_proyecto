import{Students} from "./entities/students"
import{Teachers} from "./entities/teacher"
import {Course} from "./entities/course";
let students: Students[] = [];
let teachers: Teachers[] = [];
let courses: Course[] = [];
enum Carrera {
    turismo = "Turismo",
    marketing = "Marketing",
    software = "Software",
}
function addStudent(){
 let currentStudent: Students = {
    name: readHtml("nameStudent"),
    id: parseInt( readHtml("idStudent")),
    address: readHtml("addressStudent"),
    registrationCode: parseInt ( readHtml("registrationCodeStudent")),
    level: readHtml("levelStudent"),
 }
 students.push(currentStudent);
 console.log(students);
 console.table(students);
}
function addTeacher(){
    let currentTeacher: Teachers = {
       name: readHtml("nameTeacher"),
       id: parseInt( readHtml("idTeacher")),
       address: readHtml("addressTeacher"),
       title:readHtml("titleTeacher"),
       asignature: readHtml("asignatureTeacher") as "Interfaces" | "Programacion" | "Metodologias",
       carrer: readHtml("carrerTeacher"),
    }
    teachers.push(currentTeacher);
    console.log(teachers);
    console.table(teachers);
   }

   
   function addCourse(){
    let currentCourse: Course = {
       area: readHtml("areaCourse"),
       name:  readHtml("nameCourse"),
    }
    courses.push(currentCourse);
    console.log(courses);
    console.table(courses);
   }
function readHtml(id: string): string{
    return (<HTMLInputElement> document.getElementById(id)).value;
}