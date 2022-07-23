let shoppingCart = document.getElementById('shopping-cart');
let label = document.getElementById('label');
let basket = JSON.parse(localStorage.getItem('data')) || [];

let calculate = () =>{
    let cartIcon = document.getElementById("cartAmount");

    cartIcon.innerHTML = basket.map((x) => x.Itme).reduce((x,y) => x + y, 0);
}
calculate()

let generetCartitems = () => {
    if(basket.length !== 0){
        return (shoppingCart.innerHTML = basket.map((x) => {
            let {id, Itme} = x;
            let search = shopItemData.find((x) => x.id === id) || [];
            let {img, name, price} = search;
            return `
                <div class="cart-item">
                    <img width="100px" src=${img} alt="" />
               
                    <div class="details">
                        <div class="title-price-x">
                            <h4 class="title-price">
                                <p>${name}</p>
                                <p class="cart-item-price">$ ${price}</p>
                            </h4>
                            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                        </div>
                        <div class="cart-buttons">
                            <div class="buttons">
                                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                                <div id=${id} class="quantity">${Itme}</div>
                                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                            </div>
                        </div>

                        <h3>$ ${Itme * price}</h3>
                    </div>
                </div>
            `
        }).join(""))
    }else{
        shoppingCart.innerHTML = '';
        label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href="index.html">
                <button class="homeBtn">Back to Hme</button>
            </a>
        `
    }
}
generetCartitems();


let increment = (id) =>{
    let selectItem = id;
    let search = basket.find((x) => x.id === selectItem.id);

    if(search === undefined){
        basket.push({
            id: selectItem.id,
            Itme: 1
        });
    }else{
        search.Itme += 1;
    }
    generetCartitems();
    update(selectItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
}

let decrement = (id) =>{
    let selectItem = id;
    let search = basket.find((x) => x.id === selectItem.id);

    if(search === undefined) return ;
    else if(search.Itme === 0) return;
    else{
        search.Itme -= 1;
    }

    update(selectItem.id);
    basket = basket.filter((x) => x.Itme !== 0);
    generetCartitems();
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) =>{
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.Itme;

    calculate()
    totalAmount()
};

let removeItem = (id) => {
    let selectItem = id;
    basket = basket.filter((x) => x.id !== selectItem.id);
    calculate()
    generetCartitems();
    totalAmount()
    localStorage.setItem("data", JSON.stringify(basket));
}



let totalAmount = () => {
    if(basket.length !== 0){

        let amount = basket.map((x) => {
            let {id, Itme} = x;
            let filterData = shopItemData.find((x) => x.id === id);
            return filterData.price * Itme
        }).reduce((x,y) => x + y, 0);


        return label.innerHTML = `
            <h2> Total Bill $ ${amount} </h2>;
            <button class="checkout">Checkout</button>
            <button onclick="clearCart()" class="removeall">Clear Cut</button>
        `
    }else return;
}
totalAmount()

let clearCart = () => {
    basket = [];
    generetCartitems();
    calculate()
    localStorage.setItem("data", JSON.stringify(basket));

}