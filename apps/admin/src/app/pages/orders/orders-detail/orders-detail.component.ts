import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@deepbits/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constants';
@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [],
})
export class OrdersDetailComponent implements OnInit {
  order: Order=new Order();
  //order?: Order[] = [];
  orderStatuses: unknown[] = [];
  selectedStatus: any;
  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }
  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      
      return {
        id: key,
        name: ORDER_STATUS[parseInt(key)].label,
      };
    });
  }
  onStatusChange(event:any ) {
    this.orderService.updateOrder({ status: event.value }, this.order.id).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Order is updated!'
      });
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Order is not updated!'
      });
    }
  );
}
  private _getOrder() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.orderService.getOrder(params['id']).subscribe((order) => {
          this.order = order;
          this.selectedStatus = order.status;
        });
      }
    });
  }
}
