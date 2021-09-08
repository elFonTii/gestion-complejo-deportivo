-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-09-2021 a las 04:50:26
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

--
-- Volcado de datos para la tabla `booking`
--

INSERT INTO `booking` (`id_booking`, `date_booking`, `start_booking`, `end_booking`, `cancha`, `user`, `create_at`) VALUES
(19, '2021-08-26', '14:40', '16:40', 1, 'elfontii', '2021-08-26 17:30:20'),
(20, '2021-08-26', '20:00', '22:00', 1, 'elfontii', '2021-08-26 18:03:21'),
(21, '2021-08-26', '18:00', '20:00', 1, 'elfontii', '2021-08-26 18:03:36'),
(22, '2021-08-26', '22:50', '24:50', 1, 'elfontii', '2021-08-27 01:50:43');

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
(13, 'fas fa-exclamation', 'Notificación de prueba.', 'Notificación de prueba para todos los usuarios', '2021-09-08 02:09:49', 1);

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
(4, 'asdasd', 0, 1, 'asdasda'),
(5, 'Gym2', 200, 2, 'asdasdasda'),
(6, 'Tenis', 900, 1, 'Añade acceso al tenis del complejo.');

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
('K3niJuA2zLMVx09d33PThkI_PUUIUd2x', 1631154606, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"elfontii\",\"name\":\"Felipe\",\"surname\":\"Fontana\",\"nacimiento\":\"2003-08-30\",\"direccion\":\"18 de Julio, Joaquin Suarez 1832\",\"localidad\":\"Young\",\"profile\":\"/img/profile_picture.svg\",\"password\":\"$2a$10$Ccl.tJMQ2a/KiN40I3DpYeyrE0QaVwVwoXrYx60Bzzobdz.jkntXW\",\"rol\":2,\"isProminent\":{\"type\":\"Buffer\",\"data\":[1]},\"created_at\":\"2021-08-21\"}}}');

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

--
-- Volcado de datos para la tabla `suscripcion`
--

INSERT INTO `suscripcion` (`owner`, `ass_name`, `ass_surname`, `asociated_ci`, `ass_email`, `ass_dir1`, `ass_dir2`, `subscription`, `startDate`) VALUES
('elfontii', 'asda', 'asda', 53679745, 'feluubotta685@gmail.com', 'asda', 'asda', 2, '2021-08-24');

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
  `isProminent` bit(1) NOT NULL DEFAULT b'0',
  `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`username`, `name`, `surname`, `nacimiento`, `direccion`, `localidad`, `profile`, `password`, `rol`, `isProminent`, `created_at`) VALUES
('admin', 'Administrador', 'Administrador', '2000-01-01', 'Administrador', 'Young', '/img/profile_picture.svg', '$2a$10$qbFVcty4/vohmrvG4Gv6J.t67ng2FVxLGc/YxAXG2tfeC49iHc8bW', 1, b'0', '2021-08-21'),
('colii24', 'Nicole', 'Camaño', '2004-06-19', 'martiriné viv.9', 'Young', '/img/profile_picture.svg', '$2a$10$OEhjy0bWB/5Js0ZvGDDYnuGlnl2nibiwfJtgE768XyjXZ4mPimPPy', 2, b'0', '2021-08-21'),
('elfontii', 'Felipe', 'Fontana', '2003-08-30', '18 de Julio, Joaquin Suarez 1832', 'Young', '/img/profile_picture.svg', '$2a$10$Ccl.tJMQ2a/KiN40I3DpYeyrE0QaVwVwoXrYx60Bzzobdz.jkntXW', 2, b'1', '2021-08-21'),
('fontii', 'Felipe', 'Fontana', '2021-08-30', '18 de Julio, Joaquin Suarez 1832', 'Young', '/img/profile_picture.svg', '$2a$10$lxo/6BAAf1/YraBLCX1D9OVOqSU70OhXMQUOkHPWAPUQebGqwCcM2', 2, b'0', '2021-08-21'),
('fran_cap15', 'Balter', 'Velázquez', '2003-08-11', 'Salto 3165', 'Young', '/img/profile_picture.svg', '$2a$10$gV2c7AEODnFpKVyNtzwYReTs7Lnp4w1kCo.6XPLR/HuRXEnofayji', 2, b'0', '2021-08-27');

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
  ADD KEY `profile` (`profile`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `booking`
--
ALTER TABLE `booking`
  MODIFY `id_booking` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `notifications`
--
ALTER TABLE `notifications`
  MODIFY `noti_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `profile_img`
--
ALTER TABLE `profile_img`
  MODIFY `id_img` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `service`
--
ALTER TABLE `service`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
  ADD CONSTRAINT `ref_01` FOREIGN KEY (`rol`) REFERENCES `roles` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
