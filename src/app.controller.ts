import {
  Get,
  Controller,
  Render,
  Post,
  Param,
  Body,
  Res,
  Query,
} from '@nestjs/common';
import { Repository } from './models/repository.model';
import { Task } from './models/task.model';
import { MvcService } from './mvc.service';
import { SortingService } from './sorting.service';
import { CreateRepoDto, CreateTaskDto } from './tasks.dto';

@Controller()
export class AppController {
  private tasks: Task[] = [];
  private archievedTasks: Task[] = [];
  private repositories: Repository[] = [];

  constructor(
    private readonly mvcService: MvcService,
    private readonly sortingService: SortingService,
  ) {}

  @Get()
  @Render('index')
  root(@Query('title') title: string) {
    let sortedTasks = this.tasks;
    if (title) {
      sortedTasks = sortedTasks.filter((task) => task.title.includes(title));
    }
    sortedTasks = sortedTasks.map((task) => {
      const repo = this.repositories.find(
        (repo) => (repo.url = task.repository.url),
      );
      let repoUrl = '';
      if (repo) {
        repoUrl = repo.url;
      }
      return {
        ...task,
        repoUrl,
      };
    });

    return {
      message: 'Hello world!',
      tasks: sortedTasks,
      archievedTasks: this.archievedTasks,
      repositories: this.repositories,
    };
  }

  @Get('repositories')
  @Render('repositories')
  renderRepos() {
    return {
      repositories: this.repositories,
    };
  }

  @Post('task')
  addTask(@Body() task: CreateTaskDto, @Res() res) {
    console.log(task);
    this.tasks.push({
      title: task.title,
      url: task.url,
      content: task.content,
      createDate: new Date(),
      updateDate: new Date(),
      repository: this.repositories.find(
        (repo) => repo.url === task.repositoryUrl,
      ),
    });

    this.mvcService.redirect(res, '/');
  }

  @Post('task/:url')
  updateTask(@Param('url') url: string, task: Task, @Res() res) {
    this.tasks = this.tasks.filter((task) => task.url !== url);
    this.tasks.push(task);
    this.mvcService.redirect(res, '/');
  }

  @Post('task/delete/:url')
  deleteTask(@Param('url') url: string, @Res() res) {
    this.tasks = this.tasks.filter((task) => task.url !== url);
    this.mvcService.redirect(res, '/');
  }

  @Post('sort')
  sort(@Query('sort') sort: string, @Res() res) {
    if (sort === 'dec') {
      this.tasks.sort((task1, task2) => {
        return Number(task2.createDate) - Number(task1.createDate);
      });
    }

    if (sort === 'asc') {
      this.tasks.sort((task1, task2) => {
        return Number(task1.createDate) - Number(task2.createDate);
      });
    }

    this.mvcService.redirect(res, '/');
  }

  @Post('task/archieve/:url')
  archieveTask(@Param('url') url: string, @Res() res) {
    const taskToArchieve = this.tasks.find((task) => task.url === url);
    this.archievedTasks.push(taskToArchieve);
    this.tasks = this.tasks.filter((task) => task.url !== url);
    this.mvcService.redirect(res, '/');
  }

  @Post('task/unarchieve/:url')
  unarchieveTask(@Param('url') url: string, @Res() res) {
    const taskToArchieve = this.archievedTasks.find((task) => task.url === url);
    this.tasks.push(taskToArchieve);
    this.archievedTasks = this.archievedTasks.filter(
      (task) => task.url !== url,
    );
    this.mvcService.redirect(res, '/');
  }

  @Post('repo')
  addRepo(@Body() repo: CreateRepoDto, @Res() res) {
    this.repositories.push({
      name: repo.name,
      url: repo.url,
      tasks: [],
    });

    this.mvcService.redirect(res, 'repositories');
  }

  @Post('mergeSort')
  mergeSort(@Res() res) {
    this.tasks = this.sortingService.mergeSort(this.tasks);
    this.mvcService.redirect(res, '/');
  }

  @Post('quickSort')
  quickSort(@Res() res) {
    this.tasks = this.sortingService.quickSort(this.tasks);
    this.mvcService.redirect(res, '/');
  }

  @Post('insertionSort')
  insertionSort(@Res() res) {
    this.tasks = this.sortingService.insertionSort(this.tasks);
    this.mvcService.redirect(res, '/');
  }

  @Post('shuffle')
  shuffle(@Res() res) {
    this.tasks = this.sortingService.shuffle(this.tasks);
    this.mvcService.redirect(res, '/');
  }
}
