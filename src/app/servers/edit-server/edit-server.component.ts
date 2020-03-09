import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-gaud.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  changeSaved = false;

  constructor(private serversService: ServersService) { }

  ngOnInit() {
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changeSaved = true;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changeSaved ) {
      return false;
    } else {
      return true;
    }
  }

}
