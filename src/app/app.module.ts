import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from "ngx-toastr";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { globalInterceptor } from "./core/interceptors/global/global.interceptor";
import { loadingInterceptor } from "./core/interceptors/loading/loading.interceptor";
import { serverErrorInterceptor } from "./core/interceptors/server-error/server-error.interceptor";
import { serverResponseInterceptor } from "./core/interceptors/server-response/server-response.interceptor";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  exports: [NgxSpinnerModule],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        globalInterceptor,
        loadingInterceptor,
        serverErrorInterceptor,
        serverResponseInterceptor,
      ])
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
