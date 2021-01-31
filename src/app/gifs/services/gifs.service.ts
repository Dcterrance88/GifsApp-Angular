import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[]= [];

  public historial(): string[]{
    return [...this._historial];
  }

  public buscarGifs(query:string):void {
    this._historial.unshift(query);
    console.log(this._historial);
  }
}

/*
providedIn: 'root' => esta caracteristica permite a los servicios puedan estar definidos en el momento
en el que se construye el bundle de la aplicacion, al especificarlo le dice a Angular "Que no importa
en que parte de la aplicacion sea que este, este servicio va a ser unico y de manera global en el root",
esto evita que se especifique en los providers
*/
