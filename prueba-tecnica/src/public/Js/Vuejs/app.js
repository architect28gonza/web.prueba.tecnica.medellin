
Vue.component('consulta_vuelos', {
    template: `
        <div>
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="card" style="width: 18rem;">
                            <div class="card-header p-0">
                                <img class="img-fluid" src="/Img/hora.png" style="height: 185px" alt="Card image cap">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Consulta por Hora</h5>
                                <p class="card-text">Esta opcion le permitira consultar los vuelos por hora </p>
                                <button v-on:click="opcionConsulta = 1" class="btn btn-outline-dark btn-block">Consultar por hora</button>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card" style="width: 18rem;">
                            <div class="card-header p-0">
                                <img class="img-fluid" src="/Img/tarifa.png" style="height: 185px" alt="Card image cap">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Consulta por tarifa de vuelo</h5>
                                <p class="card-text">Esta opcion le permitira consultar los vuelos por tarifa </p>
                                <button v-on:click="opcionConsulta = 2" class="btn btn-outline-dark btn-block">Consultar por tarifa</button>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card" style="width: 18rem;">
                            <div class="card-header p-0">
                                <img class="img-fluid" src="/Img/estadoVuelo.png" style="height: 185px" alt="Card image cap">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Estado de vuelos</h5>
                                <p class="card-text">Haga click en <b>Ver estados</b> para realizar una reserva </p>
                                <a href="#" v-on:click="opcionConsulta = 3" class="btn btn-outline-dark btn-block">Ver estados</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div style="overflow-x: scroll;" class="card mt-5 w-100">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-2">
                                <img src="/Img/avatar.png" class="img-fluid" style="height: 100px" alt="">    
                            </div>
                            
                            <div v-if="opcionConsulta === 1">
                                    <div class="col">
                                        <label for="horario">* Digite la hora para consultar su horario</label>
                                        <input type="time" v-model="hora" id="horario" class="form-control">
                                    </div>
                                    <div class="col" style="margin-top: 10px">
                                        <button v-on:click="buscar(1)" class="btn btn-outline-success">Buscar Hora</button>
                                    </div>
                            </div>
                            <div v-if="opcionConsulta === 2">
                                <div class="col">
                                    <label for="tarifa">* Digite la tarifa: </label>
                                    <input type="number" v-model="tarifa" id="tarifa" class="form-control">
                                </div>
                                <div class="col" style="margin-top: 10px">
                                    <button v-on:click="buscar(2)" class="btn btn-outline-success">Buscar tarifa</button>
                                </div>
                            </div>
                            
                            <div v-if="opcionConsulta === 3">
                                <div class="col">
                                    <label for="estado">* Escoja la opcion de estado: </label>
                                    <select v-model="estado" class="form-control">
                                        <option value="confirmado">Confirmado</option>
                                        <option value="cancelado">Cancelado</option>
                                        <option value="retrasado">Retrasado</option>
                                        <option value="otros">Otros</option>
                                        
                                    </select>
                                </div>
                                <div class="col" style="margin-top: 10px">
                                    <button v-on:click="buscar(3)" class="btn btn-outline-success">Buscar estados</button>
                                </div>
                            </div>
                            
                        </div>
                        <hr />
                    </div>
                    <table class="table table-hover table-striped">
                            <thead>
                                <th>nombre_aeropuerto</th>
                                <th>ciudad_origen</th>
                                <th>nombre_aeropuerto</th>
                                <th>ciudad_destino</th>
                                <th>dia_salida</th>
                                <th>hora_salida</th>
                                <th>dia_llegada</th>
                                <th>hora_llegada</th>
                                <th>ID_tarifa</th>
                                <th>clase_tarifa</th>
                                <th>precio</th> 
                                <th>estado</th>
                                <th>fecha_vuelo</th>
                            </thead>
                            <tbody>
                                  <tr v-for="item in lista" :key="item.precio">
                                     <th>{{item.nombre_aeropuerto}}</th>
                                     <th>{{item.ciudad_origen}}</th>
                                     <th>{{item.nombre_aeropuerto}}</th>
                                     <th>{{item.ciudad_destino}}</th>
                                     <th>{{item.dia_salida}}</th>
                                     <th>{{item.hora_salida}}</th>
                                     <th>{{item.dia_llegada}}</th>
                                     <th>{{item.hora_llegada}}</th>
                                     <th>{{item.ID_tarifa}}</th>
                                     <th>{{item.clase_tarifa}}</th>
                                     <th>{{item.precio}}</th> 
                                     <th>{{item.estado}}</th>
                                     <th>{{item.fecha_vuelo}}</th>
                                  </tr>                     
                            </tbody>
                    </table>                    
                </div>
            </div>
        </div>    
    `,
    data() {
        return {
            lista:[],
            opcionConsulta: 0,
            hora: "",
            tarifa: "",
            estado: ""
        };
    },
    methods: {
        buscar: function (entrada) {

            let json = {};
            switch (parseInt(entrada)){
                case 1:
                    json = {
                        "hora": this.hora,
                        "consulta": "hora"
                    };
                    break;
                case 2:
                    json = {
                        "tarifa": this.tarifa,
                        "consulta": "tarifa"
                    };
                    break;
                case 3:
                    json = {
                        "estado": this.estado,
                        "consulta": "estado"
                    };
                    break
            }
            axios.post('/vuelo/consulta', json).then(response => {
               console.log(response);
                if (response.data.data.length > 0) {
                   this.lista = response.data.data;
               }
            });
        }
    }
});

Vue.component('realizar_reserva', {
    props:['cedula','nombre', 'apellido'],
    template: `
        <div class="d-flex">
            <div class="col-sm-7">
                <div class="card">
                    <div class="card-header">      
                        <span class="h4">REALIZAR RESERVACION</span>
                    </div>
                    <div class="card-body">
                        
                        <div class="row">
                            <div class="col">
                                <label for="origen"><b>* Lugar de origen</b></label>
                                <input type="text" v-model="origen" v-on:keyup="cargarOrigen" class="form-control" placeholder="Lugar de origen" 
                                autocomplete="off" >                            
                            </div>
                            <div class="col">
                                <label for="destino"><b>* Lugar de destino</b></label>
                                <input type="text" v-model="destino" v-on:keyup="cargarDestino" class="form-control" placeholder="Lugar de destino" 
                                autocomplete="off" >                            
                            </div>
                            <div class="col">
                                <label for="fecha"><b>* Fecha de vuelo</b></label>
                                <input type="date" v-model="fecha_vuelo" class="form-control">                            
                            </div>
                        </div>
                        <hr />
                        <h4>Reservacion de Vuelo</h4>
                        <div class="row">
                            <div class="col">
                                <label><b>* Horario - Dia</b></label>
                                <select v-model="dia_salida" class="form-control">
                                    <option value="lunes">Lunes</option>
                                    <option value="martes">Martes</option>
                                    <option value="miercoles">Miercoles</option>
                                    <option value="jueves">Jueves</option>
                                    <option value="viernes">Viernes</option>
                                    <option value="sabado">Sabado</option>
                                    <option value="domingo">Domingo</option>
                                </select>
                            </div>
                            <div class="col">
                                <label><b>* Horario - Hora</b></label>
                                <input type="time" v-model="hora_salida" class="form-control">
                            </div>
                            <div class="col">
                                <label><b>* Estado de Vuelo</b></label>
                                <select v-model="estado" class="form-control">
                                    <option value="confirmado">Confirmado</option>
                                    <option value="cancelado">Cancelado</option>
                                    <option value="retrasado">Retrasado</option>
                                    <option value="otros">Otros</option>
                                    
                                </select>
                            </div>
                        </div>
                        <hr />
                        <h4>Aeropuerto</h4>
                        <div class="row">
                            <div class="col">
                                <label>* Nombre del Aeropuerto</label>
                                <select v-model="aeropuerto" class="form-control" name="" id="">
                                    <option value="Aeropuerto Internacional El Edén">Aeropuerto Internacional El Edén</option>
                                    <option value="Aeropuerto Internacional El Dorado">Aeropuerto Internacional El Dorado</option>
                                    <option value="Aeropuerto Internacional Ernesto Cortissoz">Aeropuerto Internacional Ernesto Cortissoz</option>
                                    <option value="Aeropuerto Internacional Palonegro">Aeropuerto Internacional Palonegro</option>
                                    <option value="Aeropuerto Internacional Alfonso Bonilla Aragón">Aeropuerto Internacional Alfonso Bonilla Aragón</option>
                                    <option value="Aeropuerto Internacional Los Garzones ">Aeropuerto Internacional Los Garzones </option>
                                    <option value="Aeropuerto Internacional Almirante Padilla ">Aeropuerto Internacional Almirante Padilla </option>
                                    <option value="Aeropuerto Internacional Simón Bolívar ">Aeropuerto Internacional Simón Bolívar </option>
                                    <option value="Aeropuerto Internacional Matecaña ">Aeropuerto Internacional Matecaña </option>
                                </select>
                            </div>
                        </div>
                        <hr />
                        <h4>TARIFA</h4>
                        <div class="row">
                            <div class="col">
                                <label><b>*Tipos de tarifa</b></label>
                                <select v-model="pago_tarifa" class="form-control" id="tipo_tarifa">
                                    <option value="572000">Tarifa Familiar</option>
                                    <option value="412000">Tarifa Comercial</option>
                                    <option value="372000">Tarifa Especial</option>
                                    <option value="513000">Tarifa Oficial</option>
           
                                </select>
                            </div>
                            <div class="col">
                                <label><b>*Tipos de tarifa</b></label>
                                <input type="text" class="form-control" v-model="pago_tarifa" placeholder="$ Precio" disabled="true">
                            </div>
                        </div>
                        <hr />
                        <button v-on:click="registrarReservacion" class="btn btn-outline-primary btn-block">¿ Desea guardar esta reservacion ? </button>
                    </div>
                </div>
            </div>
            <div class="col-sm-5">
                <div class="card">
                    <div class="card-header">
                        <h4>Informacion de reserva</h4>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                               <label>C.C del usuario: <b id="cedula">{{cedula}}</b></label><br />
                               <label>Nombre del usuario: <b>{{nombre}} {{apellido}}</b></label><br />
                            </div>
                            <div class="col">
                                <label>Fecha de vuelo: <b>{{fecha_vuelo}}</b></label>
                            </div>
                        </div>
                        
                        <hr />
                        <div class="row">
                            <div class="col">
                                <label><b>LUGAR DE ORIGEN</b></label> <br>
                                <label>Pais: <b>{{lugar_origen.nombre}}</b></label> <br>
                                <label>Capital: <b>{{lugar_origen.capital}}</b></label> <br>
                                <label>SubRegion: <b>{{lugar_origen.subregion}}</b></label> <br>
                                <hr />
                            </div>
                            <div class="col">
                                <label><b>LUGAR DE DESTINO</b></label> <br>
                                <label>Pais: <b>{{lugar_destino.nombre}}</b></label> <br>
                                <label>Capital: <b>{{lugar_destino.capital}}</b></label> <br>
                                <label>SubRegion: <b>{{lugar_destino.subregion}}</b></label> <br>
                                <hr />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <label>Dia de salida: <b>{{dia_salida}}</b></label>
                            </div>
                            <div class="col">
                                <label>Hora de salida: <b>{{hora_salida}}</b></label>
                            </div>
                            <div class="col">
                                <label>Estado de Vuelo: <b>{{estado}}</b></label>
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col">
                                <label>Aeropuerto origen: <b>{{aeropuerto}}</b></label>
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col">
                                <label>Tipo de tarifa a realizar: </b></label>
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col">
                                <h4>Total: $ <b>{{pago_tarifa}}</b></h4>
                            </div>              
                        </div>            
                    </div>
                </div>
            </div>
        </div>  
    `,
    data() {
      return {
          origen: "",
          destino: "",
          lugar_origen: {
              nombre: "",
              capital: "",
              subregion: ""
          },
          lugar_destino: {
              nombre: "",
              capital: "",
              subregion: ""
          },
          fecha_vuelo: "",
          dia_salida: "",
          hora_salida: "",
          estado: "",
          aeropuerto: "",
          pago_tarifa: ""
      }
    },
    methods: {
        cargarOrigen: function () {
            if (this.origen !== "") {
                try {
                    axios.get('https://restcountries.eu/rest/v2/name/'+this.origen).then(response => {
                        this.lugar_origen.nombre = response.data[0].name;
                        this.lugar_origen.capital = response.data[0].capital;
                        this.lugar_origen.subregion = response.data[0].subregion;
                    });
                } catch (e) {
                    console.log("Origen desconocido ");
                }
            }
        },
        cargarDestino: function () {
            if (this.destino !== "") {
                try {
                    axios.get('https://restcountries.eu/rest/v2/name/'+this.destino).then(response => {
                        this.lugar_destino.nombre = response.data[0].name;
                        this.lugar_destino.capital = response.data[0].capital;
                        this.lugar_destino.subregion = response.data[0].subregion;
                    });
                } catch (e) {
                    console.log("Destino no existe ");
                }
            }
        },
        registrarReservacion: function () {
            let cedula = document.getElementById('cedula').textContent;

            let json = { "ID_reserva": parseInt(Math.random()*100),  "cedula": parseInt(cedula), };
            let reservacion = {
                "ID_vuelo": parseInt(Math.random()*500),
                "estado": this.estado,
                "fecha_vuelo": this.fecha_vuelo,
                "id_vuelo_reserva": parseInt(Math.random()*300),
                "ID_reserva": json.ID_reserva,
            };
            let respuesta_Servidor;
            axios.post('/vuelo/reserva',json).then(responseServer => {
               if (responseServer.data.status === 200) {

                   axios.post('/vuelo/vuelo_reserva', reservacion).then(responseServer => {
                       respuesta_Servidor = responseServer.data.status;

                       if (respuesta_Servidor===200) {

                           var sel = document.getElementById("tipo_tarifa");
                           var text= sel.options[sel.selectedIndex].text;

                           const json_reservacion_tarifa = {
                               "ID_tarifa": parseInt(Math.random()*453),
                               "clase_tarifa": text,
                               "precio": this.pago_tarifa,
                               "ID_vuelo": reservacion.ID_vuelo
                           }
                           axios.post('/vuelo/tarifa', json_reservacion_tarifa).then(response => {
                              if (response.data.status === 200){
                                  const json_horas = {
                                      "nombre_aeropuerto": this.aeropuerto,
                                      "ciudad_origen": this.lugar_origen.nombre,

                                      "nombre_aeropuerto1": "Aeropuerto de "+ this.lugar_destino.capital,
                                      "ciudad_destino": this.lugar_destino.capital,

                                      "dia_salida": this.dia_salida,
                                      "hora_salida": this.hora_salida,

                                      "dia_llegada": this.dia_salida,
                                      "hora_llegada": "00:00:00",

                                      "ID_vuelo": reservacion.ID_vuelo
                                  }
                                  axios.post('/vuelo/horario', json_horas).then(response => {
                                      console.log(response.data);
                                      if (response.data.status === 200){
                                          Swal.fire({
                                              position: 'top-end',
                                              icon: 'success',
                                              title: 'Proceso completado con exito',
                                              showConfirmButton: false,
                                              timer: 1500
                                          })
                                      }
                                  });
                              }
                           });
                       }
                   });
               }
            });
        }
    }
})


var app = new Vue({
    el: '#appPrincipal',
    data() {
        return {
            actividades: -1,
            tituloActividades: "ACTIVIDADES A REALIZAR"
        };
    },
    methods: {
        consultar: function () {
            this.actividades = 0;
            this.tituloActividades = "CONSULTA DE ACTIVIDADES"
        },
        reserva: function () {
            this.actividades = 1;
            this.tituloActividades = "REALIZAR UNA RESERVA"
        }
    }
});