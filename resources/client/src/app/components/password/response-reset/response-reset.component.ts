import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-response-reset',
    templateUrl: './response-reset.component.html',
    styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

    public form = {
        email: null,
        password: null,
        password_confirmation: null,
        reset_token: null,
    };

    public error: any = [];

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute,
        private notify: SnotifyService,
    ) {
        this.route.queryParams.subscribe(params => {
            this.form.reset_token = params['token'];
        });
    }

    public ngOnInit(): void {
    }

    public submitForm() {
        return this.authenticationService.resetPassword(this.form).subscribe(
            data => this.handleSuccess(data),
            (error: HttpErrorResponse) => this.handleError(error),
        );
    }

    public handleSuccess(data: any) {
        this.notify.confirm('Password has been updated. Please login using your new password.', {
            buttons: [
                {
                    text: 'OK',
                    action: (toaster) => {
                        this.router.navigateByUrl('/login');
                        this.notify.remove(toaster.id);
                    },
                    bold: false
                },
            ]
        });
        this.router.navigateByUrl('/login');
    }

    public handleError(error: HttpErrorResponse) {
        this.error = error.error.errors;
    }
}
