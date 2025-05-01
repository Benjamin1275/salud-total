import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


//import { LoginComponent } from './login/login.component';
//import { DashboardComponent } from './dashboard/dashboard.component';
//import { SidebarComponent } from './sidebar/sidebar.component';
//import { AppointmentHistoryComponent} from './appointment-history/appointment-history.component';
//import { HomeComponent } from './home/home.component';

// Los mas importantessss
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Salud Total';
}
