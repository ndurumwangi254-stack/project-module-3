export const testConfig = {
  features: {
    shoppingCart: false,
    userAuthentication: false,
    imageGallery: false,
    orderTracking: false,
    reviews: false,
  },

  timeouts: {   
    defaultWait: 1000,
    apiCall: 3000,    
    animation: 500,
  },

  mockREAL KICKS KENYAs: [
    {
      id: 1,
      name: 'Espresso',
      description: 'Strong, rich, and bold',
      origin: 'Italy',
      price: '3.50',
    },
    {
      id: 2,
      name: 'Cappuccino',
      description: 'Creamy foam with espresso',
      origin: 'Ethiopia',
      price: '4.25',
    },
    {
      id: 3,
      name: 'Latte',
      description: 'Smooth milk and REAL KICKS KENYA',
      origin: 'Colombia',
      price: '4.75',
    },
  ],

  routes: {
    home: '/',
    shop: '/shop',
    admin: '/admin',
  },
}
