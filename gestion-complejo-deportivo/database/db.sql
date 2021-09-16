-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-09-2021 a las 08:44:21
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestioncomplejo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `booking`
--

CREATE TABLE `booking` (
  `id_booking` int(11) NOT NULL,
  `date_booking` date NOT NULL,
  `start_booking` varchar(20) NOT NULL,
  `end_booking` varchar(20) NOT NULL,
  `cancha` int(5) NOT NULL,
  `user` varchar(10) DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cancha`
--

CREATE TABLE `cancha` (
  `id_cancha` int(5) NOT NULL,
  `tipo_cancha` varchar(20) DEFAULT NULL,
  `price` int(8) DEFAULT NULL,
  `players` int(30) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cancha`
--

INSERT INTO `cancha` (`id_cancha`, `tipo_cancha`, `price`, `players`, `description`) VALUES
(1, 'Futbol - Futbol 5', 1900, 10, 'Cancha de fútbol 5 con césped sintético habilitada para 10 jugadores, el precio es de UYU 100 por cada jugador.'),
(2, 'Fútbol - Fútbol 7', 1400, 14, 'Cancha  de Fútbol 5 con césped sintético, está habilitada para 14 jugadores y el precio es de UYU 100 por cada jugador.'),
(3, 'Fútbol - Clásica', 2000, 22, 'Cancha  de Fútbol Clásico (11vs11) con césped sintético, está habilitada para 22 jugadores y el precio es de UYU 91 por cada jugador.'),
(4, 'Basquet - Clásico', 1100, 10, 'Cancha  de Basquet con base de hormigón, está habilitada para 10 jugadores y el precio es de UYU 110 por cada jugador.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `complejo`
--

CREATE TABLE `complejo` (
  `nombre_complejo` varchar(20) NOT NULL,
  `informacion_complejo` varchar(250) NOT NULL,
  `direccion_complejo` varchar(40) NOT NULL,
  `correo_complejo` varchar(30) NOT NULL,
  `telefono_complejo` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `complejo`
--

INSERT INTO `complejo` (`nombre_complejo`, `informacion_complejo`, `direccion_complejo`, `correo_complejo`, `telefono_complejo`) VALUES
('Gestión De Complejo', 'Un complejo deportivo con todas las actividades que efectuas en cualquier otro, solo que este es el propio :P', '18 de Julio, Martinez 1122', 'complejo@gestioncomplejo.com', '091234567');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `generos`
--

CREATE TABLE `generos` (
  `id_gen` int(11) NOT NULL,
  `gen_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `generos`
--

INSERT INTO `generos` (`id_gen`, `gen_name`) VALUES
(1, 'Hombre'),
(2, 'Mujer');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notifications`
--

CREATE TABLE `notifications` (
  `noti_id` int(11) NOT NULL,
  `noti_icon` varchar(40) NOT NULL,
  `noti_title` varchar(100) NOT NULL,
  `noti_description` varchar(1000) NOT NULL,
  `noti_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `wasRead` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `notifications`
--

INSERT INTO `notifications` (`noti_id`, `noti_icon`, `noti_title`, `noti_description`, `noti_date`, `wasRead`) VALUES
(13, 'fas fa-exclamation', 'Notificación de prueba.', 'Notificación de prueba para todos los usuarios', '2021-09-08 02:09:49', 1),
(14, 'fas fa-exclamation', '¿Qué sale?', 'Para mi que pinta jugar unos cs a fondo.', '2021-09-08 03:28:43', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profile_img`
--

CREATE TABLE `profile_img` (
  `src` varchar(50) NOT NULL,
  `id_img` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `profile_img`
--

INSERT INTO `profile_img` (`src`, `id_img`) VALUES
('/img/profile_picture.svg', 1),
('/img/profile_picture_2.svg', 2),
('/img/profile_picture_3.svg', 3),
('/img/profile_picture_4.svg', 4),
('/img/profile_picture_girl.svg', 5),
('/img/profile_picture_girl1.svg', 6),
('/img/profile_picture_girl2.svg', 7),
('/img/administracion.svg', 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `rol_name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `rol_name`) VALUES
(1, 'Administrador'),
(2, 'Usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `service`
--

CREATE TABLE `service` (
  `service_id` int(11) NOT NULL,
  `service_name` varchar(25) NOT NULL,
  `service_price` int(11) NOT NULL,
  `service_type` int(11) NOT NULL,
  `service_description` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `service`
--

INSERT INTO `service` (`service_id`, `service_name`, `service_price`, `service_type`, `service_description`) VALUES
(1, 'Gimnasio', 700, 1, 'Proporciona acceso total a todas las \"Atracciones\" del complejo, desde maquinas para hacer ejercicio hasta sesiones de yoga'),
(2, 'Piscina', 1100, 1, 'Proporciona acceso total a la piscina del complejo, desde natación libre hasta clases por profesionales.'),
(3, 'Golf', 1200, 1, 'Predio con golf insta'),
(5, 'Gym2', 200, 2, 'asdasdasda');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `service_type`
--

CREATE TABLE `service_type` (
  `service_type_id` int(11) NOT NULL,
  `service_type_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `service_type`
--

INSERT INTO `service_type` (`service_type_id`, `service_type_name`) VALUES
(1, 'Mensual'),
(2, 'Anual');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('WNv3shHwwMtICLUlh6_1zlJyHADfXLlh', 1631826634, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"admin\",\"name\":\"Administrador\",\"surname\":\"Administrador\",\"nacimiento\":\"2000-01-01\",\"direccion\":\"18 julio, José Artigas 2211\",\"localidad\":\"Young\",\"profile\":\"/img/profile_picture.svg\",\"password\":\"$2a$10$qbFVcty4/vohmrvG4Gv6J.t67ng2FVxLGc/YxAXG2tfeC49iHc8bW\",\"rol\":1,\"isProminent\":{\"type\":\"Buffer\",\"data\":[0]},\"created_at\":\"2021-08-21\"}}}'),
('YeE4R6tolTPtUSAkOlTFg7-NMTEVODcB', 1631860753, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"admin\",\"name\":\"Administrador\",\"surname\":\"Administrador\",\"nacimiento\":\"2000-07-16\",\"direccion\":\"asd\",\"localidad\":\"Young\",\"profile\":\"/img/profile_picture.svg\",\"password\":\"$2a$10$eGnvO5lZ7kejeB1ze20t1.GJ7PchD5QAlFP1VUsTlURyJCxuLgLZ2\",\"rol\":1,\"gen\":1,\"isProminent\":{\"type\":\"Buffer\",\"data\":[0]},\"created_at\":\"2021-09-16\"}}}'),
('bu9_3Jlk_tT5rp1i3yy1tbK3_06Hyulr', 1631852735, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('imNfu4NIpEmYGOk-KhcxanvrO2CKHnbx', 1631848006, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('itNNpZHWD4TwHKuuWdPh7M2uEOM44oQb', 1631785535, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"fran_cap15\",\"name\":\"Balter\",\"surname\":\"Velázquez\",\"nacimiento\":\"2003-04-11\",\"direccion\":\"Salto 3165\",\"localidad\":\"Young\",\"profile\":\"/img/profile_picture.svg\",\"password\":\"$2a$10$gV2c7AEODnFpKVyNtzwYReTs7Lnp4w1kCo.6XPLR/HuRXEnofayji\",\"rol\":2,\"isProminent\":{\"type\":\"Buffer\",\"data\":[0]},\"created_at\":\"2021-08-27\"}}}'),
('svGPvpv7ecBYyfw9JUsOex6JuHVT0ONY', 1631847999, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('w1lRv2IJOm3xa6NlcIgEwXIMBRqZ8c0A', 1631835960, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"admin\",\"name\":\"Administrador\",\"surname\":\"Administrador\",\"nacimiento\":\"2000-01-01\",\"direccion\":\"18 julio, José Artigas 2211\",\"localidad\":\"Young\",\"profile\":\"/img/profile_picture.svg\",\"password\":\"$2a$10$qbFVcty4/vohmrvG4Gv6J.t67ng2FVxLGc/YxAXG2tfeC49iHc8bW\",\"rol\":1,\"isProminent\":{\"type\":\"Buffer\",\"data\":[0]},\"created_at\":\"2021-08-21\"}}}'),
('yA7nLAVUmngmJWL2Eqm2GimCg_0ww_Kt', 1631788417, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"fran_cap15\",\"name\":\"Balter\",\"surname\":\"Velázquez\",\"nacimiento\":\"2003-04-11\",\"direccion\":\"Salto 3165\",\"localidad\":\"Young\",\"profile\":\"/img/profile_picture.svg\",\"password\":\"$2a$10$gV2c7AEODnFpKVyNtzwYReTs7Lnp4w1kCo.6XPLR/HuRXEnofayji\",\"rol\":2,\"isProminent\":{\"type\":\"Buffer\",\"data\":[0]},\"created_at\":\"2021-08-27\"}}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suscripcion`
--

CREATE TABLE `suscripcion` (
  `owner` varchar(15) NOT NULL,
  `ass_name` varchar(20) NOT NULL,
  `ass_surname` varchar(20) NOT NULL,
  `asociated_ci` int(8) NOT NULL,
  `ass_email` varchar(60) NOT NULL,
  `ass_dir1` varchar(100) NOT NULL,
  `ass_dir2` varchar(100) NOT NULL,
  `subscription` int(11) NOT NULL,
  `startDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `username` varchar(15) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `surname` varchar(20) DEFAULT NULL,
  `nacimiento` date NOT NULL,
  `direccion` varchar(70) NOT NULL,
  `localidad` varchar(20) NOT NULL,
  `profile` varchar(50) NOT NULL,
  `password` varchar(60) DEFAULT NULL,
  `rol` int(11) DEFAULT NULL,
  `gen` int(11) NOT NULL,
  `isProminent` bit(1) NOT NULL DEFAULT b'0',
  `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`username`, `name`, `surname`, `nacimiento`, `direccion`, `localidad`, `profile`, `password`, `rol`, `gen`, `isProminent`, `created_at`) VALUES
('admin', 'Administrador', 'Administrador', '2000-07-16', 'asd', 'Young', '/img/profile_picture.svg', '$2a$10$eGnvO5lZ7kejeB1ze20t1.GJ7PchD5QAlFP1VUsTlURyJCxuLgLZ2', 1, 1, b'0', '2021-09-16'),
('ani123', 'Anastasia', 'Gómez', '2002-06-16', 'A fondo', 'Young', '/img/profile_picture.svg', '$2a$10$jWhDSkWwdjbl0QrzqPwzhe4wplWpQZzDOsOvHik9DT2A83ZTymHVG', 2, 2, b'0', '2021-09-16'),
('fran_cap15', 'Balter', 'Velázquez', '2003-04-11', 'Salto 3165', 'Young', '/img/profile_picture.svg', '$2a$10$nzu7SHVvg7Nc5d17celtpurUgfFPQnU3d6XZ7Zk9wUdkaju77KE0i', 2, 1, b'0', '2021-09-16');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id_booking`,`date_booking`,`start_booking`,`cancha`),
  ADD KEY `ref_02` (`user`),
  ADD KEY `ref_03` (`cancha`);

--
-- Indices de la tabla `cancha`
--
ALTER TABLE `cancha`
  ADD PRIMARY KEY (`id_cancha`);

--
-- Indices de la tabla `generos`
--
ALTER TABLE `generos`
  ADD PRIMARY KEY (`id_gen`);

--
-- Indices de la tabla `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`noti_id`);

--
-- Indices de la tabla `profile_img`
--
ALTER TABLE `profile_img`
  ADD PRIMARY KEY (`id_img`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`service_id`),
  ADD KEY `fk_service_type` (`service_type`);

--
-- Indices de la tabla `service_type`
--
ALTER TABLE `service_type`
  ADD PRIMARY KEY (`service_type_id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `suscripcion`
--
ALTER TABLE `suscripcion`
  ADD PRIMARY KEY (`owner`,`subscription`),
  ADD KEY `fk_user_service` (`subscription`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`),
  ADD KEY `ref_01` (`rol`),
  ADD KEY `profile` (`profile`),
  ADD KEY `gen` (`gen`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `booking`
--
ALTER TABLE `booking`
  MODIFY `id_booking` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `generos`
--
ALTER TABLE `generos`
  MODIFY `id_gen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `notifications`
--
ALTER TABLE `notifications`
  MODIFY `noti_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `profile_img`
--
ALTER TABLE `profile_img`
  MODIFY `id_img` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `service`
--
ALTER TABLE `service`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `service_type`
--
ALTER TABLE `service_type`
  MODIFY `service_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `ref_02` FOREIGN KEY (`user`) REFERENCES `users` (`username`),
  ADD CONSTRAINT `ref_03` FOREIGN KEY (`cancha`) REFERENCES `cancha` (`id_cancha`);

--
-- Filtros para la tabla `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `fk_service_type` FOREIGN KEY (`service_type`) REFERENCES `service_type` (`service_type_id`);

--
-- Filtros para la tabla `suscripcion`
--
ALTER TABLE `suscripcion`
  ADD CONSTRAINT `fk_user_service` FOREIGN KEY (`subscription`) REFERENCES `service` (`service_id`),
  ADD CONSTRAINT `fk_user_subscription` FOREIGN KEY (`owner`) REFERENCES `users` (`username`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `ref_01` FOREIGN KEY (`rol`) REFERENCES `roles` (`id_rol`),
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`gen`) REFERENCES `generos` (`id_gen`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
