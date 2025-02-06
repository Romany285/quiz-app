import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { IButtonConfig } from "../../../../../../../../shared/interfaces/button-config.interface";
import { AddQuestionComponent } from "./components/add-question/add-question.component";
import { DeleteQuestionComponent } from "./components/delete-question/delete-question.component";
import { EditQuestionComponent } from "./components/edit-question/edit-question.component";
import { ViewQuestionComponent } from "./components/view-question/view-question.component";
import { IGetQuestions } from "./models/IGetQuestions";
import { IQuestion } from "./models/IQuestion";
import { QuestionsService } from "./services/questions.service";

@Component({
  selector: "app-questions",
  templateUrl: "./questions.component.html",
  styleUrl: "./questions.component.scss",
})
export class QuestionsComponent {
  resMessage: string = "";
  allQuestions: IGetQuestions[] = [];
  categoryTypes: string[] = ["FE", "BE"];

  tableHeaders: string[] = [
    "title",
    "description",
    "type",
    "difficulty",
    "actions",
  ];

  displayHeaders: { [key: string]: string } = {
    title: "Question title",
    description: "Description",
    type: "Type",
    difficulty: "Difficulty",
    actions: "Actions",
  };
  buttons: IButtonConfig[] = [
    {
      btnIcon: "fa-solid fa-eye",
      action: (row) => this.openDialogViewQuestion(row),
      class: "orange-color",
    },
    {
      btnIcon: "fa-solid fa-pen-to-square",
      action: (row) => this.openDialogUpdateQuestion(row),
      class: "orange-color",
    },
    {
      btnIcon: "fa-solid fa-trash",
      action: (row) => this.openDialogDeleteQuestion(row),
      class: "orange-color",
    },
  ];

  constructor(
    private _questionsService: QuestionsService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getAllQuestions();
  }
  getAllQuestions() {
    this._questionsService.getAllQuestions().subscribe({
      next: (res) => {
        this.allQuestions = res;
        // console.log(res)
      },
      error: (err) => {
        // console.log(err)
      },
    });
  }
  openDialogViewQuestion(question: IQuestion) {
    this.dialog.open(ViewQuestionComponent, { data: question });
  }
  openDialogAddQuestions() {
    this.dialog.open(AddQuestionComponent);
  }

  openDialogUpdateQuestion(question: IQuestion) {
    this.dialog.open(EditQuestionComponent, { data: question });
  }

  openDialogDeleteQuestion(question: IQuestion) {
    this.dialog.open(DeleteQuestionComponent, { data: question });
    this.getAllQuestions();
  }
}
