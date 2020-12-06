import { logging } from 'protractor';
import { Student } from './model/student';
import { LlegadaService } from './llegada.service';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Llegada } from './model/llegada';
import { Prueba } from './model/prueba';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'proyecto';
  loading = false;
  resp: Llegada[] = [];
  carril1: Llegada[] = [];
  carril2: Llegada[] = [];
  carril3: Llegada[] = [];
  carril: any[][] = [[],[],[]];
  todo: any[] = [];

  constructor(private llegadaService: LlegadaService ){

  }
  ngOnInit(): void {
    
    this.llegadaService.getLlegadas().subscribe(
      data => {
        this.carril = [[],[],[]];
        this.todo = [];
        this.resp = data.map(res => {
          return {
            id: res.doc.id,
            ...res.doc.data()
          } as Llegada;
         } );
        // tslint:disable-next-line: max-line-length
        this.carril1 = this.resp.filter(resp => resp.estado === 'pendiente' && resp.carril === 'Carril 1').sort((a, b) => a.fecha - b.fecha);
        // tslint:disable-next-line: max-line-length
        this.carril2 = this.resp.filter(resp => resp.estado === 'pendiente' && resp.carril === 'Carril 2').sort((a, b) => a.fecha - b.fecha);
        // tslint:disable-next-line: max-line-length
        this.carril3 = this.resp.filter(resp => resp.estado === 'pendiente' && resp.carril === 'Carril 3').sort((a, b) => a.fecha - b.fecha);
        console.log(this.resp);
        console.log(this.carril3);
        for (let i = 0 ; i < this.calcularMayor().length; i++){
          for (let j = 0 ; j < 3; j++){
            if (j === 0 && i < this.carril1.length){
              if (i >= 1 ){
                this.carril[i][j] = this.carril1[i];
              } else{

                this.carril[i][j] = this.carril1[i];
              }
            }
            if (j === 1 && i < this.carril2.length){
              this.carril[i][j] = this.carril2[i];
            }
            if (j === 2 && i < this.carril3.length){
              this.carril.map(a => console.log(a));
              this.carril[i][j] = this.carril3[i];
            }
          }
        }
        this.carril.map(a => {
          this.todo.push(a);
        });
        console.log(this.todo);

      /*   for (let _i = 0; _i < this.calcularMayor().length; _i++) {
          this.prueba[_i].carril1 = this.carril1;
          this.prueba[_i].carril2 = this.carril2;
          this.prueba[_i].carril3 = this.carril3;
        }
        this.prueba = this.prueba.filter(resp => resp.carril1 !== undefined ||  resp.carril2 !== undefined ||  resp.carril3 !== undefined);
        console.log(this.prueba); */
      }
    );
  }

    calcularMayor(): Llegada[]{
      if (this.carril1.length >= this.carril2.length && this.carril1.length >= this.carril3.length){
        return this.carril1;
      }
      if (this.carril2.length >= this.carril1.length && this.carril2.length >= this.carril3.length){
        return this.carril2;
      }
      if (this.carril3.length >= this.carril2.length && this.carril3.length >= this.carril1.length){
        return this.carril3;
      }
    }
   clasificarAlumnoPrimaria(seccion: string): boolean{
      if (seccion === 'Primaria'){
       return true;
     } else {
       return false;
     }
  }
  clasificarAlumnoPreescolar(seccion: string): boolean{
    if (seccion === 'Pre-escolar'){
      return true;
    } else {
      return false;
    }
 }
 clasificarAlumnoBachillerato(seccion: string): boolean{
  if (seccion === 'Bachillerato'){
    return true;
  } else {
    return false;
  }
}
}
