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
  image: string;
}

enum Page {
  ORDERS = 'ORDERS',
  PRODUCTS = 'PRODUCTS',
  PRODUCT_DETAILS = 'PRODUCT_DETAILS'
}

export {
  Order,
  Product,
  Page,
}