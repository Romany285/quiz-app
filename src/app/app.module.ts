import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    HttpClientModule,
  ],
  exports: [NgxSpinnerModule],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch()
      // withInterceptors([globalInterceptor, loadingInterceptor])
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
