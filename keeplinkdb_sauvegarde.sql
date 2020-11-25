-- MySQL dump 10.13  Distrib 8.0.22, for osx10.15 (x86_64)
--
-- Host: localhost    Database: keeplinkdb
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Comments`
--

DROP TABLE IF EXISTS `Comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `Posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comments`
--

LOCK TABLES `Comments` WRITE;
/*!40000 ALTER TABLE `Comments` DISABLE KEYS */;
INSERT INTO `Comments` VALUES (13,17,40,'jhsdjhkjqs','2020-11-23 13:16:50','2020-11-23 13:16:50');
/*!40000 ALTER TABLE `Comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Posts`
--

DROP TABLE IF EXISTS `Posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `content` varchar(255) NOT NULL,
  `attachments` varchar(255) DEFAULT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Posts`
--

LOCK TABLES `Posts` WRITE;
/*!40000 ALTER TABLE `Posts` DISABLE KEYS */;
INSERT INTO `Posts` VALUES (33,1,'Test commentaire','http://localhost:3000/images/P1070650_1605633194305.jpg',NULL,'2020-11-17 17:13:14','2020-11-17 17:13:14'),(34,1,'Test avec un gif','http://localhost:3000/images/giphy_1_1605634097562.webp',NULL,'2020-11-17 17:28:17','2020-11-17 17:28:17'),(35,1,'Voici un article qui devrait vous plaire.\nLien : https://medium.com/',NULL,NULL,'2020-11-17 17:28:48','2020-11-17 17:28:48'),(40,17,'slkjsd','http://localhost:3000/images/DSC06660_1606137400036.jpg',NULL,'2020-11-23 13:16:40','2020-11-23 13:16:40');
/*!40000 ALTER TABLE `Posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20201014132045-create-users.js'),('20201014132121-create-posts.js'),('20201014132132-create-comments.js'),('20201030105231-emailUniqueForUser.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lastName` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `permission` tinyint(1) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Deweerdt','Victor','victor@gmail.com','$2b$10$SaTezV.rVZNDh8VkHAMTr.N8j1HSmrRdEu8ClgdLTQD610CqhPJSK',1,'http://localhost:3000/images/DSC04322_1605633169521.jpg','2020-11-13 09:52:27','2020-11-17 17:12:49'),(2,'Tei','Hamza','hamza@gmail.com','$2b$10$RcNilEE6TIgwJ1gJPPHpn./3P6s/B4S351SsMFwcDZppgHW/v68P6',0,'http://localhost:3000/images/userProfil.jpg1604999623448.jpg','2020-11-13 09:55:30','2020-11-17 09:48:16'),(15,'Deweerdt','Lara','lara@gmail.com','$2b$10$2ECkO9ZZMjrsIrtXRsrie.CRuDUWdB9JVSD19syCTUvlUWsuUdRG2',0,'http://localhost:3000/images/DSC04543_1605634395719.jpg','2020-11-17 17:32:29','2020-11-17 17:33:15'),(17,'eyssette','Carine','carine@gmail.com','$2b$10$Su7QpFbe43uJ7SxhiwgMvebgf1Lec/iqpnqnswcR9QHq4iS5QU1Ri',0,'http://localhost:3000/images/DSC06660_1606137455643.jpg','2020-11-23 13:15:27','2020-11-23 13:17:35'),(18,'Seger','Marc','marc@gmail.com','$2b$10$sOsSksrX9QNFQlxJoybTGexSA3.d4NUx1o0pOVudTxRqsFOgJjBSu',0,'http://localhost:3000/images/userProfil.jpg1604999623448.jpg','2020-11-24 10:11:33','2020-11-24 10:11:33'),(19,'Gerard','Hubert','hubert@gmail.com','$2b$10$N1SyHzIr0.vqAyb8rLGWlO6J3r.EHPX/UN1f.4UCnlhC9SM84ar4G',0,'http://localhost:3000/images/userProfil.jpg1604999623448.jpg','2020-11-25 12:54:18','2020-11-25 12:54:18'),(20,'Caer','Lea','lea@gmail.com','$2b$10$eMAokWWAHZ2aB3JVStWSuuuqOZIzYA9Y7A1/AMbRJ3aiw/tsk2KYS',0,'http://localhost:3000/images/userProfil.jpg1604999623448.jpg','2020-11-25 14:13:29','2020-11-25 14:13:29'),(21,'Martin','Tangy','tangy@gmail.com','$2b$10$7tcyn.ZMFsH1ZB2hc5ttreLMe5UGOpEQ7ThCVuzgSMmbnMb4oDGk6',0,'http://localhost:3000/images/userProfil.jpg1604999623448.jpg','2020-11-25 17:40:17','2020-11-25 17:40:17');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-25 19:07:56
