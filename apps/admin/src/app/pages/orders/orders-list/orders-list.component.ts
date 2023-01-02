import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@deepbits/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [],
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._getOrders();
  }
  _getOrders() {
    this.ordersService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }
  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(orderId).subscribe(
          (response) => {
            this._getOrders();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Order is Deleted!',
            });
          },

          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Order could not be deleted',
            });
          }
        );
      },
    });
  }
  showOrder(orderId: any) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }
}
