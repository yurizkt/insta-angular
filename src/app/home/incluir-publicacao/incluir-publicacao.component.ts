import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as firebase from 'firebase'

import { Bd } from '../../bd.service';
import { Progresso } from '../../progresso.service';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  @Output() public atualizarTimeline: EventEmitter<any> = new EventEmitter<any>()
  
  public email: string
  private image: any

  public progressoPublicacao: string = 'pendente'
  public progressoUpload: number

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  })

  constructor(
    private bd: Bd,
    private progresso: Progresso
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged( user => {
      this.email = user.email
    })
  }

  public cadastrar(): void{
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.image[0]
    })

    let acompanhamentoUpload = interval(1500)
    let continua = new Subject()

    continua.next(true)
    
    acompanhamentoUpload.pipe(
      takeUntil(continua)
    ).subscribe(() => {

        this.progressoPublicacao = "andamento"
        this.progressoUpload = Math.round(( this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes ) * 100)

        if(this.progresso.status === 'concluído'){
          this.progressoPublicacao = "concluído"
          this.atualizarTimeline.emit()
          continua.next(false)
        }
    })
  }

  public uploadImage(event: Event): void{
    this.image = (<HTMLInputElement>event.target).files;
  }

}
