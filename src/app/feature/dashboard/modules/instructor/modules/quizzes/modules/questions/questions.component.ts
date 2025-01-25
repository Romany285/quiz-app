import { Component } from '@angular/core';
import { QuestionsService } from './services/questions.service';
import { IGetQuestions } from './models/IGetQuestions';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { IQuestion } from './models/IQuestion';
import { EditQuestionComponent } from './components/edit-question/edit-question.component';
import { DeleteQuestionComponent } from './components/delete-question/delete-question.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss'
})
export class QuestionsComponent {
  resMessage:string = ''
  allQuestions:IGetQuestions[] = []
  categoryTypes:string [] = ['FE', 'BE']
  constructor(private _questionsService:QuestionsService, 
              private dialog: MatDialog) {}
  ngOnInit(): void {
    this.getAllQuestions()
  }
  getAllQuestions(){
    this._questionsService.getAllQuestions().subscribe({
      next: (res) => {
        this.allQuestions = res
        // console.log(res)
      },
      error: (err) => {
        // console.log(err)
      },
    })
  }
  openDialogAddQuestions(){
    this.dialog.open(AddQuestionComponent)
  }

  openDialogUpdateQuestion(question:IQuestion){
    this.dialog.open(EditQuestionComponent, {data: question})
  }

  openDialogDeleteQuestion(question:IQuestion){
    this.dialog.open(DeleteQuestionComponent, {data: question})
  }

  // openDialogAddQuestions(): void {
  //   const dialogRef = this.dialog.open(AddEditViewComponent, {
  //     data: {
  //       heading: "Set up a new question",
  //       fields: [
  //       { type: 'text', label: 'Title', name: 'title' , validators: [Validators.required] },
  //       { type: 'text', label: 'Description', name: 'description' , validators: [Validators.required] },
  //       { type: 'text', label: 'A', name: 'A' , validators: [Validators.required] },
  //       { type: 'text', label: 'B', name: 'B' , validators: [Validators.required] },
  //       { type: 'text', label: 'C', name: 'C' , validators: [Validators.required] },
  //       { type: 'text', label: 'D', name: 'D' , validators: [Validators.required] },
  //       { type: 'text', label: 'Right Answer', name: 'answer' , validators: [Validators.required] },
  //       { type: 'text', label: 'Difficulty', name: 'difficulty' , validators: [Validators.required] },
  //       { type: 'select', label: 'Category type', name: 'type', value: this.categoryTypes, validators: [Validators.required] },
  //     ],
  //   },
  //     width:'50%'
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     if (result !== undefined) {
  //       this._questionsService.addNewQuestion(result).subscribe({
  //         next:(res)=> {
  //           console.log(res);
  //         },
  //         error:(err)=> {
  //           console.log(err);
  //         },
  //         complete:()=> {
  //           this.getAllQuestions()
  //         },
  //       })
  //       console.log(result);
  //       ;
  //     }
  //   });
  // }
  // openDialogUpdateQuestion(name?: string, students?: any, readOnly = false) {
  //   const dialogRef = this.dialog.open(AddEditViewComponent, {
  //     width: '55%',
  //     data: {
  //       heading: "Update Question",
  //       fields: [
  //         { type: 'text', label: 'Title', name: 'title' , validators: [Validators.required] },
  //         { type: 'text', label: 'Description', name: 'description' , validators: [Validators.required] },
  //         { type: 'text', label: 'A', name: 'descriptionA' , validators: [Validators.required] },
  //         { type: 'text', label: 'B', name: 'descriptionB' , validators: [Validators.required] },
  //         { type: 'text', label: 'C', name: 'descriptionC' , validators: [Validators.required] },
  //         { type: 'text', label: 'D', name: 'descriptionD' , validators: [Validators.required] },
  //         { type: 'text', label: 'Right Answer', name: 'rightAnswer' , validators: [Validators.required] },
  //         { type: 'select', label: 'Category type', name: 'categoryTypes', value: this.categoryTypes, validators: [Validators.required] },
  //       ],
  //       readOnly
  //     }
  //   })
  //   return dialogRef.afterClosed();
  // }
  // editQuestion(question:any,students:any): void {
  //   this.openDialogUpdateQuestion(question.name,students).subscribe((result) => {
  //     if (result) {
  //       console.log(question,'ffff');
        
  //       this._questionsService.updateQuestion(question._id, {
  //         "answer":"D"
  //       }).subscribe(({
  //         next: (res) => {
  //           this.resMessage = res.message
  //           },
  //         error: (err) => {
  //           this._ToastrService.error(err.error.message)
  //         },
  //         complete: () => {
  //           this._ToastrService.success()
  //           this.getAllQuestions();
  //         }
  //       }))
  //     }
  //   })
  // }
}
