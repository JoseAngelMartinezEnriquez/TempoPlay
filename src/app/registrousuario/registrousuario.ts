import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Firestore } from '@angular/fire/firestore';
import { Usuario } from "../basededatos/basededatos";
import { collection, query, where, collectionData, snapToData } from "@angular/fire/firestore";
import { doc, setDoc } from 'firebase/firestore'

@Component ({
    selector: 'registrousuario',
    templateUrl: './registrousuario.html',
    styleUrls: ['./registrousuario.css']
})

export class RegistroComponent{
    
    Usuario = new Usuario();
    NuevoUsuario = new Usuario();

    constructor(private firestore: Firestore, public router: Router){

    }

    registrar(){
        this.NuevoUsuario.IdUsuario = this.generateRandomString(10);
        let rutaRegistro = doc(this.firestore, "Usuario", this.NuevoUsuario.IdUsuario)
        setDoc(rutaRegistro, JSON.parse(JSON.stringify(this.NuevoUsuario))).then(() => {
            alert("Se ha registrado correctamente");
            this.router.navigate(['/']);
        })
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