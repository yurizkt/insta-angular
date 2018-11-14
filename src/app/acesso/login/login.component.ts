import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Auth } from '../../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'password': new FormControl(null)
  })

  constructor(private autenticacao: Auth) { }

  ngOnInit() {
  }

  public exibirPainelCadastro(): void{
    this.exibirPainel.emit('cadastro')
  }

  public verificarUsuario(): void{
    
    this.autenticacao.autenticar(
      this.formulario.value.email,
      this.formulario.value.password
    )
  }
}
