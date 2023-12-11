import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatMenuModule} from '@angular/material/menu';
import {MatTreeModule} from '@angular/material/tree';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  exports: [
    MatDividerModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatSortModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatTreeModule,
    MatExpansionModule

  ],
})
export class AppMaterialModule {}
