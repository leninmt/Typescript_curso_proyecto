import { Activity } from "./entity/Activity";
import { Assignment } from "./entity/Assignment";
import { GradebookDTO } from "./entity/GradebookDTO";
import { GradebookSetup } from "./entity/GradebookSetup";
import { Student } from "./entity/Student";
import { Teacher } from "./entity/Teacher";


let students: Student[] = [];
let teachers: Teacher[] = [];
let activities: Activity[] = [];
let gradebookSetups: GradebookSetup[] = [];
let assignments: Assignment[] = [];

enum Course {
    GraphicDesign = "Graphic Design",
    Database = "Database",
    CommunityManager = "Community Manager"
}

function addStudent(): void {
    let currentStudent: Student =
    {
        dni: readFromHtml("student_dni"),
        fullName: readFromHtml("student_fullname"),
        level: parseInt(readFromHtml("student_level"))
    }
    students.push(currentStudent);
    console.table(students);
}

function addTeacher(): void {
    let currentTeacher: Teacher =
    {
        dni: readFromHtml("teacher_dni"),
        fullName: readFromHtml("teacher_fullname"),
        knowledge_are: readFromHtml("teacher_area") as "Software" | "Marketing" | "Art"
    }
    teachers.push(currentTeacher);
    console.table(teachers);
}

function addActivity(): void {
    let currentActivity: Activity =
    {
        name: readFromHtml("activity_name"),
    }
    activities.push(currentActivity);
    console.table(activities);
    initSelect();
}

function addAssignment(): void {
    let currentAssignment:Assignment =
    {
        student: readFromHtml("assignment_student"),
        gradebooksetup: readFromHtml("gradebook_activity"),
        grade: parseInt(readFromHtml("assignment_grade"))
    }
    assignments.push(currentAssignment);
    console.table(assignments);
    initSelect();
}

function addGradebookSetup(): void {
    let currentGradebookSetup: GradebookSetup =
    {
        value: readFromHtml("gradebook_value"),
        course: readFromHtml("gradebook_course"),
        activity: readFromHtml("gradebook_activity"),
        maximun_grade: parseInt(readFromHtml("gradebook_maximun_grade"))
    }
    gradebookSetups.push(currentGradebookSetup);
    console.table(gradebookSetups);
    initSelect();
}


function readFromHtml(id: string): string {
    return (<HTMLInputElement>document.getElementById(id)).value;
}

function initSelect(): void {

    let gradebookCourse = document.getElementById("gradebook_course") as HTMLSelectElement;

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

    let gradebookActivity = document.getElementById("gradebook_activity") as HTMLSelectElement;
    document.querySelectorAll("#gradebook_activity option").forEach(Option => Option.remove());
    activities.forEach(
        (activity) => {
            let option = document.createElement("option");
            option.value = activity.name;
            option.text = activity.name;
            gradebookActivity.add(option);
        }
    );

    let assignment_student = document.getElementById("assignment_student") as HTMLSelectElement;
    document.querySelectorAll("#assignment_student option").forEach(Option => Option.remove());
    students.forEach(
        (value) => {
            let option = document.createElement("option");
            option.value = value.dni;
            option.text = value.fullName;
            assignment_student.add(option);
        }
    );


}

initSelect();

class Gradebook {

    constructor(
        public students: Student[],
        public activities: Activity[],
        public gradebookSetups: GradebookSetup[],
        public assignments: Assignment[],
        public teachers?: Teacher[],
        )
    {};

    public buildGradebookDTOFromAssignment(): GradebookDTO[] {
        let gradebookDTOs: GradebookDTO[] = [];

        this.assignments.forEach(
            (assignment) => {
                
                let currentGradebooksetup = gradebookSetups.filter((item)=>item.value===assignment.gradebooksetup)[0];
                let currentStudent = students.filter( (student)=> student.dni === assignment.student)[0];

                let rowGradebook:GradebookDTO = {
                    //Course
                    course:currentGradebooksetup.course,
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
                }
                gradebookDTOs.push(rowGradebook);
            }
        );

        return gradebookDTOs;
    }

}

function generateReport():void {
    let reportGrade: Gradebook = new Gradebook(
        students, 
        activities, 
        gradebookSetups, 
        assignments, 
        teachers
    ) ;

    let rowReport: GradebookDTO[] = reportGrade.buildGradebookDTOFromAssignment();
    let reportTable: HTMLTableElement = document.getElementById("report") as HTMLTableElement
    rowReport.forEach((itemDTO)=>{

        let tr: HTMLTableRowElement;
        let td: HTMLTableCellElement;
        tr = reportTable.insertRow(0);
        td = tr.insertCell(0);
        td.innerHTML = itemDTO.course;
        td = tr.insertCell(1);
        td.innerHTML = itemDTO.student;
    })
}