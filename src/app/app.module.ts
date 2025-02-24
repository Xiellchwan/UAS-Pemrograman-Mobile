import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PostProvider } from '../provider/post-provider';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  imports: [BrowserModule, FormsModule,
            IonicModule.forRoot(),
            AppRoutingModule,
            HttpClientModule,
            IonicStorageModule.forRoot()
           ],
      declarations: [AppComponent, ModalComponent],
  providers: [
    PostProvider,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
