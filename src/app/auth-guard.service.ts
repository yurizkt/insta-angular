import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Auth } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private autenticacao: Auth) { }

    canActivate(): boolean{
        return this.autenticacao.autenticado()
    }
}