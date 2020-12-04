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
        this.resp = this.resp.filter(resp => resp.estado === 'pendiente');
        console.log(this.resp);
      }
    );
  }
}
