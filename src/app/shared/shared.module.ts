import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelect, MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSortModule } from "@angular/material/sort";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";
import { BreadcrumbsComponent } from "./components/breadcrumbs/breadcrumbs.component";
import { NavComponent } from "./components/nav/nav.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { SharedCardComponent } from "./components/shared-card/shared-card.component";
import { SharedInputComponent } from "./components/shared-input/shared-input.component";
import { SharedTableComponent } from "./components/shared-table/shared-table.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { UpdateProfileComponent } from "./components/update-profile/update-profile.component";
import { DynamicDatePipe } from "./custom-pipes/dynamic-date/dynamic-date.pipe";
import { FloatNumberPipe } from "./custom-pipes/float-number.pipe";

@NgModule({
  declarations: [
    SharedInputComponent,
    NotFoundComponent,
    SharedCardComponent,
    NavComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    UpdateProfileComponent,
    SharedTableComponent,
    FloatNumberPipe,
    DynamicDatePipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatFormField,
    MatSelect,
    MatStepperModule,
    MatRadioModule,
    MatProgressBarModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatDatepickerModule,
    MatSlideToggleModule,
    SharedInputComponent,
    MatFormField,
    MatSelect,
    SharedCardComponent,
    NavComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    MatStepperModule,
    MatRadioModule,
    MatProgressBarModule,
  ],
})
export class SharedModule {}
