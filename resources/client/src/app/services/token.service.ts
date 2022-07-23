import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    private iss = {
        login: 'http://localhost:8000/api/login',
        signup: 'http://localhost:8000/api/signup',
    };

    constructor() { }

    public handle(token: any) {
        this.set(token);
    }

    public set(token: any) {
        localStorage.setItem('token', token);
    }

    public get() {
        return localStorage.getItem('token');
    }

    public remove() {
        localStorage.removeItem('token');
    }

    public isValid() {
        const token = this.get();
        if(token) {
            const payload = this.payload(token);
            if(payload) {
                return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
            }
        }
        return false;
    }

    public payload(token: any) {
        const payload = token.split('.')[1];
        return this.decode(payload);
    }

    public decode(payload: any) {
        return JSON.parse(atob(payload));
    }

    public loggedIn() {
        return this.isValid();
    }
}
