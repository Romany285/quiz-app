import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { interval, Observable, Subscription } from "rxjs";
import { map, take } from "rxjs/operators";
import {
  IUpcomingCompleteQuizApiResponse,
  Options,
} from "../../../../../../shared/interfaces/upcoming-completed-quiz.interface";
import { SubmitDialogComponent } from "./components/submit-dialog/submit-dialog.component";
import { IAnswer } from "./interfaces/answer.interface";
import {
  ISubmitAnswer,
  ISubmitAnswerApiResponse,
} from "./interfaces/submit-answer-response.interface";
import { ExamService } from "./services/exam.service";

@Component({
  selector: "app-exams",
  templateUrl: "./exams.component.html",
  styleUrls: ["./exams.component.scss"],
})
export class ExamsComponent implements OnInit {
  id: string = "";
  quizForm: FormGroup;
  quizData: { data: IUpcomingCompleteQuizApiResponse } | null = null;
  isLinear = false;
  progress: number = 0;
  answers: IAnswer[] = [];
  duration: number = 60;
  countdown$: Observable<string> = new Observable<string>();
  countdownSubscription: Subscription = new Subscription();
  submitionData: ISubmitAnswer | null = null;
  constructor(
    private _formBuilder: FormBuilder,
    private _ExamsService: ExamService,
    private _Route: ActivatedRoute,
    private _Router: Router,
    public dialog: MatDialog
  ) {
    this.id = this._Route.snapshot.params["id"];
    this.quizForm = this._formBuilder.group({});
  }

  ngOnInit(): void {
    this.getQuestionWithNoAnswer(this.id);
  }

  getQuestionWithNoAnswer(quizId: string) {
    this._ExamsService.getQuestionWithNoAnswer(quizId).subscribe({
      next: (res) => {
        this.quizData = { data: res.data };
        this.duration = this.quizData?.data?.duration || 60;
        this.initializeForm();
        this.updateProgress({ selectedIndex: 0 });
        this.initializeTimer();
      },
    });
  }

  initializeForm() {
    const formControls: { [key: string]: any } = {};

    this.quizData?.data?.questions.forEach((question, index) => {
      formControls[`question_${index}`] = ["", Validators.required];
    });

    this.quizForm = this._formBuilder.group(formControls);
  }

  getOptions(options: Options): { key: string; value: string }[] {
    return Object.entries(options)
      .filter(([key]) => key !== "_id")
      .map(([key, value]) => ({ key, value }));
  }

  prepareSubmissionData(): IAnswer[] {
    this.answers = Object.keys(this.quizForm.controls).map((key, index) => {
      return {
        question: this.quizData?.data?.questions[index]._id ?? "",
        answer: this.quizForm.controls[key].value,
      };
    });
    return this.answers;
  }

  onSubmit() {
    if (this.quizForm.valid) {
      const submissionData = this.prepareSubmissionData();
      console.log(submissionData);
      this._ExamsService
        .submitAnswers(this.id, { answers: submissionData })
        .subscribe({
          next: (res: ISubmitAnswerApiResponse) => {
            console.log("Form submitted successfully", res);
            this.submitionData = res.data;
            this.openDialog();
          },
          error: (err) => {
            console.log("Error submitting form", err);
          },
        });
    } else {
      console.log("Form is invalid", this.quizForm);
    }
  }

  initializeTimer() {
    const savedStartTime = localStorage.getItem("quizStartTime");
    const currentTime = new Date().getTime();

    if (savedStartTime) {
      const elapsedTime = (currentTime - parseInt(savedStartTime)) / 1000;
      const totalSeconds = this.duration * 60 - elapsedTime;

      if (totalSeconds > 0) {
        this.startCountdown(totalSeconds);
      } else {
        this.timeUp();
      }
    } else {
      localStorage.setItem("quizStartTime", currentTime.toString());
      this.startCountdown(this.duration * 60);
    }
  }

  startCountdown(totalSeconds: number) {
    this.countdown$ = interval(1000).pipe(
      take(totalSeconds),
      map((elapsed) => {
        const remaining = Math.max(totalSeconds - elapsed, 0);
        const minutes = Math.floor(remaining / 60);
        const seconds = Math.floor(remaining % 60);
        if (remaining === 0) {
          this.timeUp();
        }
        return `${this.pad(minutes)}:${this.pad(seconds)}`;
      })
    );
    this.countdownSubscription = this.countdown$.subscribe();
  }

  onChoiceSelected(index: number) {
    const totalSteps = this.quizData?.data?.questions.length || 1;
    const completedSteps = Object.keys(this.quizForm.controls).filter(
      (key) => this.quizForm.controls[key].value
    ).length;
    this.progress = (completedSteps / totalSteps) * 100;
  }

  updateProgress(event: any) {
    const totalSteps = this.quizData?.data?.questions.length || 1;
    this.progress = ((event.selectedIndex + 1) / totalSteps) * 100;
  }

  pad(num: number): string {
    return num < 10 ? "0" + num : num.toString();
  }

  timeUp() {
    this.countdownSubscription.unsubscribe();
    this._Router.navigate(["/dashboard/student/exams"]);
    this._ExamsService
      .submitAnswers(this.id, { answers: this.prepareSubmissionData() })
      .subscribe({
        next: (res: ISubmitAnswerApiResponse) => {
          console.log("Time's up! Form submitted successfully", res);
          this.submitionData = res.data;
          this.openDialog();
        },
        error: (err) => {
          console.log("Error submitting form", err);
        },
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SubmitDialogComponent, {
      width: "400px",
      data: { data: this.submitionData, quizData: this.quizData },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== null) {
        this._Router.navigate(["/dashboard/student/quizzes"]);
        localStorage.removeItem("quizStartTime");
        console.log("The dialog was closed", result);
      }
    });
  }
}
