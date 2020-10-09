import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Repo } from '../repo';
import { SearchUserService } from '../search-user-service/search-user.service';
import { SearchRepoService } from '../search-repo-service/search-repo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  users: User[];
  repos: Repo[];
  usersLength: number;
  reposLength: number;


  constructor(
    private searchUserService: SearchUserService,
    private searchRepoService: SearchRepoService,
    private router: Router
  ) {}

  goToUrl(id) {
    this.router.navigate(['/users', id]);
  }

  search(term: string) {
    this.searchUserService.fetchUsers(term).then(
      () => {
        this.users = this.searchUserService.usersFound;
        this.usersLength = this.searchUserService.usersFound.length;
      },
      (error) => {
        console.log(error);
      }
    );
    this.searchRepoService.fetchRepos(term).then(
      () => {
        this.repos = this.searchRepoService.foundRepos;
        this.reposLength = this.searchRepoService.foundRepos.length;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.search('frank');
  }
}
