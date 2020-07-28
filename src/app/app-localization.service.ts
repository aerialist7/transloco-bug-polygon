import { Translation, TranslocoLoader, TranslocoService } from "@ngneat/transloco";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { flatMap, map, mapTo } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AppLocalizationService implements TranslocoLoader {
    constructor(
        private readonly http: HttpClient
    ) {}

    static languagePreloader(
        http: HttpClient,
        transloco: TranslocoService,
        userService: UserService
    ) {
        return (): Promise<unknown> => new Promise((resolve, reject) => {
            userService.getUserData()
                .pipe(flatMap(userData => transloco.load(userData.languageKey).pipe(mapTo(userData.languageKey))))
                .toPromise()
                .then(langKey => {
                    transloco.setAvailableLangs([langKey]);
                    transloco.setActiveLang(langKey);
                })
                .then(resolve)
                .catch(reject);
        });
    }

    getTranslation(langPath: string): Observable<Translation> {
        return this.http
            .get("assets/l10n.json")
            .pipe(map(data => data as Translation));
    }
}

export interface UserData {
    languageKey: string;
}

@Injectable()
export class UserService {
    constructor(
        private readonly http: HttpClient
    ) {}

    getUserData() {
        return this.http.get("assets/user.json")
            .pipe(map(data => data as UserData))
    }
}