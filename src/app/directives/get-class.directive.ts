import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appGetClass]',
  exportAs: 'appGetClass',
  standalone: true,
})
export class GetClassDirective {
  @Input() appClass!: string;

  @Output() appClassOutput = new EventEmitter<string>();

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {}

  toggleClass(classAttribute: string) {
    const element = this.elementRef.nativeElement;
    const elementClass = element.className;
    this.appClassOutput.emit(elementClass);

    this.appClass = classAttribute;
    if (elementClass.includes('active')) {
      this.renderer.removeClass(element, this.appClass);
    } else {
      this.renderer.addClass(element, this.appClass);
    }
  }
}
