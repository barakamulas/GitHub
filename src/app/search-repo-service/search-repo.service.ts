import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Repo } from '../repo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchRepoService {
  foundRepos: Repo[];
  userRepos: Repo[];

  fetchRepos(term: string) {
    let endpoint = `https://api.github.com/search/repositories?access_token=${environment.apiKey}&q=${term}`;
    let promise = new Promise((resolve, reject) => {
      this.http
        .get(endpoint)
        .toPromise()
        .then(
          (results) => {
            this.foundRepos = [];
            for (let i = 0; i < results['items'].length; i++) {
              let name = results['items'][i]['full_name'];
              let description = results['items'][i]['description'];
              let language = results['items'][i]['language'];
              let year = parseInt(
                results['items'][i]['created_at'].substr(0, 4)
              );
              let month =
                parseInt(results['items'][i]['created_at'].substr(5, 7)) - 1;
              let day = parseInt(
                results['items'][i]['created_at'].substr(8, 10)
              );
              let date = new Date(year, month, day);
              let gitHubLink = results['items'][i]['html_url'];
              let liveLink = results['items'][i]['homepage'];

              let repo = new Repo(
                i + 1,
                name,
                description,
                language,
                date,
                gitHubLink,
                liveLink
              );
              this.foundRepos.push(repo);
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

  getUserRepos(endpoint) {
    let promise = new Promise((resolve, reject) => {
      this.http
        .get<Repo[]>(endpoint + '?access_token=' + environment.apiKey)
        .toPromise()
        .then(
          (response) => {
            this.userRepos = [];
            for (let i = 0; i < response.length; i++) {
              let name = response[i]['full_name'];
              let description = response[i]['description'];
              let language = response[i]['language'];
              let year = parseInt(response[i]['created_at'].substr(0, 4));
              let month = parseInt(response[i]['created_at'].substr(5, 7)) - 1;
              let day = parseInt(response[i]['created_at'].substr(8, 10));
              let date = new Date(year, month, day);
              let gitHubLink = response[i]['html_url'];
              let liveLink = response[i]['homepage'];

              let repo = new Repo(
                i + 1,
                name,
                description,
                language,
                date,
                gitHubLink,
                liveLink
              );
              this.userRepos.push(repo);
            }

            resolve();
          },
          (error) => {
            console.log(error);

            reject(error);
          }
        );
    });
    return promise;
  }

  constructor(private http: HttpClient) {}
}
