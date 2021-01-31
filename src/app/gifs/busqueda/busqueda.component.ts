import { Component, ViewChild, ElementRef } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') public txtBuscar!:ElementRef<HTMLInputElement>;

  constructor(private gitService: GifsService){}

  public buscar():void {
    const valor = this.txtBuscar.nativeElement.value;
    this.gitService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value = '';
  }
}
/*
  La anotacion @ViewChild de angular/core hace referencia al nombre del elemento que se quiere buscar
  ya sea por directivas, elementos html, clases, pero en este caso usamos la referencia local #txtBuscar
  el cual se almacena en una variable y para evitar el error en un principio se puede marcar como tipo any.

  en este caso este elemento es de tipo ElementRef pero como se esta trabajando de un modo super estricto y
  este erro hace referencia a que este elemento no se ha instanciado pero estamos seguros de que existe ya
  que hace parte del html, para solventar esto colocamos un signo de admiracion '!' este es un operador para
  asegurarse de que el operador no es nullo

  como el ElementRef es de tipo generico hay que especificarle el tipo que es HTMLInputElement, con esto
  podemos llamar al element al metodo value ya que sin especificarle el tipo vscode no nos sugiere nada.
  con esto podemos almacenar el valor y una vez hecho podemos igualarlo a '';

*/
