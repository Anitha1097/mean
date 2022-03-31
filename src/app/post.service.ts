import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { Post } from "./post/post.model";
import { Router } from "@angular/router";
import { environment } from "../environments/environment";
const BACKEND_URL = environment.apiUrl + "/posts/";
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>(); 
  constructor(private httpClient: HttpClient, private router: Router) { }
  getAllData() {
    // const pospostDatats = {
    //   title: 'Title',
    //   content: 'Content'
    // };
    // return posts;
    return this.httpClient.get(BACKEND_URL);
  }


  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.httpClient
      .get<{ message: string; posts: any; maxPosts: number }>(BACKEND_URL + queryParams)
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map(post => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        console.log(this.posts);
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
    
      // .pipe(map((postData) => {
      //   return postData.posts.map(post => {
      //     return {
      //       title: post.title,
      //       content: post.content,
      //       id: post._id
      //     };
      //   });
      // }))
      // .subscribe(transformedPosts => {
      //   this.posts = transformedPosts;
      //   this.postsUpdated.next([...this.posts]);
      // });
  }

  getPost(id: string) {
    return this.httpClient.get<{ _id: string; title: string; content: string, creator: string; }>(
      BACKEND_URL + id
    );
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  // postData(newReg) {
  //   return this.httpClient.post(this.url, newReg);
  // }

  postData(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image);
    this.httpClient
      .post<{ message: string; post: Post }>(
        BACKEND_URL ,postData ).subscribe(responseData => {
        const post: Post = {
          id: responseData.post.id,
          title: responseData.post.title,
          content: responseData.post.content,
          imagePath: responseData.post.imagePath,
          creator: null
        };
        this.posts.push(post);
        this.postsUpdated.next({ posts: [...this.posts],
          postCount: 0});
        this.router.navigate(["/"]);
      });
  }
  deletePost(postId: string) {
    this.httpClient.delete(BACKEND_URL + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next({ posts: [...this.posts],
          postCount: 0});
      });
  }
  

  updatePost(id: string, title: string, content: string, imagePath: File | string) {
    // const post: Post = { id: id, title: title, content: content };
    // this.httpClient
    //   .put(this.url + id, post)
    //   .subscribe(response => console.log(response));
    // const post: Post = { id: id, title: title, content: content, imagePath: ""};
    const postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("imagePath", imagePath);
      console.log(postData);
    this.httpClient.put(BACKEND_URL + id, postData)
    .subscribe(responseData => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
      const post: Post = { id: id, title: title, content: content, imagePath: '', creator: null};
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next({ posts: [...this.posts],
        postCount: 0});
      this.router.navigate(["/"]);
 });
  }
}
