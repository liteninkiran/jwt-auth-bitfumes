import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

    public form = {
        email: null,
        password: null,
    };

    public error = null;

    constructor(
        private authenticationService: AuthenticationService,
        private authService: AuthService,
        private token: TokenService,
        private router: Router,
    ) { }

    public ngOnInit(): void {
    }

    public submitForm() {
        return this.authenticationService.login(this.form).subscribe(
            data => this.handleSuccess(data),
            (error: HttpErrorResponse) => this.handleError(error),
        );
    }

    public handleSuccess(data: any) {
        this.token.handle(data.access_token);
        this.authService.changeAuthStatus(true);
        this.router.navigateByUrl('/profile');
    }

    public handleError(error: HttpErrorResponse) {
        this.error = error.error.error;
    }
}
