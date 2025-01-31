import { Time } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { AddEditQuizComponent } from "../../../feature/dashboard/modules/instructor/modules/quizzes/components/add-edit-quiz/add-edit-quiz.component";
import { QuizzesService } from "../../../feature/dashboard/modules/instructor/modules/quizzes/services/quizzes.service";
import { GroupsService } from "../../../feature/dashboard/modules/instructor/modules/groups/services/groups.service";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { CodeQuizComponent } from "../../../feature/dashboard/modules/instructor/modules/quizzes/components/code-quiz/code-quiz.component";
import { HelperServiceService } from './../../services/helper service/helper-service.service';
import { IGroup } from "../../../feature/dashboard/modules/instructor/modules/groups/interfaces/IGroup";
import { IQuiz } from "../../../feature/dashboard/modules/instructor/modules/quizzes/interfaces/quiz.interface";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrl: "./nav.component.scss",
})
export class NavComponent implements OnInit {
  @Input() navTitle:string = ''
  userName = localStorage.getItem("name");
  role = localStorage.getItem("role");
  currentTime: string = '';
  private timerInterval: any;
  allGroups:IGroup[]=[];
  resMessage:string = '';
  code:string = ''
  constructor(private _helperService:HelperServiceService,
    private dialog: MatDialog,
    private _toastrService:ToastrService,
    private _quizzesService:QuizzesService,
    private _groupsService:GroupsService){}

  toggleSidebar() {
    this._helperService.toggleSidebar();
  }
  ngOnInit(): void {
    this.updateTime(); 
    this.chickRole()
    this.timerInterval = setInterval(() => this.updateTime(), 1000); 
  }
  chickRole(){
    if(localStorage.getItem('role') == 'Instructor'){
      this.getAllGroups()
    }
    else{
      return
    }
  }
  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval); 
    }
  }

  updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString(); 
  }
  getAllGroups(){
      this._groupsService.getAllGroups().subscribe({
        next:(res)=>{
          this.allGroups=res
          console.log(res,'oooo');
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
    openAddQuizDialog(): void {
      const dialogRef = this.dialog.open(AddEditQuizComponent, {
        data: { groups: this.allGroups },
        width: "60%",
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          delete result.groups;
          this.addNewQuiz(result);
          console.log(result, "res");
        }
      });
    }
    addNewQuiz(data: IQuiz) {
      this._quizzesService.addQuiz(data).subscribe({
        next:(res)=>{
          this.resMessage = res.message
          this.code = res.data.code
          console.log( res.data.code,'code');
        },
        error:(err)=>{
          this._toastrService.error(err.error.message)
          console.log(err);
        },complete:() =>{
          this._toastrService.success(this.resMessage)
          this.openCodeDialog(this.code)
        },
      })
    };
    openCodeDialog(code:string):void{
      const dialogRef = this.dialog.open(CodeQuizComponent, {
        data: {code:code },
        width: "30%",
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log(result, "res");
        }
      });
    }
    logout(){
      localStorage.removeItem('email')
      localStorage.removeItem('name')
      localStorage.removeItem('role')
      localStorage.removeItem('token')
    }
    getRoleFromLocalstorage(){
      if(localStorage.getItem('role')=='Instructor'){
        return true
      }
      else{
        return false
      }
    }
}
  

