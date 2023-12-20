import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './ui/home-page/home-page.component';
import { GamePageComponent } from './ui/game-page/game-page.component';
import { NewGamePageComponent } from './ui/new-game-page/new-game-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'game/:id', component: GamePageComponent},
  {path: 'waiting-for-game/:id', component: NewGamePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
