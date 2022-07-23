let shop = document.getElementById('shop');

let basket = JSON.parse(localStorage.getItem('data')) || [];

let generateShop = () =>{
    return (shop.innerHTML = shopItemData.map((x) => {
        let {id, name, img, desc, price} = x;
        let search = basket.find((y) => y.id === id) || [];
        return `
            <div id=product-id-${id} class="item">
            <img width="220px" src=${img} alt="sakin">

            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>${price}</h2>
                    <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">${search.Itme === undefined ? 0 : search.Itme}</div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>
    `
    }).join(""));
}
generateShop()

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
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) =>{
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.Itme;

    calculate()
};


let calculate = () =>{
    let cartIcon = document.getElementById("cartAmount");

    cartIcon.innerHTML = basket.map((x) => x.Itme).reduce((x,y) => x + y, 0);
}
calculate()
