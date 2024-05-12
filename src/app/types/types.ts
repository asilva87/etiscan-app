interface Order {
  id: string;
  client: string;
  clientId: number;
  products: Product[];
}

interface Product {
  id: number;
  title: string;
  name: string;
  picked: boolean; 
  corridor: number;
}

enum Page {
  ORDERS = 'ORDERS',
  PRODUCTS = 'PRODUCTS',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL'
}

export {
  Order,
  Product,
  Page,
}