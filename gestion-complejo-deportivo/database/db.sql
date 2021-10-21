-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-10-2021 a las 20:07:06
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
(1, '195962628-612afc3a-7a1e-4560-87eb-6e5d7ce51ace', 'Fútbol 5', 30, 10, 'Una simple cancha de fútbol 5 de césped sintético.');

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
('0DmURngPc57JYOPsL0HdxiKMtQMnYSpa', 1634884674, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('1YSubgRJQORgioTpJdy9YflO5QSxUruS', 1634884674, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('2UcFsPQwgFMH0sBQcQRoLv18_dEZtH_f', 1634923823, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('2yfv29wv73PCRSwRMFNushQVY7fYSQVm', 1634878006, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"elfontii\",\"email\":\"feluubotta685@gmail.com\",\"name\":\"Felipe\",\"surname\":\"Fontana Botta\",\"nacimiento\":\"2003-08-30\",\"direccion\":\"18 de Julio, Joaquin Suarez\",\"localidad\":\"Young\",\"profile\":\"profile_picture_2.svg\",\"password\":\"$2a$10$quVbgqcOmsBAGsI5kTQ1IeSNxGvx4IIbKo43X2qWjGwr1UXg.NNwu\",\"rol\":2,\"gen\":1,\"isProminent\":{\"type\":\"Buffer\",\"data\":[0]},\"created_at\":\"2021-10-15\"}}}'),
('5fCs9Y3a8ad-_UL02-f-a3H8pUv6pyYq', 1634923823, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('ANiIuxEwlG6nMq8fF-uPcD6WibV9ZJ2Q', 1634877072, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('AVQamquLeOlDcVupYlc0jxZZVThq5cDW', 1634884674, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('CLUmnF32tRIvehqCNzJmB3Bxdj0pD3Dm', 1634881887, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('CpcdK94v9XzbtYXj5fH6U3PtXo9peieO', 1634881313, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"elfontii\",\"email\":\"feluubotta685@gmail.com\",\"name\":\"Felipe\",\"surname\":\"Fontana Botta\",\"nacimiento\":\"2003-08-30\",\"direccion\":\"18 de Julio, Joaquin Suarez\",\"localidad\":\"Young\",\"profile\":\"profile_picture_2.svg\",\"password\":\"$2a$10$quVbgqcOmsBAGsI5kTQ1IeSNxGvx4IIbKo43X2qWjGwr1UXg.NNwu\",\"rol\":2,\"gen\":1,\"isProminent\":{\"type\":\"Buffer\",\"data\":[0]},\"created_at\":\"2021-10-15\"}}}'),
('DNEBUqh2XBlj9O7-NTrpraVAMOx9_75H', 1634881687, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('DzWdrT3Vc9-Fqg2aHgvt_OOTBtjeuaRH', 1634884674, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('DzWr_HZeqfiLYStXxh0L5XiREyanM1Wo', 1634923823, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('FtdPfE4zrtoL104dPbpjN0bPw_CikUE-', 1634888670, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('GYSMwVgBwqLCSdcPbP1t39jSjDxVezrs', 1634884674, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('I5Ivp5JU0EMLSNycoQZShzPJrPxU-IBf', 1634925982, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}'),
('Ip2MBHveELstqufubjQXOrP6vJVPpKwK', 1634877111, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('JGV-EhK3bH_n1Fu9R-Oqmo-jrfAFZs-q', 1634885315, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"elfontii\",\"email\":\"feluubotta685@gmail.com\",\"name\":\"Felipe\",\"surname\":\"Fontana Botta\",\"nacimiento\":\"2003-08-30\",\"direccion\":\"18 de Julio, Joaquin Suarez\",\"localidad\":\"Young\",\"profile\":\"profile_picture_2.svg\",\"password\":\"$2a$10$quVbgqcOmsBAGsI5kTQ1IeSNxGvx4IIbKo43X2qWjGwr1UXg.NNwu\",\"rol\":2,\"gen\":1,\"isProminent\":{\"type\":\"Buffer\",\"data\":[0]},\"created_at\":\"2021-10-15\"}}}'),
('JKs3N39nAlLw6AM1vWHMejORGA601ypA', 1634923823, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('NI1aIMWmSSip_zzcacGzQ0x7cxUmBKcw', 1634881685, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('NULXr9Sxv0jSX8KUwyYQKUKuc89PwRq2', 1634923823, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('Nod_dMK58JzLbv9J2jKjkowq6YISMcAB', 1634923823, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('PMAT4SRKqcirifCslSss8G66RzWj0n4T', 1634884674, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('R8xsUTCJs11wp112JMAXwbzcoVmD0irU', 1634881686, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('SPyOxI4n4k7Rn2HHOjZruaenSu5zyZXg', 1634877403, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"email\":\"nicolecam24@icloud.com\",\"name\":\"Nicole\",\"surname\":\"Camaño\",\"username\":\"nicolecam24@icloud.com\",\"nacimiento\":\"2021-10-21\",\"direccion\":\"Doctor José Martirené\",\"localidad\":\"Young\",\"profile\":\"profile_picture_girl\",\"password\":\"$2a$10$Pd2fhLarEtsiEQ1yKx0ia.g7IHikk41IJlMfW8qh3EO9ntArP53xy\",\"gen\":\"2\",\"rol\":2,\"id\":0}}}'),
('T66lXFOfXC1s5aqGzHd-9s8QMZnBJx3z', 1634888670, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('XDMcn6svxVjgIRdVhE_ah6Xl_psW1WQS', 1634923823, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('Xpx8pvs0c_5cd1ECAfBjrdMWmG4qbjzP', 1634881715, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('Y3Mc2PMuhXv--6lgducspgz833zjwvPM', 1634884674, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('ZGg3N-cbRmqVK8DQFm3aQwIUl3kFOgCY', 1634884674, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('_0ZHfZunaQm0F9bFIRVbZFq6PBdVJEUP', 1634884674, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('_gBjhC98BxknuyHXwn_oE1QHzGBzRl4Z', 1634888670, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('aNkOYzGhqxSOncReOPtuSy9wT8vaf-k5', 1634923823, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('aXUp08XVz4wQgty0BUoxlWXdC2lZ0h9E', 1634888670, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('c_fP1Et5-1ynma87f-fl5_SkO_LVnvdE', 1634888670, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('dp7FsvGtph1ExukGGwnaW2q8FbsAv8xH', 1634884674, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('eQ1c7YKj5sHka0d9WP-1w5NPshlx8-xJ', 1634923824, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('fUL7pi4d3_aax0Uev2Lu1Y91EAhW_tGK', 1634884674, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('fduITs4zc69937cJj4JIBGMjzZ4wwQDm', 1634881693, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('gxyDUtvfEwXcgs1JMz-N4xDSPWGwyvBh', 1634888670, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('juGZ2twF-GiHe0A2S74WmfmcckgY29Ts', 1634923823, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('kPRIgpSsFZkUcKyJSaUX_rhXr9L8wI-v', 1634888681, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"elfontii\",\"email\":\"feluubotta685@gmail.com\",\"name\":\"Felipe\",\"surname\":\"Fontana Botta\",\"nacimiento\":\"2003-08-30\",\"direccion\":\"18 de Julio, Joaquin Suarez\",\"localidad\":\"Young\",\"profile\":\"profile_picture_2.svg\",\"password\":\"$2a$10$quVbgqcOmsBAGsI5kTQ1IeSNxGvx4IIbKo43X2qWjGwr1UXg.NNwu\",\"rol\":2,\"gen\":1,\"isProminent\":{\"type\":\"Buffer\",\"data\":[0]},\"created_at\":\"2021-10-15\"}}}'),
('kn0nDzUx2N3meKtHSfJoD3_FrVWJdD9W', 1634923823, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('l9aAQPuGcYz7i3tM3Wi92siiTfJ2-Ej-', 1634888670, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('lLdMeEdjV0iXnPWOEQMzYSIEcu6tfGxW', 1634884674, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('m8jnrmHrF4Cmge0WES7dgXRdjG1ocVtK', 1634923823, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('mRFTiWFYrKLV0yp4S1-BG5Vwu6jt6EAD', 1634881686, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('msesqwr2v77oDvArdH28ukEtdFcdJ1hv', 1634884700, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"elfontii\",\"email\":\"feluubotta685@gmail.com\",\"name\":\"Felipe\",\"surname\":\"Fontana Botta\",\"nacimiento\":\"2003-08-30\",\"direccion\":\"18 de Julio, Joaquin Suarez\",\"localidad\":\"Young\",\"profile\":\"profile_picture_2.svg\",\"password\":\"$2a$10$quVbgqcOmsBAGsI5kTQ1IeSNxGvx4IIbKo43X2qWjGwr1UXg.NNwu\",\"rol\":2,\"gen\":1,\"isProminent\":{\"type\":\"Buffer\",\"data\":[0]},\"created_at\":\"2021-10-15\"}}}'),
('nj0075AEboNcfB6J5AwnZzZMVGpBtnDf', 1634888670, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('oJ_bBP8E3fwK3ABFdJKGV5Zr9aiK4gyJ', 1634888670, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('pTC7uk8BrDdm3RtS0HquXNZPszdtmVBY', 1634880756, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"elfontii\",\"email\":\"feluubotta685@gmail.com\",\"name\":\"Felipe\",\"surname\":\"Fontana Botta\",\"nacimiento\":\"2003-08-30\",\"direccion\":\"18 de Julio, Joaquin Suarez\",\"localidad\":\"Young\",\"profile\":\"profile_picture_2.svg\",\"password\":\"$2a$10$quVbgqcOmsBAGsI5kTQ1IeSNxGvx4IIbKo43X2qWjGwr1UXg.NNwu\",\"rol\":2,\"gen\":1,\"isProminent\":{\"type\":\"Buffer\",\"data\":[0]},\"created_at\":\"2021-10-15\"}}}'),
('qKr1SntREaJSu8AJ-iNiZ9Mjex7rposu', 1634888363, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"elfontii\",\"email\":\"feluubotta685@gmail.com\",\"name\":\"Felipe\",\"surname\":\"Fontana Botta\",\"nacimiento\":\"2003-08-30\",\"direccion\":\"18 de Julio, Joaquin Suarez\",\"localidad\":\"Young\",\"profile\":\"profile_picture_2.svg\",\"password\":\"$2a$10$quVbgqcOmsBAGsI5kTQ1IeSNxGvx4IIbKo43X2qWjGwr1UXg.NNwu\",\"rol\":2,\"gen\":1,\"isProminent\":{\"type\":\"Buffer\",\"data\":[1]},\"created_at\":\"2021-10-15\"}}}'),
('rXbIKOdzP5fuuAuKp5N8P-wvEcop9nXf', 1634888670, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('rsa7WIMWpbKyrnhwdRDSunMc6xaRyd6y', 1634884674, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('uICUW5K8ev2S7SUecdx-DBxbfwgrWVbb', 1634884674, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('vRdNeIY5RoNNznwrCgLo5sc1n9RKCLKb', 1634888670, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('wglncwO2JolJbMGzZ93afDQqPDNZc-pd', 1634889285, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"elfontii\",\"email\":\"feluubotta685@gmail.com\",\"name\":\"Felipe\",\"surname\":\"Fontana Botta\",\"nacimiento\":\"2003-08-30\",\"direccion\":\"18 de Julio, Joaquin Suarez\",\"localidad\":\"Young\",\"profile\":\"profile_picture_2.svg\",\"password\":\"$2a$10$quVbgqcOmsBAGsI5kTQ1IeSNxGvx4IIbKo43X2qWjGwr1UXg.NNwu\",\"rol\":2,\"gen\":1,\"isProminent\":{\"type\":\"Buffer\",\"data\":[0]},\"created_at\":\"2021-10-15\"}}}'),
('xInkwjfu7tLsesbW8SlhJUuS2kCoa4_C', 1634888670, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('xfN9Dt7o_HXVkWoijPKBcTKbeHdlpHHK', 1634888670, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('yeuf5SlZUE_dIwe201b70f9lBCRqtSux', 1634923823, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('yvIFyPWKj5ZIXNIEa-7wtz1E0HoSaHbU', 1634884606, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"username\":\"elfontii\",\"email\":\"feluubotta685@gmail.com\",\"name\":\"Felipe\",\"surname\":\"Fontana Botta\",\"nacimiento\":\"2003-08-30\",\"direccion\":\"18 de Julio, Joaquin Suarez\",\"localidad\":\"Young\",\"profile\":\"profile_picture_2.svg\",\"password\":\"$2a$10$quVbgqcOmsBAGsI5kTQ1IeSNxGvx4IIbKo43X2qWjGwr1UXg.NNwu\",\"rol\":2,\"gen\":1,\"isProminent\":{\"type\":\"Buffer\",\"data\":[0]},\"created_at\":\"2021-10-15\"}}}'),
('z0-PmAAnhQBXVvDnFbb7ZBBtq04fPG6a', 1634923823, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('zNwreD1qh_S6R45oo6C1x5MGT1OAGQfL', 1634876964, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('zc8HquzfoaWF2Ii5EMnKxFP_zRIwkhyW', 1634923823, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('zt1hwWPTgpnpMkXux5xnj1Rhn13SjPkV', 1634888670, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');

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
  MODIFY `id_booking` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `cancha`
--
ALTER TABLE `cancha`
  MODIFY `id_cancha` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  ADD CONSTRAINT `fk_cancha` FOREIGN KEY (`cancha`) REFERENCES `cancha` (`id_cancha`),
  ADD CONSTRAINT `ref_02` FOREIGN KEY (`user`) REFERENCES `users` (`username`);

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
