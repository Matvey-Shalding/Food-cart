const burger = document.querySelector('.menu-burger')
burger.addEventListener('click', e => {
  document.body.classList.toggle('menu-burger-open')
})
const swiper = new Swiper(".advert-body", {
  slidesPerView: 1,
  pagination: {
    el: '.advert-body-fraction',
    type: 'fraction',
  }
});
const aboutGoods = document.querySelector('.advert')
const nextOffer = document.querySelector('.cart-btn')
const backOffer = document.querySelector('.check-btn')
const backCart = document.querySelector('.offering-form-btn-back')
const nextSuccessMessage = document.querySelector('.offering-form-btn-submit')
const cart = document.querySelector('.cart-body')
const orderingForm = document.querySelector('.offering')
const successMessage = document.querySelector('.check')
const cartTitle = document.querySelector('.cart-related')
const orderingFormTitle = document.querySelector('.ordering-related')
const successMessageTitle = document.querySelector('.ready-related')
let descriptionText = document.querySelector('.body-ordering-content-freeDelivering-description')
let totalSum = document.querySelector('.ordering-content-total-prices-total')
let sum = document.querySelector('.ordering-content-total-prices-good')
let deliveryNum = document.querySelector('.ordering-content-total-prices-delivering')
document.addEventListener('DOMContentLoaded',e => {
  orderingForm.style.display = 'none'
  successMessage.style.display = 'none'
  let firstsum = 0
  let goods = document.querySelectorAll('.cart-body-good')
  goods.forEach(i => {
    firstsum += Number(i.querySelector('.good-content-bottom-price').dataset.price)
  })
  sum.textContent = `${firstsum}₽` 
  if (Number(totalSum.textContent) + Number(sum.textContent.replace('₽', '')) < 2000) { 
    totalSum.textContent = `${Number(sum.textContent.replace('₽', '')) + 300}₽`
    deliveryNum.textContent = '300₽'
    descriptionText.innerHTML = `<div class="body-ordering-content-freeDelivering-description">Доставка в нашем магазине при заказе на сумму от <span class="style"> 2000₽ абсолютно бесплатна!</span>Добавьте товаров еще на <span class="style" id = "how-many">${2000 - Number(sum.textContent.replace('₽', ''))}₽</span> и Вам станет доступна бесплатная доставка.</div >`
  } else {
    totalSum.textContent = sum.textContent
    deliveryNum.textContent = '0₽'
    descriptionText.innerHTML = 'Вам полагается бесплатная доставка'
  }
})
let parentsCounter = document.querySelectorAll('.good-content-bottom-counter')
parentsCounter.forEach(item => {
  item.addEventListener('click', e => {
    let descriptionText = document.querySelector('.body-ordering-content-freeDelivering-description')
    let currentSum = Number(sum.textContent.replace('₽', ''))   
    let targetText = item.querySelector('.count')
    let target = e.target   
    let price = item.parentElement.querySelector('.good-content-bottom-price').dataset.price
    let priceClear = item.parentElement.querySelector('.good-content-bottom-price')   
    if (target.classList.contains('plus')) {
      ++targetText.textContent
      item.querySelector('.minus').classList.remove('disabled')
      priceClear.textContent = `${targetText.textContent * price}₽`
      sum.textContent = `${Number(price) + Number(sum.textContent.replace('₽', ''))}₽`
      totalSum.textContent = `${Number(sum.textContent.replace('₽', '')) + 300}₽`
      if (Number(sum.textContent.replace('₽', '')) > 2000) {
        deliveryNum.textContent = '0₽'
        descriptionText.innerHTML = 'Вам полагается бесплатная доставка'
        totalSum.textContent = `${sum.textContent}`
      }
    }
    else if (target.classList.contains('minus')) {
      if (targetText.textContent > 1) {
        priceClear.textContent = `${(targetText.textContent * price) - price}₽`
        targetText.textContent--
        sum.textContent = `${Number(sum.textContent.replace('₽', '')) - Number(price)}₽`
      }
      else if (targetText.textContent == 1) {
        sum.textContent = `${Number(sum.textContent.replace('₽', '')) - Number(price)}₽`
        item.closest('.cart-body-good').classList.add('deleted')
        setTimeout(e => item.closest('.cart-body-good').style.display = 'none', 300)
      } 
      if (Number(sum.textContent.replace('₽', '')) > 2000) {
        deliveryNum.textContent = '0₽'
        descriptionText.innerHTML = 'Вам полагается бесплатная доставка'
        totalSum.textContent = `${sum.textContent}`
      } else {
        deliveryNum.textContent = '300₽'
        totalSum.textContent = `${Number(sum.textContent.replace('₽', '')) + 300}₽`
        descriptionText.innerHTML = `<div class="body-ordering-content-freeDelivering-description">Доставка в нашем магазине при заказе на сумму от <span class="style"> 2000₽ абсолютно бесплатна!</span>Добавьте товаров еще на <span class="style" id = "how-many">${2000 - Number(sum.textContent.replace('₽', ''))}₽</span> и Вам станет доступна бесплатная доставка.</div >`
      }
    }
  }, false)
})
let selectorInput = document.querySelector('.offering-form-select-selector')
let selectorMenu = document.querySelector('.offering-form-select-menu')
selectorInput.addEventListener('click',e => {
  selectorMenu.classList.toggle('show')
})
selectorMenu.addEventListener('click',e => {
  let content = e.target.textContent
  e.target.textContent = selectorInput.value
  selectorInput.value = content
  selectorMenu.classList.remove('show')
},false)
let bin = document.querySelectorAll('.body-good-content-top-bin').forEach(item => {
  item.addEventListener('click',e => {
    if (Number(sum.textContent.replace('₽','')) - Number(item.closest('.cart-body-good').querySelector('.good-content-bottom-price').dataset.price) * Number(item.closest('.cart-body-good').querySelector('span.count').textContent) > 2000) {      
      sum.textContent = `${Number(sum.textContent) - Number(item.closest('.cart-body-good').querySelector('.good-content-bottom-price').dataset.price) * Number(item.closest('.cart-body-good').querySelector('span.count').textContent)}₽`
      deliveryNum.textContent = `0₽`
      totalSum.textContent = `${Number(sum.textContent.replace('₽', ''))}₽`
      descriptionText.innerHTML = 'Вам полагается бесплатная доставка'
    } else {
      sum.textContent = `${Number(sum.textContent.replace('₽', '')) - Number(item.closest('.cart-body-good').querySelector('.good-content-bottom-price').dataset.price) * Number(item.closest('.cart-body-good').querySelector('span.count').textContent)}₽`
      deliveryNum.textContent = '300₽'
      totalSum.textContent = `${Number(sum.textContent.replace('₽', '')) + 300}₽`  
      descriptionText.innerHTML = `<div class="body-ordering-content-freeDelivering-description">Доставка в нашем магазине при заказе на сумму от <span class="style"> 2000₽ абсолютно бесплатна!</span>Добавьте товаров еще на <span class="style" id = "how-many">${2000 - Number(sum.textContent.replace('₽', ''))}₽</span> и Вам станет доступна бесплатная доставка.</div >`       
    }
    item.closest('.cart-body-good').classList.add('deleted')
    setTimeout(e => item.closest('.cart-body-good').style.display = 'none', 300)
  })
})
const form = document.querySelector('.offering-form')
const submitBtn = document.querySelector('.offering-form-btn-submit')
function checkingForm() {
  let flag
  for (let i = 0; i < form.elements.length; i++) {
    const element = form[i];
    if (element.tagName.toLowerCase() === 'input' && !(element.classList.contains('offering-form-select-selector'))) {
      if (!(element.value === '')) {
        element.nextElementSibling.classList.remove('visible')
      } else if (element.value === '') {
        element.nextElementSibling.classList.add('visible')
      }
    } else {
      continue
    }
    if (i == 11 && Array.from(document.querySelectorAll('.error-message')).every(i => !i.classList.contains('visible'))) {
      flag = true
    } else {
      flag = false
    }
  }
  return flag
}
nextOffer.addEventListener('click',e => {
  aboutGoods.style.display = 'none'
  cart.style.display = 'none'
  orderingForm.style.display = 'block'
  cartTitle.classList.remove('current')
  cartTitle.classList.add('not-current')
  orderingFormTitle.classList.add('current')
  loadContent()
  sumContent()
})
nextSuccessMessage.addEventListener('click',e => {
  if(checkingForm()) {
    orderingForm.style.display = 'none'
    successMessage.style.display = 'block'
    orderingFormTitle.classList.remove('current')
    orderingFormTitle.classList.add('not-current')
    successMessageTitle.classList.add('current')
  }
})
backCart.addEventListener('click',e => {
  aboutGoods.style.display = 'block'
  cart.style.display = 'block'
  orderingForm.style.display = 'none'
  cartTitle.classList.add('current')
  cartTitle.classList.remove('not-current')
  orderingFormTitle.classList.add('not-current')
  orderingFormTitle.classList.remove('current')
})
backOffer.addEventListener('click',e => {
  successMessage.style.display = 'none'
  orderingForm.style.display = 'block'
  successMessageTitle.classList.remove('current')
  successMessageTitle.classList.add('not-current')
  orderingFormTitle.classList.add('current')
  orderingFormTitle.classList.remove('not-current')
})
function loadContent() {
  let price = document.querySelector('.frame-list-total-price')
  document.querySelectorAll('.frame-list-good.real-good').forEach((item,index) => {
    document.querySelectorAll('.cart-body-good').forEach((previousItem, previousIndex) => {
      if(index === previousIndex) {      
        item.querySelector('.list-good-content-price').textContent = previousItem.querySelector('.good-content-bottom-price').textContent
      }
    })
  })
}
function sumContent() {
  let deliveryPrice = document.querySelector('.frame-list-good.delivery .list-good-content-price');
  let totalSum = document.querySelector('.frame-list-total-price')
  const delivery = document.querySelector('.frame-list-good.delivery')
  let sum = 0
  let price = document.querySelector('.frame-list-total-price')
  document.querySelectorAll('.frame-list-good.real-good').forEach((item, index) => {
    sum += Number(item.querySelector('.list-good-content-price').textContent.replace('₽', ''))
  })
  if(sum > 2000) {
    delivery.style.display = 'none'
    deliveryPrice.textContent = '0'
  } else {
    deliveryPrice.textContent = '300₽'  
  }
  totalSum.textContent = sum + Number(deliveryPrice.textContent.replace('₽', '')) + '₽'  
}