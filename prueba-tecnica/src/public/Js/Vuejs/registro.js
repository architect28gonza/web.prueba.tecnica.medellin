

var app = new Vue({
    el: '#appPrincipal',
    data() {
        return {
            opcionRegistro: true,
            usuario: {
                cedula: 0,
                nombre: "",
                apellidos: "",
                telefono: "",
                direccion: "",
                ciudad: "",
                username: "",
                password: ""
            },
            tarjeta: {
                numero_tarjeta: 0,
                nombre_tarjeta: "",
                expedida: "",
                vencimiento: "",
                expedidor: "",
                cedula: ""
            }
        };
    },
    methods: {
        registroUsuario: function () {
            let verificacion = document.getElementById('verificar').value;
            if (this.usuario.password === verificacion) {
                axios.post('/oauth/agregar', this.usuario).then(responseServer => {
                    this.opcionRegistro = false;
                });
            } else {
                alert("Las contraseñasno son iguales, VVerifique nuevamente");
            }
        },
        cambiarTamanioCajaTarjeta: function () {
            document.getElementById('container').style.minHeight = 400+"px";
            this.opcionRegistro = false;
        },
        registroTarjeta: function () {
            this.tarjeta.expedida += " 00:00:00";
            this.tarjeta.vencimiento += " 00:00:00";
            this.tarjeta.cedula = this.usuario.cedula;
            axios.post('/oauth/tarjeta', this.tarjeta).then(responseerver => {
               window.location.href = "/oauth/login";
            });
        }
    }
});