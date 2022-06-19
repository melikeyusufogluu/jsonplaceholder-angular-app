import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPostsResponse } from '../models/posts.constant';

@Injectable({
  providedIn: 'root'
})
export class PostsServiceService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<IPostsResponse[]> {
    return this.http.get<IPostsResponse[]>('https://jsonplaceholder.typicode.com/posts');
  }
}
