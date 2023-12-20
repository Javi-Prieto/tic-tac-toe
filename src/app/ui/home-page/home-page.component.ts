import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  name: string = '';
  constructor(private modalService: NgbModal, private gService: GameService, private router: Router){}

  open(content: TemplateRef<any>) {
		this.modalService.open(content);
	}

  goGame(){
    this.gService.addPlayer(this.name)
    .then(ans => {
      this.modalService.dismissAll();
      let gameId = ans.id;
      //  this.router.navigate(['/waiting-for-game/'+gameId]);
      this.router.navigate(['/game/'+gameId]);
      

    }).catch(error => {
      console.log(error);
    });
  }
}
