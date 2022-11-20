import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class MvcService {
  redirect(res: Response, url: string) {
    res.redirect(url);
  }
}
