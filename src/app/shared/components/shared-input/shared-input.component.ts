import { Component, Input } from "@angular/core";
import { ControlContainer, FormGroupDirective } from "@angular/forms";

@Component({
  selector: "app-shared-input",
  templateUrl: "./shared-input.component.html",
  styleUrls: ["./shared-input.component.scss"],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class SharedInputComponent {
  @Input() label: string = "";
  @Input() type: string = "";
  @Input() name: string = "";
  @Input() placeholder: string = "";
  @Input() icon: string = "";
  showPassword:boolean = false
  roles:string[] = ['Student', 'Instructor']
  toggleShowPass(){
    this.showPassword = !this.showPassword
  }
  changeRole(event:any){
    console.log((event.target.value.slice(3,)))
  }
}
