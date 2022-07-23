import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';

@Component({
    selector: 'app-request-reset',
    templateUrl: './request-reset.component.html',
    styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

    public form = {
        email: null,
    };

    constructor(
        private authenticationService: AuthenticationService,
        private notify: SnotifyService,
    ) { }

    public ngOnInit(): void {
    }

    public submitForm() {
        return this.authenticationService.sendPasswordResetLink(this.form).subscribe(
            data => this.handleSuccess(data),
            (error: HttpErrorResponse) => this.handleError(error),
        );
    }

    public handleSuccess(data: any) {
        this.notify.success(data.data, { timeout: 0 });
        this.form.email = null;
    }

    public handleError(error: HttpErrorResponse) {
        this.notify.error(error.error.error);
    }
}
