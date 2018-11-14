import * as firebase from 'firebase'
import { Injectable } from '@angular/core';
import { Progresso } from './progresso.service';
import { IncluirPublicacaoComponent } from './home/incluir-publicacao/incluir-publicacao.component';

@Injectable()
export class Bd{

    constructor(private progresso: Progresso){ }

    public publicar(publicacao: any): void{
        console.log(publicacao)

        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({titulo: publicacao.titulo})
            .then((resposta: any) => {
                
                let nomeImagem = resposta.key
                
                firebase.storage().ref()
                    .child(`imagens/${nomeImagem}`)
                    .put(publicacao.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,
                        (snapshot: any) => {
                            this.progresso.status = 'andamento'
                            this.progresso.estado = snapshot
                        },
                        (error) => {
                            this.progresso.status = 'erro'
                        },
                        () => {
                            this.progresso.status = 'concluído'
                        }
                    )
            })
    }

    public consultaPublicacoes(emailUsuario: string): Promise<any>{

        return new Promise((resolve, reject) => {
            
            firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
                .orderByKey()
                .once('value')
                .then((snapshot: any) => {

                    let publicacoes: Array<any> = []
    
                    snapshot.forEach((childSnapshot: any) => {
                        let publicacao = childSnapshot.val()
                        publicacao.key = childSnapshot.key

                        publicacoes.push(publicacao)
                    })
                    return publicacoes.reverse()
                })
                .then((publicacoes: any) => {

                    publicacoes.forEach((publicacao) => {
                        firebase.storage().ref()
                            .child(`imagens/${publicacao.key}`)
                            .getDownloadURL()
                            .then((url: string) => {
    
                                publicacao.url_image = url
    
                                firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                                    .once('value')
                                    .then((snapshot: any) => {
                                        publicacao.nome_usuario = snapshot.val().user
                                        
                                        publicacoes.push(publicacao)
                                    })
                            })
                    })
                    console.log(publicacoes);
                    
                    resolve(publicacoes);
                })
        })
    }
}



                        
    