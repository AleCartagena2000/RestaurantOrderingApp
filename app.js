import { menuArray } from "./data.js";

const modal = document.getElementById('modal')
const completeOrderBtn = document.getElementById('complete-order-btn')
const plusIcons = document.getElementsByClassName('fa-solid')
const modalForm = document.getElementById('modal-form')

let totalPrice = 0
let orderItemsArray = []

modalForm.addEventListener('submit', function(e) {
    e.preventDefault()
    const modalFormData = new FormData(modalForm)
    
    const fullName = modalFormData.get('fullName')
    const menuItemsContainer = document.getElementById('menu-items')
    hideModal()
    hideOrderItems()

    let orderCompleteHtml = `
    <div class="container">
        <div class="order-complete">
            <p class="order-complete-message">Thanks ${fullName}! Your order is on the way!</p>
        </div>
    </div>
    `
    let menuItemsHtml = getMenuItemsHtml()
    menuItemsHtml = menuItemsHtml + orderCompleteHtml
    menuItemsContainer.innerHTML = menuItemsHtml

    disablePlusIcons()

})

document.addEventListener('click', function(e) {
    if (e.target.dataset.plusIcon) { 
        updateOrderItemArray(e.target.dataset.plusIcon)
        renderOrderItems(orderItemsArray)
    }
    else if (e.target.dataset.index) {
        removeOrderItem(e.target.dataset.index)
    }
    else if (e.target.id === 'complete-order-btn') {
        showModal()
        disablePlusIcons()
    }
    else if (!modal.contains(e.target) && e.target !== completeOrderBtn) {
        hideModal()
        enablePlusIcons()
    }

})

function getMenuItemsHtml() {
    let menuItemsHtml = ' '
    menuArray.forEach(function(item){
        menuItemsHtml += `
        <div class="container">
            <div class="menu-item">
                <div class="menu-item-emoji">
                    ${item.emoji}
                </div>
                <div class="menu-item-description">
                
                    <div class="item-description">
                        <h3 class="menu-item-title">${item.name}</h3>
                        <p class="menu-item-ingredient">${item.ingredients}</p>
                        <p class="menu-item-price"><strong>$${item.price}</strong></p>
                    </div>

                    <div class="plus-icon">
                        <i class="fa-solid fa-circle-plus" data-plus-icon="${item.id}"></i>
                    </div>
                </div>
            </div>
            
        </div>
        `
    })
    return menuItemsHtml
}

function renderMenuItems() {
    const menuItemsContainer = document.getElementById('menu-items')
    menuItemsContainer.innerHTML = getMenuItemsHtml()
}

function updateOrderItemArray(orderId) {
    menuArray.forEach(function(item) {
        if (item.id == orderId) {
            orderItemsArray.push(item)
        }
    })

    return orderItemsArray

}

function renderOrderItems(orderItemsArray) {
    totalPrice = 0

    const orderItemsList = document.getElementById('order-items-list');
    orderItemsList.innerHTML = ''
    const listItemPriceHtmlLocation = document.getElementById('price')
    const orderItemsFragment = document.createDocumentFragment(); // Create a fragment to hold the new items

    showOrderItems() // Makes the order items visible

    let i = 0
    orderItemsArray.forEach(function(item) {
        const listItemContainer = document.createElement('div')
        const listItemName = document.createElement('li')
        const listItemPrice = document.createElement('li')
        const listItemRemoveText = document.createElement('span')
        
        listItemContainer.classList.add('list-item-container')
        listItemName.classList.add("list-item-name")
        listItemPrice.classList.add("list-item-price")
        listItemRemoveText.classList.add('list-item-remove-text')
        
        listItemName.textContent = item.name
        listItemPrice.textContent = "$"+item.price
        listItemRemoveText.textContent = "remove"

        listItemRemoveText.dataset.index = i

        totalPrice += item.price
        listItemPriceHtmlLocation.textContent = "$"+totalPrice

        listItemName.appendChild(listItemRemoveText)
        listItemContainer.appendChild(listItemName)
        listItemContainer.appendChild(listItemPrice)
        orderItemsFragment.appendChild(listItemContainer) // Append the new item to the fragment

        i++
    })

    orderItemsList.appendChild(orderItemsFragment); // Append all items to the list at once

}

function removeOrderItem(orderItemIndex) {
    orderItemsArray.splice(orderItemIndex, 1)
    renderOrderItems(orderItemsArray)
    if (orderItemsArray.length === 0) {
        hideOrderItems() // Makes the order items invisible
    }
}

function hideOrderItems() {
    document.getElementById('order-items').classList.add('hidden')
}

function showOrderItems() {
    document.getElementById('order-items').classList.remove('hidden')
}

function showModal() {
    modal.style.display = 'inline'
}

function hideModal() {
    modal.style.display = 'none'
}

function disablePlusIcons() {
    for (let i = 0; i < plusIcons.length; i++) {
        plusIcons[i].style.pointerEvents = 'none'
    }
}

function enablePlusIcons() {
    for (let i = 0; i < plusIcons.length; i++) {
        plusIcons[i].style.pointerEvents = 'auto'
    }
}

renderMenuItems()


