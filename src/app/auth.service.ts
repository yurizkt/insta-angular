import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class Auth {

    constructor(private route: Router){ }

    public idToken: string

    public cadastrarUsuario(usuario: Usuario): Promise<any>{

        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.password)
            .then((resposta: any) => {

                delete usuario.password

                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set(usuario)
            })
            .catch((error: Error) => {
                console.log(error);
                
            })
    }

    public autenticar(email: string, password: string): void{
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((resposta: any) => {
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.idToken = idToken
                        localStorage.setItem('idToken', idToken)
                        this.route.navigate(['/home'])
                    })
            })
            .catch((error: Error) => console.log(error))
    }

    public autenticado(): boolean{

        if(this.idToken === undefined && localStorage.getItem('idToken') != null){
            this.idToken = localStorage.getItem('idToken')
        }

        if(this.idToken === undefined){
            this.route.navigate(['/'])
        }

        return this.idToken !== undefined
    }

    public sair(): void{
        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem('idToken')
                this.idToken = undefined
                this.route.navigate(['/'])
            })
    }
}