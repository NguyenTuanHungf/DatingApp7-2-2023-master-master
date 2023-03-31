import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl } from '@angular/forms';


@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent  implements ControlValueAccessor  { 
  @Input() label: string;  
  @Input() type= 'text';


  constructor(@Self() public ngControl: NgControl) { 
    this.ngControl.valueAccessor = this;
    console.log(this.ngControl);
    
  }

  get control():FormControl{
    return this.ngControl.control as FormControl;
  }

  writeValue(obj: any): void {

  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

}
