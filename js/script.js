const ringBtns = document.querySelectorAll('.ring-button');
const imageBase = './images/'

for (i = 0; i < ringBtns.length; i++) {
    const ringbtn = ringBtns[i];
    // console.log(ringbtn)
    ringbtn.addEventListener('click', function (event) {
        // console.log(event.target)
        const color = event.target.id.replace('-color', '');
        console.log(color)
        for (j = 0; j < ringBtns.length; j++) {
            const btnBorder = ringBtns[j];
            btnBorder.classList.remove('border-purple-600')
        }

        event.target.classList.add('border-purple-600');

        const priceTag = document.getElementById('price-tag');
        // priceTag.classList.add(`text-${color}-600`);
        // priceTag.style.color= color;
        // const addToCurtBtn = document.getElementById('add-to-cart');
        // addToCurtBtn.style.backgroundColor=color;

        const productImage = document.getElementById('product-image');
        productImage.src = "../images/" + color + '.png'

    })

}

function selectWristSize(size) {
    // console.log(size)
    const sizes = ['S', 'M', 'L', 'XL'];

    for (let i = 0; i < sizes.length; i++) {
        const sizeBtn = document.getElementById('size-' + sizes[i])
        const element = sizes[i];
        if (size === element) {
            sizeBtn.classList.add('border-purple-600')

        }
        else {
            sizeBtn.classList.remove('border-purple-600')
        }
    }
}


const quantityBtn = document.querySelectorAll('.quantity-button')
for (let btn of quantityBtn) {
    btn.addEventListener('click', function (event) {
        const amount = event.target.innerText === '+' ? 1 : -1;
        // console.log(amount)
        const currentElement = document.getElementById('quantity');
        const currentQuantity = parseInt(currentElement.innerText);
        const newQnt = Math.max(0, currentQuantity + amount)
        currentElement.innerText = newQnt;
    })
}

let cartCount = 0;
let cartItems = [];
document.getElementById('add-to-cart').addEventListener('click', function () {
    const quantity = parseInt(document.getElementById('quantity').innerText);

    if (quantity > 0) {
        document.getElementById('checkout-container').classList.remove('hidden');
        cartCount = cartCount + quantity
        document.getElementById('cart-count').innerText = cartCount;

        const selectColorBtn = document.querySelector('button.border-purple-600.w-6');
        const selectedColor = selectColorBtn.id.split('-')[0];
        // console.log(selectedColor)
        const selectedSizeBtn = document.querySelector('button.border-purple-600:not(.w-6)');
        const selectSize = selectedSizeBtn.innerText.split(' ')[0]
        const selectedPrice = selectedSizeBtn.innerText
            .split(' ')[1]
            .split('$')[1]
        const price = quantity * parseInt(selectedPrice)    
        // console.log(selectedPrice)
        cartItems.push({
            image: selectedColor + '.png',
            title: 'Classy Modern Smart Watch',
            color: selectedColor,
            size: selectSize,
            quantity: quantity,
            price: price
        });
        console.log(cartItems)
    }
    else {
        alert('please select quantity')
    }

});

const blrContainer = document.getElementById('blur-container');
const cartModal = document.getElementById('cart-modal');

document.getElementById('checkout-btn').addEventListener('click', () => {
    const cartContainer = document.getElementById('cart-items');

    let totalAmount= 0;
    let totalQnt = 0;
    for (i = 0; i < cartItems.length; i++) {
        const items = cartItems[i];
        // console.log(cartItems[i])
        totalAmount +=items.price;
        totalQnt += items.quantity;
        console.log(totalAmount)
        const row = document.createElement('tr');
        row.classList.add('border-b')
        row.innerHTML = `
        <td>
            <div class="flex items-center space-x-2">
                <img class="h-12 w-12 my-2 object-cover rounded-md" src="${imageBase}${items.image}" alt="">
                <span class="font-semibold ml-">${items.title}</span>
            </div>
        </td>
        
        <td class="py-2 px-4">${items.color}</td>
        <td class="py-2 px-6">${items.size}</td>
        <td class="py-2 px-8">${items.quantity}</td>
        <td class="py-2 px-8">$${items.price}</td>
        `;
        cartContainer.appendChild(row);
    }

    const totalRow = document.createElement('tr');
    totalRow.innerHTML= `
    
    <td class="font-bold pl-3 text-[18px]"> Total</td>
    <td class="font-bold"></td>
    <td class="font-bold"></td>
    <td class="font-bold pl-10 text-[18px]">${totalQnt}</td>
    <td class="font-bold pl-10 text-[18px]"> $${totalAmount}</td>
    
    `
    cartContainer.appendChild(totalRow);

    cartModal.classList.remove('hidden');
    
    blrContainer.classList.add('body-blr');
    document.body.classList.add('background');
});

document.getElementById('continue-shopping').addEventListener('click', () => {
    document.getElementById('cart-modal').classList.add('hidden');
    blrContainer.classList.remove('body-blr');
    document.body.classList.remove('background');
})

document.getElementById('checkout').addEventListener('click',()=>{
    alert('Proceeding to checkout....');
    
} )


