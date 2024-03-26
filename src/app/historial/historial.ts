import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Firestore, collectionData, where } from '@angular/fire/firestore';
import { Usuario } from "../basededatos/basededatos";
import { Historial } from "../basededatos/basededatos";
import { Canciones } from "../basededatos/basededatos";
import { doc, setDoc } from "firebase/firestore";
import { collection, query } from "firebase/firestore";

@Component ({
    selector: 'historial',
    templateUrl: './historial.html',
    styleUrls: ['./historial.css']
})

export class HistorialComponent{

    Usuario = new Usuario();
    ListaHistorial: Historial[] = new Array();

    constructor(private firestore: Firestore, public router: Router){

        if (history.state.IdUsuario == "" || history.state.IdUsuario == undefined){

        }
        else{
            localStorage.setItem('Usuario', JSON.stringify(history.state));
        }
        this.Usuario = new Usuario();
        this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);
        this.traerhistorial();
    }

    traerhistorial(){
        const historial = collection(this.firestore, "Historial");
        const consulta = query(historial, where ("idUsuario", "==", this.Usuario.IdUsuario));
        this.ListaHistorial = new Array();
        collectionData(consulta).subscribe((snapHistorial) => {
            this.ListaHistorial = snapHistorial.map(historial => {
                    const historialObj = new Historial();
                    historialObj.setData(historial);
                    return historialObj;
                })
            }
        )
    }

    generateRandomString = (num: number) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result1 = '';
        const charactersLenght = characters.length;
        for (let i = 0; i < num ; i++){
            result1 += characters.charAt(Math.floor(Math.random() * charactersLenght));
        }
        return result1;
    }

}