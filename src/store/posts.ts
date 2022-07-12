import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import axios from "axios";
import MarkdownIt from "markdown-it";
import MDAnchor from "markdown-it-anchor";
import MDToc from "markdown-it-table-of-contents";

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
  private md = new MarkdownIt().use(MDAnchor).use(MDToc);
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
      const md2html = this.md.render(markdownPost);
      console.log('md2html', md2html);
      return md2html;
    });
  }
  @Action
  public moveCurrentUrl(url: string) {
    this.context.commit("setCurrentUrl", url);
  }
}
export default Posts;