import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  name: string = '';
  email: string = '';
  pswd: string = '';


  isRegister: boolean = true;
  constructor(private modalService: NgbModal, private router: Router, private authService: AuthService){}

  open(content: TemplateRef<any>) {
		this.modalService.open(content);
	}

  registerName(){
    if(this.name != ''){
      window.localStorage.setItem('PLAYER_NAME', this.name);
      this.router.navigate(['/logged']);
    }
  }

  registerEmailPswd(){
    if(this.isRegister){
      this.authService.createUserWithEmail(this.email, this.pswd).then(() =>{
        this.router.navigate(['/logged']);
      }).catch(() =>{
        alert('something goes wrong')
      });
    }
    this.authService.signInWithEmail(this.email, this.pswd).then(() =>{
      this.router.navigate(['/logged']);
    }).catch(() =>{
      alert('something goes wrong')
    });
  }
  registerGoogle(){
    this.authService.signInWithGoogle().then(() =>{
      this.router.navigate(['/logged']);
    }).catch(() =>{
      alert('something goes wrong')
    });
  }
}
