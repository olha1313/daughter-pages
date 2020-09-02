function showPrice() {
    const type = document.getElementById('type-annually');
    const priceAdvanced = document.getElementById('price-advanced');
    const priceStandard = document.getElementById('price-standard');
    const paymentFrequency = document.getElementsByClassName('payment-frequency');
    const paymentFrequencyArray = Array.from(paymentFrequency);
    const planSale = document.getElementsByClassName('plan-sale');
    const planSaleArray = Array.from(planSale);


    if (type.checked) {
        priceAdvanced.innerHTML = 350;
        priceStandard.innerHTML = 90;
        paymentFrequencyArray.map(el => el.innerHTML = '/y');
        planSaleArray.map(el => el.style.visibility='visible');
    } else {
        priceAdvanced.innerHTML = 35;
        priceStandard.innerHTML = 9;
        paymentFrequencyArray.map(el => el.innerHTML = '/m');
        planSaleArray.map(el => el.style.visibility='hidden');
    }
}

const radios = document.forms['select-plan'].elements['type-of-plan'];

for (radio in radios) {
    radios[radio].onclick = showPrice;
}
