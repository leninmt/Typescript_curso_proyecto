"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let students = [];
let teachers = [];
let activities = [];
let gradebookSetups = [];
let assignments = [];
var Carrera;
(function (Carrera) {
    Carrera["turismo"] = "Turismo";
    Carrera["marketing"] = "Marketing";
    Carrera["software"] = "Software";
})(Carrera || (Carrera = {}));
var Course;
(function (Course) {
    Course["GraphicDesign"] = "Graphic Design";
    Course["Database"] = "Database";
    Course["CommunityManager"] = "Community Manager";
})(Course || (Course = {}));
function addStudent() {
    let currentStudent = {
        name: readFromHtml("nameStudent"),
        dni: readFromHtml("identStudent"),
        adress: readFromHtml("adressStudent"),
        registration: readFromHtml("registrationStudent"),
        carrer: readFromHtml("carrerStudent"),
        level: readFromHtml("levelStudent")
    };
    students.push(currentStudent);
    console.log(students);
    console.table(students);
}
function addTeacher() {
    let currentTeacher = {
        name: readFromHtml("nameTeacher"),
        dni: readFromHtml("idTeacher"),
        adress: readFromHtml("addressTeacher"),
        title: readFromHtml("titleTeacher"),
        asignature: readFromHtml("asignatureTeacher"),
    };
    teachers.push(currentTeacher);
    console.log(teachers);
    console.table(teachers);
}
function readHtml(id) {
    return document.getElementById(id).value;
}
function addActivity() {
    let currentActivity = {
        name: readFromHtml("activity_name"),
    };
    activities.push(currentActivity);
    console.table(activities);
    initSelect();
}
function addGradebookSetup() {
    let currentGradebookSetup = {
        value: readFromHtml("gradebook_value"),
        course: readFromHtml("gradebook_course"),
        activity: readFromHtml("gradebook_activity"),
        maximun_grade: parseInt(readFromHtml("gradebook_maximun_grade")),
        gradebooksetup: ""
    };
    gradebookSetups.push(currentGradebookSetup);
    console.table(gradebookSetups);
    initSelect();
}
function addAssigment() {
    let currentAssignment = {
        student: readFromHtml("assignmentStudent"),
        gradebooksetup: readFromHtml("asignmentGradebooksetup"),
        grade: parseInt(readFromHtml("asignmentGrade"))
    };
    assignments.push(currentAssignment);
    console.table(assignments);
    initSelect();
}
function readFromHtml(id) {
    return document.getElementById(id).value;
}
function initSelect() {
    let gradebookCourse = document.getElementById("gradebook_course");
    document.querySelectorAll("#gradebook_course option").forEach(option => option.remove());
    let courses = Object.values(Course);
    courses.forEach((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.text = value;
        gradebookCourse.add(option);
    });
    let gradebookActivity = document.getElementById("gradebook_activity");
    document.querySelectorAll("#gradebook_activity option").forEach(option => option.remove());
    activities.forEach((activity) => {
        let option = document.createElement("option");
        option.value = activity.name;
        option.text = activity.name;
        gradebookActivity.add(option);
    });
    let assignmentStudent = document.getElementById("assignmentStudent");
    document.querySelectorAll("#assignmentStudent option").forEach(option => option.remove());
    students.forEach((value) => {
        let option = document.createElement("option");
        option.value = value.name;
        option.text = value.name;
        assignmentStudent.add(option);
    });
    let assignmentValue = document.getElementById("asignmentGradebooksetup");
    document.querySelectorAll("#asignmentGradebooksetup option").forEach(option => option.remove());
    assignments.forEach((data) => {
        let option = document.createElement("option");
        option.value = data.gradebooksetup;
        option.text = data.gradebooksetup;
        assignmentValue.add(option);
    });
    let assignmentSetup = document.getElementById("asignmentGradebooksetup");
    document.querySelectorAll("#asignmentGradebooksetup option").forEach(option => option.remove());
    gradebookSetups.forEach((data) => {
        let option = document.createElement("option");
        option.value = data.value;
        option.text = data.value;
        assignmentSetup.add(option);
    });
}
initSelect();
class Gradebook {
    constructor(students, activities, gradebookSetups, assignments, teachers) {
        this.students = students;
        this.activities = activities;
        this.gradebookSetups = gradebookSetups;
        this.assignments = assignments;
        this.teachers = teachers;
    }
    ;
    buildGradebookDTOFromAssignment() {
        let gradebookDTOs = [];
        this.assignments.forEach((assignment) => {
            let currentGradebooksetup = gradebookSetups.filter((item) => item.value === assignment.gradebooksetup)[0];
            let currentStudent = students.filter((student) => student.dni === assignment.student)[0];
            let rowGradebook = {
                //Course
                course: currentGradebooksetup.course,
                //Student
                studentName: currentStudent.name,
                lastName: "",
                level: currentStudent.level,
                dni: assignment.student,
                name: currentStudent.name,
                //GradebookSetup
                value: "",
                activity: "",
                maximun_grade: 0,
                //Activity
                //Assignment
                student: assignment.student,
                gradebooksetup: assignment.gradebooksetup,
                grade: assignment.grade,
                registration: "",
                carrer: "",
                adress: ""
            };
            gradebookDTOs.push(rowGradebook);
        });
        return gradebookDTOs;
    }
}
function generateReport() {
    let reportGrade = new Gradebook(students, activities, gradebookSetups, assignments, teachers);
    let rowReport = reportGrade.buildGradebookDTOFromAssignment();
    let reportTable = document.getElementById("report");
    rowReport.forEach((itemDTO) => {
        let tr;
        let td;
        tr = reportTable.insertRow(0);
        td = tr.insertCell(0);
        td.innerHTML = itemDTO.course;
        td = tr.insertCell(1);
        td.innerHTML = itemDTO.student;
    });
}
