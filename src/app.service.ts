import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMainEndpointsLink() {
    return `
      <section style="display: flex; flex-direction: column; justify-content:center; align-items: center; height: 100%;">
        <a style="margin:10px 5px;" href="/customer/customer-transactions/1">Transactions for customer 1</a>
        <a style="margin:10px 5px;" href="/fraud/fraud-transactions/3">Fraud detection for customer 3</a>
        <a style="margin:10px 5px;" href="https://github.com/igor-slotin/seen-transactions">Link to the repo</a>
      </section>
    `
  }
}
