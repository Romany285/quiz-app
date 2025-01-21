import { Component } from "@angular/core";
import { IStudent } from "./interfaces/student.interface";
import { StudentsService } from "./services/students.service";

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrl: "./students.component.scss",
})
export class StudentsComponent {
  students: IStudent[] = [];
  studentActions = [
    { label: "View", action: "view" },
    { label: "Update", action: "update" },
    { label: "Delete", action: "delete", isDanger: true },
    { label: "Add to group", action: "addToGroup " },
    { label: "Delete from group", action: "deleteFromGroup " },
  ];

  constructor(private _StudentsService: StudentsService) {
    this.onGetAllStudents();
    this.onGetStudentsWithoutGroup();
  }
  onGetAllStudents(): void {
    this._StudentsService.getAllStudents().subscribe((res) => {
      this.students = res;
      console.log(this.students);
    });
  }
  onGetStudentsWithoutGroup() {
    this._StudentsService.getAllWithoutGroup().subscribe((res) => {
      console.log(res);
    });
  }
  onStudentAction(event: { action: string; data: IStudent }): void {
    const { action, data } = event;
    switch (action) {
      case "view":
        console.log("View Student:", data);
        break;
      case "update":
        console.log("Update Student:", data);
        break;
      case "delete":
        if (confirm(`Are you sure you want to delete ${data.first_name}?`)) {
          console.log("Delete Student:", data);
          // Call the service to delete the student
        }
        break;
      case "addToGroup":
        console.log("Add student to group:", data);
        break;
      case "deleteFromGroup":
        console.log("delete student to group:", data);
        break;

      default:
        console.error("Unknown action:", action);
    }
  }
}
