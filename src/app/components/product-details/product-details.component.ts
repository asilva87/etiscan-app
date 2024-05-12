import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Product } from 'src/app/types/types'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  @Input() product!: Product
  @Output() updateProduct: EventEmitter<Product> = new EventEmitter<Product>()

  public barCode = ''
  public productAmount!: number

  constructor() {}

  public emitUpdateProduct() {
    this.product.picked = true

    this.updateProduct.emit(this.product)
  }
}
