import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import {AboutComponent} from "./pages/about.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'shop/:category', component: ShopComponent },
  { path: 'shop/:category/:subcategory', component: ShopComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
