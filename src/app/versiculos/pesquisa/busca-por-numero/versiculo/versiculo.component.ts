import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VersiculoViewModel } from '../../../../models/models';

@Component({
  selector: 'app-versiculo',
  templateUrl: './versiculo.component.html',
  styleUrls: ['./versiculo.component.scss']
})
export class VersiculoComponent implements OnInit {

  versiculo?: VersiculoViewModel

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

   this.versiculo = this.route.snapshot.data['versiculo']
  }

}
