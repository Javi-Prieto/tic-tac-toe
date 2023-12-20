import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, getDocs, limit, query, updateDoc, where } from '@angular/fire/firestore';


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
    let docs = await this.getEmpty2PlayersGames();
    let selectedGameRef;
    let toReturn: {game:any, isNew:boolean};
    if(!docs.empty){
       selectedGameRef = doc(this.firestore, COLLECTION, docs.docs[0].id);
       updateDoc(selectedGameRef, {player2: name});
       toReturn = {game: selectedGameRef, isNew: false};
    }else{
      selectedGameRef = addDoc(this.gamesRef,{
        c1: '',
        c2: '',
        c3: '',
        c4: '',
        c5: '',
        c6: '',
        c7: '',
        c8: "",
        c9: "",
        player1: name,
        player2: 'null',
        winner: 'null' 
      });
      toReturn = {game: selectedGameRef, isNew: false};
    };
    
    return selectedGameRef;
  }
}
