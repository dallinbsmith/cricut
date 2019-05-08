import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import {  } from 'rxjs/observable/of';
import { IGroupContainer } from './model/group';
import { delay } from 'rxjs/operators';
import json from '../assets/text.json';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor() { }

  public getJSON(): Observable<IGroupContainer> {
    return of<any>(json).pipe(delay(1000));
  }
}
