"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let students = [];
let teachers = [];
let activities = [];
let gradebookSetups = [];
let assignments = [];
var Course;
(function (Course) {
    Course["GraphicDesign"] = "Graphic Design";
    Course["Database"] = "Database";
    Course["CommunityManager"] = "Community Manager";
})(Course || (Course = {}));
function addStudent() {
    let currentStudent = {
        dni: readFromHtml("student_dni"),
        fullName: readFromHtml("student_fullname"),
        level: parseInt(readFromHtml("student_level"))
    };
    students.push(currentStudent);
    console.table(students);
}
function addTeacher() {
    let currentTeacher = {
        dni: readFromHtml("teacher_dni"),
        fullName: readFromHtml("teacher_fullname"),
        knowledge_are: readFromHtml("teacher_area")
    };
    teachers.push(currentTeacher);
    console.table(teachers);
}
function addActivity() {
    let currentActivity = {
        name: readFromHtml("activity_name"),
    };
    activities.push(currentActivity);
    console.table(activities);
    initSelect();
}
function addAssignment() {
    let currentAssignment = {
        student: readFromHtml("assignment_student"),
        gradebooksetup: readFromHtml("gradebook_activity"),
        grade: parseInt(readFromHtml("assignment_grade"))
    };
    assignments.push(currentAssignment);
    console.table(assignments);
    initSelect();
}
function addGradebookSetup() {
    let currentGradebookSetup = {
        value: readFromHtml("gradebook_value"),
        course: readFromHtml("gradebook_course"),
        activity: readFromHtml("gradebook_activity"),
        maximun_grade: parseInt(readFromHtml("gradebook_maximun_grade"))
    };
    gradebookSetups.push(currentGradebookSetup);
    console.table(gradebookSetups);
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
    document.querySelectorAll("#gradebook_activity option").forEach(Option => Option.remove());
    activities.forEach((activity) => {
        let option = document.createElement("option");
        option.value = activity.name;
        option.text = activity.name;
        gradebookActivity.add(option);
    });
    let assignment_student = document.getElementById("assignment_student");
    document.querySelectorAll("#assignment_student option").forEach(Option => Option.remove());
    students.forEach((value) => {
        let option = document.createElement("option");
        option.value = value.dni;
        option.text = value.fullName;
        assignment_student.add(option);
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
                studentName: currentStudent.fullName,
                lastName: "",
                level: currentStudent.level,
                dni: assignment.student,
                fullName: currentStudent.fullName,
                //GradebookSetup
                value: "",
                activity: "",
                maximun_grade: 0,
                //Activity
                name: "",
                //Assignment
                student: assignment.student,
                gradebooksetup: assignment.gradebooksetup,
                grade: assignment.grade
            };
            gradebookDTOs.push(rowGradebook);
        });
        return gradebookDTOs;
    }
}
