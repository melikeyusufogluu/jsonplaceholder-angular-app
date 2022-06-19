import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { IPostsResponse } from 'src/app/models/posts.constant';
import { PostsServiceService } from 'src/app/services/posts-service.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  public data$!: Observable<IPostsResponse[]>;
  public filteredArray!: IPostsResponse[];
  public searchValue = '';
  public clear = false;
  public changeableId!: number;

  constructor(private postService: PostsServiceService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.data$ = this.postService.getPosts();
  }

  changeId(post: IPostsResponse) {
    if (!post.changeableId) {
      post.changeableId = post.userId;
    } else if (post.changeableId && post.changeableId === post.userId) {
      post.changeableId = post.id;
    } else {
      post.changeableId = post.changeableId = post.userId;
    }
  }

  applyFilter(event: string) {
    if (event === '') {
      this.filteredArray = [];
    }
    this.data$
      .pipe(take(1))
      .subscribe(
        (prod) =>
          (this.filteredArray = prod.filter((item) =>
            item.title.toLocaleLowerCase().startsWith(event)
          ))
      );
  }

  clearSearch() {
    this.searchValue = '';
    this.getPosts();
    this.data$.pipe(take(1)).subscribe((item) => (this.filteredArray = item));
  }
}
