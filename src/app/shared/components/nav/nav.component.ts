import { Time } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { HelperServiceService } from './../../services/helper service/helper-service.service';

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

  constructor(private _helperService:HelperServiceService) {}

  toggleSidebar() {
    this._helperService.toggleSidebar();
  }
  ngOnInit(): void {
    this.updateTime(); 
    this.timerInterval = setInterval(() => this.updateTime(), 1000); 
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
  logout(){
    localStorage.removeItem('email')
    localStorage.removeItem('name')
    localStorage.removeItem('role')
    localStorage.removeItem('token')
  }
}