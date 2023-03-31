import { Member } from 'src/app/_models/member';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm!: NgForm;

 @HostListener('window:beforeunload', ['$event']) unloadNotification($event : any){
  if(this.editForm.dirty){
    $event.returnValue = true;
  }
 }





  member: Member;

  user : User;


  constructor(private accountServices: AccountService, private memberService: MembersService, private toastr: ToastrService) {
    this.accountServices.currentUser$.pipe(take(1)).subscribe(user=>this.user= user)

  }
  ngOnInit(): void {
    this.loadMember();

  }

  loadMember(){
    console.log(this.user.username);

    this.memberService.getMember(this.user.username).subscribe(member=>{
      this.member= member;
      console.log(this.member);


    })
  }


  updateMember(){
    console.log(this.member);
    this.memberService.updateMember(this.member).subscribe(member =>{

      this.toastr.success('Profile updated successfully');
      this.editForm.reset(this.member);


    });

  }


}

