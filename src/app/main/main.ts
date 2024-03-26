import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Firestore } from '@angular/fire/firestore';
import { Usuario } from "../basededatos/basededatos";
import { collection, query, where, collectionData, snapToData } from "@angular/fire/firestore";
import Swal from 'sweetalert2'

@Component ({
    selector: 'main',
    templateUrl: './main.html',
    styleUrls: ['./main.css']
})

export class MainComponent{
    Usuario = new Usuario();
    NuevoUsario = new Usuario();

    constructor(private firestore: Firestore, public router: Router){

    }
    
    acceder(){
        const usuarios = collection(this.firestore, "Usuario")
        const consulta = query(usuarios, where("Correo", "==", this.Usuario.Correo), where("Contra", "==", this.Usuario.Contra))
        collectionData(consulta).subscribe((snapUsuarios) => {
            if (snapUsuarios.length > 0) {
                this.Usuario.setData(snapUsuarios[0])
                this.router.navigate(['/general'], { state: this.Usuario})
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Datos incorrectos',
                    text: 'No se encontró ningún usuario con esos datos'
                })
            }
        })
    }
}