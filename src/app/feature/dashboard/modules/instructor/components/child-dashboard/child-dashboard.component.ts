import { Component, inject, OnInit } from '@angular/core';
import { ChildDashboardService } from './services/child-dashboard.service';
import { IUpcomingQuizzes } from './models/IUpcomingQuizzes';
import { ITopFiveStudents } from './models/ITopFiveStudents';
import { MatDialog } from '@angular/material/dialog';
import { DeleteItemComponent } from '../delete-item/delete-item.component';

@Component({
  selector: 'app-child-dashboard',
  templateUrl: './child-dashboard.component.html',
  styleUrl: './child-dashboard.component.scss'
})
export class ChildDashboardComponent implements OnInit {
  _childDashboardService = inject(ChildDashboardService)
  dialog = inject(MatDialog)
  upcomingQuizzes:IUpcomingQuizzes[] = [
    {
      img: "upcoming_01",
      title: "Introduction to computer programming",
      date: "12 / 03 / 2023",
      time: "09:00 AM",
      numberOfStudents: 32
    },
    {
      img: "upcoming_02",
      title: "Psychology 101",
      date: "12 / 03 / 2023",
      time: "09:00 AM",
      numberOfStudents: 17
    },
    {
      img: "upcoming_01",
      title: "Introduction to computer programming",
      date: "12 / 03 / 2023",
      time: "09:00 AM",
      numberOfStudents: 32
    },
    {
      img: "upcoming_02",
      title: "Psychology 101",
      date: "12 / 03 / 2023",
      time: "09:00 AM",
      numberOfStudents: 15
    },
    {
      img: "upcoming_01",
      title: "Introduction to computer programming",
      date: "12 / 03 / 2023",
      time: "09:00 AM",
      numberOfStudents: 32
    },
  ]
  topStudents:ITopFiveStudents[] = []
  ngOnInit(): void {
    this._childDashboardService.topFiveStudents().subscribe({
      next: (res) => {
        this.topStudents = Array.isArray(res) ? res : [res];
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        console.log(this.topStudents)
      }
    })
  }
  openFacilityDialog() {
    const dialogRef = this.dialog.open(DeleteItemComponent)
  }
}
