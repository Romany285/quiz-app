import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { HelperServiceService } from "../../../../../../shared/services/helper service/helper-service.service";
import { DeleteItemComponent } from "../../components/delete-item/delete-item.component";
import { IGroup, IStudent } from "./interfaces/student.interface";
import { StudentsService } from "./services/students.service";

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrl: "./students.component.scss",
})
export class StudentsComponent implements OnInit {
  students: IStudent[] = [];
  studentsWithoutGroup: IStudent[] = [];
  groups: IGroup[] = [];
  selectStudentWithoutGroup: boolean = false;
  studentByGroup: { [key: string]: IStudent[] } = {};
  selectGroupId: string | null = null;
  commonActions = [
    { label: "View student", action: "viewStudent" },
    { label: "Delete student", action: "deleteStudent", isDanger: true },
  ];
  studentWithoutGroupsActions = [
    { label: "Add to group", action: "addToGroup" },
  ];
  studentsInGroup = [
    { label: "Update group", action: "updateGroup" },
    { label: "Delete from group", action: "deleteFromGroup" },
  ];
  studentActions = this.commonActions;
  constructor(
    private _StudentsService: StudentsService,
    private _HelperService: HelperServiceService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.fetchAllData();
  }
  fetchAllData(): void {
    this.onGetAllStudents();
    this.getAllGroups();
    this.onGetStudentsWithoutGroup();
  }
  onGetAllStudents(): void {
    this._StudentsService.getAllStudents().subscribe((res) => {
      this.students = res;
      this.selectGroupId = null;
      this.selectStudentWithoutGroup = false;
      this.studentActions = [...this.commonActions];
    });
  }
  onGetStudentsWithoutGroup() {
    this._StudentsService.getAllWithoutGroup().subscribe((res) => {
      this.studentsWithoutGroup = res;
      this.selectGroupId = null;
      this.selectStudentWithoutGroup = true;
      this.studentActions = [
        ...this.commonActions,
        ...this.studentWithoutGroupsActions,
      ];
    });
  }
  getAllGroups() {
    this._HelperService.getAllGroups().subscribe({
      next: (res) => {
        this.groups = res;
      },
    });
  }
  getStudentsByGroup(groupId: string): void {
    this.studentByGroup = {};
    this.selectGroupId = groupId;
    this.selectStudentWithoutGroup = false;
    this.studentByGroup[groupId] = [];
    this.studentActions = [...this.commonActions, ...this.studentsInGroup];
    this.groups
      .find((group) => group._id === groupId)
      ?.students.forEach((studentId: string) => {
        this._StudentsService.getStudentById(studentId).subscribe((res) => {
          this.studentByGroup[groupId].push(res);
        });
      });
  }
  onStudentAction(event: { action: string; data: IStudent }): void {
    const { action, data } = event;
    switch (action) {
      case "viewStudent":
        console.log("View Student:", data);
        break;

      case "deleteStudent":
        this._StudentsService.deleteStudent(data._id).subscribe({
          next: (res) => {
            console.log(res);
            const dialogRef = this.dialog.open(DeleteItemComponent, {
              data: {
                title: "student",
                description: `Are you sure you want to delete ${data.first_name} ${data.last_name}?`,
              },
            });
            dialogRef.afterClosed().subscribe((result) => {
              this.fetchAllData();
            });
          },
        });
        break;
      case "addToGroup":
        if (this.selectGroupId === null && this.selectStudentWithoutGroup) {
          console.log("Add student to group:", data);
        }
        break;
      case "updateGroup":
        if (this.selectGroupId !== null && !this.selectStudentWithoutGroup) {
          console.log("Update Student:", data);
        }
        break;
      case "deleteFromGroup":
        if (this.selectGroupId !== null && !this.selectStudentWithoutGroup)
          console.log("delete student to group:", data);
        break;

      default:
        console.error("Unknown action:", action);
    }
  }
}
