# Vanquish Toys Website

A modern, professional website for Vanquish Toys - specializing in toy guns and tactical accessories.

## Features

- **Modern Design**: Clean, professional styling with black/white base and light ice blue accents
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Product Showcase**: Display your toy guns and accessories with detailed descriptions
- **Shopping Cart**: Full cart functionality with quantity management
- **User Authentication**: Login/register system required for checkout
- **Smooth Navigation**: Single-page design with smooth scrolling between sections

## File Structure

```
vanquish-toys-website/
├── index.html          # Main website file
├── styles.css          # All styling and responsive design
├── script.js           # JavaScript functionality
├── README.md           # This file
└── images/             # Create this folder for your product images
    ├── product1.jpg
    ├── product2.jpg
    └── ...
```

## Getting Started

1. **Open the website**: Simply open `index.html` in your web browser
2. **No server required**: This is a static website that runs entirely in the browser
3. **Local storage**: Cart items and user sessions are saved locally

## Adding Your Product Images

### Step 1: Create an Images Folder
Create a folder called `images` in the same directory as your HTML file.

### Step 2: Add Your Product Photos
1. Place your product images in the `images` folder
2. Use descriptive names like `tactical-rifle.jpg`, `combat-pistol.png`, etc.
3. Recommended image size: 400x400 pixels or larger
4. Supported formats: JPG, PNG, WebP

### Step 3: Update the JavaScript
Open `script.js` and find the `products` array (around line 6). Update each product to include the correct image path:

```javascript
const products = [
    {
        id: 1,
        name: "Tactical Assault Rifle",
        description: "High-quality tactical assault rifle with realistic design and durable construction.",
        price: 89.99,
        image: "images/tactical-rifle.jpg", // Update this line
        category: "rifles"
    },
    {
        id: 2,
        name: "Combat Pistol",
        description: "Professional-grade combat pistol with authentic details and smooth action.",
        price: 45.99,
        image: "images/combat-pistol.jpg", // Update this line
        category: "pistols"
    },
    // ... continue for all products
];
```

### Step 4: Update the Product Display
In the `createProductCard` function (around line 95), replace the placeholder icon with your actual image:

```javascript
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">£${product.price.toFixed(2)}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    
    return card;
}
```

## Customization Options

### Colors
The website uses a consistent color scheme defined in `styles.css`:
- **Primary Black**: `#000000`
- **Primary White**: `#ffffff`
- **Ice Blue Accent**: `#87CEEB`
- **Light Gray**: `#f8f9fa`

### Fonts
The website uses Inter font family for a modern, clean look. You can change this in `styles.css` by updating the `font-family` property.

### Adding More Products
To add more products, simply add new objects to the `products` array in `script.js`:

```javascript
{
    id: 7, // Use the next available ID
    name: "Your Product Name",
    description: "Your product description",
    price: 99.99,
    image: "images/your-product.jpg",
    category: "your-category"
}
```

## Features in Detail

### Navigation
- Fixed header with smooth scrolling
- Active section highlighting
- Mobile-responsive navigation

### Shopping Cart
- Add/remove items
- Quantity adjustment
- Persistent cart (saves between sessions)
- Total calculation
- Checkout requirement (must be logged in)

### User Authentication
- Login/Register modal
- Form validation
- Session management
- Account status indicator

### Product Display
- Grid layout with hover effects
- Product cards with images, descriptions, and prices
- Add to cart functionality
- Responsive design

## Browser Compatibility

This website works on all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Security Notes

- This is a frontend-only implementation
- User authentication is simulated (no backend)
- For production use, implement proper backend authentication
- Add HTTPS for secure transactions
- Consider adding a payment processor like Stripe or PayPal

## Future Enhancements

Potential features you could add:
- Product categories and filtering
- Search functionality
- Product reviews and ratings
- Wishlist feature
- Email newsletter signup
- Admin panel for product management
- Real payment processing integration

## Support

If you need help customizing the website or adding features, the code is well-commented and modular for easy modification.

## License

This website template is created for Vanquish Toys. Feel free to modify and use as needed for your business. 