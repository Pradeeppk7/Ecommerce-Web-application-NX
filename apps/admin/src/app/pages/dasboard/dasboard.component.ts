import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@deepbits/orders';
import { ProductsService } from '@deepbits/products';
import { UsersService } from '@deepbits/users';
import { combineLatest, combineLatestWith } from 'rxjs/operators';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dasboard.component.html',
})
export class DasboardComponent implements OnInit {
  statistics = [];
  order = 0;
  orders = 0;
  product = 0;
  products = 0;
  user = 0;
  users = 0;
  totalsale = 0;
  totalsales = 0;
  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    //combineLatestWith([
    this.ordersService.getOrdersCount().subscribe((order) => {
      this.order = order;
    }),
      this.productService.getProductsCount().subscribe((product) => {
        this.product = product;
      }),
      this.userService.getUsersCount().subscribe((user) => {
        this.user = user;
      }),
      this.ordersService.getTotalSales().subscribe((totalsale) => {
        this.totalsale = totalsale;
      });
    //]).subscribe((values) => {
    //  this.statistics = values;
    //});
  }
  ordercountstop: any = setInterval(() => {
    this.orders++;
    if (this.orders == this.order) {
      clearInterval(this.ordercountstop);
    }
  }, 100);
  productcountstop: any = setInterval(() => {
    this.products++;
    if (this.products == this.product) {
      clearInterval(this.productcountstop);
    }
  }, 100);
  usercountstop: any = setInterval(() => {
    this.users++;
    if (this.users == this.user) {
      clearInterval(this.usercountstop);
    }
  }, 100);
  totalsalecountstop: any = setInterval(() => {
    this.totalsales = this.totalsales + 1000;
    if (this.totalsales > this.totalsale) {
      clearInterval(this.totalsalecountstop);
    }
  }, 120);
}
