-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 02 août 2021 à 19:01
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `postId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `comments_ibfk_3` (`postId`),
  KEY `comments_ibfk_4` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `content`, `createdAt`, `updatedAt`, `postId`, `userId`) VALUES
(40, 'xddsdvvdvs', '2021-08-01 20:46:29', '2021-08-01 20:46:29', 170, 72);

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `imageUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `posts_ibfk_1` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=190 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `title`, `content`, `imageUrl`, `createdAt`, `updatedAt`, `userId`) VALUES
(169, 'null', 'reeee', 'http://localhost:3000/images/sauce1627850484500.jpg', '2021-08-01 20:39:04', '2021-08-01 20:41:24', 72),
(170, 'Vacances', 'Trop cooool !!!', 'http://localhost:3000/images/boooo1627910372266.undefined', '2021-08-01 20:41:59', '2021-08-02 13:19:32', 72),
(184, 'mon post', 'salut !!', 'http://localhost:3000/images/sauce1627929636097.jpg', '2021-08-02 18:40:36', '2021-08-02 18:40:36', 72),
(185, 'mon post', 'salut !!', 'http://localhost:3000/images/sauce1627929640938.jpg', '2021-08-02 18:40:40', '2021-08-02 18:40:40', 72),
(186, 'mon post', 'salut !!', 'http://localhost:3000/images/sauce1627929644783.jpg', '2021-08-02 18:40:44', '2021-08-02 18:40:44', 72),
(187, 'mon post', 'salut !!', 'http://localhost:3000/images/sauce1627929645996.jpg', '2021-08-02 18:40:46', '2021-08-02 18:40:46', 72),
(188, 'salut', 'ça va', NULL, '2021-08-02 18:42:16', '2021-08-02 18:42:16', 72),
(189, 'toto', 'sa va ', NULL, '2021-08-02 18:44:19', '2021-08-02 18:44:19', 72);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)  
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(71, 'nono59@gmail.com', 'Nono59', '$2b$10$mpJweG1P4i0ykZ11vBVG/.6IewHvWGXdMEZobFGHOMHsoSCTCnUhO', 0, '2021-07-30 17:54:47', '2021-07-30 17:54:47'),
(72, 'momo59@gmail.com', 'Momo59', '$2b$10$SC3EwLiVO3tjD2TWMARAG.jmUga97xg.YU1e9aGRtSnGxJD8NmzVi', 1, '2021-07-31 14:32:07', '2021-07-31 14:32:07'),
(73, 'dada59@gmail.com', 'Dada59', '$2b$10$2fN.pylE.25ZjiEXoFIYU.kWeE2VvFfALVHnSIEDJzPKMgfoYWytu', 0, '2021-07-31 19:07:32', '2021-07-31 19:07:32');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_4` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
