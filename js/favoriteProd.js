// Obtener la tabla de productos
const tablaProductos = document.querySelector('.table');
const tableElement = document.querySelector('tbody');
/*const favoriteProduc = JSON.parse(localStorage.getItem('favoriteProducs')) || []*/
let arrFavoriteProducts = JSON.parse(localStorage.getItem('favoriteProducts')) || [];

// Función para mostrar los productos favoritos en la tabla
function listFavoriteProduc() {
  // Limpiar la tabla antes de mostrar los productos
  tableElement.innerHTML = '';
  arrFavoriteProducts.forEach(element => {
    tableElement.innerHTML += `
            <tr class="table_item">
            <th class="code">${element.code}</th>
                <td class="title">${element.name}</td>
                <td class="table__productos mx-auto"><img src="${element.imgUrl}" alt="${element.name}"></td>    
                <td class="table__price"><p>$${element.price}</p></td>
                <td class="table__cantidad"><button class="delete btn btn-danger" onclick= "deleteFavorite('${element.code}')" >Quitar de Favoritos</button>
                </td>
            </tr>
        `;
  });
}

// Calcular y mostrar el total
const total = arrFavoriteProducts.reduce((acc, element) => acc + parseFloat(element.price.replace('$', '').replace(',', '')), 0);
document.querySelector('.itemCartTotal').textContent = `Total: $${total.toFixed(2)}`;

// Función para quitar un producto de favoritos
window.deleteFavorite = function (code) {
  Swal.fire({
    title: "¿Estas seguro?",
    text: "Los cambios no se podrán revertir",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      let newFavoriteProducts = arrFavoriteProducts.filter((element) => element.code !== code);
      arrFavoriteProducts = newFavoriteProducts;
      Swal.fire({
        title: "Exito",
        text: "El producto se elimino correctamente",
        icon: "success",
      });
      localStorage.setItem('favoriteProducts', JSON.stringify(arrFavoriteProducts));
      listFavoriteProduc();
      location.reload();
    }
  });
}
listFavoriteProduc();