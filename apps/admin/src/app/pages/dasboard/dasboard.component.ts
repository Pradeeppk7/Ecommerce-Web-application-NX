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
 
  product = 0;
  user = 0;
  totalsales = 0;
  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    //combineLatestWith([
    this.ordersService.getOrdersCount().subscribe((order) => {
      this.order = order;
    }),
    this.productService.getProductsCount().subscribe((products) => {
      this.product = products;
    }),
    this.userService.getUsersCount().subscribe((user) => {
      this.user = user;
    }),
      this.ordersService.getTotalSales().subscribe((totalsales) => {
        this.totalsales = totalsales;
    })
    //]).subscribe((values) => {
    //  this.statistics = values;
    //});
  }
 
}

