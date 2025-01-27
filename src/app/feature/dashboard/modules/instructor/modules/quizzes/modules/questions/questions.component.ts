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
}
