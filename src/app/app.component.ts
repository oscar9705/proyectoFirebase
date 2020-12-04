import { LlegadaService } from './llegada.service';
import { Component, OnInit } from '@angular/core';
import { Llegada } from './model/llegada';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'proyecto';
  resp: Llegada[] = [];
  carril1 : Llegada[]=[];
  carril2 : Llegada[]=[];
  carril3 : Llegada[]=[];

  constructor(private llegadaService:LlegadaService ){

  }
  ngOnInit(): void {
    this.llegadaService.getLlegadas().subscribe(
      data => {
        this.resp = data.map(res => {
          return {
            id: res.doc.id,
            ...res.doc.data()
          } as Llegada;
         } );
        this.carril1 = this.resp.filter(resp => resp.estado === 'pendiente' && resp.carril === 'Carril 1');
        this.carril2 = this.resp.filter(resp => resp.estado === 'pendiente' && resp.carril === 'Carril 2');
        this.carril3 = this.resp.filter(resp => resp.estado === 'pendiente' && resp.carril === 'Carril 3');
        console.log(this.resp);
      }
    );
  }
}
