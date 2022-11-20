export class CreateTaskDto {
  title: string;
  content: string;
  url: string;
  repositoryUrl: string;
}

export class CreateRepoDto {
  name: string;
  url: string;
}
