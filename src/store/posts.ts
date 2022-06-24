import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
// import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from "vuex";
import axios from "axios";
import showdown from 'showdown';

export interface Post {
  url: string;
  fileName: string;
  title: string;
  tags: string[];
  data: string;
}


@Module({
  namespaced: true,
})
class Posts extends VuexModule {
  public postList:Post[] = [];
  public currentUrl = '';

  get currentPost(): Post | undefined {
    if(this.currentUrl == null || this.currentUrl == '' || this.postList.length <= 0){
      return undefined;
    }
    else {
      return this.postList.find(post => {
        return post.url === this.currentUrl;
      })
    }
  }
  
  @Mutation
  public setPostList(postList: Post[]) {
    this.postList = postList;
  }
  @Mutation
  public setCurrentUrl(currentUrl: string) {
    this.currentUrl = currentUrl;
  }

  @Action
  public requestGetPostList() {
    axios.get(`/posts/postlist.json`).then(res => {
      this.context.commit("setPostList", res.data);
      // this.setPostList(res.data);
    });
  }

  @Action
  public requestGetMarkdoen(postName: string) {
    return axios.get(`/posts/${postName}.md`).then(res => {
      const markdownPost = res.data;
      const converter = new showdown.Converter()
      const md2html = converter.makeHtml(markdownPost);
      return md2html;
    });
  }
  @Action
  public moveCurrentUrl(url: string) {
    this.context.commit("setCurrentUrl", url);
  }
}

// class PostsState {
//   public postList: Post[] = [];
// }

// const getters: GetterTree<PostsState, any> = {

// }

// const mutations: MutationTree<PostsState> = {
//   setPostList(state, postList) {
//     axios.get(`/posts/postlist.json`).then(res => {
//       state.postList = res.data;
//     });
//   }
// }

// const actions: ActionTree<PostsState, any> = {
//   requestGetPostList(state: ActionContext<PostsState, any>) {
//     axios.get(`/posts/postlist.json`).then(res => {
//       state.commit("setPostList", res.data);
//       return true;
//     }).catch(reason => {
//       return false;
//     });
//   },
//   requestGetMarkdoen(state: ActionContext<PostsState, any>, postName: string) {
//     return axios.get(`/posts/${postName}.md`).then(res => {
//       console.log('get markdown post', res);
//       // 
//       return res.data;
//     });
//   }
// }

// const Posts: Module<PostsState, any> = {
//   namespaced: true,
//   state: new PostsState(),
//   getters,
//   mutations,
//   actions,
// }


export default Posts;