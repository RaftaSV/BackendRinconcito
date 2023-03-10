
drop database if exists Restaurants;

create database Restaurants;

use Restaurants;


create table platters (
platterId int not null auto_increment primary key,
platterName varchar(50) not null,
price float(7,2) not null,
cost float (7,2) not null,
platterDetail varchar(250) not null,
PlatterImage varchar (100) not null,
categoryId int not null,
platterStatus int not null
);


create table plattersCategories (
 categoryId int not null auto_increment primary key,
 categoryName varchar(50) not null,
 categoryImage varchar (100) not null,
 categoryStatus int not null
);


create table orders(
orderId int not null auto_increment primary key,
orderTime time,
orderDate Date,
orderType int not null,
tableId int,
userId int not null,
address varchar (200),
customer varchar (50),
numberPhone varchar (9),
orderStatus int not null
);


create table orderDetails(
detailsOrderId int not null auto_increment primary key,
orderId int not null,
platterId int not null,
platterPrice float(7,2) not null,
detailOrderStatus int not null
);


create table users(
userId int not null auto_increment primary key,
userNames varchar(100) not null,
lastName varchar(100) not null,
phone varchar (9) not null,
userName varchar (50) not null,
userPassword varchar(512) not null,
userType int not null,
userStatus int
);


create table invoices(
invoiceId int not null auto_increment primary key,
invoiceTime time not null,
invoiceDate date not null,
userId int not null,
invoiceTotal float(7,2) ,
cash float(7,2) ,
invoiceChange float(7,2),
invoiceStatus int
);

create table invoiceDetails(
detailInvoiceId int not null primary key auto_increment,
platterId int not null,
invoiceId int not null,
unitPrice float(7,2) not null,
cost float(7,2) not null,
invoiceDetailsStatus int not null
);

create table costs(
costId int not null auto_increment primary key,
costDetail varchar(100) not null,
cant float(7,2) not null,
costDate date not null,
costStatus int not null
);

create table restaurantTables(
tableId int not null primary key auto_increment,
tableNumber int not null,
tableStatus int
);


alter table platters
add foreign key (categoryId)
references plattersCategories(categoryId);

alter table orderDetails
 add foreign key (orderId)
 references orders(orderId);

alter table orderDetails
add foreign key (platterId)
references platters (platterId);

alter table orders
add foreign key (tableId)
references  restaurantTables(tableId);

alter table orders
add foreign key (userId)
references users (userId);


alter table invoices
add foreign key (userId)
references users (userId);


alter table invoiceDetails
add foreign key (invoiceId)
references invoices (invoiceId);

alter table invoiceDetails
add foreign key (platterId)
references platters (platterId);

insert into users (userNames, lastName, phone, userName,userPassword, userType, userStatus) VALUES ('Rafael', 'Gonzalez', '63114859', 'Rafta', '$2b$10$Ku9Ig4PnowYdY2sglNwkweGbLDgnAc798TH8Av0OvfbNSUinFdrjm', 0, 0);
