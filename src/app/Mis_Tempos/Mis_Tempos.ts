import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Firestore, collectionData, where } from '@angular/fire/firestore';
import { Favoritos, Usuario } from "../basededatos/basededatos";
import { Mistempos } from "../basededatos/basededatos";
import { Canciones } from "../basededatos/basededatos";
import { collection, query } from "firebase/firestore";
import { FirebaseStorage, Storage, getDownloadURL, ref, uploadBytesResumable } from "@angular/fire/storage";
import Swal from 'sweetalert2';
import { url } from "inspector";
import { addDoc, doc, setDoc } from "firebase/firestore";

@Component ({
    selector: 'MisTempos',
    templateUrl: './Mis_Tempos.html',
    styleUrls: ['./Mis_Tempos.css']
})

export class Mis_temposComponent{

    Usuario = new Usuario();
    misTempos = new Mistempos();
    ListaMisTempos: Mistempos[] = new Array(); /*MisTempos creados por el usuario*/
    Canciones: Canciones[] = new Array();
    favoritos = new Favoritos();
    CancionesTempo: Canciones[] = new Array();

    constructor(private firestore: Firestore, public router: Router, private fireStorage: Storage){
        
        if (history.state.IdUsuario == "" || history.state.IdUsuario == undefined){

        }
        else{
            localStorage.setItem('Usuario', JSON.stringify(history.state));
        }
        this.Usuario = new Usuario();
        this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);
        this.mostrarMisTempos();
        this.traercanciones();
    }

    generarMisTempos(){
        this.misTempos.idMistempos = this.generateRandomString(10);
        this.misTempos.idUsuario = this.Usuario.IdUsuario
        this.misTempos.NombreUsuario = this.Usuario.NombreUsuario
        let rutaMiTempo = doc(this.firestore, "Mistempos", this.misTempos.idMistempos)
        setDoc(rutaMiTempo, JSON.parse(JSON.stringify(this.misTempos))).then(() => {
            Swal.fire({
                icon: 'success',
                title: '¡Tempo creado!',
                text: `Se ha creado el Tempo correctamente.`,
                timer: 2000,
                timerProgressBar: true
            });
        })
    }

    mostrarMisTempos(){
        const Listas = collection(this.firestore, "Mistempos");
        const consulta = query(Listas, where ("idUsuario", "==", this.Usuario.IdUsuario));
        collectionData(consulta).subscribe((snapMistempos) => {
            this.ListaMisTempos = new Array()
            if (snapMistempos.length > 0){
                snapMistempos.forEach((item: any) => {
                    let listas = new Mistempos()
                    listas.setData(item)
                    this.ListaMisTempos.push(listas)
                })
            }
        })
    }

    mostrarcancionesTempo(tempo: Mistempos) {
        this.misTempos = tempo; // Update the current Tempo
        const consultacanciones = query(collection(this.firestore, "Canciones"), where("IdCancion", "in", tempo.Canciones.map(c => c.IdCancion)));
        this.CancionesTempo = new Array(); // Clear the array before adding new songs
        collectionData(consultacanciones).subscribe((snapCancionesTempo) => {
            snapCancionesTempo.forEach((cancionestem) => {
                let canctempo = new Canciones();
                canctempo.setData(cancionestem);
                this.CancionesTempo.push(canctempo);
            });
        });
    }    

    traercanciones(){
        const canciones = collection(this.firestore, "Canciones")
        const consulta2 = query(canciones)
        this.Canciones = new Array()
        collectionData(consulta2).subscribe((snapCanciones) => {
            snapCanciones.forEach((cancion) => {
                let item = new Canciones();
                item.setData(cancion);
                this.Canciones.push(item);
            });
        });
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

    agregaraTempo(selectedCancion: Canciones) {
        // Find the Tempo where you want to add the song (replace "Prueba 2" with the actual Tempo's name)
        const tempo = this.ListaMisTempos.find(tempo => tempo.NombreLista = tempo.NombreLista);
    
        if (tempo) {
            // Create a new song object with the relevant data
            const newSong = {
                IdCancion: selectedCancion.IdCancion,
                NombreCancion: selectedCancion.NombreCancion,
                NombreArtista: selectedCancion.NombreArtista,
                NombreAlbum: selectedCancion.NombreAlbum
            };
    
            // Add the new song to the Tempo's song list
            tempo.Canciones.push(newSong);
    
            // Optionally, update the Tempo in the database
            // Replace "Mistempos" with the actual Firestore collection name
            const tempoDocRef = doc(this.firestore, "Mistempos", tempo.idMistempos);
            setDoc(tempoDocRef, { Canciones: tempo.Canciones }, { merge: true }).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Canción agregada',
                    text: `La canción "${selectedCancion.NombreCancion}" se ha agregado al Tempo.`,
                    timer: 2000,
                    timerProgressBar: true
                });
            });
        } 
    }

    darLike(cancionSeleccionada: Canciones){
        const favoritos = new Favoritos();

        favoritos.idFavorito = this.generateRandomString(10);
        favoritos.idUsuario = this.Usuario.IdUsuario;
        favoritos.idCancion = cancionSeleccionada.IdCancion;
        favoritos.NombreCancion = cancionSeleccionada.NombreCancion
        
        const currentDate = new Date();
        favoritos.FechaFavorito = this.formatDate(currentDate);

        let rutaMisFavoritos = doc(this.firestore, "Favoritos", favoritos.idFavorito)
        setDoc(rutaMisFavoritos, JSON.parse(JSON.stringify(favoritos))).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Canción likeada',
                text: `Se ha agregado a tus favoritos`,
                timer: 2000,
                timerProgressBar: true
            });
        })
    }

    formatDate(date: Date): string {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    guardarArchivo(){
        let archivo = <HTMLInputElement> document.getElementById("archivo")
        if (archivo.files?.length! >0)
        {
            const storageRef = ref(this.fireStorage, archivo.files![0].name);
            let ruta = archivo.files![0].name
            uploadBytesResumable(storageRef, archivo.files![0]).then(()=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Archivo Subido',
                    text: 'Se subio el archivo'
                })
                getDownloadURL(ref(this.fireStorage, ruta)).then((url)=>{
                    let img = document.getElementById("ejemplo")
                    img!.setAttribute('src', url);
                })
            });
        }
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