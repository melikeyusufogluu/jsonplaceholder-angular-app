import { Component, OnInit } from '@angular/core';
import { IAll, IPostsResponse } from 'src/app/models/posts.constant';
import { PostsServiceService } from 'src/app/services/posts-service.service';
import { Select, Store } from '@ngxs/store';
import { AllPosts } from 'src/app/action/posts.actions';
import { Observable, take } from 'rxjs';
import { PostState } from 'src/app/state/posts.state';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  @Select(PostState.getAllPosts) allposts$!: Observable<IPostsResponse[]>;
  public data!: IPostsResponse[];
  public filteredArray!: IPostsResponse[];
  public searchValue = '';
  public clear = false;
  public changeableId!: number;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.store.dispatch(new AllPosts());
  }

  changeId(post: IPostsResponse) {
    if(!post.changeableId) {
      post.changeableId = post.userId;
    } else if(post.changeableId && post.changeableId === post.userId) {
      post.changeableId = post.id;
    } else {
      post.changeableId = post.changeableId = post.userId;
    }
  }

  applyFilter(event: string) {
    if(event === '') {
      this.filteredArray = [];
    }
    this.allposts$.pipe().subscribe(post => this.filteredArray =  post.filter(p => p.title.toLocaleLowerCase().startsWith(event)))
  }
  clearSearch() {
    this.clear = true;
    this.searchValue = '';
    this.getPosts();
    if(this.clear) {
      this.allposts$.pipe().subscribe(post => this.filteredArray =  post);
    }
  }
}
