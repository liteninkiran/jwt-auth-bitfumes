import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    public form = {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
    };

    public error: any = [];

    constructor(
        private authService: AuthenticationService,
        private token: TokenService,
        private router: Router,
    ) { }

    public ngOnInit(): void {
    }

    public submitForm() {
        return this.authService.signup(this.form).subscribe(
            data => this.handleSuccess(data),
            (error: HttpErrorResponse) => this.handleError(error),
        );
    }

    public handleSuccess(data: any) {
        this.token.handle(data.access_token);
        this.router.navigateByUrl('/profile');
    }

    public handleError(error: HttpErrorResponse) {
        this.error = error.error.errors;
    }
}
