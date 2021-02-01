import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _servicioUrl: string = 'http://api.giphy.com/v1/gifs';
  private _apiKeyGiphyDev: string = 'ZxShx3tiQ311guiicibZBIwBb9cGclyZ';
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  public historial(): string[] {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  public buscarGifs(query: string = ''): void {
    query = query.trim().toLowerCase();
    const params = new HttpParams()
      .set('api_key', this._apiKeyGiphyDev)
      .set('limit', '10')
      .set('q', query);

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    this.http.get<SearchGifsResponse>(`${this._servicioUrl}/search`, { params })
      .subscribe((response) => {
        this.resultados = response.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
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

para almacenar informacion en el localStorage usamos el metodo setItem el cual recibe dos string como
parametro key value, pero el el value solo puede almacenar string pero si usamos el objeto JSON con el metodo
stringify el cual puede tomar cualquier objeto y lo convierte a un string, y asi podemos almacenar la lista
de ._historial

como el constructor se ejecuta una unica vez es el lugar ideal para cargar el localStorage asi que decimos que
historial sera igual al la llave 'historial' que se encuentre en el localStorage y la convierta en un objeto
y en caso de ser nullo ,nos devuelva un arreglo vacio.
*/


