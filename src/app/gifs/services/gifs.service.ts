import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKeyGiphyDev: string = 'ZxShx3tiQ311guiicibZBIwBb9cGclyZ';
  private _historial: string[]= [];

  public historial(): string[]{
    return [...this._historial];
  }

  constructor(private http: HttpClient){}

  public buscarGifs(query:string = ''):void {
    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }

    this.http.get('http://api.giphy.com/v1/gifs/search?api_key=ZxShx3tiQ311guiicibZBIwBb9cGclyZ&q=dragon ball z&limit=10')
      .subscribe( (response:any) => {
        console.log(response.data);
      })

  }
}

/*
providedIn: 'root' => esta caracteristica permite a los servicios puedan estar definidos en el momento
en el que se construye el bundle de la aplicacion, al especificarlo le dice a Angular "Que no importa
en que parte de la aplicacion sea que este, este servicio va a ser unico y de manera global en el root",
esto evita que se especifique en los providers

includes() : si existe o si incluye
*/
