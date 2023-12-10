import { ShellComponent } from './shell/shell.component';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IMAGE_CONFIG } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { IncluirTokenInterceptor } from './services/http/token.interceptor';
import { interceptorLoading } from './services/loading/interceptor-loading';
import { LoadingService } from './services/loading/loadingService';
import { ImagemService } from './services/tema/imagem.service';
import { TemaService } from './services/tema/tema.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { AppMaterialModule } from './shared/app-material/app-material.module';

export function atribuirTemaUsuarioFactory(temaService: TemaService) {
  return () => temaService.aplicarTemaUsuario();
}

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule
  ],
  providers: [
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
      provide: APP_INITIALIZER,
      useFactory: atribuirTemaUsuarioFactory,
      deps: [TemaService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
