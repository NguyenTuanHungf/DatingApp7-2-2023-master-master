import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../_services/account.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    @Output() cancelRegister = new EventEmitter();
   // model: any ={}; // any nó cho bất kì giá trị nào
    registerForm: FormGroup ;
    maxDate: Date;

    // khai báo thêm
    validationErrors: string[] = [];



  constructor(private accountService: AccountService, private toastr: ToastrService,
    private fb: FormBuilder, private router: Router ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate= new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
    console.log(this.maxDate); 

  }

  initializeForm(){
    this.registerForm =  this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required,

      Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['',[Validators.required, this.matchValues('password')]]
    })
  }


  matchValues(matchTo: string):ValidatorFn{
    return (control:AbstractControl) =>{
      return control?.value === control?.parent?.get(matchTo)?.value
      ? null : {isMatching: true};
    }
  }

  register() {
      console.log(this.registerForm.value);
      this.accountService.register(this.registerForm.value).subscribe(response =>{

        this.router.navigateByUrl('/members');
        this.toastr.success('Đăng ký thành công');

      }, error => {

        this.validationErrors= error;
       })
    }
    cancel() {
       this.cancelRegister.emit(false);
    }
}


























  // matchValues(matchTo: string): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const parentControl = control.parent as FormGroup; // Sử dụng kiểu dữ liệu tường minh ở đây
  //     if (!parentControl) {
  //       return null;
  //     }
  //     return control.value === parentControl.get(matchTo)?.value ? null : { isMatching: true };
  //   };
  // }

