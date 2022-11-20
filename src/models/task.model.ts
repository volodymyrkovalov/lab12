import { Repository } from './repository.model';

export class Task {
  title: string;
  content: string;
  createDate: Date;
  updateDate: Date;
  url: string;
  repository: Repository;
}
