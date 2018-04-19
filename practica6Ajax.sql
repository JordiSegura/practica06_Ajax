drop database if exists practica6;
create database practica6;
use practica6;

create table notas (
  id_nota int primary key auto_increment,
  titulo varchar(25),
  descripcion varchar(250)
);