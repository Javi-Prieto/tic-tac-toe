import { Component, OnInit, inject } from '@angular/core';
import { GameService } from '../../services/game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuerySnapshot, onSnapshot } from '@angular/fire/firestore';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit {
  row = 0; 
  route: ActivatedRoute = inject(ActivatedRoute);
  gameId;
  isWaiting: boolean = false;
  c1: string = '';
  c2: string = '';
  c3: string = '';
  c4: string = '';
  c5: string = '';
  c6: string = '';
  c7: string = '';
  c8: string = '';
  c9: string = '';
  player1: string = '';
  player2: string = '';
  constructor(private gameService: GameService, private router: Router){
    this.gameId = this.route.snapshot.params['id'];
  }

  ngOnInit(){
    let doc = this.gameService.isGameFull(this.gameId);
    onSnapshot(doc, (doc) => {
      const game = doc;
      if(game.get('player2') == 'null'){
        this.isWaiting= true;
      }else{
        this.isWaiting = false;
      }
      this.c1 = game.get('c1');
      this.c2 = game.get('c2');
      this.c3 = game.get('c3');
      this.c4 = game.get('c4');
      this.c5 = game.get('c5');
      this.c6 = game.get('c6');
      this.c7 = game.get('c7');
      this.c8 = game.get('c8');
      this.c9 = game.get('c9');
      this.player1 = game.get('player1');
      this.player2 = game.get('player2');
      if(game.get('winner') != 'null'){
        this.router.navigate(['/']);
      }
  });
      
    
  }


  async onClickedBox(event: any) {
    let ellement = event.target;
    let doc = this.gameService.isGameFull(this.gameId);
    let content: string = ellement.textContent;
    let canClick:boolean =true;
    const whoGoes = await this.gameService.whoGoes(this.gameId);
    let boxClickeId = ellement.id;
    let boxValue;
    onSnapshot(doc, (doc) => {
      canClick = doc.get(boxClickeId) == ''? true: false;
    });
    if(content.length != 0){
      console.log("nonono");
    }else{
      if(localStorage.getItem('PLAYER') == '1'){
        if(whoGoes){
          boxValue = 'X';
          this.gameService.changeTurn(false, this.gameId, boxValue, boxClickeId);
        }else{
          alert('Not your turn');
        };
      }else{
        if(!whoGoes){
          boxValue = 'O';
          this.gameService.changeTurn(true, this.gameId, boxValue, boxClickeId);
        }else{
          alert('Not your turn');
        }
        
      }
      this.checkWin(whoGoes);
    };
    
  }

  checkWin(whoGoes: boolean){
    let check123 = this.c1===this.c2 && this.c2===this.c3 && this.c1.length!=0;
    let check456 = this.c4===this.c5 && this.c5===this.c6 && this.c4.length!=0;
    let check789 = this.c7===this.c8 && this.c8===this.c9 && this.c7.length!=0;
    let check147 = this.c1===this.c4 && this.c4===this.c7 && this.c1.length!=0;
    let check258 = this.c2===this.c5 && this.c5===this.c8 && this.c2.length!=0;
    let check369 = this.c3===this.c6 && this.c9===this.c6 && this.c3.length!=0;
    let check159 = this.c1===this.c5 && this.c9===this.c5 && this.c1.length!=0;
    let check357 = this.c3===this.c5 && this.c7===this.c5 && this.c3.length!=0;
    let draw = this.c1.length!=0 && this.c2.length!=0 && this.c3.length!=0 && this.c4.length!=0 && this.c5.length!=0 && this.c6.length!=0 && this.c7.length!=0 && this.c8.length!=0 && this.c9.length!=0
    
    if(check123 || check456 || check789 || check147 || check258 || check369 || check159 || check357){
      if(!whoGoes){
        alert(this.player1 + 'WINS!!!!!!!!');
        this.gameService.finishGame(this.player1, this.gameId);
      }else{
        alert(this.player2 + 'WINS!!!!!!!!');
        this.gameService.finishGame(this.player2, this.gameId);
      };
    };
    if(draw){
      alert('Was a Draw');
      this.gameService.finishGame('draw', this.gameId);
    }

    
  }
}
