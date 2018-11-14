import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'

import { Usuario } from '../usuario.model'

import { Auth } from '../../auth.service'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'name': new FormControl(null),
    'user': new FormControl(null),
    'password': new FormControl(null)
  })

  constructor(private autenticacao: Auth) { }

  ngOnInit() {
  }

  public exibirPainelLogin(): void{  
    this.exibirPainel.emit('login')
  }

  public cadastrarUsuario(): void{
    // console.log(this.formulario.value)
    let usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.name,
      this.formulario.value.user,
      this.formulario.value.password
    )

    this.autenticacao.cadastrarUsuario(usuario)
      .then(() => this.exibirPainelLogin())
  }


}
