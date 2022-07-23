import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private baseUrl = 'http://localhost:8000/api'

    constructor(
        private http: HttpClient,
    ) { }

    public login(data: any) {
        return this.http.post(`${this.baseUrl}/login`, data);
    }

    public signup(data: any) {
        return this.http.post(`${this.baseUrl}/signup`, data);
    }

    public sendPasswordResetLink(data: any) {
        return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data);
    }

    public resetPassword(data: any) {
        return this.http.post(`${this.baseUrl}/resetPassword`, data);
    }
}
