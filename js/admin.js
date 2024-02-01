import {
    validateInputReq,
    validateInputPrice,
    validateInputCategory,
    validateInputUrl,
    validateInputDescription,
    validateInputStock,
    validateAll
  } from "./hellpers.js";
  
let arrayProducts = JSON.parse(localStorage.getItem("products")) || [];
let bodyTabla = document.querySelector("tbody");
let inputCode = document.getElementById("code");
let inputName = document.getElementById("name");
let inputPrice = document.getElementById("price");
let inputCategory = document.getElementById("category");
let inputImgUrl = document.getElementById("imgUrl");
let inputDescription = document.getElementById("description");
let inputStock = document.getElementById("stock");

let form = document.getElementById('formProducts');

inputCode.value = setCode();

form.addEventListener("submit", saveProduct);

inputCode.addEventListener("blur", () => {
validateInputReq(inputCode);
});

inputName.addEventListener("blur", () => {
validateInputReq(inputName);
});

inputDescription.addEventListener("blur", () => {
validateInputDescription(inputDescription);
});

inputDescription.addEventListener("blur", () => {
validateInputCategory(inputCategory);
});

inputDescription.addEventListener("blur", () => {
validateInputStock(inputStock);
});

inputPrice.addEventListener("blur", () => {
validateInputPrice(inputPrice);
});

inputImgUrl.addEventListener("blur", () => {
validateInputUrl(inputImgUrl);
});

listProducts();

let isEdition = false;

function saveProduct(e) {
    e.preventDefault();
    if (
        validateAll(
        inputCode,
        inputName,
        inputDescription,
        inputCategory,
        inputStock,
        inputPrice,
        inputImgUrl
        )
    ) {
      if (isEdition) {
        saveProductEdited();
      } else {
        CreateProduct();
      }
    } else {
      Swal.fire({
        title: "Ups",
        text: "Todos los campos son requeridos.",
        icon: "error",
      });
    }
  }

function CreateProduct() {
    console.log('Entró en guardar producto');
    const newProduct = {
        code: inputCode.value,
        name: inputName.value,
        description: inputDescription.value,
        category: inputCategory.value,
        stock: inputStock.value,
        price: inputPrice.value,
        imgUrl: inputImgUrl.value,
    };

    arrayProducts.push(newProduct);
    Swal.fire({
        title: "Éxito",
        text: "El producto se guardó correctamente",
        icon: "success",
    });
    cleanForm();
    listProducts();
}

function saveProductEdited() {
  let indexProduct = arrayProducts.findIndex((element) => {
    return element.code === inputCode.value;
  });

  if (indexProduct !== -1) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Vas a cambiar los datos de un producto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        arrayProducts[indexProduct].code = inputCode.value;
        arrayProducts[indexProduct].name = inputName.value;
        arrayProducts[indexProduct].description = inputDescription.value;
        arrayProducts[indexProduct].category= inputCategory.value;
        arrayProducts[indexProduct].price = inputPrice.value;
        arrayProducts[indexProduct].imgUrl = inputImgUrl.value;
        isEdition = false;
        Swal.fire({
          title: "Exito",
          text: "El producto se actualizo correctamente",
          icon: "success",
        });

        cleanForm();
        listProducts();
      } else {
        isEdition = false;
        cleanForm();
      }
    });
  } else {
    console.log(
      "Entró en el else de guardar producto editado porque el code no existe"
    );
  }
}

window.cleanForm = function () {
    form.reset();
    inputCode.className = "form-control";
    inputCode.value = setCode();
    inputName.className = "form-control";
    inputDescription.className = "form-control";
    inputCategory.className = "form-control";
    inputStock.className = "form-control";
    inputPrice.className = "form-control";
    inputImgUrl.className = "form-control";
    saveLocalStorage();
};

function saveLocalStorage() {
    localStorage.setItem("products", JSON.stringify(arrayProducts));
}

function listProducts() {
    bodyTabla.innerHTML = "";
    arrayProducts.forEach((element) => {
        bodyTabla.innerHTML += ` <tr>                  
            <th scope="row">${element.code}</th>
            <td>${element.name}</td>
            <td>${element.description}</td>
            <td>${element.category}</td>
            <td>${element.stock}</td>
            <td>$ ${element.price}</td>
            <td><a href="${element.imgUrl}" target="_blank" title="Ver Imagen">${element.imgUrl}</a></td>
            <td class="">
            <div class="d-flex">
            <a href='#titulo' class="btn btn-warning mx-1" onclick="prepareEdition('${element.code}')">Editar</a>
            <button type="button" class="btn btn-danger mx-1" onclick="deleteProduct('${element.code}')" >Eliminar</button>
            </div>
            </td>                
        </tr>`;
    });
}

window.prepareEdition = function (code) {
  const productToEdit = arrayProducts.find((element) => {
    return element.code === code;
  });
  if (productToEdit !== undefined) {
    inputCode.value = productToEdit.code;
    inputName.value = productToEdit.name;
    inputDescription.value = productToEdit.description;
    inputStock.value = productToEdit.stock;
    inputCategory.value = productToEdit.category;
    inputPrice.value = productToEdit.price;
    inputImgUrl.value = productToEdit.imgUrl;
  }
  isEdition = true;
};

window.deleteProduct = function (code) {
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
      const newArrayProducts = arrayProducts.filter(
        (element) => element.code !== code
      );
      arrayProducts = newArrayProducts;
      Swal.fire({
        title: "Éxito",
        text: "El producto se eliminó correctamente",
        icon: "success",
      });
      saveLocalStorage();
      listProducts();
    }
  });
};
function setCode() {
  let code;
  let codesList = arrayProducts.map((element) => element.code);

  do {
      code = Math.floor(0 + Math.random() * 10000);
  } while (codesList.includes(code));
  
  return code;
}
