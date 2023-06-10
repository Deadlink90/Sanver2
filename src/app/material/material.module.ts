import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { EditComponent } from './dialogs/settings/edit/edit.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  entryComponents:[
  EditComponent
  ],
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSortModule,
    MatTabsModule,
    MatExpansionModule,
    MatIconModule,
    MatDialogModule,
    MatChipsModule,
    MatInputModule,
    MatTooltipModule
  ],
  exports: [
    MatButtonModule,
    MatSortModule,
    MatTabsModule,
    MatExpansionModule,
    MatIconModule,
    MatDialogModule,
    MatChipsModule,
    MatInputModule,
    MatTooltipModule
  ],
})
export class MaterialModule {}
