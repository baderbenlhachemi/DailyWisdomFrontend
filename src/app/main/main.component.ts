import {Component, OnInit} from '@angular/core';
import {QuoteService} from '../quote.service';
import {FormControl, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  quote: any;
  email = new FormControl('', [Validators.required, Validators.email]);
  emailZoneActive: boolean = false;

  constructor(private quoteService: QuoteService) { }

  ngOnInit() {
    this.autoDismissAlert();
  }

  autoDismissAlert() {
    setTimeout(() => {
      const alertElement = document.getElementById('backendAlert');
      if (alertElement) {
        const bsAlert = new bootstrap.Alert(alertElement);
        bsAlert.close();
      }
    }, 15000); // 15 seconds
  }

  generateQuote() {
    this.quoteService.getRandomQuote().subscribe(
      data => this.quote = data,
      error => console.error('Error: ', error)
    );
  }

  toggleEmailZone() {
    this.emailZoneActive = !this.emailZoneActive;
  }

  sendEmail() {
    if (this.quote && this.email.valid) {
      this.quoteService.sendQuoteByEmail(this.quote, this.email.value).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Email sent successfully',
            showConfirmButton: false,
            timer: 1500
          });
          this.email.reset();
          this.emailZoneActive = false;
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error sending email',
            text: 'Please try again later',
          });
          console.error('Error sending email:', error)
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Email or quote is missing',
      });
      console.error('Error: Email or quote is missing.');
    }
  }

  cancelEmail() {
    this.email.reset();
    this.emailZoneActive = false;
  }
}
