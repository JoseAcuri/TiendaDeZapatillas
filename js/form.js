const checkoutBtn = document.getElementById("checkout-btn");


checkoutBtn.addEventListener("click", function (event) {
    event.preventDefault(); 

   
    
    Swal.fire({
        title: '¿Desea finalizar la compra?',
        text: 'Esto procesará su pedido y realizará la compra.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '<i class="fas fa-check"></i> Sí, finalizar compra',
        cancelButtonText: '<i class="fas fa-times"></i> Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            

           
            const form = document.getElementById("myForm");
            form.reset();

            
            modalContainer.innerHTML = " ";
            modalContainer.style.display = "flex";
            const modalHeader = document.createElement("div");
            modalHeader.className = "modal-header";
            modalHeader.innerHTML = `
                <h3 class="modal-header-title">COMPRA EXITOSA <i class="fas fa-check-circle"></i></h3>
            `;

            modalContainer.append(modalHeader);

            const modalButton = document.createElement("h3");
            modalButton.innerHTML = 'CERRAR <i class="fas fa-times"></i>';
            modalButton.className = "modal-header-button";

            modalHeader.append(modalButton);

            modalButton.addEventListener("click", () => {
                modalContainer.style.display = "none"
            });

            
            const mensajeCompraExitosa = document.createElement("p");
            mensajeCompraExitosa.innerHTML = "Gracias por su compra. Su pedido ha sido procesado con éxito.";
            mensajeCompraExitosa.className = "mensaje-compra-exitosa";
            modalContainer.append(mensajeCompraExitosa);

            Swal.fire({
                icon: 'success',
                title: '¡Compra finalizada!',
                text: 'Su pedido ha sido procesado.',
            });
        }
    });
});