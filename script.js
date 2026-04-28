document.addEventListener('DOMContentLoaded', () => {
    let modoRegistro = false;
    const msgDisplay = document.getElementById('msg-usuario');

    // Función para cambiar entre Login y Registro
    window.toggleMode = function() {
        modoRegistro = !modoRegistro;
        const titulo = document.getElementById('auth-title');
        const boton = document.getElementById('btn-text');
        const toggleLink = document.getElementById('toggle-msg');
        
        msgDisplay.innerText = ""; // Limpiamos mensajes al cambiar

        if (modoRegistro) {
            titulo.innerText = "Crear Cuenta";
            boton.innerText = "Registrarse";
            toggleLink.innerHTML = '¿Ya tienes cuenta? <span onclick="toggleMode()">Inicia Sesión</span>';
        } else {
            titulo.innerText = "Iniciar Sesión";
            boton.innerText = "Entrar";
            toggleLink.innerHTML = '¿No tienes cuenta? <span onclick="toggleMode()">Regístrate aquí</span>';
        }
    };

    // Lógica del Formulario
    document.getElementById('auth-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const usuario = document.getElementById('user').value;
        const clave = document.getElementById('pass').value;

        if (modoRegistro) {
            // REGISTRO
            const datos = { user: usuario, pass: clave };
            localStorage.setItem('aluli_user', JSON.stringify(datos));
            
            msgDisplay.innerText = "¡Usuario registrado con éxito!";
            msgDisplay.className = "mensaje-dinamico msg-exito";
            
            setTimeout(() => toggleMode(), 1500); // Cambia a login automáticamente
        } else {
            // LOGIN
            const guardado = JSON.parse(localStorage.getItem('aluli_user'));
            
            if (guardado && guardado.user === usuario && guardado.pass === clave) {
                msgDisplay.innerText = "¡Bienvenido! Entrando...";
                msgDisplay.className = "mensaje-dinamico msg-exito";
                
                setTimeout(() => {
                    window.location.href = "https://alulishop.github.io/aluli-shop/";
                }, 800);
            } else {
                msgDisplay.innerText = "Datos incorrectos o no registrado";
                msgDisplay.className = "mensaje-dinamico msg-error";
            }
        }
    });
});