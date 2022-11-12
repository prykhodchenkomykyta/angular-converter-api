import { Component, VERSION, OnInit } from '@angular/core';

export type DataType = {
  [key: string]: number;
};

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  url = 'https://open.er-api.com/v6/latest/UAH';
  data: DataType = {};
  currencies: string[] = [];
  firstCurrency: string = 'UAH';
  secondCurrency: string = 'UAH';
  firstAmount: number = 1;
  secondAmount: number = 1;

  async getRates() {
    const response = await fetch(this.url).then((data) => data.json());
    this.data = response.rates;
    this.currencies = Object.keys(response.rates).filter(
      (currency) =>
        currency === 'UAH' || currency === 'USD' || currency === 'EUR'
    );
  }

  ngOnInit(): void {
    this.getRates();
  }

  firstConvert(): void {
    this.secondAmount =
      (this.firstAmount * this.data[this.secondCurrency]) /
      this.data[this.firstCurrency];
  }

  secondConvert(): void {
    this.firstAmount =
      (this.secondAmount * this.data[this.firstCurrency]) /
      this.data[this.secondCurrency];
  }

  firstInputChange(event: any): void {
    const value = event.target.value;
    this.firstAmount = value;
    this.firstConvert();
  }

  secondInputChange(event: any): void {
    const value = event.target.value;
    this.secondAmount = value;
    this.secondConvert();
  }

  firstSelectChange(event: any): void {
    const value = event.target.value;
    this.firstCurrency = value;
    this.firstConvert();
  }

  secondSelectChange(event: any): void {
    const value = event.target.value;
    this.secondCurrency = value;
    this.secondConvert();
  }
}
