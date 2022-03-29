

START TRANSACTION;
SET time_zone = "+00:00";


--
-- Database: `criptoventas_db`
--
CREATE DATABASE IF NOT EXISTS `criptoventas_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
USE criptoventas_db;

-- --------------------------------------------------------

--
-- Table structure for table `clase`
--

DROP TABLE IF EXISTS `clase`;
CREATE TABLE `clase` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `clase`
--

INSERT INTO `clase` (`id`, `nombre`) VALUES
(1, 'PLACAS DE VIDEO'),
(2, 'MEMORIAS RAM'),
(3, 'RIGS'),
(4, 'FUENTES'),
(5, 'PLACAS MADRE');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `marca` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `clase_id` int(11) NOT NULL,
  `precio` int(11) NOT NULL,
  `modelo` varchar(255) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `nombre`, `descripcion`, `marca`, `clase_id`, `precio`, `modelo`) VALUES
(27, 'Placa de video', 'Es una placa de video creada para mineria', 'Gigabyte', 1, 250, 'asd'),
(28, 'lalosdanfsdfpsdf', 'awdjkabsdbalskid', 'fuentesin 4', 3, 1231, 'asdff'),
(32, 'rig', 'rig de mineria', 'oiasndnas', 2, 1231, 'asd'),
(33, 'Rig de mineria', 'este es un rig de mineria', 'Miners', 3, 234, 'asd'),
(34, 'Placa Padre', 'es una placa madre usada para mineria', 'miners', 5, 3453, 'asd'),
(35, 'qweqweq', 'asdasdasdasdasdasdasdadasdasd', 'eee', 1, 12, 'asd'),
(36, 'asdasdasd', 'asdasdasdasd', 'asdasdasd', 1, 1231232, 'asdasdaasd');

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `nombre_imagen` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `producto_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`id`, `nombre_imagen`, `producto_id`) VALUES
(9, 'image-1646620950278.png', 27),
(10, 'image-1646621776921.png', 28),
(13, 'image-1647043691713.webp', 32),
(14, 'image-1647111351507.webp', 33),
(15, 'image-1647111461955.png', 34),
(16, 'image-1647307925659.jpg', 35),
(17, 'image-1647384919864.jpg', 36);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `apellido` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `contraseña` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `rol` int(11) NOT NULL,
  `img` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nombre`, `apellido`, `email`, `contraseña`, `rol`, `img`) VALUES
(1, 'Prueba jeje', 'Prueba', 'prueba@gmail.com', '$2b$12$0./pUqpxCuHe8qw7SuZMQOBrJk.Y7BYSXzGJecLRf37UZ/aTXr8jO', 2, '/imagen'),
(26, 'Esteban', 'Tellechea', 'esteban@esteban.com', '$2b$10$7W8s9A3LKMTVl0doGzUGfu8IbOQAaNU9TJVbrGDTE5noybnVpVDKC', 1, 'nouserimage.jpg'),
(27, 'ESRTSERSER', 'SDFSDFSDFSDF', 'estebanquito@gmail.com', '$2b$10$i.WlwkxXegenuCWmFDFWseu1jAaxVDZsuYV/4pvpCNkVj/2k0DB5u', 1, 'nouserimage.jpg'),
(28, 'Estebanquito', 'BOZA', 'facu@facu.com', '$2b$10$vEEW1fAAhVPJnbiuO84nmeTDPxqje0kMfz9xTZAVfhYvqpdEIhTsa', 1, 'nouserimage.jpg'),
(29, 'fasdfsdfsdf', 'sdfsdggqasfasd', 'pupi@gmail.com', '$2b$10$bYvCGpWZVgMREDsZFhzqQezG2ych9HWTZTzaLZTpXBCYxmK/cHzIS', 1, 'nouserimage.jpg'),
(31, 'fsefsefsdfsd', 'sefsefser', 'horse@horse.com', '$2b$10$KcsIkHWNstRmIUEkf63lSeObiia9Z3y2jjI6yuoZ.7uVEdOKmAcba', 1, 'image-1647041413844.png'),
(32, 'chorcasss', 'chorcassss', 'chorcasss@chorcasss.com', '$2b$10$7BYxphag6npPLp/oDi8.5uLxAKxDTloNGRZd4BZVfFBiqBGXT9M1y', 1, 'image-1647041713008.png'),
(33, 'Chorcas', 'asjodnbaosd', 'chorcas@hotmail.com', '$2b$10$ZtYIC6ZyMehTAX.L87yJK.gPidD9N5A5bGqOKrE2HxzGEnx9CW0Ya', 1, 'image-1647041936092.Png'),
(34, 'asdbasodjasd', 'chochocho', 'nabobarreto@gmail.com', '$2b$10$jJhaea8LuQxJeALRztn.xOd/oNPwylDV/CkmHmbcRAJaWOYsC/ytG', 1, 'image-1647043156142.png'),
(35, 'Admin admin', 'admin', 'admin@admin.com', '$2b$10$uXOwsLPz6diyuWkOJ.CLAuqh8b1h5.VR0brlSXV.XzDbl0g0S4KOG', 2, 'image-1647304549086.jpg'),
(47, 'ww', 'qweqwe', 'jukjuku@gmail.com', '$2b$10$6qjtKrthXkH2AFBEoDFRhOKjbIzRXDtfqwK1UAAlXT/nFDaqH4e4u', 1, 'nouserimage.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clase`
--
ALTER TABLE `clase`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PRODUCT_CLASE` (`clase_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `imagenes` (`producto_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clase`
--
ALTER TABLE `clase`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `PRODUCT_CLASE` FOREIGN KEY (`clase_id`) REFERENCES `clase` (`id`);

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `imagenes` FOREIGN KEY (`producto_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
