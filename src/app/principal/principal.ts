import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Firestore } from '@angular/fire/firestore';
import { Usuario } from "../basededatos/basededatos";

@Component ({
    selector: 'principal',
    templateUrl: './principal.html',
    styleUrls: ['./principal.css']
})

export class PrincipalComponent{

    Usuario = new Usuario();

    constructor(private firestore: Firestore, public router: Router){

        
    }
}