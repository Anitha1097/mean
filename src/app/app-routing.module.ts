import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostListComponent } from "./post/post-list/post-list.component";
import { PageLoaderComponent } from './adminlte/page-loader/page-loader.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: "auth", loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: "post", loadChildren: () => import('./post/posts.module').then(m => m.PostsModule) },
  { path: 'adminlte', loadChildren: () => import('./adminlte/adminlte.module').then(m => m.AdminlteModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }