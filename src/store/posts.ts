import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import axios from "axios";
import showdown from 'showdown';
import showdownToc from 'showdown-toc';

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
    });
  }

  @Action
  public requestGetMarkdoen(postName: string) {
    return axios.get(`/posts/${postName}.md`).then(res => {
      const markdownPost = res.data;
      const toc: any[] = [
        { anchor: 'header-1', level: 1, text: 'header 1' }, // # header 1
        { anchor: 'header-2', level: 2, text: 'header 2' }, // ## header 2
        { anchor: 'header-3', level: 3, text: 'header 3' }, // ### header 3
        { anchor: 'header-4', level: 4, text: 'header 4' }, // #### header 4
      ];
      const converter = new showdown.Converter({ extensions: [showdownToc({ toc })] })
      converter.setOption('tables', true);
      const md2html = converter.makeHtml(markdownPost);
      return md2html;
    });
  }
  @Action
  public moveCurrentUrl(url: string) {
    this.context.commit("setCurrentUrl", url);
  }
}
export default Posts;