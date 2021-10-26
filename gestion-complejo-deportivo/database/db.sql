-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-10-2021 a las 07:46:57
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
  `paymentStatus` varchar(15) DEFAULT NULL,
  `payment_id` varchar(40) DEFAULT NULL,
  `cancha` int(5) NOT NULL,
  `user` varchar(10) DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `booking`
--

INSERT INTO `booking` (`id_booking`, `date_booking`, `start_booking`, `end_booking`, `paymentStatus`, `payment_id`, `cancha`, `user`, `create_at`) VALUES
(58, '2021-10-27', '02:00', '03:00', 'Pagado', '17767666569', 4, 'elfontii', '2021-10-26 04:31:38'),
(59, '2021-10-29', '03:00', '04:00', NULL, NULL, 4, 'elfontii', '2021-10-26 05:02:40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cancha`
--

CREATE TABLE `cancha` (
  `id_cancha` int(11) NOT NULL,
  `preference_id` varchar(100) NOT NULL,
  `tipo_cancha` varchar(20) DEFAULT NULL,
  `price` int(8) DEFAULT NULL,
  `players` int(30) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cancha`
--

INSERT INTO `cancha` (`id_cancha`, `preference_id`, `tipo_cancha`, `price`, `players`, `description`) VALUES
(4, '195962628-ff84be72-f077-4854-9571-0709d09017b0', 'Fútbol 5', 30, 11, 'Una simple cancha de fútbol 5 de césped sintético y gradas.');

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
(14, 'fas fa-exclamation', '¿Qué sale?', 'Para mi que pinta jugar unos cs a fondo.', '2021-09-08 03:28:43', 1),
(15, 'fas fa-exclamation', 'Notificación de prueba.', 'Ashe', '2021-10-19 05:37:43', 1);

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
('5uErbhZs00c-ZCY08iD9ypdfurJfXbw5', 1635309043, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"elfontii\",\"email\":\"feluubotta685@gmail.com\",\"name\":\"Felipe\",\"surname\":\"Fontana Botta\",\"nacimiento\":\"2003-08-30\",\"direccion\":\"18 de Julio, Joaquin Suarez\",\"localidad\":\"Young\",\"profile\":\"profile_picture_2.svg\",\"password\":\"$2a$10$quVbgqcOmsBAGsI5kTQ1IeSNxGvx4IIbKo43X2qWjGwr1UXg.NNwu\",\"rol\":2,\"gen\":1,\"isProminent\":{\"type\":\"Buffer\",\"data\":[0]},\"created_at\":\"2021-10-15\"}}}'),
('QktOMhj6QIpqVV8RMK2qU9wxA3Cjip44', 1635298052, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('i5m9DVXtS2hB72W7nxnZDHxYNw9bmuYc', 1635297722, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('mkUcaM7QhuaFbrAgtKNfSQbivyI-H-WM', 1635297401, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('mxsE1z038coKvStbXp9gL1ubBkF-uW8R', 1635297448, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('oQbTJZy51kDIAx1UkeizWesT-8B79beY', 1635313032, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('qJfD0GUfPlqDp-zUqC0fx_wuZz7rbjsn', 1635297401, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('s63iz6KseiFnKYOYcHZddCu6cEc06f_3', 1635309465, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"elfontii\",\"email\":\"feluubotta685@gmail.com\",\"name\":\"Felipe\",\"surname\":\"Fontana Botta\",\"nacimiento\":\"2003-08-30\",\"direccion\":\"18 de Julio, Joaquin Suarez\",\"localidad\":\"Young\",\"profile\":\"profile_picture_2.svg\",\"password\":\"$2a$10$quVbgqcOmsBAGsI5kTQ1IeSNxGvx4IIbKo43X2qWjGwr1UXg.NNwu\",\"rol\":2,\"gen\":1,\"isProminent\":{\"type\":\"Buffer\",\"data\":[0]},\"created_at\":\"2021-10-15\"}}}'),
('y43k4OkIYLyn0g-wm-WL3IN4U584rE2q', 1635313526, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"elfontii\",\"email\":\"feluubotta685@gmail.com\",\"name\":\"Felipe\",\"surname\":\"Fontana Botta\",\"nacimiento\":\"2003-08-30\",\"direccion\":\"18 de Julio, Joaquin Suarez\",\"localidad\":\"Young\",\"profile\":\"profile_picture_2.svg\",\"password\":\"$2a$10$quVbgqcOmsBAGsI5kTQ1IeSNxGvx4IIbKo43X2qWjGwr1UXg.NNwu\",\"rol\":2,\"gen\":1,\"isProminent\":{\"type\":\"Buffer\",\"data\":[0]},\"created_at\":\"2021-10-15\"}}}');

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
('elfontii', 'felipe', 'fontana', 53679745, 'feluubotta685@gmail.com', '18 de Julio, Joaquin Suarez', '18 de Julio, Joaquin Suarez', 1, '2021-10-19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `username` varchar(15) NOT NULL,
  `email` varchar(25) NOT NULL,
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

INSERT INTO `users` (`username`, `email`, `name`, `surname`, `nacimiento`, `direccion`, `localidad`, `profile`, `password`, `rol`, `gen`, `isProminent`, `created_at`) VALUES
('admin', 'admin@administration.com', 'Administrador', 'Del Padre', '2021-10-05', '18 de Julio, Martiriné 1321', 'Young', 'profile_picture_girl', '$2a$10$y4TEN3bRf.UECj3ut5Svpeyq3qt8c1C5ubWrxzwblxNcV0tXdX.fy', 1, 2, b'0', '2021-10-19'),
('elfontii', 'feluubotta685@gmail.com', 'Felipe', 'Fontana Botta', '2003-08-30', '18 de Julio, Joaquin Suarez', 'Young', 'profile_picture_2.svg', '$2a$10$quVbgqcOmsBAGsI5kTQ1IeSNxGvx4IIbKo43X2qWjGwr1UXg.NNwu', 2, 1, b'0', '2021-10-15'),
('fran_cap15', 'franptc3@gmail.com', 'pruebagarrida', 'Hjlk', '2021-10-12', 'Salto 3165', 'Young', 'profile_picture_2.svg', '$2a$10$CA9cCcYd1zjnKneU6U914e06c04p4Ks92dWt4M0NCiX55PlMGVxLC', 2, 1, b'0', '2021-10-21'),
('nicolecam24@icl', 'nicolecam24@icloud.com', 'Nicole', 'Camaño', '2021-10-21', 'Doctor José Martirené', 'Young', 'profile_picture_girl', '$2a$10$Pd2fhLarEtsiEQ1yKx0ia.g7IHikk41IJlMfW8qh3EO9ntArP53xy', 2, 2, b'0', '2021-10-21');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id_booking`,`date_booking`,`start_booking`),
  ADD KEY `ref_02` (`user`),
  ADD KEY `ref_03` (`cancha`) USING BTREE;

--
-- Indices de la tabla `cancha`
--
ALTER TABLE `cancha`
  ADD PRIMARY KEY (`id_cancha`),
  ADD KEY `preference_id` (`preference_id`),
  ADD KEY `id_cancha` (`id_cancha`);

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
  ADD PRIMARY KEY (`username`,`email`),
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
  MODIFY `id_booking` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT de la tabla `cancha`
--
ALTER TABLE `cancha`
  MODIFY `id_cancha` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `generos`
--
ALTER TABLE `generos`
  MODIFY `id_gen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `notifications`
--
ALTER TABLE `notifications`
  MODIFY `noti_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
  ADD CONSTRAINT `fk_cancha` FOREIGN KEY (`cancha`) REFERENCES `cancha` (`id_cancha`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ref_02` FOREIGN KEY (`user`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

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
