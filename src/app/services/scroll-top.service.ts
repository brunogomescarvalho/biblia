import { ElementRef, Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollTopService {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  scrollAoTopo() {
    const container = this.el.nativeElement;

    // Use o Renderer2 para rolar até o topo
    this.renderer.setProperty(container, 'scrollTop', 0);
  }
}
