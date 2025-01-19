import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { globalInterceptor } from "./core/interceptors/global/global.interceptor";
import { loadingInterceptor } from "./core/interceptors/loading/loading.interceptor";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  exports: [NgxSpinnerModule],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptors([globalInterceptor, loadingInterceptor])
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
