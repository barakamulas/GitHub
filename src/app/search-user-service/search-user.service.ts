import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchUserService {
  usersFound: User[];

  fetchUsers(term: string) {
    let endPoint = `https://api.github.com/search/users?access_token=${environment.apiKey}&q=${term}`;
    let promise = new Promise((resolve, reject) => {
      this.http
        .get(endPoint)
        .toPromise()
        .then(
          (results) => {
            this.usersFound = [];
            for (let i = 0; i < results['items'].length; i++) {
              let name = results['items'][i]['login'];
              let imagePath = results['items'][i]['avatar_url'];
              let reposUrl = results['items'][i]['repos_url'];
              let user = new User(i + 1, name, imagePath, reposUrl);
              this.usersFound.push(user);
            }
            resolve();
          },
          (error) => {
            console.log(error);
            reject();
          }
        );
    });
    return promise;
  }

  getUser(id){
    for (let user of this.usersFound){
      if (user.id == id){
        return user;
      }
    }
  }

  constructor(private http: HttpClient) {}
}
