import { Component, Input, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { Usuario } from "../basededatos/basededatos";
import { Canciones } from "../basededatos/basededatos";
import { collection, query } from "firebase/firestore";
import { Firestore, collectionData } from '@angular/fire/firestore';
import { ref } from "@angular/fire/storage";

@Component ({
    selector: 'nav-user',
    templateUrl: './navbaruser.component.html',
    styleUrls: ['./navbaruser.component.css']
})

export class NavbarComponent implements OnInit{

    @Input() usuario: Usuario;
    Canciones: Canciones[] = new Array();

    URLPublica = "";

    constructor(public router: Router, private firestore: Firestore)
    {
        this.usuario = new Usuario();
    }

    ngOnInit(): void {
        
    }

    buscarCancion(){
        
    }
    
}