import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Firestore, getDocs } from '@angular/fire/firestore';
import { Usuario } from "../basededatos/basededatos";
import { Canciones } from "../basededatos/basededatos";
import { collection, query } from "firebase/firestore";
import { addDoc, doc, setDoc } from "firebase/firestore";
import { Historial } from "../basededatos/basededatos";
import Swal from 'sweetalert2';

@Component ({
    selector: 'general',
    templateUrl: './general.html',
    styleUrls: ['./general.css']
})

export class GeneralComponent{

    Usuario = new Usuario();
    cancionesAleatorias: Canciones[] = [];
    Historial = new Historial()

    constructor(private firestore: Firestore, public router: Router){

        if (history.state.IdUsuario == "" || history.state.IdUsuario == undefined){

        }
        else{
            localStorage.setItem('Usuario', JSON.stringify(history.state));
        }
        this.Usuario = new Usuario();
        this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);
        this.top();
    }

    reproducir(cancion: Canciones){
        const dataToPass = {
            FotoCancion: cancion.FotoCancion,
            NombreCancion: cancion.NombreCancion,
            NombreArtista: cancion.NombreArtista,
            NombreAlbum: cancion.NombreAlbum,
            Link: cancion.Link
        };
    
        const combinedData = {
            Usuario: this.Usuario,
            DatosCancion: dataToPass
        };
    
        this.router.navigate(['/reproductor'], { state: combinedData });
    }

    async top() {
        const cancionesRef = collection(this.firestore, "Canciones");
        const cancionesSnapshot = await getDocs(cancionesRef); // Obtener todos los documentos

        const cancionesArray: Canciones[] = [];

        cancionesSnapshot.forEach((doc) => {
            const cancion = doc.data() as Canciones;
            cancionesArray.push(cancion);
        });

        // Obtener 3 canciones aleatorias
        const cancionesAleatoriasIndices = this.getRandomIndices(cancionesArray.length, 3);
        this.cancionesAleatorias = cancionesAleatoriasIndices.map(index => cancionesArray[index]);
    }

    getRandomIndices(totalCount: number, countToSelect: number): number[] {
        const indices: number[] = [];
        while (indices.length < countToSelect) {
        const randomIndex = Math.floor(Math.random() * totalCount);
        if (!indices.includes(randomIndex)) {
            indices.push(randomIndex);
        }
        }
        return indices;
    }

    historial(cancionSeleccionada: Canciones){
        const historial = new Historial();

        historial.idHistorial = this.generateRandomString(10);
        historial.idUsuario = this.Usuario.IdUsuario;
        historial.idCancion = cancionSeleccionada.IdCancion;
        historial.NombreCancion = cancionSeleccionada.NombreCancion;
        historial.NombreArtista = cancionSeleccionada.NombreArtista;
        historial.NombreUsuario = this.Usuario.NombreUsuario;
        
        const currentDate = new Date();
        historial.FechaReproduccion = this.formatDate(currentDate);

        let rutaMisFavoritos = doc(this.firestore, "Historial", historial.idHistorial)
        setDoc(rutaMisFavoritos, JSON.parse(JSON.stringify(historial))).then(() => {
            
        })
    }

    formatDate(date: Date): string {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
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