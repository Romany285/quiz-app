import { Time } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrl: "./nav.component.scss",
})
export class NavComponent implements OnInit {
  userName = localStorage.getItem("name");
  role = localStorage.getItem("role");
  currentTime: string = '';
  private timerInterval: any;

  ngOnInit(): void {
    this.updateTime(); 
    this.timerInterval = setInterval(() => this.updateTime(), 1000); 
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval); 
    }
  }

  private updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString(); 
  }
}
