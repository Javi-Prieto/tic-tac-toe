import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDocs, limit, query, updateDoc, where } from 'firebase/firestore';


const COLLECTION = 'games';
@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(public firestore: Firestore) {}
  gamesRef = collection(this.firestore, COLLECTION);

  getEmpty2PlayersGames(){
    const q = query(this.gamesRef, where("player2", "==", "null"), limit(1));
    const doc = getDocs(q);
    return doc;
  }

  async addPlayer(name:string){
    let docs = await this.getEmpty2PlayersGames()
    
    if(!docs.empty){
      const selectedGameRef = doc(this.firestore, COLLECTION, docs.docs[0].id);
      updateDoc(selectedGameRef, {player2: name})
    }
  }
}
