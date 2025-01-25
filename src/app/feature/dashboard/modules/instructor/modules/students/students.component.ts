import { Component, OnDestroy, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Subject, takeUntil } from "rxjs";
import { HelperServiceService } from "../../../../../../shared/services/helper service/helper-service.service";
import { AddEditViewComponent } from "../../components/add-edit-view/add-edit-view.component";
import { DeleteItemComponent } from "../../components/delete-item/delete-item.component";
import { IGroup, IStudent } from "./interfaces/student.interface";
import { StudentsService } from "./services/students.service";

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrl: "./students.component.scss",
})
export class StudentsComponent implements OnInit, OnDestroy {
  students: IStudent[] = [];
  studentsWithoutGroup: IStudent[] = [];
  groups: IGroup[] = [];
  selectStudentWithoutGroup: boolean = false;
  studentByGroup: { [key: string]: IStudent[] } = {};
  selectGroupId: string | null = null;
  destroy$ = new Subject<void>();
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
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  fetchAllData(): void {
    this.onGetAllStudents();
    this.getAllGroups();
    this.onGetStudentsWithoutGroup();
  }
  onGetAllStudents(): void {
    this._StudentsService
      .getAllStudents()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.students = res;
        this.selectGroupId = null;
        this.selectStudentWithoutGroup = false;
        this.studentActions = [...this.commonActions];
      });
  }
  onGetStudentsWithoutGroup() {
    this._StudentsService
      .getAllWithoutGroup()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
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
    this._HelperService
      .getAllGroups()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
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
        this._StudentsService
          .getStudentById(studentId)
          .pipe(takeUntil(this.destroy$))
          .subscribe((res) => {
            this.studentByGroup[groupId].push(res);
          });
      });
  }
  onStudentAction(event: { action: string; data: IStudent }): void {
    const { action, data } = event;
    switch (action) {
      case "viewStudent":
        this.dialog.open(AddEditViewComponent, {
          data: {
            title: "View student",
            readOnly: true,
            fields: [
              {
                type: "text",
                label: "Group",
                name: "groups",
                value: data.group?.name,
              },
              {
                type: "text",
                label: "First name",
                name: "first-name",
                value: data.first_name,
              },
              {
                type: "text",
                label: "Last name",
                name: "last-name",
                value: data.last_name,
                readOnly: true,
              },
              {
                type: "text",
                label: "Email",
                name: "email",
                value: data.email,
              },
            ],
          },
          width: "50%",
        });
        break;
      case "deleteStudent":
        const dialogRef = this.dialog.open(DeleteItemComponent, {
          data: {
            title: "student",
            description: `Are you sure you want to delete ${data.first_name} ${data.last_name}?`,
          },
        });

        dialogRef
          .afterClosed()
          .pipe(takeUntil(this.destroy$))
          .subscribe((result) => {
            if (result !== null) {
              this._StudentsService
                .deleteStudent(data._id)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                  complete: () => {
                    this.fetchAllData();
                  },
                });
            }
          });
        break;
      case "addToGroup":
        if (this.selectGroupId === null && this.selectStudentWithoutGroup) {
          const dialogRef = this.dialog.open(AddEditViewComponent, {
            data: {
              title: "Add student to a group",
              fields: [
                {
                  type: "select",
                  label: "Choose group",
                  name: "groups",
                  value: this.groups,
                  validators: [Validators.required],
                },
              ],
            },
            width: "50%",
          });
          dialogRef
            .afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe((result) => {
              if (result !== undefined) {
                this._StudentsService
                  .addStudentToGroup(data._id, result.groups)
                  .pipe(takeUntil(this.destroy$))
                  .subscribe({
                    error: (err) => {
                      console.log(err);
                    },
                    complete: () => {
                      this.fetchAllData();
                    },
                  });
              }
            });
        }
        break;
      case "updateGroup":
        if (this.selectGroupId !== null && !this.selectStudentWithoutGroup) {
          const dialogRef = this.dialog.open(AddEditViewComponent, {
            data: {
              title: "Update student's group",
              fields: [
                {
                  type: "select",
                  label: "Choose group",
                  name: "groups",
                  value: this.groups.filter(
                    (group) => group._id !== data.group?._id
                  ),
                  validators: [Validators.required],
                },
              ],
            },
            width: "50%",
          });
          dialogRef
            .afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe((result) => {
              if (result !== undefined) {
                this._StudentsService
                  .updateStudentGroup(data._id, result.groups, data.group?._id!)
                  .pipe(takeUntil(this.destroy$))
                  .subscribe({
                    error: (err) => {
                      console.log(err);
                    },
                    complete: () => {
                      this.fetchAllData();
                    },
                  });
              }
            });
        }
        break;
      case "deleteFromGroup":
        if (this.selectGroupId !== null && !this.selectStudentWithoutGroup) {
          const dialogRef = this.dialog.open(DeleteItemComponent, {
            data: {
              title: "student",
              description: `Are you sure you want to delete ${data.first_name} ${data.last_name} from group ${data.group?.name}?`,
            },
          });
          dialogRef
            .afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe((result) => {
              if (result !== undefined) {
                this._StudentsService
                  .deleteStudentFromGroup(data._id, data.group?._id!)
                  .pipe(takeUntil(this.destroy$))
                  .subscribe({
                    complete: () => {
                      this.fetchAllData();
                    },
                  });
              }
            });
        }
        break;
      default:
        console.error("Unknown action:", action);
    }
  }
}
