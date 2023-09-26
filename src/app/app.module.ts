import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { initializeApp, provideFirebaseApp} from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { NavComponent } from './layout/nav/nav.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import {ViewProductModalComponent} from "./layout/modals/view-product-modal.component";
import {ModalModule} from "ngx-bootstrap/modal";
import {ToastrModule} from "ngx-toastr";
import {CartComponent} from "./layout/nav/cart.component";
import {CarouselModule} from "ngx-bootstrap/carousel";
import {FirebaseImageService} from "./services/firebase-image.service";
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {AboutComponent} from "./pages/about.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FooterComponent} from "./layout/footer.component";
import {LoginComponent} from "./login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {UploadImgModalComponent} from "./layout/modals/upload-img-modal.component";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ShopComponent,
    ViewProductModalComponent,
    CartComponent,
    AboutComponent,
    FooterComponent,
    LoginComponent,
    UploadImgModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideStorage(() => getStorage()),
    GraphQLModule,
    ApolloModule,
    HttpClientModule,
    FlexLayoutModule,
    MatGridListModule,
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    ToastrModule.forRoot(
      {
        positionClass: 'toast-bottom-right',
        closeButton: true,
      }
    ),
    ReactiveFormsModule,
  ],
  providers: [
    ScreenTrackingService,UserTrackingService, FirebaseImageService, { provide: FIREBASE_OPTIONS, useValue: environment.firebase }, AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
