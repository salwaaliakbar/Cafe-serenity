
if(document.getElementById("prev") || document.getElementById("next")){
    document.addEventListener("DOMContentLoaded",function() {
        const reviews = document.querySelectorAll(".cusrev");
        let index = 0;
        let atFrame = 3;

        const DisplayScreen=(start)=>{
            reviews.forEach((review, i) => {
                review.classList.remove("active");
                if (i >= start && i < start + atFrame) {
                    review.classList.add("active");
                }
            });
        }

        document.getElementById("prev").addEventListener("click",function(){
            index = (index - 1 + reviews.length) % reviews.length;
            DisplayScreen(index);
        })

        document.getElementById("next").addEventListener("click",function(){
            index = (index + 1) % reviews.length;
            DisplayScreen(index);
        })
        DisplayScreen(index);
    });

}

if(document.getElementById("prevButton") || document.getElementById("nextButton")){
    document.addEventListener("DOMContentLoaded",function() {
        const reviews = document.querySelectorAll(".pics");
        let index = 0;
        let atFrame = 3;

        const DisplayScreen=(start)=>{
            reviews.forEach((review, i) => {
                review.classList.remove("active");
                if (i >= start && i < start + atFrame) {
                    review.classList.add("active");
                }
            });
        }

        document.getElementById("prevButton").addEventListener("click",function(){
            index = (index - 1 + reviews.length) % reviews.length;
            DisplayScreen(index);
        })

        document.getElementById("nextButton").addEventListener("click",function(){
            index = (index + 1) % reviews.length;
            DisplayScreen(index);
        })
        DisplayScreen(index);
    });
}


const emailsend = () => {
    const email = document.getElementById('email').value;
    const savedUser = JSON.parse(localStorage.getItem('user'));

    if (savedUser && savedUser.email === email) {
        let randomNum = Math.floor(Math.random() * 1000000);
        let randomCode = randomNum.toString().padStart(6, '0');
        localStorage.setItem('verificationCode', randomCode);

        var messageBody = "Your Reset verification code is: " + randomCode;
        Email.send({
            Host: "smtp.elasticemail.com",
            Username: "salwaaliakbar22@gmail.com",
            Password: "17851582ED9BDD6C893216A046C5845934AD",
            To: email,
            From: "salwaaliakbar22@gmail.com",
            Subject: "Verification Code",
            Body: messageBody
        }).then(
            message => {
                if (message === 'OK') {
                    alert('Email sent successfully!');
                    document.getElementById('emailmessage').style.display = 'block';
                    setTimeout(function() {
                        window.location.href = 'forget2.html';
                    }, 2000); 
                } else {
                    alert('Failed to send email: ' + message);
                }
            }
        ).catch(
            error => {
                alert('Error: ' + error);
            }
        );
    } else {
        alert('Email not found in our records.');
    }
}

const aferverify = () => {
    const inputCode = document.getElementById('VerifyCode').value;
    const storedCode = localStorage.getItem('verificationCode');

    if (inputCode === storedCode) {
        document.getElementById('verifymessage').textContent = 'Code is verified';
        document.getElementById('verifymessage').style.color = 'goldenrod';
        document.getElementById('verifymessage').style.display = 'block';

        setTimeout(function() {
            window.location.href = 'reset.html';
            localStorage.removeItem('verificationCode');
        }, 2000); 
    } else {
        document.getElementById('verifymessage').textContent = 'Invalid verification code.';
        document.getElementById('verifymessage').style.color = 'red';
        document.getElementById('verifymessage').style.display = 'block';

        setTimeout(function() {
            localStorage.removeItem('verificationCode');
            window.location.href = 'resetpassword.html';
        }, 2000);
    }
}
if(document.getElementById('PasswordForm')){
document.getElementById('PasswordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    emailsend();
});
}
if(document.getElementById('PasswordForm2')){
document.getElementById('PasswordForm2').addEventListener('submit', function(e) {
    e.preventDefault();
    aferverify();
});
}

if(document.getElementById('ContactForm')){
    document.getElementById('ContactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        msgemail();
    });
    }
const msgemail = () => {
    const email = document.getElementById('email').value;
const fullname = document.getElementById('name').value;
const phone = document.getElementById('phone').value;
const msg = document.getElementById('msg').value; 
let messageBody = "Full Name: "+fullname+
    " \nPhone Number: "+phone+
    " \nEmail: "+email+
    " \nMessage: "+msg;

    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "salwaaliakbar22@gmail.com",
        Password: "17851582ED9BDD6C893216A046C5845934AD",
        To: "salwaaliakbar22@gmail.com",
        From: email,
        Subject: "Message",
        Body: messageBody
     }).then(
        message => {
            if (message === 'OK') {
                alert('Message sent successfully!');
                document.getElementById('message').style.display = 'block';
                setTimeout(function() {
                    document.getElementById('ContactForm').reset();
                    document.getElementById('message').style.display = 'none';
                }, 2000);
            } else {
                alert('Failed to send Message: ' + message);
            }
        }
           ).catch(
        error => {
            alert('Error: ' + error);
        }
    );
}


const resetVerified = () => {
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confrimpassword').value;
    const savedUser = JSON.parse(localStorage.getItem('user'));

    if (newPassword === confirmPassword) {
        savedUser.password = newPassword;
        localStorage.setItem('user', JSON.stringify(savedUser));
        document.getElementById('resetmessage').textContent = 'Password reset successfully!';
        document.getElementById('resetmessage').style.color = 'goldenrod';
        document.getElementById('resetmessage').style.display = 'block';

        setTimeout(function() {
            document.getElementById('resetForm').reset();
            document.getElementById('resetmessage').style.display = 'none';
        }, 2000); 
    } else {
        document.getElementById('resetmessage').textContent = 'Passwords do not match!';
        document.getElementById('resetmessage').style.color = 'red';
        document.getElementById('resetmessage').style.display = 'block';
        setTimeout(function() {
            document.getElementById('resetForm').reset();
            document.getElementById('resetmessage').style.display = 'none';
        }, 2000); 
    }
}
if(document.getElementById('resetForm')){
document.getElementById('resetForm').addEventListener('submit', function(e) {
    e.preventDefault();
    resetVerified();
});
}


const loginAccount = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser && savedUser.username === username && savedUser.password === password) {
        document.getElementById('loginmessage').textContent = 'Login Account Successfully';
        document.getElementById('loginmessage').style.color = 'goldenrod';
        document.getElementById('loginmessage').style.display = 'block';
        setTimeout(function(){
            document.getElementById('form').reset();
            document.getElementById('loginmessage').style.display = 'none';
        }, 2000); 
        setTimeout(function(){
            window.location.href = 'index.html';
            updateLoginButton(true);
            localStorage.setItem('loggedIn', true);
        }, 1000); 

    } else {
        document.getElementById('loginmessage').textContent = 'Invalid username or password.';
        document.getElementById('loginmessage').style.color = 'red';
        document.getElementById('loginmessage').style.display = 'block';
        setTimeout(function(){
            document.getElementById('form').reset();
            document.getElementById('loginmessage').style.display = 'none';
        }, 2000); 
    } 
}
if(document.getElementById('form')){
    document.getElementById('form').addEventListener('submit', function(e) {
        e.preventDefault();
        loginAccount();
    });
}
const handleLogout = () => {
    const confirmLogout = confirm('Are you sure you want to logout?');
    if (confirmLogout) {
        localStorage.removeItem('loggedIn');
        updateLoginButton(false);
        window.location.href = 'index.html';
    }
}
const updateLoginButton = (isLoggedIn) => {
    const loginLogoutButton = document.getElementById('loginLogoutButton');

    if (isLoggedIn) {
        loginLogoutButton.innerHTML = '<b><a href="#" onclick="handleLogout()">Logout</a></b>';
    } else {
        loginLogoutButton.innerHTML = '<b><a href="login.html">Login</a></b>';
    }
}
const signup=()=> {
        const fullname = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        const user = {
            fullname: fullname,
            phone: phone,
            username: username,
            email: email,
            password: password
        };

        localStorage.setItem('user', JSON.stringify(user));
        
        document.getElementById('signupmessage').style.display = 'block';

        setTimeout(function(){
            document.getElementById('newAccountForm').reset();
            document.getElementById('signupmessage').style.display = 'none';
        }, 2000); 
        setTimeout(function(){
            window.location.href = 'index.html';
            updateLoginButton(true);
            localStorage.setItem('loggedIn', true);
        }, 1000); 
    
}
if(document.getElementById('newAccountForm')){
    document.getElementById('newAccountForm').addEventListener('submit', function(e) {
        e.preventDefault();
        signup();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const loggedIn = localStorage.getItem('loggedIn');
    updateLoginButton(!!loggedIn);

    if (document.getElementById("cartList")) {
        displayCartItems();
    }
    if (document.getElementById("orderList")) {
        displayOrderList();
    }

    const orderForm = document.querySelector('.orderDetails');
    if (orderForm) {
        orderForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const order = JSON.parse(localStorage.getItem('order'));
            if (order) {
                order.fullName = orderForm.querySelector('input[placeholder="Full Name"]').value;
                order.country = orderForm.querySelector('input[placeholder="Country"]').value;
                order.phoneNumber = orderForm.querySelector('input[placeholder="Phone Number"]').value;
                order.city = orderForm.querySelector('input[placeholder="City"]').value;
                order.email = orderForm.querySelector('input[placeholder="Email"]').value;
                order.address = orderForm.querySelector('input[placeholder="Address"]').value;
                order.paymentMethod = orderForm.querySelector('#Delivery').value;
                order.payPalEmail = orderForm.querySelector('input[placeholder="PayPal Email"]').value;

                const orders = JSON.parse(localStorage.getItem('orders')) || [];
                orders.push(order);
                localStorage.setItem('orders', JSON.stringify(orders));
                displayOrderList();
                alert('Order placed successfully!');
                const email = document.getElementById('email');
                const dishText = dishElement.querySelector('.reviews b').textContent;
                const dishName = dishText.split(': ')[1].split('<br>')[0].trim();
                const priceText = dishText.split(': ')[2].trim();
                const price = parseFloat(priceText.replace('$', ''));
                const quantity = parseInt(dishElement.querySelector('.quantity').value); 
        let messageBody = "Dish Name" + dishName +"\nQuantity : " + quantity +"\nTotal Amount : "+(price*quantity);
        Email.send({
            Host: "smtp.elasticemail.com",
            Username: "salwaaliakbar22@gmail.com",
            Password: "17851582ED9BDD6C893216A046C5845934AD",
            To: email.value,
            From: "salwaaliakbar22@gmail.com",
            Subject: "Order Placed",
            Body: messageBody
        }).then(
            message => {
                if (message === 'OK') {
                    alert('Message sent successfully!');
                    document.getElementById('message').style.display = 'block';
                } else {
                    alert('Failed to send Message: ' + message);
                }
            }
           ).catch(
        error => {
            alert('Error: ' + error);
        }
    );
            }
        });
    }
    if (document.getElementById("orderDetails")) {
        displayOrderList();
    }
});

const addToCart = (dishName, price, quantity) => {
    if (quantity <= 0) {
        alert('Please enter a valid quantity.');
        return;
    }
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({ dishName, price, quantity });
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        alert('Item added to cart!');
    } else {
        window.location.href = 'login.html';
    }
};

const buyNow = (dishName, price, quantity) => {
    if (quantity <= 0) {
        alert('Please enter a valid quantity.');
        return;
    }
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn) {
        localStorage.setItem('order', JSON.stringify({ dishName, price, quantity: parseInt(quantity) }));
        window.location.href = 'placeorder.html';
    } else {
        window.location.href = 'login.html';
    }
};

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.menubutton').forEach(button => {
        button.addEventListener('click', function(event) {
            const dishElement = event.target.closest('.catagory');
const dishText = dishElement.querySelector('.reviews b').textContent;
const dishName = dishText.split(': ')[1].split('<br>')[0].trim();
const priceText = dishText.split(': ')[2].trim();
const price = parseFloat(priceText.replace('$', ''));
const quantity = parseInt(dishElement.querySelector('.quantity').value);

            console.log(price);

            if (event.target.textContent === 'Add To Cart') {
                addToCart(dishName, price, quantity);
            } else if (event.target.textContent === 'Buy Now') {
                buyNow(dishName, price, quantity);
            }
        });
    });
});

const displayCartItems = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cartList');
    if (cartList) {
        cartList.innerHTML = '';

        cart.forEach(item => {
            const totalAmount = (item.price * item.quantity).toFixed(2);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.dishName}</td>
                <td>${item.quantity}</td>
                <td>$${totalAmount}</td>
                <td><label class="delete-btn" onclick="removeFromCart('${item.dishName}')">Delete</label></td>
                <td><label class="placeorder" onclick="placeOrderFromCart('${item.dishName}', ${item.price}, ${item.quantity})">Place Order</label></td>
            `;
            cartList.appendChild(row);
        });
    }
};

const removeFromCart = (dishName) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.dishName !== dishName);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
};

const placeOrderFromCart = (dishName, price, quantity) => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn) {
        localStorage.setItem('order', JSON.stringify({ dishName, price, quantity }));
        window.location.href = 'placeorder.html';
        removeFromCart(dishName);
    } else {
        window.location.href = 'login.html';
    }
};

const displayOrderList = () => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderList = document.getElementById('orderList');
    if (orderList) {
        orderList.innerHTML = '';

        orders.forEach(order => {
            const totalAmount = (order.price * order.quantity).toFixed(2);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.dishName}</td>
                <td>${order.quantity}</td>
                <td>$${totalAmount}</td>
                <td>${new Date().toLocaleDateString()}</td>
                <td><label class="delete-btn" onclick="removeOrder('${order.dishName}')">Delete</label></td>
            `;
            orderList.appendChild(row);
        });
    }
};

const removeOrder = (dishName) => {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders = orders.filter(order => order.dishName !== dishName);
    localStorage.setItem('orders', JSON.stringify(orders));
    displayOrderList();
};
