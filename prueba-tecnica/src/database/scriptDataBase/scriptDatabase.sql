DROP DATABASE reservacion_vuelo;
CREATE DATABASE IF NOT EXISTS reservacion_vuelo;
USE reservacion_vuelo;

CREATE TABLE IF NOT EXISTS usuario(
    username VARCHAR(35) NOT NULL,
    password VARCHAR(100) NOT NULL,
    cedula INT NOT NULL PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    apellidos VARCHAR(30) NOT NULL,
    telefono VARCHAR(13) NOT NULL,
    direccion VARCHAR(30) NOT NULL,
    ciudad VARCHAR(25) NOT NULL
);

CREATE TABLE IF NOT EXISTS tarjeta(
    numero_tarjeta INT NOT NULL PRIMARY KEY,
    nombre_tarjeta VARCHAR(25) NOT NULL,
    expedida TIMESTAMP NOT NULL,
    vencimiento TIMESTAMP NOT NULL,
    expedidor VARCHAR(25) NOT NULL,
    cedula INT NOT NULL UNIQUE,
    FOREIGN KEY (cedula) REFERENCES usuario (cedula)
);

CREATE TABLE IF NOT EXISTS reserva(
    ID_reserva INT NOT NULL,
    numero_tarjeta INT NOT NULL,
    fecha_reserva TIMESTAMP NOT NULL DEFAULT current_timestamp,
    PRIMARY KEY(ID_reserva, numero_tarjeta, fecha_reserva),
    FOREIGN KEY (numero_tarjeta) REFERENCES tarjeta(numero_tarjeta)
);

CREATE TABLE IF NOT EXISTS vuelo(
    ID_vuelo INT NOT NULL,
    estado VARCHAR(25) NOT NULL,
    fecha_vuelo TIMESTAMP NOT NULL,
    PRIMARY KEY(ID_vuelo)
);

CREATE TABLE IF NOT EXISTS reserva_vuelo(
    id_vuelo_reserva INT NOT NULL AUTO_INCREMENT,
    ID_reserva INT NOT NULL,
    ID_vuelo INT NOT NULL,
    PRIMARY KEY (id_vuelo_reserva, ID_reserva, ID_vuelo),
    FOREIGN KEY(ID_reserva) REFERENCES reserva(ID_reserva),
    FOREIGN KEY(ID_vuelo) REFERENCES vuelo(ID_vuelo)
);

CREATE TABLE IF NOT EXISTS tarifa(
    ID_tarifa INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    clase_tarifa VARCHAR(30) NOT NULL,
    precio DOUBLE NOT NULL,
    ID_vuelo INT NOT NULL,
    FOREIGN KEY(ID_vuelo) REFERENCES vuelo(ID_vuelo)
);

CREATE TABLE IF NOT EXISTS aeropuerto_origen(
    nombre_aeropuerto VARCHAR(60) NOT NULL,
    ciudad_origen VARCHAR(60) NOT NULL,
    ID_vuelo INT NOT NULL,
    FOREIGN KEY(ID_vuelo) REFERENCES vuelo(ID_vuelo)
);

CREATE TABLE IF NOT EXISTS aeropuerto_destino(
    nombre_aeropuerto VARCHAR(60) NOT NULL,
    ciudad_destino VARCHAR(60) NOT NULL,
    ID_vuelo INT NOT NULL,
    FOREIGN KEY(ID_vuelo) REFERENCES vuelo(ID_vuelo)
);

CREATE TABLE IF NOT EXISTS horario_salida(
    dia_salida VARCHAR(30) NOT NULL,
    hora_salida TIME,
    ID_vuelo INT NOT NULL,
    FOREIGN KEY(ID_vuelo) REFERENCES vuelo(ID_vuelo)
);

CREATE TABLE IF NOT EXISTS horario_llegada(
    dia_llegada VARCHAR(30) NOT NULL,
    hora_llegada TIME,
    ID_vuelo INT NOT NULL,
    FOREIGN KEY(ID_vuelo) REFERENCES vuelo(ID_vuelo)
);