import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Firestore, collectionData, where } from '@angular/fire/firestore';
import { Favoritos, Usuario } from "../basededatos/basededatos";
import { jsPDF } from "jspdf";
import { collection, query } from "firebase/firestore";

@Component ({
    selector: 'favoritos',
    templateUrl: './favoritos.html',
    styleUrls: ['./favoritos.css']
})

export class FavoritosComponent{

    Usuario = new Usuario();
    ListaMisFavoritos: Favoritos[] = new Array();

    constructor(private firestore: Firestore, public router: Router){

        if (history.state.IdUsuario == "" || history.state.IdUsuario == undefined){

        }
        else{
            localStorage.setItem('Usuario', JSON.stringify(history.state));
        }
        this.Usuario = new Usuario();
        this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);
        this.traerfavoritos();
    }

    traerfavoritos(){
        const favoritos = collection(this.firestore, "Favoritos");
        const consulta = query(favoritos, where ("idUsuario", "==", this.Usuario.IdUsuario));
        this.ListaMisFavoritos = new Array();
        collectionData(consulta).subscribe((snapFavoritos) => {
            this.ListaMisFavoritos = snapFavoritos.map(favoritos => {
                    const favoritosObj = new Favoritos();
                    favoritosObj.setData(favoritos);
                    return favoritosObj;
                })
            }
        )
    }

    imprimirlistafavoritos(){

        
        const DATO = document.getElementById('Favoritos');
        const Documento = new jsPDF('p', 'pt', 'a4');
        Documento.html(DATO!, {
            html2canvas: {
                scale: .72,
            },
            x: 20,
            y: 20,
            callback: function (Documento) {
                Documento.save('Lista de Favoritos')
            }
        });
    }
}