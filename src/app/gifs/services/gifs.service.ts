import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _gifSearchEndpoint: string = 'http://api.giphy.com/v1/gifs/search';
  private _apiKeyGiphyDev: string = 'ZxShx3tiQ311guiicibZBIwBb9cGclyZ';
  private _historial: string[]= [];
  // TODO: Cambiar any por su tipo correspondiente
  public resultados: Gif[] =[];

  public historial(): string[]{
    return [...this._historial];
  }

  constructor(private http: HttpClient){}

  public buscarGifs(query:string = ''):void {
    query = query.trim().toLowerCase();
    console.log(query);

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }

    this.http.get<SearchGifsResponse>(`${this._gifSearchEndpoint}?api_key=${this._apiKeyGiphyDev}&q=${query}&limit=10`)
      .subscribe( (response) => {
        console.log(response.data);
        this.resultados = response.data;
      })

  }
}

/*
providedIn: 'root' => esta caracteristica permite a los servicios puedan estar definidos en el momento
en el que se construye el bundle de la aplicacion, al especificarlo le dice a Angular "Que no importa
en que parte de la aplicacion sea que este, este servicio va a ser unico y de manera global en el root",
esto evita que se especifique en los providers

includes() : si existe o si incluye

colocando tipado a la peticion htttp en este caso por medio de postman se copio toda la respuesta, luego
en https://app.quicktype.io/ la pegamos y nos genero una interface de esta respuesta, con ello se genera
el tipado y se añade a la peticion get ya que este es de tipo generico, asi que ese get traera una informacion
y lucira en este caso con la interface añadida, con ello no vamos a tener problema en acceder a los datos
que genera la respuesta ni tener que memorizarla.

los resultados seran de tipo Gif el cual se modifico de la interface añadida ya que venian como Datum y
se cambio a Gif
*/
