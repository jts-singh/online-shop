
document.getElementById("orderNowBtn").addEventListener("click", function() {
    document.getElementById("addressAndConfirmationPage").style.display = "block";
});

document.getElementById("placeOrderBtn").addEventListener("click", function() {
    // Get form data
    var formData = new FormData(document.getElementById("address-and-order-form"));
    var fullName = formData.get("fullname");
    var address = formData.get("address");
    var phone = formData.get("phone");

    // Generate order ID based on user details
    var orderId = generateOrderId(fullName, address, phone);
    var deliveryDate = calculateDeliveryDate(); // You can implement this function to calculate the delivery date

    // Get payment status based on final order click
    var paymentStatus = document.getElementById("finalOrderBtn").clicked ? "Yes" : "No"; 

    // Display order confirmation in the table
    displayOrderConfirmation(orderId, deliveryDate, paymentStatus);

    // Reset form
    document.getElementById("address-and-order-form").reset();

    // Show order confirmation table
    document.getElementById("orderConfirmation").style.display = "block";
    
    // Show payment page
    document.getElementById("paymentPage").style.display = "block";

    // Hide address and confirmation page
    document.getElementById("addressAndConfirmationPage").style.display = "none";
});

// Function to generate order ID
function generateOrderId(fullName, address, phone) {
    // Extracting the first name (before the space)
    var firstName = fullName.split(' ')[0];

    // Extracting the last four digits of the phone number
    var lastFourDigits = phone.slice(-4);

    // Combining first name and last four digits of phone number
    var orderId = firstName + lastFourDigits;

    return orderId;
}

// Function to display order confirmation in the table
function displayOrderConfirmation(orderId, deliveryDate, paymentStatus) {
    var tableBody = document.getElementById("orderConfirmationBody");
    var newRow = tableBody.insertRow();

    var userIdCell = newRow.insertCell(0);
    userIdCell.textContent = orderId;

    var deliveredDateCell = newRow.insertCell(1);
    deliveredDateCell.textContent = deliveryDate;

    var paymentStatusCell = newRow.insertCell(2);
    paymentStatusCell.textContent = paymentStatus;
}



document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('products-container');
    const cartLink = document.getElementById('cart-link');
    const cart = document.getElementById('cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const clearCartButton = document.getElementById('clear-cart');
    const orderItems = document.getElementById('orderItems'); // Add this line to access the order items table body

    let cartContents = [];

    const products = [
        { id: 1, name: 'GARS Magic 20w-40-SM-Bike Engine oil', price: 300.99, image: 'https://www.garslubricants.com/Product/1584680922magic-SMjpg.jpg', offer: '10% off', paragraph: 'content add here'  },
        { id: 2, name: 'GARS GELCO-Bike Engine Oil for Bike', price: 300.99, image: 'https://www.garslubricants.com/Product/1591941973gelco.jpg', offer: '15% off' },
        { id: 3, name: 'GARS GASOLINE 20W-50-SG', price: 300.99, image: 'https://www.garslubricants.com/Product/1591941952gasoline_ing.jpg', offer: '20% off' },
        { id: 4, name: 'GARS Gear Oil', price: 200.99, image: 'https://www.garslubricants.com/Product/1601352400ATF.jpg', offer: '10% off' },
        { id: 5, name: 'GARS BOLT 15-W-40 API CH4', price: 200.99, image: 'https://www.garslubricants.com/Product/1584509101bolt%20img%203.jpg', offer: '15% off' },
        { id: 6, name: 'GARS Brake Oil', price: 300.99, image: 'https://www.garslubricants.com/Product/1584700300break.jpg', offer: '20% off' },
        { id: 7, name: ' GARS COOLANT OIL', price: 300.99, image: 'https://www.garslubricants.com/cat_img/1584003994.jpg', offer: '10% off' },
        { id: 8, name: 'GARS Hydraulic 68', price: 200.99, image: 'https://www.garslubricants.com/cat_img/1584003968.jpg', offer: '15% off' },
        { id: 9, name: 'Nitco Bike care 20W‐40', price: 300.99, image: 'https://nitcopetrolube.com/wp-content/uploads/2023/02/2.jpg', offer: '20% off' },
        { id: 10, name: ' Nitco HYDRO N-20', price: 300.99, image: 'https://nitcopetrolube.com/wp-content/uploads/2023/02/3.jpg', offer: '20% off' },
        { id: 11, name: 'Nitco Grease ' , price: 300.99, image: 'https://nitcopetrolube.com/wp-content/uploads/2023/02/1-1.jpg', offer: '20% off' },
        { id: 12, name: 'Nitco 20-W-40', price: 300.99, image: 'https://nitcopetrolube.com/wp-content/uploads/2021/11/mileage-booster-900ml.jpg', offer: '20% off' },
        { id: 12, name: 'Nitco', price: 300.99, image: 'https://nitcopetrolube.com/wp-content/uploads/2021/11/speeder-pro-900ml.jpg', offer: '20% off' },
        { id: 12, name: 'Nitco', price: 300.99, image: 'https://nitcopetrolube.com/wp-content/uploads/2023/04/Racing-Booster-1Ltr.png', offer: '20% off' },
        { id: 12, name: 'Nitco', price: 300.99, image: 'https://nitcopetrolube.com/wp-content/uploads/2023/10/CNG-2-1080X1080.png', offer: '20% off' },
        { id: 12, name: 'Nitco', price: 300.99, image: '', offer: '20% off' },
        // Add more products here
    ];

    // Display products
    products.forEach(product => {
        const productElement = createProductElement(product);
        productsContainer.appendChild(productElement);
    });

    // Create product element
    function createProductElement(product) {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-details">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>Offer: ${product.offer}</p>
            <p>${product.paragraph}</p> <!-- Include the paragraph here -->
            <select class="quantity-dropdown">
                <!-- Options will be added dynamically -->
            </select>
            <button class="buy-btn" data-id="${product.id}">Add to Cart</button>
        </div>
        `;

        // Dynamically generate options for quantity dropdown
        const quantityDropdown = productElement.querySelector('.quantity-dropdown');
        for (let i = 20; i <= 100; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            quantityDropdown.appendChild(option);
        }

        productElement.querySelector('.buy-btn').addEventListener('click', function() {
            const selectedQuantity = parseInt(productElement.querySelector('.quantity-dropdown').value);
            addToCart(product, selectedQuantity);
        });

        return productElement;
    }

    // Add to cart function
    function addToCart(product, quantity) {
        const cartItem = { ...product, quantity };
        cartContents.push(cartItem);
        renderCart();
        updateOrderItems(); // Update the user orders table
    }

    // Render cart function
    function renderCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cartContents.forEach(item => {
            const li = document.createElement('li');
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            li.innerHTML = `${item.name} - Quantity: ${item.quantity} - Total: $${itemTotal.toFixed(2)} <span class="remove-item" data-id="${item.id}">Remove</span>`;
            cartItems.appendChild(li);
        });
        cartTotal.textContent = total.toFixed(2);
        showCart();
        addRemoveItemListeners();
    }

    // Update the user cart table in fix button
    function updateOrderItems() {
        orderItems.innerHTML = '';
        cartContents.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" class="product-img"></td>
                <td>${item.name}</td>
                <td>$${item.price}</td>
                <td>${item.quantity}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>     
            `;
            orderItems.appendChild(row); 
        });
    }

    // Show cart function
    function showCart() {
        cart.style.display = 'block';
    }

    // Hide cart function
    function hideCart() {
        cart.style.display = 'none';
    }

    // Add event listeners to remove items from the cart
    function addRemoveItemListeners() {
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(button.getAttribute('data-id'));
                removeItem(itemId);
            });
        });
    }

    // Remove item from cart function
    function removeItem(itemId) {
        cartContents = cartContents.filter(item => item.id !== itemId);
        renderCart();
        updateOrderItems(); // Update the user orders table
    }

    // Event listeners
    cartLink.addEventListener('click', function() {
        renderCart();
    });
    

});





let cartItems = [];
let cartOpen = false;

function addToCart(product) {
  cartItems.push(product);
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById('cart-items');
  cartList.innerHTML = '';
  cartItems.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    cartList.appendChild(listItem);
  });
  document.getElementById('cart-count').textContent = cartItems.length;
}

function toggleCart() {
  const cart = document.getElementById('cart');
  cartOpen = !cartOpen;
  if (cartOpen) {
    cart.style.display = 'block';
  } else {
    cart.style.display = 'none';
  }
}
//cart end


// qr-code img download function
function downloadImage() {
    // Get the image URL
    var imageUrl = document.getElementById('image').src;

    // Create a temporary anchor element
    var a = document.createElement('a');
    a.href = imageUrl;

    // Set the filename for the download
    a.download = 'image.jpg';

    // Append the anchor element to the body
    document.body.appendChild(a);

    // Trigger a click event on the anchor element
    a.click();

    // Remove the anchor element from the body
    document.body.removeChild(a);
}

//copy upi button
function copyToClipboard(text) {
    // Create a temporary input element
    var input = document.createElement('input');
    input.style.position = 'fixed';
    input.style.opacity = 0;
    input.value = text;
    document.body.appendChild(input);

    // Select the text inside the input element
    input.select();

    // Execute the copy command
    document.execCommand('copy');

    // Remove the temporary input element
    document.body.removeChild(input);

    
}

//pay button function
document.addEventListener("DOMContentLoaded", function() {
  var modal = document.getElementById("modal");
  var payButton = document.getElementById("payButton");
  var closeButton = document.getElementsByClassName("close")[0];

  payButton.onclick = function() {
      modal.style.display = "block";
      setTimeout(function() {
          modal.style.display = "none";
      }, 60000); // Close modal after 1 minute
  }

  closeButton.onclick = function() {
      modal.style.display = "none";
  }

  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
});



 //payment page start
function uploadScreenshot() {
    // Function to handle screenshot upload
    // Include code to upload screenshot to server here
    
    // Assuming screenshot upload is successful
    var paymentStatus = 'Yes';
    var currentDate = new Date();
    var paymentDate = currentDate.toLocaleDateString();
    var paymentTime = currentDate.toLocaleTimeString();
    
    alert('Screenshot uploaded successfully! Payment status: ' + paymentStatus + ', Date: ' + paymentDate + ', Time: ' + paymentTime);
    
    // You can send paymentStatus, paymentDate, and paymentTime to your backend server for further processing
    
    // Or you can store them in local storage for client-side storage
    localStorage.setItem('paymentStatus', paymentStatus);
    localStorage.setItem('paymentDate', paymentDate);
    localStorage.setItem('paymentTime', paymentTime);
    
    // Display payment details in feed
    var feedElement = document.getElementById('paymentFeed');
    var feedItem = document.createElement('div');
    feedItem.classList.add('feed-item');
    feedItem.innerHTML = 'Payment Status: ' + paymentStatus + ', Date: ' + paymentDate + ', Time: ' + paymentTime;
    feedElement.appendChild(feedItem);
}
//payment  page end


 // Start the timer when the page loads
 document.addEventListener("DOMContentLoaded", function() {
    startTimer(3 * 60); // Start a 2-minute timer
});

// Function to start the timer
function startTimer(duration) {
    let timer = duration;
    const timerInterval = setInterval(function() {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;

        // Display the timer on the page
        document.getElementById("timerDisplay").innerText = minutes + "m " + seconds + "s";

        if (--timer < 0) {
            clearInterval(timerInterval);
            // Timer completed, do something here if needed
        }
    }, 1000);
}

//category 
function toggleCategoryDropdown() {
    var categoryDropdown = document.getElementById("categoryDropdown");
    if (categoryDropdown.style.display === "none") {
        categoryDropdown.style.display = "block";
    } else {
        categoryDropdown.style.display = "none";
    }
}

//fixed button on botoom
function openSection(sectionId) {
    // Hide all sections
    var sections = document.getElementsByClassName("section");
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = "none";
    }
    
    // Show the selected section
    document.getElementById(sectionId).style.display = "block";
}


// Order Now Button Click Event
document.getElementById("orderNowBtn").addEventListener("click", function() {
    document.getElementById("addressAndConfirmationPage").style.display = "block";
    document.querySelector(".container").style.display = "none";
});

// Function to show the Payment Page and hide the Address and Confirmation Page
function showPaymentPage() {
    document.getElementById("paymentPage").style.display = "block";
    document.getElementById("addressAndConfirmationPage").style.display = "none";
}

// Function to close the Congratulations Modal
function closeCongratsModal() {
    document.getElementById("congratsModal").style.display = "none";
    window.location.href = "home.html"; // Redirect to the home page
}

// Function to show the Congratulations Modal and close the payment page
function showCongratsModalAndClosePage() {
    var congratsModal = document.getElementById("congratsModal");
    congratsModal.style.display = "block";
    setTimeout(function() {
        congratsModal.style.display = "none";
        window.close(); // Close the payment page
    }, 10000);
}




// Final Order Button Click Event
document.getElementById("finalOrderBtn").addEventListener("click", function() {
    // Here you can save the payment data or perform any other necessary actions
    // For now, let's just show the congratulations modal and close the payment page
    showCongratsModalAndClosePage();
});

//Final Order function 
document.addEventListener("DOMContentLoaded", function() {
    var finalOrderBtn = document.getElementById("finalOrderBtn");

    if (finalOrderBtn) {
        finalOrderBtn.addEventListener("click", function() {
            // ऑर्डर सफलतापूर्वक हो गया है, तो इसे पुष्टि करें
            var confirmation = confirm("आपका ऑर्डर सफलतापूर्वक हो गया है! क्या आप अपने आदेश का स्थिति पेज पर जाना चाहते हैं?");

            // अगर पुष्टि किया जाता है, तो उपयोगकर्ता को स्थिति पेज पर रीडायरेक्ट करें
            if (confirmation) {
                document.getElementById("order-section").style.display = "block";
            }
        });
    }
});


// Payment Page Form Submit Event
document.querySelector("#address-and-order-form").addEventListener("submit", function(event) {
    event.preventDefault();
    // Here you can save the address and order confirmation data if needed
    showPaymentPage(); // Show the Payment Page after form submission
});





//ruff code
    
// Function to create product element
function createProductElement(product) {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-details">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>Offer: ${product.offer}</p>
            <button onclick="addToCart('${product.name}', ${product.price}, 'userId')">Add to Cart</button>
        </div>
    `;
    return productElement;
}





//JavaScript code to display products
document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('products-container');

    // Display products
    products.forEach(product => {
        const productElement = createProductElement(product);
        productsContainer.appendChild(productElement);
    });
});


    // Dynamically generate options for quantity dropdown 
    var quantityDropdown = document.querySelector('.quantity-dropdown');
    for (var i = 1; i <= 20; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        quantityDropdown.appendChild(option);
    }

    function addToCart(productName, price) {
        var orderItems = document.getElementById("orderItems");
        var selectedQuantity = parseInt(document.querySelector('.quantity-dropdown').value);
        var total = price * selectedQuantity;
        
        var newRow = orderItems.insertRow();
        newRow.innerHTML = `
            <td><img src="${productName.toLowerCase().replace(' ', '')}.jpg" alt="${productName}" class="product-img"></td>
            <td>${productName}</td>
            <td>$${price}</td>
            <td>${selectedQuantity}</td>
            <td class="${productName.replace(' ', '')}-total">$${total}</td>
            
        `;
    }
   








    // JavaScript code for adding product to cart and creating order table
    function addToCart(productName, price, userId) {
        var orderItems = document.getElementById("orderItems").querySelector("tbody");
        var selectedQuantity = parseInt(document.querySelector('.quantity-dropdown').value);
        var total = price * selectedQuantity;
        var deliveryDate = calculateDeliveryDate();

        // Create a unique order id using user's name/number and last 4 digits of userId
        var orderId = generateOrderId(userId);

        // Insert a new row in the orderItems table
        var newRow = orderItems.insertRow();
        newRow.innerHTML = `
            <td><img src="${productName.toLowerCase().replace(' ', '')}.jpg" alt="${productName}" class="product-img"></td>
            <td id="payment-status-${orderId}">No</td>
            <td id="order-delivered-${orderId}">${deliveryDate}</td>
            <td>${orderId}</td>
        `;

        // Update total in cart
        var cartTotal = parseFloat(document.getElementById("cart-total").innerText);
        document.getElementById("cart-total").innerText = (cartTotal + total).toFixed(2);
    }

    // JavaScript function to calculate delivery date (7 days from today)
    function calculateDeliveryDate() {
        var currentDate = new Date();
        var deliveryDate = new Date(currentDate);
        deliveryDate.setDate(deliveryDate.getDate() + 7); // Add 7 days
        var deliveryDateString = deliveryDate.toDateString(); // Convert to string
        return deliveryDateString;
    }

    // JavaScript function to generate unique order id
    function generateOrderId(userId) {
        // Assuming userId is a string containing user's name/number
        // and last 4 digits of userId
        var last4Digits = userId.slice(-4);
        var orderId = "ORDER-" + last4Digits + "-" + generateRandomNumber();
        return orderId;
    }

    // JavaScript function to generate random number for order id
    function generateRandomNumber() {
        return Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit random number
    }



// Sample product data
var products = [
    { name: 'Product 1', price: 10 },
    { name: 'Product 2', price: 15 },
    { name: 'Product 3', price: 20 }
];

// Function to dynamically add products to the container
function addProductsToContainer() {
    var container = document.getElementById("products-container");

    products.forEach(function(product) {
        var productDiv = document.createElement("div");
        productDiv.classList.add("product");

        // Construct product HTML
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart('${product.name}', ${product.price}, 'User123')">Add to Cart</button>
        `;

        // Append product div to container
        container.appendChild(productDiv);
    });
}

// Call the function to add products to the container
addProductsToContainer();





       
