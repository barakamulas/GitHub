import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Repo } from '../repo';
import { SearchUserService } from '../search-user-service/search-user.service';
import { SearchRepoService } from '../search-repo-service/search-repo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: User;
  userRepos: Repo[];

  constructor(
    public searchUserService: SearchUserService,
    public searchRepoService: SearchRepoService
  ) {}

  ngOnInit(): void {
    this.getUser('barakamulas');
  }

  getUser(term: string) {
    this.searchUserService.fetchUsers(term).then(
      () => {
        this.user = this.searchUserService.usersFound[0];
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getUserRepos(endpoint: string) {
    this.searchRepoService.getUserRepos(endpoint).then(
      () => {
        this.userRepos = this.searchRepoService.userRepos;
        console.log(this.userRepos.length);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
