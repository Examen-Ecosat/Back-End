create database if not exists db_examen;

use db_examen;

-- USUARIOS
create table if not exists usuarios(
	id_usuario int auto_increment not null primary key,
    usuario varchar(45) not null,
    contraseña varchar(45)
);

-- UBICACIONES
create table if not exists ubicaciones(
	id_ubicación int auto_increment not null primary key,
    descripción varchar(45)
);

-- ZONAS
create table if not exists zonas(
	id_zona int auto_increment not null primary key,
    id_ubicación int not null,
    descripción varchar(45),
    foreign key (id_ubicación) references ubicaciones (id_ubicación)
);

-- SENSORES
create table if not exists sensores(
	id_sensor int auto_increment not null primary key,
    id_zona int not null,
    descripción varchar(45),
    foreign key (id_zona) references zonas (id_zona)
);

-- ALERTAS
create table if not exists alertas(
	id_alerta int auto_increment not null primary key,
    id_sensor int not null,
    descripción varchar(45),
    fecha_hora datetime,
    foreign key (id_sensor) references sensores (id_sensor)
);


