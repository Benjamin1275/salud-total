import { Routes } from '@angular/router';
//import { HeaderComponent } from './header/header.component';
//import { FooterComponent } from './footer/footer.component';
//import { SidebarComponent } from './sidebar/sidebar.component';

//import { HomeComponent } from './home/home.component';

// Los mas importantessss
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentHistoryComponent} from './appointment-history/appointment-history.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },

  { path: 'login', component: LoginComponent }, 
  { path: 'dashboard', component: DashboardComponent },
  { path: 'appointment-history', component: AppointmentHistoryComponent},

];