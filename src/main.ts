import { Students } from "./entities/students"
import { Teachers } from "./entities/teacher"
import { Course } from "./entities/course";
import { Activity } from "./entities/activity";
import { GradesBook } from "./entities/grades-books";
let students: Students[] = [];
let teachers: Teachers[] = [];
let courses: Course[] = [];
let activities: Activity[] = [];
let gradesBook: GradesBook[]=[];
enum Carrera {
   turismo = "Turismo",
   marketing = "Marketing",
   software = "Software"
}

enum Course{
   typescript = "Typescript",
   php = "PHP",
   angular = "Angular"

}
enum Area {
   programacion = "Progrmacion",
   diseño = "Diseño",
   redes = " Redes"
}

function addStudent() {
   let currentStudent: Students = {
      name: readHtml("nameStudent"),
      id: parseInt(readHtml("idStudent")),
      address: readHtml("addressStudent"),
      registrationCode: parseInt(readHtml("registrationCodeStudent")),
      level: readHtml("levelStudent"),
   }
   students.push(currentStudent);
   console.log(students);
   console.table(students);
}
function addTeacher() {
   let currentTeacher: Teachers = {
      name: readHtml("nameTeacher"),
      id: parseInt(readHtml("idTeacher")),
      address: readHtml("addressTeacher"),
      title: readHtml("titleTeacher"),
      asignature: readHtml("asignatureTeacher") as "Interfaces" | "Programacion" | "Metodologias",
      carrer: readHtml("carrerTeacher"),
   }
   teachers.push(currentTeacher);
   console.log(teachers);
   console.table(teachers);
}


/*function addCourse() {
   let currentCourse: Course = {
      area: readHtml("areaCourse"),
      name: readHtml("nameCourse"),
   }
   courses.push(currentCourse);
   console.log(courses);
   console.table(courses);
}
*/
function addActivity() {
   let currentActivity: Activity = {
      nameActivity: readHtml("nameActivity"),
   }
   activities.push(currentActivity);
   console.table(activities);
}



function addGradesBook() {
   let currentGradesBook: GradesBook = {
      course: readHtml("course"),
      activity: readHtml("activity"),
      weight : parseInt(readHtml("weightGradesBook")),
      noteMax: parseInt(readHtml("noteMaxGradesBook"))
   }
   gradesBook.push(currentGradesBook);
   console.table(gradesBook);
}


function readHtml(id: string): string {
   return (<HTMLInputElement>document.getElementById(id)).value;
}

function readCourse(): void{
   let courseGradesBook= document.getElementById("courseGradesBook") as HTMLSelectElement;
   //document.querySelectorAll('//courseGradesBook option').forEach(option => option.remove());

   let courses = Object.values(Course);
   courses.forEach((value)=>{                      //convierte el enum a arreglo
      let option = document.createElement("option");        
      option.value= value;
      option.text = value;

      courseGradesBook.add(option)
   })                                                                                        
}