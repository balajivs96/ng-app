import { Component, inject } from '@angular/core';
import { Apiendpoint } from '../../services/apiendpoint';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [JsonPipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private api = inject(Apiendpoint);
  results: any[] = [];
  ngOnInit(): void {
    setTimeout(() => {
      this.api.getAllUsers().subscribe({
        next: (response) => {
          if (Array.isArray(response)) {
            this.results = response;
          } else if (response.data) {
            this.results = response.data;
          }
        },
        error: (error) => {
          console.error('Failed to fetch users:', error);
        }
      });
    })
  }
}
