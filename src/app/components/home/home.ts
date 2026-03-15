import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, NgZone, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Apiendpoint } from '../../services/apiendpoint';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, JsonPipe, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  searchControl = new FormControl('');
  results: any[] = [];
  loading: boolean = false;

  private http = inject(HttpClient);
  private api = inject(Apiendpoint);

  constructor() { }

  ngOnInit(): void {
    // Initial fetch
    this.fetchUsers();
  }
  fetchUsers(): void {
    this.loading = true;
    this.api.getAllUsers().subscribe((res) => {
      console.log(JSON.stringify(res.data,null,2));
      this.results = res.data;
      this.loading = false;
    });
  }

  trackByUserId(index: number, user: any): number {
    return user.id;
  }
}
