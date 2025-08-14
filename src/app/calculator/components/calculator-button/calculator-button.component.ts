import { ChangeDetectionStrategy, Component, ElementRef, input, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "border-r border-b border-indigo-400",
    // customAtributo: 'hola',
    // 'data-size': 'XL',
    '[class.w-2/4]': 'isDoubleSize()',
    '[class.w-1/4]': '!isDoubleSize()',
  },
  // encapsulation: ViewEncapsulation.None,
})
export class CalculatorButtonComponent {
  public onClick = output<string>();

  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  transformEmptyString = (value: boolean | string) => typeof value === 'string' ? value === '' : value;

  public isCommand = input(false, {
    transform: this.transformEmptyString
  });
  public isDoubleSize = input(false, {
    transform: this.transformEmptyString
  });

  public isPressed = signal<boolean>(false);

  /*@HostBinding('class.is-command') get commandStyle() {
    return this.isCommand();
  }*/

 /*@HostBinding('class.w-2/4')
 get doubleSizeStyle(): boolean {
  return this.isDoubleSize();
 }*/

 handleClick(): void {
  if (!this.contentValue()?.nativeElement) {
    return;
  }

  const value = this.contentValue()!.nativeElement.innerText;
  this.onClick.emit(value.trim());
 }

 public keyboardPressedStyle(key: string) {
  if (!this.contentValue()) {
    return;
  }

  const value = this.contentValue()!.nativeElement.innerText;

  if (value !== key) {
    return;
  }

  this.isPressed.set(true);
  setTimeout(() => {
    this.isPressed.set(false);
  }, 100);
 }
}
