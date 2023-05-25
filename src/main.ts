import{ Student } from "./entities/Student"
import{ Teacher } from "./entities/Teacher";
import { Activity } from "./entities/Activity";
import { Assignment } from "./entities/Assignments";
import { GradebookDTO } from "./entities/GradebookDTO";
import { GradebookSetup } from "./entities/GradebookSetup";
let students: Student[] = [];
let teachers: Teacher[] = [];
let activities: Activity[] = [];
let gradebookSetups: GradebookSetup[] = [];
let assignments: Assignment[] = [];
enum Carrera {
    turismo = "Turismo",
    marketing = "Marketing",
    software = "Software",
}
enum Course {
    GraphicDesign = "Graphic Design",
    Database = "Database",
    CommunityManager = "Community Manager"
}
function addStudent(): void{
    let currentStudent:Student ={
        
        name: readFromHtml("nameStudent"),
        dni: readFromHtml("identStudent"),
        adress: readFromHtml("adressStudent"),
        registration:readFromHtml("registrationStudent"),
        carrer: readFromHtml("carrerStudent"),
        level: readFromHtml("levelStudent")
    }
    students.push(currentStudent);
    console.log(students);
    console.table(students);

}

function addTeacher(): void{
    let currentTeacher: Teacher = {
       name: readFromHtml("nameTeacher"),
       dni: readFromHtml("idTeacher"),
       adress: readFromHtml("addressTeacher"),
       title:readFromHtml("titleTeacher"),
       asignature: readFromHtml("asignatureTeacher") as "Interfaces" | "Programacion" | "Metodologias",
    }
    teachers.push(currentTeacher);
    console.log(teachers);
    console.table(teachers);
   }

function readHtml(id: string): string{
    return (<HTMLInputElement>document.getElementById(id)).value;
}


function addActivity(): void{
    let currentActivity:Activity = {
        name: readFromHtml("activity_name"),
    } 

    activities.push(currentActivity);
    console.table(activities);
    initSelect();
}

function addGradebookSetup(): void{
    let currentGradebookSetup:GradebookSetup = {
        value: readFromHtml("gradebook_value"),
        course: readFromHtml("gradebook_course"),
        activity: readFromHtml("gradebook_activity"),
        maximun_grade: parseInt(readFromHtml("gradebook_maximun_grade")),
        gradebooksetup: ""
    } 

    gradebookSetups.push(currentGradebookSetup);
    console.table(gradebookSetups);
    initSelect();
}

function addAssigment(): void{
    let currentAssignment:Assignment = {
        student: readFromHtml("assignmentStudent"),
        gradebooksetup: readFromHtml("asignmentGradebooksetup"),
        grade: parseInt( readFromHtml("asignmentGrade"))
    } 

    assignments.push(currentAssignment);
    console.table(assignments);

    initSelect();
}


function readFromHtml(id: string):string {
    return (<HTMLInputElement> document.getElementById(id)).value;
}

function initSelect():void{

    let gradebookCourse =  document.getElementById("gradebook_course") as HTMLSelectElement;

    document.querySelectorAll("#gradebook_course option").forEach(option => option.remove());

    let courses = Object.values(Course);
    courses.forEach(
        (value) => {
            let option = document.createElement("option");
            option.value = value;
            option.text = value;
            gradebookCourse.add(option);
        }
    );

    let gradebookActivity =  document.getElementById("gradebook_activity") as HTMLSelectElement;

    document.querySelectorAll("#gradebook_activity option").forEach(option => option.remove());

    activities.forEach(
        (activity) => {
            let option = document.createElement("option");
            option.value = activity.name;
            option.text = activity.name;
            gradebookActivity.add(option);
        }
    );

    let assignmentStudent =  document.getElementById("assignmentStudent") as HTMLSelectElement;

    document.querySelectorAll("#assignmentStudent option").forEach(option => option.remove());
    
    students.forEach(
        (value) => {
            let option = document.createElement("option");
            option.value = value.name;
            option.text = value.name;
           assignmentStudent.add(option);
        }
    );

    let assignmentValue =  document.getElementById("asignmentGradebooksetup") as HTMLSelectElement;

    document.querySelectorAll("#asignmentGradebooksetup option").forEach(option => option.remove());

    assignments.forEach(
        (data) => {
            let option = document.createElement("option");
            option.value = data.gradebooksetup;
            option.text = data.gradebooksetup;
           assignmentValue.add(option);
        }
    );

    let assignmentSetup =  document.getElementById("asignmentGradebooksetup") as HTMLSelectElement;

    document.querySelectorAll("#asignmentGradebooksetup option").forEach(option => option.remove());

    gradebookSetups.forEach(
        (data) => {
            let option = document.createElement("option");
            option.value = data.value;
            option.text = data.value;
           assignmentSetup.add(option);
        }
    );

    
}

initSelect()

class Gradebook {
       
    constructor(public students: Student[], 
                public activities: Activity[], 
                public gradebookSetups: GradebookSetup[], 
                public assignments: Assignment[], 
                public teachers: Teacher[])
    {};
    

    public buildGradebookDTOFromAssignment(): GradebookDTO[] {
        let gradebookDTOs: GradebookDTO[] = [];

        this.assignments.forEach(
            (assignment) => {
                
                let currentGradebooksetup = gradebookSetups.filter((item)=>item.value===assignment.gradebooksetup)[0];
                let currentStudent = students.filter( (student)=> student.dni === assignment.student)[0];

                let rowGradebook:GradebookDTO = {
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
                }
                gradebookDTOs.push(rowGradebook);
            }
        );

        return gradebookDTOs;
    }

}

function generateReport(): void{
    let reportGrade: Gradebook = new Gradebook(
        students, 
        activities, 
        gradebookSetups, 
        assignments, 
        teachers
    );
    
    let rowReport: GradebookDTO[] = reportGrade.buildGradebookDTOFromAssignment();
    let reportTable: HTMLTableElement = document.getElementById("report") as HTMLTableElement;
    rowReport.forEach((itemDTO)=> {
        let tr: HTMLTableRowElement;
        let td: HTMLTableCellElement;
        tr = reportTable.insertRow(0);
        td = tr.insertCell(0);
        td.innerHTML = itemDTO.course;
        td = tr.insertCell(1);
        td.innerHTML = itemDTO.student;
    })
}
