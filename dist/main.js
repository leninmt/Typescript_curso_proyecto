"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let students = [];
let teachers = [];
let courses = [];
let activities = [];
let gradesBook = [];
var Carrera;
(function (Carrera) {
    Carrera["turismo"] = "Turismo";
    Carrera["marketing"] = "Marketing";
    Carrera["software"] = "Software";
})(Carrera || (Carrera = {}));
var Course;
(function (Course) {
    Course["typescript"] = "Typescript";
    Course["php"] = "PHP";
    Course["angular"] = "Angular";
})(Course || (Course = {}));
var Area;
(function (Area) {
    Area["programacion"] = "Progrmacion";
    Area["dise\u00F1o"] = "Dise\u00F1o";
    Area["redes"] = " Redes";
})(Area || (Area = {}));
function addStudent() {
    let currentStudent = {
        name: readHtml("nameStudent"),
        id: parseInt(readHtml("idStudent")),
        address: readHtml("addressStudent"),
        registrationCode: parseInt(readHtml("registrationCodeStudent")),
        level: readHtml("levelStudent"),
    };
    students.push(currentStudent);
    console.log(students);
    console.table(students);
}
function addTeacher() {
    let currentTeacher = {
        name: readHtml("nameTeacher"),
        id: parseInt(readHtml("idTeacher")),
        address: readHtml("addressTeacher"),
        title: readHtml("titleTeacher"),
        asignature: readHtml("asignatureTeacher"),
        carrer: readHtml("carrerTeacher"),
    };
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
    let currentActivity = {
        nameActivity: readHtml("nameActivity"),
    };
    activities.push(currentActivity);
    console.table(activities);
}
function addGradesBook() {
    let currentGradesBook = {
        course: readHtml("course"),
        activity: readHtml("activity"),
        weight: parseInt(readHtml("weightGradesBook")),
        noteMax: parseInt(readHtml("noteMaxGradesBook"))
    };
    gradesBook.push(currentGradesBook);
    console.table(gradesBook);
}
function readHtml(id) {
    return document.getElementById(id).value;
}
function readCourse() {
    let courseGradesBook = document.getElementById("courseGradesBook");
    //document.querySelectorAll('//courseGradesBook option').forEach(option => option.remove());
    let courses = Object.values(Course);
    courses.forEach((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.text = value;
        courseGradesBook.add(option);
    });
}
