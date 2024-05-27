import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private accessKey = 'qvALNJCZ7Vf0wJZVwyAQlw2vXMiz8PWmhFyDiSqfbcs'; // Unsplash Access Key
  private apiUrl = `https://api.unsplash.com/photos/random?query=nature,water&client_id=${this.accessKey}`;

  constructor(private http: HttpClient) {}

  getRandomImage(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
