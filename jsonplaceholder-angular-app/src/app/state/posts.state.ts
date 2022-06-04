import { State, Action, StateContext, Selector } from '@ngxs/store';
import { IAll } from '../models/posts.constant';
import { AllPosts } from '../action/posts.actions';
import { PostsServiceService } from '../services/posts-service.service';
import { tap } from 'rxjs';
import { Injectable } from '@angular/core';

export class PostStateModel {
  allposts!: IAll[];
}

@State<PostStateModel>({
  name: 'postState',
  defaults: {
    allposts: [],
  },
})
@Injectable()
export class PostState {
  constructor(private postService: PostsServiceService) {}

  @Selector()
  static getAllPosts(state: PostStateModel) {
    return state.allposts;
  }

  @Action(AllPosts)
  getAllPosts({ getState, setState }: StateContext<PostStateModel>) {
    return this.postService.getPosts().pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          allposts: result,
        });
      })
    );
  }
}
