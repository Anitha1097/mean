import { NgModule } from "@angular/core";
import { AngularMaterialModule } from "../angular-material.module";
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LeftSideBarComponent } from './left-side-bar/left-side-bar.component';
import { RightSideBarComponent } from './right-side-bar/right-side-bar.component';
import { SectionComponent } from './section/section.component';
import { CpuUsageComponent } from './cpu-usage/cpu-usage.component';
import { VisitorComponent } from './visitor/visitor.component';
import { SocialTrendComponent } from './social-trend/social-trend.component';
import { AnsweredTicketComponent } from './answered-ticket/answered-ticket.component';
import { TaskInfoComponent } from './task-info/task-info.component';
import { BrowserUsageComponent } from './browser-usage/browser-usage.component';
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth-guard";
import { HeaderComponent } from '../header/header.component';

const routes: Routes = [
    { path: 'dashboard', component: PageLoaderComponent,  canActivate: [AuthGuard] },
    { path: 'logout', component: HeaderComponent},

  ];
@NgModule({
declarations:[

    PageLoaderComponent,
     SearchBarComponent,
     TopBarComponent,
     LeftSideBarComponent,
     RightSideBarComponent,
     SectionComponent,
     CpuUsageComponent,
     VisitorComponent,
     SocialTrendComponent,
     AnsweredTicketComponent,
     TaskInfoComponent,
     BrowserUsageComponent
  ],
imports:[
    RouterModule,FormsModule, AngularMaterialModule, CommonModule,
    RouterModule.forChild(routes),
],
exports: [RouterModule],
providers: [AuthGuard]
})
export class AdminlteModule{}
