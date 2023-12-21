import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, getDoc, getDocs, limit, onSnapshot, query, updateDoc, where } from '@angular/fire/firestore';


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
    if(!docs.empty){
       selectedGameRef = doc(this.firestore, COLLECTION, docs.docs[0].id);
       updateDoc(selectedGameRef, {player2: name, goesX: true});
       localStorage.setItem('PLAYER', '2');
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
        goesX: true,
        player1: name,
        player2: 'null',
        winner: 'null' 
      });
      
      localStorage.setItem('PLAYER', '1');
    };
    
    return selectedGameRef;
  }

  isGameFull(id: string){
    return doc(this.firestore, COLLECTION, id);
  }

  changeTurn(goesX: boolean ,id:string, value:string, _cId: string){
    let selectedGameRef = doc(this.firestore, COLLECTION, id);
    switch (_cId){
      case 'c1':
        updateDoc(selectedGameRef, {goesX: goesX, c1: value});
        break;
      case 'c2':
        updateDoc(selectedGameRef, {goesX: goesX, c2: value});
        break;
      case 'c3':
        updateDoc(selectedGameRef, {goesX: goesX, c3: value});
        break;
      case 'c4':
        updateDoc(selectedGameRef, {goesX: goesX, c4: value});
        break;
      case 'c5':
        updateDoc(selectedGameRef, {goesX: goesX, c5: value});
        break;
      case 'c6':
        updateDoc(selectedGameRef, {goesX: goesX, c6: value});
        break;
      case 'c7':
        updateDoc(selectedGameRef, {goesX: goesX, c7: value});
        break;
      case 'c8':
        updateDoc(selectedGameRef, {goesX: goesX, c8: value});
        break;
      case 'c9':
        updateDoc(selectedGameRef, {goesX: goesX, c9: value});
        break;
      }
    
  }
  async whoGoes(id: string){
    let selectedGame = await getDoc(doc(this.firestore, COLLECTION, id));
    return selectedGame.get('goesX');
  }
}
