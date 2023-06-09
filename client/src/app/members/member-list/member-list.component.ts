import { AccountService } from 'src/app/_services/account.service';
import { Pagination, PaginatedResult } from './../../_models/pagination';
import { Observable, take } from 'rxjs';
import { Component } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { UserParams } from 'src/app/_models/userParams';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent {
  members : Member[] = [];

  pagination: Pagination;


  userParams: UserParams;
  user : User;
  genderList = [{value: 'male', display: 'Males'},{value:'female',display: 'Females'}];







  constructor(private memberService: MembersService)
  {
    this.userParams = this.memberService.getUserParams();


  }


  ngOnInit(): void {
    this.loadMembers();


  }
  loadMembers(){
      this.memberService.setUserParams(this.userParams);
      this.memberService.getMembers(this.userParams).subscribe(response =>{
        this.members = response.result;
        this.pagination = response.pagination;

      })
      console.log(this.pagination);


  }

  resetFilters() {
    this.userParams = this.memberService.resetUserParams();  // đặt lại giá trị ban đầu
    this.loadMembers();

  }



  pageChanged(event : any) {
    this.userParams.pageNumber = event.page;
    this.memberService.setUserParams(this.userParams);
    console.log(this.userParams.pageNumber);
    this.loadMembers();
  }





  }

 

