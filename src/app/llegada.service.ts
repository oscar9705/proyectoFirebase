import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LlegadaService {

  constructor(private firestore: AngularFirestore) { }

  getLlegadas(): Observable<any[]>{
    return this.firestore.collection('recogidas').snapshotChanges();
  }

}
