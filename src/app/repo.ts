export class Repo {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public language: string,
    public dateCreated: Date,
    public gitHubLink: string,
    public liveLink: string
  ) {}
}
