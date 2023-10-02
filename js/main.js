let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let verCarrito = document.getElementById("carrito-barra");

let modalContainer = document.getElementById("modal-container");

const contenedor = document.getElementById("container");
contenedor.className = "container";

let contadorCarrito = document.getElementById("contadorCarrito");

// Recorro el array (stockZapatillas) y usando el DOM creo las cards de mis productos
stockZapatillas.forEach((prod) => {
    let div = document.createElement("div");
    div.classList.add("productos");
    div.innerHTML = `
    <img src="${prod.img}" alt="${prod.marca}" width="250px">
    <hr>
    <p>${prod.marca}</p>
    <b>$${prod.precio}</b>
    <br>
    <button id="boton${prod.id}" class="productos-button">AÑADIR AL CARRITO</button>
    `;

    contenedor.appendChild(div);

    let boton = document.getElementById(`boton${prod.id}`);

    // Veo si el producto existe en el carrito (y agrego cantidad deseada), de lo contrario lo agrego

    boton.addEventListener("click", () => {
        const repeat = carrito.some(
            (repeatProduct) => repeatProduct.id === prod.id
        );

        Swal.fire("LISTO!", "El producto se agregó correctamente!", "success");

        if (repeat == true) {
            carrito.map((product) => {
                if (product.id === prod.id) {
                    product.cantidad++;
                }
            });
        } else {
            carrito.push({
                id: prod.id,
                marca: prod.marca,
                precio: prod.precio,
                img: prod.img,
                cantidad: prod.cantidad,
            });
        };

        carritoContador();
        guardarLocalStorage();
    });
});

// UTILIZO localStorage

const guardarLocalStorage = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};
