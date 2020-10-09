import { Component, OnInit, Input } from '@angular/core';
import { SearchRepoService } from '../search-repo-service/search-repo.service';
import { User } from '../user';
import { Repo } from '../repo';

@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.css'],
})
export class UserReposComponent implements OnInit {
  @Input() user: User;
  repos: Repo[];
  constructor(private searchRepoService: SearchRepoService) {}

  ngOnInit(): void {
    this.getUserRepos(this.user.reposUrl);
  }

  getUserRepos(endpoint) {
    this.searchRepoService.getUserRepos(endpoint).then(
      () => {
        this.repos = this.searchRepoService.userRepos;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
