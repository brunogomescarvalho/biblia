import { IMAGE_CONFIG, registerLocaleData } from '@angular/common';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IncluirTokenInterceptor } from './services/http/token.interceptor';
import { interceptorLoading } from './services/loading/interceptor-loading';
import { LoadingService } from './services/loading/loadingService';
import { LocalStorageService } from './services/localStorage/localStorage.service';
import { ImagemService } from './services/tema/imagem.service';
import { TemaService } from './services/tema/tema.service';
import { SharedModule } from './shared/shared.module';
import { ShellComponent } from './shell/shell.component';
import { SubMenusComponent } from './shell/sub-menus/sub-menus.component';



export function atribuirTemaUsuarioFactory(temaService: TemaService) {
  return () => temaService.aplicarTemaUsuario();
}


const locale = 'pt-BR'
registerLocaleData(localePt, locale);


@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    SubMenusComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,


  ],
  providers: [
    LocalStorageService,
    LoadingService,
    TemaService,
    ImagemService,
    provideHttpClient(
      withInterceptors([IncluirTokenInterceptor, interceptorLoading])
    ),
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2500,
      },
    },
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true,
      },

    },
    {
      provide: LOCALE_ID, useValue: locale
    },
    {
      provide: APP_INITIALIZER,
      useFactory: atribuirTemaUsuarioFactory,
      deps: [TemaService],
      multi: true,
    },


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
