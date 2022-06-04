import { Component, OnInit } from '@angular/core';
import { IPostsResponse } from 'src/app/models/posts.constant';
import { PostsServiceService } from 'src/app/services/posts-service.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  public data!: IPostsResponse[];
  public filteredArray!: IPostsResponse[];
  public searchValue = '';
  public clear = false;
  public changeableId!: number;

  constructor(private postService: PostsServiceService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe(resp => {
      this.data = resp;
    });
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
    this.filteredArray = this.data.filter(prod => prod.title.toLocaleLowerCase().startsWith(event));
  }
  clearSearch() {
    this.clear = true;
    this.searchValue = '';
    this.getPosts();
    if(this.clear) {
      this.filteredArray = this.data;
    }
  }
}
