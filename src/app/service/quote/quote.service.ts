import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  //private apiUrl = 'http://localhost:8080/api/quotes';
  private apiUrl = 'https://daily-wisdom-springboot.onrender.com/api/quotes'

  constructor(private http: HttpClient) { }

  getRandomQuote(): Observable<any> {
    return this.http.get(`${this.apiUrl}/random`);
  }

    sendQuoteByEmail(quote: any, email: string | null): Observable<any> {
    return this.http.post(`${this.apiUrl}/sendEmail`, { quote, email });
  }
}
