--mysql -u root -p

create database Banco_costureira;
use Banco_costureira;

create table produto(
id_produto int primary key not null auto_increment,
nome_produto varchar(255),
valor double
);

INSERT INTO `produto` (`id_produto`, `nome_produto`, `valor`) VALUES
('3', 'Bainha de calça Jeans simples', '20.00'),
('4', 'Bainha de calça Jeans original', '25.00'),
('5', 'Bainha de calça social (invisível)', '30.00'),
('6', 'Bainha italiana', '40.00'),
('7', 'Barra na malha', '20.00'),
('8', 'Trocar zíper macacão', '35.00'),
('9', 'Trocar zíper de calça ou saia', '45.00'),
('10', 'Trocar zíper de vestido', '50.00'),
('11', 'Trocar zíper invisível', '25.00'),
('12', 'Ajustar o cós', '30.00'),
('13', 'Diminuir cumprimento', '20.00'),
('14', 'Diminuir alça', '15.00'),
('15', 'Cerzido', '20.00'),
('16', 'Fazer alteração (vestido ou blusa)', '30.00'),
('17', 'Remendo', '25.00'),
('18', 'Punho de blusa social', '25.00'),
('19', 'Alterar colarinho', '30.00'),
('20', 'Trocar botão', '15.00'
);

create table cliente(
id_cliente int primary key not null auto_increment,
nome_cliente varchar(255),
telefone varchar(30),
senha VARCHAR(255),
endereco varchar(255),
medidas decimal(5,2)
);
-- CREATE TABLE usuario(
-- id_usuario INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
-- nome VARCHAR(255),
-- senha VARCHAR(255),
-- telefone VARCHAR(20),
-- endereco VARCHAR(255)
-- );

create table usuario(
id_usuario int primary key not null auto_increment,
nome varchar(255),
senha varchar(255)
);


CREATE TABLE pedido (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    id_produto INT,
    quantidade_produto INT,
    valor_unidade DECIMAL(10, 2),
    valor_total DECIMAL(10, 2),
    forma_pagamento VARCHAR(255),
    medidas DECIMAL(5,2), -- Ajustando a coluna medidas para decimal
    data_retirada DATE, -- Adicionando a coluna data_retirada
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_produto) REFERENCES produto(id_produto)
);
