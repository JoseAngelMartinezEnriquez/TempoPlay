import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Firestore } from '@angular/fire/firestore';
import { Usuario } from "../basededatos/basededatos";
import { Canciones } from "../basededatos/basededatos";
import { Favoritos } from "../basededatos/basededatos";
import Swal from 'sweetalert2';
import { doc, setDoc } from "firebase/firestore";

@Component ({
    selector: 'reproductor',
    templateUrl: './reproductor.html',
    styleUrls: ['./reproductor.css']
})

export class reproductorComponent{

    Usuario = new Usuario();
    Cancion = new Canciones();
    favoritos = new Favoritos();
    audio = new Audio()
    audioActivo = false;
    canciones: Canciones[] = [];
    currentSongIndex = 0;

    constructor(private firestore: Firestore, public router: Router){

        if (history.state.Id == "" || history.state.Id == undefined){

        }
        else{
            localStorage.setItem('Usuario', JSON.stringify(history.state));
        }
        if (history.state.Usuario) {
            this.Usuario = history.state.Usuario;
        }
        if (history.state.DatosCancion) {
            this.Cancion = history.state.DatosCancion;
            localStorage.setItem('CancionData', JSON.stringify(this.Cancion));
        }
        this.Usuario = new Usuario();
        this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);
        this.audio.load();
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

    getProgressWidth(): string {
        const currentTime = this.audio.currentTime;
        const duration = this.audio.duration;
        const progressPercentage = (currentTime / duration) * 100;
        return `${progressPercentage}%`;
    }

    ngOnInit() {
        const storedCancionData = localStorage.getItem('CancionData');
        if (storedCancionData) {
            this.Cancion = JSON.parse(storedCancionData);
            this.audio.src = this.Cancion.Link;
            this.audio.load(); // Carga el audio
            this.audio.play(); // Reproduce el audio automáticamente
            this.audioActivo = true; // Marca como activo

            this.audio.addEventListener('timeupdate', () => {
                this.updateProgress(); // Actualiza la barra de progreso
            });
        }
    }

    updateProgress() {
        const progressWidth = this.getProgressWidth();
        const progressBar = document.querySelector('.progress') as HTMLElement;
        progressBar.style.width = progressWidth;
    }

    repeatSong(){
        if (this.audio.currentTime > 0) {
            this.audio.currentTime = 0; // Reinicia la canción
            this.audio.play(); // Inicia la reproducción
        }
    }

    togglePlay(){
        this.audioActivo = !this.audioActivo
        if(this.audioActivo){
            this.audio.play();
        }
        else{
            this.audio.pause();
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