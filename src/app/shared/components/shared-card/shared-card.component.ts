import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-shared-card",
  templateUrl: "./shared-card.component.html",
  styleUrl: "./shared-card.component.scss",
})
export class SharedCardComponent {
  @Input() title: string = "";
  @Input() status: string = "";
  @Input() groupName: string = "";
  @Input() actions: {
    label: string;
    isDanger?: boolean;
    action: string;
    icon: string;
  }[] = [];
  @Input() data: any;
  @Output() actionTriggered = new EventEmitter<{ action: string; data: any }>();

  performAction(
    action: { label: string; isDanger?: boolean; action: string; icon: string },
    data: any
  ): void {
    this.actionTriggered.emit({ action: action.action, data });
  }
}
