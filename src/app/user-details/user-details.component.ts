import { Component, OnInit, Input } from '@angular/core';

import { SearchUserService } from '../search-user-service/search-user.service';
import { User } from '../user';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: User;
  constructor(
    private searchUserService: SearchUserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.user = this.searchUserService.getUser(id);
  }
}
