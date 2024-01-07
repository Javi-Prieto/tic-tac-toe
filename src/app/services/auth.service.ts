import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth:Auth, public provider: GoogleAuthProvider) { }

  async createUserWithEmail(email:string, password:string){
    await createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) =>{
        userCredential.user;
        window.localStorage.setItem('USER_AUTHENTICATED', userCredential.user.refreshToken);
        window.localStorage.setItem('PLAYER_NAME', userCredential.user.displayName!);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });

    
  }
  async signInWithEmail(email:string, password: string){
    await signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        window.localStorage.setItem('USER_AUTHENTICATED', userCredential.user.refreshToken);
        window.localStorage.setItem('PLAYER_NAME', userCredential.user.displayName!);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  signOut(){
    signOut(this.auth);
  }

  async signInWithGoogle(){
    await signInWithPopup(this.auth, this.provider)
      .then(result => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        window.localStorage.setItem('PLAYER_NAME', result.user.displayName!);
      })
      .catch(error => {
        console.log(error);
      })
  }

}
