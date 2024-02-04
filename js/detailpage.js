const arrFavoriteProducts = JSON.parse(localStorage.getItem('favoriteProducts')) || [];
const arrayProducts = JSON.parse(localStorage.getItem("products")) || [];

let title = document.getElementById('title');
let category = document.getElementById('category');
let image = document.getElementById('image');
let price = document.getElementById('price');
let description = document.getElementById('description');
let stock = document.getElementById('stock');
let addFavorite = document.getElementById('addFavorite');
let code = document.getElementById('code');


let productId = new URLSearchParams(window.location.search).get('codigo');

function detailPage() {
    const prodSelec = arrayProducts.filter((element) => {
        return element.code == productId
    })[0]

    if (!prodSelec) {
        window.location.href = "/index.html"
    }
    title.innerText = prodSelec.name;
    category.innerText = "CATEGORIA: " + prodSelec.category;
    image.src = prodSelec.imgUrl;
    price.innerText = "$" + prodSelec.price;
    description.innerText = prodSelec.description;
    stock.innerText = "STOCK: " + prodSelec.stock;
    code.innerText = "CODIGO: " + prodSelec.code;
}

detailPage();


window.enabledBtnFav = function() {
    const sesionCheck = JSON.parse(sessionStorage.getItem('userSesion'));
    const favoriteProduct = arrayProducts.find((element) => {
        return element.code === productId;
    })
    if (sesionCheck !== null) {
        if(arrFavoriteProducts.some(product => product.code === favoriteProduct.code)){
            Swal.fire({
                confirmButtonColor: "#ff5e00",
                title: "Ups!!!",
                text: "Este producto ya esta en tu lista de favoritos",
                icon: "info"
            });
        }
        else{
            let icono = document.createElement("i")
            icono.className="fa-solid fa-check";
            addFavorite.appendChild(icono);
            arrFavoriteProducts.push(favoriteProduct);
            localStorage.setItem('favoriteProducts', JSON.stringify(arrFavoriteProducts));
        }
    }
    else{
        Swal.fire({
            confirmButtonColor: "#ff5e00",
            title: "Ups!!!",
            text: "Para añadir productos a favoritos debes iniciar sesion!!",
            icon: "info"
        });
    }
}