import { Component, OnInit, OnChanges } from '@angular/core';
import { TypingService } from '../typing.service';

@Component({
  selector: 'ramm-typing',
  templateUrl: './typing.component.html',
  styleUrls: ['./typing.component.css']
})
export class TypingComponent {
  private current: string;

  constructor(private typingService: TypingService) { }

  private onTyping() {
    this.typingService.nextTyping(this.current);
  }

  private onTyped() {
    this.typingService.nextTyped(this.current);
  }
}
