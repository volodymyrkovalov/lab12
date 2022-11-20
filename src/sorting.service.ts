import { Injectable } from '@nestjs/common';
import { Task } from './models/task.model';

@Injectable()
export class SortingService {
  public insertionSort(tasks: Task[]): Task[] {
    const n = tasks.length;
    for (let i = 1; i < n; i++) {
      const current = tasks[i];
      let j = i - 1;
      while (
        j > -1 &&
        Number(current.createDate) < Number(tasks[j].createDate)
      ) {
        tasks[j + 1] = tasks[j];
        j--;
      }
      tasks[j + 1] = current;
    }
    return tasks;
  }

  public quickSort(tasks: Task[]): Task[] {
    if (tasks.length < 2) return tasks;
    const min = 1;
    const max = tasks.length - 1;
    const rand = Math.floor(min + Math.random() * (max + 1 - min));
    const pivot = tasks[rand];
    const left = [];
    const right = [];
    tasks.splice(tasks.indexOf(pivot), 1);
    tasks = [pivot].concat(tasks);
    for (let i = 1; i < tasks.length; i++) {
      if (Number(pivot.createDate) > Number(tasks[i].createDate)) {
        left.push(tasks[i]);
      } else {
        right.push(tasks[i]);
      }
    }
    return this.quickSort(left).concat(pivot, this.quickSort(right));
  }

  public shuffle(tasks: Task[]): Task[] {
    tasks.sort(() => Math.random() - 0.5);
    return tasks;
  }

  public mergeSort(tasks: Task[]): Task[] {
    const half = tasks.length / 2;

    if (tasks.length < 2) {
      return tasks;
    }

    const left = tasks.splice(0, half);
    return this.merge(this.mergeSort(left), this.mergeSort(tasks));
  }

  private merge(left: Task[], right: Task[]): Task[] {
    const arr = [];
    while (left.length && right.length) {
      if (Number(left[0].createDate) < Number(right[0].createDate)) {
        arr.push(left.shift());
      } else {
        arr.push(right.shift());
      }
    }

    return [...arr, ...left, ...right];
  }
}
