-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-08-2021 a las 03:20:10
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
  `cancha` int(5) DEFAULT NULL,
  `user` varchar(10) DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT current_timestamp(),
  `booking_state` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cancha`
--

CREATE TABLE `cancha` (
  `id_cancha` int(5) NOT NULL,
  `tipo_cancha` varchar(20) DEFAULT NULL,
  `price` varchar(8) DEFAULT NULL,
  `players` int(30) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cancha`
--

INSERT INTO `cancha` (`id_cancha`, `tipo_cancha`, `price`, `players`, `description`) VALUES
(1, 'Futbol - Futbol 5', '1000', 10, 'Cancha de fútbol 5 con césped sintético habilitada para 10 jugadores, el precio es de UYU 100 por cada jugador.'),
(2, 'Fútbol - Fútbol 7', '1400', 14, 'Cancha  de Fútbol 5 con césped sintético, está habilitada para 14 jugadores y el precio es de UYU 100 por cada jugador.'),
(3, 'Fútbol - Clásica', '2000', 22, 'Cancha  de Fútbol Clásico (11vs11) con césped sintético, está habilitada para 22 jugadores y el precio es de UYU 91 por cada jugador.'),
(4, 'Basquet - Clásico', '1100', 10, 'Cancha  de Basquet con base de hormigón, está habilitada para 10 jugadores y el precio es de UYU 110 por cada jugador.');

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
('-TKk5B64nLv4itVSzpibJSniNcmw6Y_8', 1628025959, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('-sGcHJAKyz5nbZ_EKtGi5G_1DH5zaSG4', 1628034421, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('0DEwr1oUVG3vzLloYRyTfqpWg_XekEd_', 1627959183, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('0P16pXOwqjC3Z8qgRxjnUv9hFZb2yYoh', 1628031694, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('2BUVHA-XNTnZwvxGMiiUZoc0cXfPx8X6', 1628019379, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"feli\",\"name\":\"Felipe\",\"surname\":\"Fontana\",\"nacimiento\":\"2003-08-30\",\"direccion\":\"18 de Julio, Joaquín Suarez 1832\",\"localidad\":\"Young\",\"profile\":\"/img/profile_picture.svg\",\"password\":\"123\",\"rol\":2}}}'),
('2PArXAjfU0hxDEsHXMhv4s961qhLEAh1', 1627959183, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('3uwD_eINSwwX3cU4qNWm-KsYgeJwLN9F', 1628026005, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('48N_l3iXgjkb0F_0AqFdyQYjV3fQxyg5', 1627960523, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('6LRoVFto2xYzAHnqGWI2Vb5Co171DhTA', 1628025956, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('88NizpU0YmzAXZtdEoaOjhTaChDXp24i', 1628035484, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"name\":\"Felipe\",\"surname\":\"Fontana\",\"username\":\"Bottafelipe\",\"nacimiento\":\"2003-08-30\",\"direccion\":\"17fidiwei\",\"localidad\":\"Fray Bentos\",\"profile\":\"/img/profile_picture.svg\",\"password\":\"123\",\"rol\":2,\"id\":0}}}'),
('AsmClNg1dLzCS69jnVuvv0GF76WLIW1t', 1627964258, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}'),
('AuL_FnU7zEvWxjfTwhfk5vH5RTTvp6cS', 1628031694, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('DyA7bk4r0pwxfRJzZFde2uf_qskxfMhm', 1627960523, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('ECrprkm51GY6QbdAxBJcvP0J4J3I-TNM', 1627960524, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('EZN81aGq_0q589BXMxCh4DibE9Bib5cU', 1628037611, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('GZC4t6EPSz-4JB6SaGzWmvfD20ytKqM1', 1628034421, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('GlqQFjfbFioTYD5E0OXYXO3zfQ9S9HJ_', 1628031694, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('GwMKhyMigT05VWPDRp-pXlbHgCkcetFU', 1628025956, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('I76q5-2XfiyWe2a16CvPq_Vm8HhzTagY', 1628031694, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('JGK0gyEl7GH3GoMZviyX3i1ArIy5KmbP', 1628025956, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('JJdIWhGyeIflP54YJq1S4i-VquKsHg54', 1628027025, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('JTfqUHCyq9KcllwtgSGTuCY4-WsYFxaY', 1627959230, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"fannybotta\",\"name\":\"Fanny\",\"surname\":\"Botta\",\"nacimiento\":\"1974-10-29\",\"direccion\":\"18 de Julio\",\"localidad\":\"Young\",\"profile\":\"/img/profile_picture.svg\",\"password\":\"123\",\"rol\":2}}}'),
('L-R7EobfqETS_AYylaYqKDVC3rbtlzag', 1627960523, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('QKOWmkOaMXxRp-f-Vx0as8jdArPoHXLK', 1628025956, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('TDVkJINR0LYvl53jBf1u2SNly0oVOWaA', 1628031696, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('VkerI_qJtiq17a2LcuVE_v69mMc5duVU', 1628026626, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('Wx1kCJCBXHU9dNu_M-q9WhP-QGzBdv5u', 1628034421, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('XDEbDhuLaI-POyLIAh_MqAAbncya5At9', 1628034421, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('Z9A5Gcqgt9Wz5cGCDGtkkZsCbdzN5vFN', 1628025166, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('Zy-BE__Dksrgxkeqnzx81hG9T-z2Cx92', 1627959183, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('cRuWGuEJSHtHirdNchGp9IjL5xrZXQ1z', 1628031694, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('cy0DAsqdQcfXhPNLH5fLvz5987J2DR60', 1627960523, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('ePs3XrU_VPboh-PRLPVa1C7i-ADCp_ME', 1628034421, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('gP22YfvgWZqSlTlwW4qFKdKlgJ2f4yBP', 1628025956, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('gv9X8MaDMn2XqcKRHfb5xMOwf8NU24m8', 1627960523, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('hJ4mDJI9KXYsPbRKeCASxJ6rJ0joz5TP', 1627951797, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}'),
('hvOMIMwtsTSmbKueAdabhKwIuYvG9M8y', 1628034421, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('ieDpZVmQ4yakfCXVgeKk95obHQeeAyij', 1627960523, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('kyPEOsxQW8qJRZeLxW7VwomkekJfnQX7', 1628025956, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('mdKc0YBvsnBVNJcEXNBh5b_IGQvIUHoK', 1628025956, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('mdjfd2naI5BR_rPBEtXeE2S5k6sRU5F7', 1627959183, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('oHwoE7a9aTrGpSX37DtSRLOTG5b73jPs', 1628031199, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"feli\",\"name\":\"Felipe\",\"surname\":\"Fontana\",\"nacimiento\":\"2003-08-30\",\"direccion\":\"18 de Julio, Joaquín Suarez 1832\",\"localidad\":\"Young\",\"profile\":\"/img/profile_picture.svg\",\"password\":\"123\",\"rol\":2}}}'),
('oNoEgdzLbsd780tUlBls3qTkyEQA_5Zp', 1628031694, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('oY_saKqQJBwDu1N53T9myYnII2Qj_2qR', 1627951596, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"feli\",\"name\":\"Felipe\",\"surname\":\"Fontana\",\"nacimiento\":\"2003-08-30T03:00:00.000Z\",\"direccion\":\"18 de Julio, Joaquín Suarez 1832\",\"localidad\":\"Young\",\"profile\":\"/img/profile_picture.svg\",\"password\":\"123\",\"rol\":2}}}'),
('pt_TVPG62HdtrmkaPBM4GeTR1Vyg4BpM', 1628025956, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('qR4klQtsvDTlC8mH58AbFsDaaUIetGZd', 1628020311, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"feli\",\"name\":\"Felipe\",\"surname\":\"Fontana\",\"nacimiento\":\"2003-08-30\",\"direccion\":\"18 de Julio, Joaquín Suarez 1832\",\"localidad\":\"Young\",\"profile\":\"/img/profile_picture.svg\",\"password\":\"123\",\"rol\":2}}}'),
('rN0y-pvnR-yj_djFbJzU0uj-kihLPqvl', 1627951832, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"feli\",\"name\":\"Felipe\",\"surname\":\"Fontana\",\"nacimiento\":\"2003-08-30T03:00:00.000Z\",\"direccion\":\"18 de Julio, Joaquín Suarez 1832\",\"localidad\":\"Young\",\"profile\":\"/img/profile_picture.svg\",\"password\":\"123\",\"rol\":2}}}'),
('s2Ef1ytxHAxhYwQPX1G-7iR10ijbge7h', 1628031694, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('uHGmnq4RyQDm2fPZKw5JJ7dqa0tg52A_', 1628034421, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('uMp8o3hL41HcXSRW819-Sdz-AaqnA6F_', 1627959183, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('wE7pfXXoxWEFWNbjZjLg3jXcnqaviOaP', 1628019829, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"feli\",\"name\":\"Felipe\",\"surname\":\"Fontana\",\"nacimiento\":\"2003-08-30\",\"direccion\":\"18 de Julio, Joaquín Suarez 1832\",\"localidad\":\"Young\",\"profile\":\"/img/profile_picture.svg\",\"password\":\"123\",\"rol\":2}}}'),
('wOPO9ZMRYhmuL0aBvcsquMl-E8i1dlpu', 1627959183, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('y6fWX_eusdWxAXjajLhb0QRtUQViaoxZ', 1627959183, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('ybtu8262ZoAj6SsW37JXJu9tXqCHtYCP', 1627960523, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('yql42_H-OdrABgsuAxQIhzy2E-Q82e0G', 1628025956, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('zLe0ewmUP8_qycK1lPKnFFBfjOn1F-Gn', 1628034971, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');

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
('Bottafelipe', 'Felipe', 'Fontana', '2003-08-30', '17fidiwei', 'Fray Bentos', '/img/profile_picture.svg', '123', 2),
('fannybotta', 'Fanny', 'Botta', '1974-10-29', '18 de Julio', 'Young', '/img/profile_picture.svg', '123', 2),
('feli', 'Felipe', 'Fontana', '2003-08-30', '18 de Julio, Joaquín Suarez 1832', 'Young', '/img/profile_picture.svg', '123', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id_booking`,`date_booking`,`start_booking`,`end_booking`),
  ADD KEY `ref_02` (`user`),
  ADD KEY `ref_03` (`cancha`);

--
-- Indices de la tabla `cancha`
--
ALTER TABLE `cancha`
  ADD PRIMARY KEY (`id_cancha`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

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
  MODIFY `id_booking` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

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
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `ref_01` FOREIGN KEY (`rol`) REFERENCES `roles` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
