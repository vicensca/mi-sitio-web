// Espera a que el HTML esté completamente cargado antes de buscar elementos del DOM
document.addEventListener("DOMContentLoaded", () => {

    // --- MENÚ DE NAVEGACIÓN MÓVIL ---
    const menuBtn = document.getElementById("menu");
    const nav = document.querySelector("nav");

    if (menuBtn && nav) {
        menuBtn.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("open");
            menuBtn.setAttribute("aria-expanded", String(isOpen));
        });
    }

    // --- CARRUSEL DE PROMOCIONES ---
    const slides = document.querySelectorAll(".promo-slide");
    if (slides.length > 0) {
        let indexActual = 0;
        const intervalo = 4000;

        setInterval(() => {
            slides[indexActual].classList.remove("activa");
            indexActual = (indexActual + 1) % slides.length;
            slides[indexActual].classList.add("activa");
        }, intervalo);
    }

    // --- FILTRO DE CATEGORÍAS EN PRODUCTOS ---
    const botonesFiltro = document.querySelectorAll("button[data-f]");
    const tarjetasProducto = document.querySelectorAll(".grid .card[data-c]");

    if (botonesFiltro.length > 0 && tarjetasProducto.length > 0) {
        botonesFiltro.forEach((boton) => {
            boton.addEventListener("click", () => {
                const filtro = boton.dataset.f;

                // Actualiza cuál botón está marcado como activo
                botonesFiltro.forEach((b) => b.classList.remove("activo"));
                boton.classList.add("activo");

                // Muestra u oculta cada tarjeta según coincida con la categoría elegida
                tarjetasProducto.forEach((tarjeta) => {
                    const categoria = tarjeta.dataset.c;
                    const coincide = filtro === "todos" || categoria === filtro;
                    tarjeta.style.display = coincide ? "" : "none";
                });
            });
        });
    }

    // --- PAGINACIÓN / BOTÓN "VER MÁS" EN GALERÍA ---
    const gridGaleria = document.querySelector("main .grid");
    const itemsGaleria = gridGaleria ? gridGaleria.querySelectorAll(".g") : [];
    const btnVerMas = document.getElementById("ver-mas-galeria");

    if (gridGaleria && itemsGaleria.length > 3 && btnVerMas) {
        let visibles = 3;

        const actualizarVisibilidad = () => {
            itemsGaleria.forEach((item, idx) => {
                item.classList.toggle("visible", idx < visibles);
            });

            btnVerMas.textContent = visibles >= itemsGaleria.length
                ? "Mostrar menos"
                : "Ver más elementos";
        };

        // Aplica el estado inicial (primeros 3 elementos visibles)
        actualizarVisibilidad();

        btnVerMas.addEventListener("click", () => {
            if (visibles < itemsGaleria.length) {
                visibles = Math.min(visibles + 3, itemsGaleria.length);
            } else {
                visibles = 3;
            }
            actualizarVisibilidad();
        });
    }

    // --- VALIDACIÓN Y ENVÍO DE FORMULARIO DE CONTACTO ---
    const formContacto = document.querySelector("main form");
    const estadoEnvio = document.getElementById("ok");

    if (formContacto) {
        const campos = formContacto.querySelectorAll("input, textarea");

        const validarCampo = (campo) => {
            const valor = campo.value.trim();

            if (campo.hasAttribute("required") && valor === "") {
                campo.setCustomValidity("Este campo es obligatorio.");
            } else if (campo.hasAttribute("minlength") && valor.length < Number(campo.getAttribute("minlength"))) {
                const min = campo.getAttribute("minlength");
                campo.setCustomValidity(`Ingresá al menos ${min} caracteres.`);
            } else if (campo.type === "email" && campo.validity.typeMismatch) {
                campo.setCustomValidity("Ingresá un correo electrónico válido.");
            } else {
                campo.setCustomValidity("");
            }

            return campo.checkValidity();
        };

        campos.forEach((campo) => {
            campo.addEventListener("input", () => {
                validarCampo(campo);
                if (estadoEnvio) {
                    estadoEnvio.textContent = "";
                }
            });

            campo.addEventListener("blur", () => {
                validarCampo(campo);
            });
        });

        formContacto.addEventListener("submit", (e) => {
            e.preventDefault();

            let todoValido = true;
            campos.forEach((campo) => {
                if (!validarCampo(campo)) {
                    todoValido = false;
                }
            });

            if (!todoValido) {
                const primerInvalido = formContacto.querySelector(":invalid");
                if (primerInvalido) {
                    primerInvalido.focus();
                    primerInvalido.reportValidity();
                }
                if (estadoEnvio) {
                    estadoEnvio.textContent = "Revisá los campos marcados antes de enviar.";
                }
                return;
            }

            if (estadoEnvio) {
                estadoEnvio.textContent = "¡Consulta enviada! Te responderemos a la brevedad.";
            }
            formContacto.reset();
        });
    }
   
    // --- AUTO-ESTIRAMIENTO DEL TEXTAREA ---
    const textarea = document.querySelector("textarea");

    if (textarea) {
        textarea.addEventListener("input", function () {
            this.style.height = "auto"; // Resetea el alto para que también se encoja al borrar
            this.style.height = this.scrollHeight + "px"; // Ajusta al alto exacto del contenido
        });
    }
});


