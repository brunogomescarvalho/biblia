import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sub-menus',
  templateUrl: './sub-menus.component.html',
  styleUrls: ['./sub-menus.component.scss']
})
export class SubMenusComponent {

  panelOpenState = true

  @Input({ required: true }) opcoesSubMenu:any[] =[]

  @Input({ required: true }) icone!: string

  @Input({ required: true }) titulo!: string

}
