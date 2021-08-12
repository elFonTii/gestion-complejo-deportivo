-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-08-2021 a las 20:17:52
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
  `id_booking` int(5) NOT NULL,
  `date_booking` date NOT NULL,
  `start_booking` varchar(20) NOT NULL,
  `end_booking` varchar(20) NOT NULL,
  `cancha` int(5) NOT NULL,
  `user` varchar(10) DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT current_timestamp(),
  `booking_state` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `booking`
--

INSERT INTO `booking` (`id_booking`, `date_booking`, `start_booking`, `end_booking`, `cancha`, `user`, `create_at`, `booking_state`) VALUES
(0, '2021-08-13', '10:10', '11:10', 4, 'feli', '2021-08-12 13:24:55', 1);

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
-- Estructura de tabla para la tabla `notification`
--

CREATE TABLE `notification` (
  `notification_user` varchar(15) NOT NULL,
  `notification_data` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `notification`
--

INSERT INTO `notification` (`notification_user`, `notification_data`) VALUES
('feli', 1),
('feli', 1),
('feli', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notification_data`
--

CREATE TABLE `notification_data` (
  `notification_id` int(11) NOT NULL,
  `notification_title` varchar(30) NOT NULL,
  `notification_description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `notification_data`
--

INSERT INTO `notification_data` (`notification_id`, `notification_title`, `notification_description`) VALUES
(1, '¡Nueva reserva ingresada!', 'Su reserva ha quedado almacenada de manera satisfactoria'),
(2, 'Reserva eliminada', 'Su reserva ha quedado eliminada de nuestro registro.');

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
('79hX4mcHBifN8XvkWkJXIbFF8uLERP-c', 1628832812, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('9VA4HRzEGRWc0Nky8IZK8mv9gGgYgU3p', 1628810131, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('9qMcZY3L8lfrJzsUSEdeppNj0oxsq7Ro', 1628816401, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"feli\",\"name\":\"Felipe\",\"surname\":\"Fontana\",\"nacimiento\":\"2021-05-30\",\"direccion\":\"1231231\",\"localidad\":\"Young\",\"profile\":\"/img/profile_picture.svg\",\"password\":\"123\",\"rol\":2}}}'),
('CEyX3JO0wQkD86BEB2t1dpNdK679H73L', 1628877410, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('CSfe96KF8c0qZEB8PHPU9S2sShyOdeq6', 1628876214, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"name\":\"Balter\",\"surname\":\"Velázquez\",\"username\":\"fran_cap15\",\"nacimiento\":\"2003-04-11\",\"direccion\":\"Salto 3165\",\"localidad\":\"Young\",\"profile\":\"/img/profile_picture.svg\",\"password\":\"1234\",\"rol\":2,\"id\":0}}}'),
('CWSllNBLfz34imu63AgOlwDetV-nAGsB', 1628829089, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"admin\",\"name\":\"Administrador\",\"surname\":\"Principal\",\"nacimiento\":\"2000-01-01\",\"direccion\":\"Administrator\",\"localidad\":\"Young\",\"profile\":\"/img/administracion.svg\",\"password\":\"admin\",\"rol\":1}}}'),
('FSJImQTm0BfKPdtuTFyrRZuihZM9q53T', 1628810131, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('HUy8TUmgeONssAhOPgDsUw1jRzBiiJvY', 1628810131, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('JQyLIcDyR94tu6gFIxPepDqfdsT3RIlW', 1628877410, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('O6QDV-JpNKaKAfZUdwv2ORT7yr1oxoHB', 1628810133, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('PYXaR9xxUkthaZiUuhUor69XENkt-8za', 1628861095, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"feli\",\"name\":\"Felipe\",\"surname\":\"Fontana\",\"nacimiento\":\"2021-05-30\",\"direccion\":\"1231231\",\"localidad\":\"Young\",\"profile\":\"/img/profile_picture.svg\",\"password\":\"123\",\"rol\":2}}}'),
('Q4uGv2w5nOLK2uy7aziszJ2FZFbOhOnp', 1628810131, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('QXR_PLyZh6gOS20SS03tSzAkKZgKOQRp', 1628877410, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('SSemrj-nrwQuB36r_5Kc_rmkeiKKrtfM', 1628810131, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('aQA3FRbB-YLjZWxoLsug-vZX08vJ5Xat', 1628877410, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('aRNtFcUVHEXMTVnFMR67I14VqEW_A0vx', 1628877410, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('hXAMvZRO8tnK8X9AorwKQrCCGAnvzOOC', 1628810131, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('hq6FX1856_XfDRZjRisNGIlNutrDZwRR', 1628877410, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('ihgLa-y55Vrtajp0Wu8LVMIuwE4qzXGd', 1628810131, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('jAXrmrhdufLF8jOPMOqCWgbpM8S5l4si', 1628801289, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"feli\",\"name\":\"Felipe\",\"surname\":\"Fontana\",\"nacimiento\":\"2021-05-30\",\"direccion\":\"1231231\",\"localidad\":\"Young\",\"profile\":\"/img/profile_picture.svg\",\"password\":\"123\",\"rol\":2}}}'),
('k2ncnNc8bKhDdg4CwOmWsnnpliAqQKao', 1628823327, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"admin\",\"name\":\"Administrador\",\"surname\":\"Principal\",\"nacimiento\":\"2000-01-01\",\"direccion\":\"Administrator\",\"localidad\":\"Young\",\"profile\":\"/img/administracion.svg\",\"password\":\"admin\",\"rol\":1}}}'),
('q96xm6PJDmt7fvqx7p6VHfGyZsUVQcuO', 1628877412, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('qQVfsBOqB6Pj2lRf0vNf98wAltecWXlc', 1628810131, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('teesfV6Ib3m4eG7b9AlpxS0BEB2hc66u', 1628829701, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"feli\",\"name\":\"Felipe\",\"surname\":\"Fontana\",\"nacimiento\":\"2021-05-30\",\"direccion\":\"1231231\",\"localidad\":\"Young\",\"profile\":\"/img/profile_picture.svg\",\"password\":\"123\",\"rol\":2}}}'),
('xofvu4pxR3DDwT76jk0fgNgkibylu-Bw', 1628877410, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('ynLVhy7cBGm16z58nFOwHhPbi7mMODLP', 1628831789, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"admin\",\"name\":\"Administrador\",\"surname\":\"Principal\",\"nacimiento\":\"2000-01-01\",\"direccion\":\"Administrator\",\"localidad\":\"Young\",\"profile\":\"/img/administracion.svg\",\"password\":\"admin\",\"rol\":1}}}'),
('zPsI3nRGfgOP4V6w3C500Pfov1bvUfqM', 1628877410, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `status`
--

CREATE TABLE `status` (
  `id_status` int(11) NOT NULL,
  `estado` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `status`
--

INSERT INTO `status` (`id_status`, `estado`) VALUES
(0, 'Inactiva'),
(1, 'Activa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suscripcion`
--

CREATE TABLE `suscripcion` (
  `owner` varchar(15) NOT NULL,
  `asociated_ci` int(8) NOT NULL,
  `subscription` int(11) NOT NULL,
  `startDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `suscripcion`
--

INSERT INTO `suscripcion` (`owner`, `asociated_ci`, `subscription`, `startDate`) VALUES
('admin', 0, 2, '2021-08-21'),
('feli', 0, 1, '2021-08-11');

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
  `password` varchar(16) DEFAULT NULL,
  `rol` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`username`, `name`, `surname`, `nacimiento`, `direccion`, `localidad`, `profile`, `password`, `rol`) VALUES
('admin', 'Administrador', 'Principal', '2000-01-01', 'Administrator', 'Young', '/img/administracion.svg', 'admin', 1),
('Coli', 'Nicole', 'Camaño', '2021-08-19', 'Doctor José Martirené', 'Young', '/img/profile_picture.svg', 'jjihgfryuiknbcf', 2),
('elfontii', 'Felipe', 'Fontana', '2003-08-30', 'Nashe', 'Young', '/img/profile_picture.svg', 'fonti123', 2),
('fannybotta', 'Fanny', 'Botta', '1974-10-29', '18 de Julio', 'Young', '/img/profile_picture_3.svg', '123', 2),
('feli', 'Felipe', 'Fontana', '2021-05-30', '1231231', 'Young', '/img/profile_picture.svg', '123', 2),
('felipe', 'Felipe', 'Fontana', '2021-08-20', 'Felioe', 'Young', '/img/profile_picture.svg', '123', 2),
('fran_cap15', 'Balter', 'Velázquez', '2003-04-11', 'Salto 3165', 'Young', '/img/profile_picture.svg', '1234', 2),
('GiniDel007', 'Gino', 'Delmonte', '2003-06-04', '123', 'Young', '/img/profile_picture.svg', 'pVvUafK6nRwnUTX', 2),
('Hjfjejeje', 'Bebejejeje', 'Jdbejfjdje', '2021-08-21', 'Djjdjdjdjdjdjdjjdjdjd', 'Young', '/img/profile_picture.svg', 'ehehdbjdjdjd', 2),
('mateosabe', 'mateo', 'fiorelli', '2021-08-20', 'jc25viv9', 'Young', '/img/profile_picture.svg', 'mateosançbe', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`date_booking`,`start_booking`,`cancha`),
  ADD KEY `ref_02` (`user`),
  ADD KEY `ref_03` (`cancha`),
  ADD KEY `FK_Status` (`booking_state`);

--
-- Indices de la tabla `cancha`
--
ALTER TABLE `cancha`
  ADD PRIMARY KEY (`id_cancha`);

--
-- Indices de la tabla `notification`
--
ALTER TABLE `notification`
  ADD KEY `fk_user_noti` (`notification_user`),
  ADD KEY `fk_noti_data` (`notification_data`);

--
-- Indices de la tabla `notification_data`
--
ALTER TABLE `notification_data`
  ADD PRIMARY KEY (`notification_id`);

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
-- Indices de la tabla `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id_status`);

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
-- AUTO_INCREMENT de la tabla `notification_data`
--
ALTER TABLE `notification_data`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `profile_img`
--
ALTER TABLE `profile_img`
  MODIFY `id_img` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `service`
--
ALTER TABLE `service`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  ADD CONSTRAINT `FK_Status` FOREIGN KEY (`booking_state`) REFERENCES `status` (`id_status`),
  ADD CONSTRAINT `ref_02` FOREIGN KEY (`user`) REFERENCES `users` (`username`),
  ADD CONSTRAINT `ref_03` FOREIGN KEY (`cancha`) REFERENCES `cancha` (`id_cancha`);

--
-- Filtros para la tabla `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `fk_noti_data` FOREIGN KEY (`notification_data`) REFERENCES `notification_data` (`notification_id`),
  ADD CONSTRAINT `fk_user_noti` FOREIGN KEY (`notification_user`) REFERENCES `users` (`username`);

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
