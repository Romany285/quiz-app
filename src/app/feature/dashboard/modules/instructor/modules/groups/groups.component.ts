import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { AddEditViewComponent } from "../../components/add-edit-view/add-edit-view.component";
import { DeleteItemComponent } from "../../components/delete-item/delete-item.component";
import { IStudent } from "../students/interfaces/student.interface";
import { StudentsService } from "../students/services/students.service";
import { IGroup } from "./interfaces/IGroup";
import { GroupsService } from "./services/groups.service";

@Component({
  selector: "app-groups",
  templateUrl: "./groups.component.html",
  styleUrl: "./groups.component.scss",
})
export class GroupsComponent implements OnInit {
  groupsData: IGroup[] = [];
  studentsWithoutGroup: IStudent[] = [];
  resMessage: string = "";
  groupsActions = [
    { label: "Update", action: "update" },
    { label: "Delete", action: "delete", isDanger: true },
  ];
  constructor(
    private _GroupsService: GroupsService,
    private dialog: MatDialog,
    private _StudentsService: StudentsService,
    private _ToastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.getAllGroups();
    this.getAllStudentWithoutGroup();
  }

  getAllGroups() {
    this._GroupsService.getAllGroups().subscribe({
      next: (res) => {
        this.groupsData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getAllStudentWithoutGroup() {
    this._StudentsService.getAllWithoutGroup().subscribe({
      next: (res) => {
        this.studentsWithoutGroup = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  openDialogAddGroup(): void {
    const dialogRef = this.dialog.open(AddEditViewComponent, {
      data: {
        title: "Add Group",
        fields: [
          {
            type: "text",
            label: "Group Name",
            name: "name",
            validators: [Validators.required],
          },
          {
            type: "select",
            label: "List Students",
            name: "students",
            value: this.studentsWithoutGroup.map(
              (student: any) => `${student.first_name} ${student.last_name}`
            ),
            validators: [Validators.required],
          },
        ],
      },
      width: "50%",
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      if (result !== undefined) {
        this._GroupsService.addGroup(result).subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.getAllGroups();
          },
        });
        console.log(result);
      }
    });
  }
  onStudentAction(event: { action: string; data: any }): void {
    const { action, data } = event;
    let dialogRef;
    switch (action) {
      case "update":
        let students = this.studentsWithoutGroup.map(
          (student: IStudent) => `${student.first_name} ${student.last_name}`
        );
        this.getStudentNames(data.students).then((studentNames) => {
          const dialogRef = this.dialog.open(AddEditViewComponent, {
            data: {
              title: "Update group's students",
              fields: [
                {
                  type: "text",
                  label: "Group Name",
                  name: "name",
                  value: data.name || "",
                  validators: [Validators.required],
                },
                {
                  type: "select",
                  label: "Students list",
                  name: "students",
                  value: [...studentNames, ...students],
                  validators: [Validators.required],
                },
              ],
            },
            width: "50%",
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result !== undefined) {
              this._GroupsService
                .updateGroup(data._id, {
                  name: result.name,
                  students: result.students.map(
                    (student: IStudent) => student._id
                  ),
                })
                .subscribe({
                  error: (err) => {
                    console.log(err);
                  },
                  complete: () => {
                    this.getAllGroups(); // Assuming you want to refresh the groups
                  },
                });
            }
          });
        });
        break;
      case "delete":
        dialogRef = this.dialog.open(DeleteItemComponent, {
          data: {
            title: "group",
            description: `Are you sure you want to delete ${data.name} group?`,
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result !== null) {
            this._GroupsService.deleteGroup(data._id).subscribe({
              next: (res) => {
                console.log(res);
              },
              complete: () => {
                this.getAllGroups();
              },
            });
          }
        });
        break;
      default:
        console.error("Unknown action:", action);
    }
  }
  async getStudentNames(studentIds: string[]): Promise<string[]> {
    const studentNames: string[] = [];
    for (const studentId of studentIds) {
      const student = await this._StudentsService
        .getStudentById(studentId)
        .toPromise();
      if (student) {
        studentNames.push(`${student.first_name} ${student.last_name}`);
      } else {
        studentNames.push("Unknown Student");
      }
    }
    return studentNames;
  }
}
