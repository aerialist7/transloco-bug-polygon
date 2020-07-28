import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { TRANSLOCO_CONFIG, TRANSLOCO_LOADER, TRANSLOCO_TRANSPILER, TranslocoConfig, TranslocoModule, TranslocoService } from "@ngneat/transloco";
import { MessageFormatTranspiler, TranslocoMessageFormatModule } from "@ngneat/transloco-messageformat";
import { environment } from "../environments/environment";
import { AppLocalizationService, UserService } from "./app-localization.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        TranslocoModule,
        TranslocoMessageFormatModule.init()
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            multi: true,
            useFactory: AppLocalizationService.languagePreloader,
            deps: [HttpClient, TranslocoService, UserService]
        },
        {
            provide: TRANSLOCO_LOADER,
            useClass: AppLocalizationService
        },
        {
            provide: TRANSLOCO_TRANSPILER,
            useClass: MessageFormatTranspiler
        },
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
