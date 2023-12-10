import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { CardHoverDirective } from './directives/card-hover-directve';



@NgModule({
  declarations: [DashboardComponent, CardHoverDirective],
  imports: [CommonModule, AppMaterialModule],
  exports: [CardHoverDirective, AppMaterialModule],
})
export class SharedModule { }
