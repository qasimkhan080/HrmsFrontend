import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouteStateService} from '../../../../app/services/route-state.service'
import { SessionService } from '../../../services/session.service';
import { UserContextService } from '../../../services/user-context.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  constructor(
    private router: Router,
    private routeStateService: RouteStateService,
    private sessionService: SessionService,
    private userContextService: UserContextService) {

  }
  logout() {
    this.routeStateService.removeAll();
    this.userContextService.logout();
    this.sessionService.removeItem('active-menu');
    this.router.navigate(['']);
  }
}
