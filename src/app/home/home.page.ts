import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from '../data.service';
import { Order, Page, Product } from '../types/types';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnChanges {
  public orders: Order[] = []
  public ordersFiltered: Order[] = []
  public listItemsExtended = false
  public selectedPageTitle: string | number = ''
  public selectedOrder!: Order | undefined
  public selectedProduct!: Product | undefined
  public currentPage = 0
  public pages = [Page.ORDERS, Page.PRODUCTS, Page.PRODUCT_DETAILS]
  public showIncompleteOrderSubmitAlert = false
  public incompleteOrderSubmitAlertButtons = [
    {
      text: 'Nein',
      handler: () => {
        this.showIncompleteOrderSubmitAlert = false
      }
    },
    {
      text: 'Ja',
      handler: () => {
        this.submitOrder()
      }
    }
  ]

  constructor(private dataService: DataService) {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.listItemsExtended = false
  }

  ngOnInit() {
    this.selectedPageTitle = 'Kommissionierungen'

    this.dataService.fetchData().subscribe({
      next: (response) => {
        // Whether product has been picked or not
        response = (response as Order[]).map((product) => {
          return {
            ...product,
            picked: false,
            id: this.getRandomNumber(9999),
            corridor: this.getRandomNumber(3) + 1
          }
        })

        // The orders below are hard-coded, as this app is an example only.
        // First example order
        this.orders.push({
          id: `KOMM${this.getRandomNumber(9999)}`,
          client: 'Teiber Products GmbH',
          clientId: this.getRandomNumber(9999),
          products: (response as Product[]).slice(0, 6)
        })

        // Second example order
        this.orders.push({
          id: `KOMM${this.getRandomNumber(9999)}`,
          client: 'Strohmeier General Store GmbH',
          clientId: this.getRandomNumber(9999),
          products: (response as Product[]).slice(6, 10)
        })

        // Initialise filtered orders as simply the whole list of orders
        this.ordersFiltered = [...this.orders]
      },
      error: (e) => {
        console.error('Error fetching products: ', e)
      }
    })
  }

  public countPickedProducts(products: Product[] | undefined): number {
    return products ? products.reduce((count, product) => count + (product.picked ? 1 : 0), 0) : 0
  }

  public setSelectedOrder(orderId: string): void {
    this.selectedOrder = this.orders.find((order: Order) => order.id === orderId)
    this.selectedPageTitle = this.selectedOrder!.id
    this.currentPage++
  }

  public setSelectedProduct(productId: number): void {
    this.selectedProduct = this.selectedOrder?.products.find((product: Product) => product.id === productId)
    this.selectedPageTitle = this.selectedProduct!.id
    this.currentPage++
  }

  public getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max)
  }

  public setListItemsExtended(): void {
    this.listItemsExtended = !this.listItemsExtended
  }

  public updateProduct(product: Product) {
    this.selectedProduct = product;
    const index = this.selectedOrder!.products.findIndex(p => p.id === product.id);
    
    this.selectedOrder!.products[index] = product

    this.currentPage--
    this.selectedPageTitle = this.selectedOrder!.id
  }

  public canSubmitOrder() {
    this.showIncompleteOrderSubmitAlert = true
  }

  public submitOrder(): void {  
    this.orders = this.orders.filter((order: Order) => order.id !== this.selectedOrder!.id)

    this.currentPage--
    this.setPageTitle()
  }

  public returnPage() {
    if (this.currentPage !== 0) {
      this.currentPage--
    }

    this.setPageTitle()
  }

  public setPageTitle() {
    switch (this.currentPage) {
      case 0:
        this.selectedPageTitle = 'Kommissionierungen'
        break
      case 1:
        this.selectedPageTitle = this.selectedOrder!.id
        break
      case 2:
        this.selectedPageTitle = this.selectedProduct!.id
        break
      default:
        break
    }
  }
}
