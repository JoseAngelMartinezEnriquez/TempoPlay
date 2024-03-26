//José Ángel Martínez Enríquez
//José Julián Ortíz Zacarías

export class Canciones {
    public IdCancion: string = "0";
    //Campos
    public NombreCancion: string = "";                    //Nombre de la canción
    public NombreArtista: string = "";                    //Nombre del artista de la canción
    public NombreAlbum: string = "";                      //Nombre del álbum perteneciente a la canción
    public Duracion: number = 0;                          //Duración de la canción
    public FotoCancion: string = "";                      //Foto de la canción (o álbum)
    public FechaCancion: string = "";
    public FechaCancionValue: number = 0;                 //Fecha de la canción
    public Link: string = "";                             //URL del audio

    constructor() {}

    setData(data: any){
      this.IdCancion = data.IdCancion;
      this.NombreCancion = data.NombreCancion;
      this.NombreArtista = data.NombreArtista;
      this.NombreAlbum = data.NombreAlbum;
      this.Duracion = data.Duracion;
      this.FotoCancion = data.FotoCancion;
      this.FechaCancion = data.FechaCancion;
      this.FechaCancionValue = data.FechaCancionValue;
      this.Link = data.Link;
    }
}

export class Artistas {
    public IdArtista: string = "0";
    //Campos
    public NombreArtista: string = "";                    //Nombre del artista
    public Canciones: string [] = [
      "Id de la canción",        //IdCancion
      "Nombre de la canción",    //NombreCanción
      "Duración de la canción",  //Duracion
      "Fecha de la canción"      //FechaCancion
    ]
    public Albumes: string [] = [
      "Id del álbum",            //IdAlbum
      "Nombre del álbum",        //NombreAlbum
      "Foto del álbum",          //Imagen del álbum
      "Fecha del álbum"          //FechaAlbum
    ];
    public FotoArtista: string = "";                      //Foto del artista

    constructor() {}

    setData(data: any){
      this.IdArtista = data.IdArtista;
      this.NombreArtista = data.NombreArtista;
      this.Canciones = data.Canciones;
      this.Albumes = data.Albumes;
      this.FotoArtista = data.FotoArtista;
    }
}

export class Albumes {
    public IdAlbum: string = "0";
    //Campos                         
    public NombreAlbum: string = "";                        //Nombre del álbum
    public IdArtista: string = "0";                         //Id del artista perteneciente al álbum
    public NombreArtista: string = "";                      //Nombre del artista perteneciente al álbum
    public Canciones: string [] = [
      "Id de la canción",        //IdCancion
      "Nombre de la canción",    //NombreCanción
      "Duración de la canción",  //Duracion
      "Fecha de la canción"      //FechaCancion
    ]
    public FotoAlbum: string = "";                          //Foto del álbum
    public FechaAlbum: string = "";
    public FechaAlbumValue: number = 0;                     //Fecha del álbum

    constructor() {}

    setData(data: any){
      this.IdAlbum = data.IdAlbum;
      this.NombreAlbum = data.NombreAlbum
      this.IdArtista = data.IdArtista;
      this.NombreArtista = data.NombreArtista;
      this.Canciones = data.Canciones;
      this.FotoAlbum = data.FotoAlbum;
      this.FechaAlbum = data.FechaAlbum;
      this.FechaAlbumValue = data.FechaAlbumValue;
    }
}

export class Usuario {
    public IdUsuario: string = "0";
    //Campos
    public NombreUsuario: string = "";                      //Nombre del usuario
    public Correo: string = "";                             //Correo electrónico de registro
    public Contra: string = "";                             //Contraseña

    constructor() {

    }

    setData(data: any){
      this.IdUsuario = data.IdUsuario;
      this.NombreUsuario = data.NombreUsuario;
      this.Correo = data.Correo;
      this.Contra = data.Contra;
    }
}

export class Historial{
  public idHistorial: string = "0";
  //Campos
  public idCancion: string = "0";
  public NombreCancion: string = "";                        //Nombre de la canción
  public idArtista: string = "0";
  public NombreArtista: string = "";                        //Nombre del artista de la canción
  public idUsuario: string = "0";
  public NombreUsuario: string = "";                        //Usuario que escuchó la canción
  public FechaReproduccion: string = "";                    
  public FechaReproduccionValue: number = 0;                //Fecha en la que se hizo la reproduccion

  constructor() {}

  setData(data: any){
    this.idHistorial = data.idHistorial;
    this.idCancion = data.idCancion;
    this.NombreCancion = data.NombreCancion;
    this.idArtista = data.idArtista;
    this.NombreArtista = data.NombreArtista;
    this.idUsuario = data.idUsuario;
    this.NombreUsuario = data.NombreUsuario;
    this.FechaReproduccion = data.FechaReproduccion;
    this.FechaReproduccionValue = data.FechaReproduccionValue;
  }
}

export class Favoritos{
  public idFavorito: string = "0";
  //Campos
  public idUsuario: string = "0";
  public idCancion: string = "0";
  public NombreCancion: string = "0";                       //Nombre de la cancion
  public FechaFavorito: string = "";                        
  public FechaFavoritoValue: number = 0;                    //Fecha en que se agregó a Favoritos

  constructor() {}

  setData(data: any){
    this.idFavorito = data.idFavorito;
    this.idUsuario = data.idUsuario;
    this.idCancion = data.idCancion;
    this.NombreCancion = data.NombreCancion;
    this.FechaFavorito = data.FechaFavorito;
    this.FechaFavoritoValue = data.FechaFavoritoValue;
  }
}

export class Mistempos {
  public idMistempos: string = "0";
  public idUsuario: string = "0";
  public NombreUsuario: string = "";
  public NombreLista: string = "";
  public Canciones: Array<Cancion> = []; // Change the data type to an array of Cancion objects
  public DuracionCompleta: number = 0;
  public Descripcion: string = "";

  constructor() {}

  setData(data: any) {
    this.idMistempos = data.idMistempos;
    this.idUsuario = data.idUsuario;
    this.NombreUsuario = data.NombreUsuario;
    this.NombreLista = data.NombreLista;
    this.Canciones = data.Canciones || []; // Initialize the Canciones array
    this.DuracionCompleta = data.DuracionCompleta;
    this.Descripcion = data.Descripcion;
  }
}

export class Cancion {
  public IdCancion: string = "";
  public NombreCancion: string = "";
  public NombreArtista: string = "";
  public NombreAlbum: string = "";

  constructor(id: string, nombre: string, artista: string, album: string) {
    this.IdCancion = id;
    this.NombreCancion = nombre;
    this.NombreArtista = artista;
    this.NombreAlbum = album;
  }
}