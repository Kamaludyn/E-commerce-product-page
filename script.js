// Selecting elements from the DOM
const openMenu = document.querySelector('.open-menu')
const menu = document.querySelector('.menu')
const closeMenu = document.getElementById('close')
const cartIcon = document.querySelector('.cart')
const dropdownContainer = document.querySelector('.dropdown-container')
const closelightbox = document.querySelector('#close-lightbox')
const lightbox = document.querySelector('.lightbox-section')
const lightboxImageBg = document.getElementById('lightbox-image')
const productImageBg = document.getElementById('product-image')
const lightboxArrows = document.querySelectorAll('#lightbox-arrows')
const thumbnails = document.querySelectorAll('.product-thumbnail div img')
const thumbnailsContainer = document.querySelectorAll('.product-thumbnail div')
const lightboxThumbnails = document.querySelectorAll('#thumbnail')
const lightboxThmbnlsContainer = document.querySelectorAll('.lightbox-thumbnail-cont div')
const addToCartBtn = document.getElementById('add-btn')
const quantityEl = document.getElementById('quantity')
const minus = document.getElementById('minus')
const plus = document.getElementById('plus')
const numberOfCartItems = document.getElementById('numberOfItems')
const Item = document.getElementById('item')

// Counter for the number of products
let numberOfProduct = 0

// Flag to track the state of the cart icon click event
let isCartIconClicked = false;

// Index of the current displayed image in the lightbox
let currentImageIndex = 0

// Array containing paths to product images
const productImages = [
   "images/image-product-1.jpg",
    "images/image-product-2.jpg",
    "images/image-product-3.jpg",
    "images/image-product-4.jpg"
]

// Event listener for openinghamburger menu
openMenu.addEventListener('click', () => {
    menu.style.left = '0'
    menu.style.boxShadow = '220px 0 10px 190px rgba(0, 0, 0, 0.70)'
})

// Event listener for closing hamburger menu
closeMenu.addEventListener('click', () => {
    menu.style.left = '-800px'
    menu.style.boxShadow = 'none'
})

// Event listener for toggling the cart dropdown
cartIcon.addEventListener('click', (event) => {

  dropdownContainer.classList.toggle('flex');

  // Set the flag to true
  isCartIconClicked = true;

  // / Stop the event from reaching document click event
  event.stopPropagation();
});

// Document click event
document.addEventListener('click', () => {
  if (isCartIconClicked) {
      dropdownContainer.classList.remove('flex')
    } 
});

// Preventing click events on the dropdown container from reaching the document
dropdownContainer.addEventListener('click', (e) =>  {
    e.stopPropagation()
})

// Event listener for product thumbnails in the lightbox
thumbnails.forEach((thumbnail, index) => thumbnail.addEventListener('click', () => {
    lightbox.style.display = 'flex'

    lightboxImageBg.style.backgroundImage = `url(${productImages[index]})`;
    
    thumbnails.forEach((thumbnail) => {
        thumbnail.classList.remove('opacity');
    });
    
    thumbnails[index].classList.add('opacity');
})
)

// Event listener for changing border of product thumbnails
thumbnailsContainer.forEach((thumbnailCon, i) => {
    thumbnailCon.addEventListener('click', () => {
        thumbnailsContainer.forEach((thumbnailCon) => {
            thumbnailCon.classList.remove('border')
        })
        
        thumbnailsContainer[i].classList.add('border')
    })
    
})

// Event listener for closing the lightbox
closelightbox.addEventListener('click', () => {
    lightbox.style.display = 'none'
    
})

// Event listeners for navigating through images in the lightbox
lightboxArrows.forEach((arrow, i) => {
    arrow.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex + 1) % productImages.length
      
      // Target lightbox arrows
      if (i === 0 || i === 1) {
          // Change the background image of the lightbox
        lightboxImageBg.style.backgroundImage = `url(${productImages[currentImageIndex]})` 

        // Remove opacity from all lightbox thumbnails
        lightboxThumbnails.forEach((lbThumbnail) => {
            lbThumbnail.classList.remove('opacity')
        })

        // Remove opacity from all lightbox thumbnails
        lightboxThumbnails[currentImageIndex].classList.add('opacity');

        // Remove border from all lightbox thumbnail containers
        lightboxThmbnlsContainer.forEach((lb_thumbnailC) => {
            lb_thumbnailC.classList.remove('border')
        })
                
        // Add border to the currently selected lightbox thumbnail container
        lightboxThmbnlsContainer[currentImageIndex].classList.add('border')
        } 

        // Target mobile display product image arrows
        if (i === 2 || i === 3){
            // Change the background image of the product image container
            productImageBg.style.backgroundImage = `url(${productImages[currentImageIndex]})`
        }
    })
})

// Event listener for product thumbnails container in the lightbox
lightboxThmbnlsContainer.forEach((lb_thumbnailCon, i) => {
    lb_thumbnailCon.addEventListener('click', () => {
        lightboxThmbnlsContainer.forEach((lb_thumbnailC) => {
            lb_thumbnailC.classList.remove('border')
        })
        
        lightboxThmbnlsContainer[i].classList.add('border')
    })
    
})
 
// Event listener for product thumbnails in the lightbox
lightboxThumbnails.forEach((lbThumbnail, index) => {
    lbThumbnail.addEventListener('click', () => {
        changeBg_And_Opacity(index)
    })
})

// Event listener for increasing the product quantity
plus.addEventListener('click', (e) => {
    e.stopPropagation();
    numberOfProduct++
    quantityEl.innerHTML = numberOfProduct
})

// Event listener for decreasing the product quantity
minus.addEventListener('click', (e) => {
    e.stopPropagation();
    
    if (numberOfProduct === 0) {
        return
    } else {
        numberOfProduct--
    }
    quantityEl.innerHTML = numberOfProduct
})

// Event listener for adding product to cart button
addToCartBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    numberOfCartItems.innerHTML = numberOfProduct
    numberOfCartItems.classList.add('cart-items')

     const itemHTML = `
     <img class="thumbnail1" src="images\\image-product-1-thumbnail.jpg" alt=""> 
     <p>Fall Limited Edition Sneakers<br>
     <span>$125.00 x <span>0</span> <strong>$0.00</strong>
     </p>
     <img class="delete" src="images/icon-delete.svg" alt="" onclick="deleteCartItem()">
     `
     const itemQuantity = '<span>0</span>'
     
    const newitemQuantity = numberOfProduct;

    const updatedTotalHTML = itemQuantity.replace('0', newitemQuantity)

    const updatedItemHTML = itemHTML.replace(itemQuantity, updatedTotalHTML);
    
    let itemPrice = 125
    
    let totalSpan = '$0.00'
    let total = itemPrice * numberOfProduct

    totalSpan = `$${total.toFixed(2) }`
    
    const latestItemHTML = updatedItemHTML.replace('$0.00', totalSpan)
    
    if (numberOfProduct > 0) {
        Item.innerHTML = latestItemHTML   
    } 
    
} )

// Function to delete a cart item
const deleteCartItem = () => {
    let emptyP = `<p id="empty">Your cart is empty.</p>`
    item.innerHTML = emptyP
    numberOfCartItems.classList.remove('cart-items')
    numberOfCartItems.innerHTML = ''
    
}

// Function to change the product background and thumbnail Opacity in the lightbox
const changeBg_And_Opacity = (index) => {
    lightboxImageBg.style.backgroundImage = `url(${productImages[index]})`;
        
    lightboxThumbnails.forEach((lbThumbnail) => {
      lbThumbnail.classList.remove('opacity');
    });
  
    lightboxThumbnails[index].classList.add('opacity');
};