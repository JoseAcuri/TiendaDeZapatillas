// Veo los productos agregados en el carrito y creo un modal

const pintarCarrito = () => {
    modalContainer.innerHTML = " ";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
    <h3 class="modal-header-title">CARRITO</h3>
    `;

    modalContainer.append(modalHeader);

    const modalButton = document.createElement("h3");
    modalButton.innerHTML = "CERRAR";
    modalButton.className = "modal-header-button";

    modalHeader.append(modalButton);

    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none"
    });

    carrito.forEach((prod) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
        <img class="modal-content-img" src="${prod.img}" width="200px">
        <h3 class="modal-content-title">${prod.marca}</h3>
        <b class="modal-content-precio">$${prod.precio}</b>
        <span class="sumar">+</span>
        <b class="moda-content-cantidad">Cantidad: ${prod.cantidad}</b>
        <span class="restar">-</span>
        <b class="modal-content-subtotal">Total: $${prod.cantidad * prod.precio}</b>
        <p class="eliminar-producto"><i class="fa-solid fa-trash-can"></i></p>
        `;

        modalContainer.append(carritoContent);

        let sumar = carritoContent.querySelector(".sumar");

        sumar.addEventListener("click", () => {
            prod.cantidad++;
            guardarLocalStorage();
            pintarCarrito();
        });

        let restar = carritoContent.querySelector(".restar");

        restar.addEventListener("click", () => {
            if (prod.cantidad !== 1) {
                prod.cantidad--;
            }
            guardarLocalStorage();
            pintarCarrito();
        });

        let eliminarProducto = carritoContent.querySelector(".eliminar-producto");

        eliminarProducto.addEventListener("click", () => {
            borrarProducto(prod.id);
        });
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalCompra = document.createElement("div");
    totalCompra.className = "modal-total";
    totalCompra.innerHTML = `
    <h3>TOTAL A PAGAR: $${total}</h3>
    `;
    modalContainer.append(totalCompra);
};

verCarrito.addEventListener("click", pintarCarrito);

// Elimino los productos que agregue al carrito

const borrarProducto = (id) => {
    const encontrarId = carrito.find((element) => element.id === id);
    Swal.fire(
        'ATENCIÓN!',
        'El producto se eliminó del carrito!',
        'warning'
    );

    carrito = carrito.filter((carritoId) => {
        return carritoId !== encontrarId;
    });

    carritoContador();
    guardarLocalStorage();
    pintarCarrito();
};

const carritoContador = () => {
    contadorCarrito.style.display = "block";

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    contadorCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
}

carritoContador();
const finalizarCompraButton = document.getElementById("finalizarCompra");

finalizarCompraButton.addEventListener("click", () => {
    // Aquí puedes agregar el código para finalizar la compra
    // Puedes utilizar SweetAlert2 u otra forma de confirmación
    // antes de realizar la compra.

    Swal.fire({
        title: '¿Desea finalizar la compra?',
        text: 'Esto procesará su pedido y realizará la compra.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, finalizar compra',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Lógica para finalizar la compra

            // Puedes vaciar el carrito para que vuelva a cero
            carrito = [];
            
            // También debes actualizar el contador y el localStorage
            carritoContador();
            guardarLocalStorage();
            
            Swal.fire('¡Compra finalizada!', 'Su pedido ha sido procesado.', 'success');
        }
    });
});



