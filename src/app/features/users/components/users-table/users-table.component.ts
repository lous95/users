import { Component, OnInit } from '@angular/core';
import { UsersHttpService } from '../../services/users-http.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css'
})
export class UsersTableComponent implements OnInit{

  users$!: Observable<User[]>;

  displayedColumns: string[] = ['id', 'name', 'birthdate', 'addressesCount'];

  constructor(private usersHttpService: UsersHttpService) {
  }

  ngOnInit(): void {
    this.users$ = this.usersHttpService.getUsers();
  }

}
