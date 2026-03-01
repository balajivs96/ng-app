import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  map,
  of
} from 'rxjs';
import { Apiendpoint } from '../../services/apiendpoint';
@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  searchControl = new FormControl('');
  results: any[] = [];
  loading = false;

  private http = inject(HttpClient);

  /*ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        map(value => value?.trim()),
        distinctUntilChanged(),
        switchMap(query => {
          if (!query) {
            return of([]);
          }

          this.loading = true;

          return this.http
            .get<any[]>(
              `https://jsonplaceholder.typicode.com/users?name_like=${query}`
            )
            .pipe(
              catchError(err => {
                console.error('Search failed', err);
                return of([]);
              })
            );
        })
      )
      .subscribe(results => {
        this.results = results;
        this.loading = false;
      });
  }*/
  private api = inject(Apiendpoint);
  ngOnInit(): void {
    this.api.getAllUsers().subscribe({
      next: (response) => {
        console.log('Users fetched successfully:', response);
        this.results = response; // Assuming the response is an array of users
      },
      error: (error) => {
        console.error('Failed to fetch users:', error);
      }
    });
  }
}
