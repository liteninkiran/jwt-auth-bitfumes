import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

    public loggedIn: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        private token: TokenService,
    ) { }

    public ngOnInit(): void {
        this.authService.authStatus.subscribe(value => {
            this.loggedIn = value
        });
    }

    public logout(event: MouseEvent): void {
        event.preventDefault();
        this.token.remove();
        this.authService.changeAuthStatus(false);
        this.router.navigateByUrl('/login');
    }
}
