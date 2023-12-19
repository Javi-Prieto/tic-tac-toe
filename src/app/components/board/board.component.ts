import { Component } from '@angular/core';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  goesX: boolean = true;
  board: string[] = [];
  row = 0; 
  
  onClickedBox(event: any) {
    let ellement = event.target;
    if(ellement.hasChildNodes()){
      console.log("nonono")
    }else{
      const p = document.createElement("p");
      p.classList.add('fw-bold', 'display-1');
      if(this.goesX){
        p.textContent= 'X';
        ellement.append(p);
        this.goesX = false;
      }else{
        p.textContent= 'O';
        ellement.append(p);
        this.goesX = true;
      }
    }
  }
}
