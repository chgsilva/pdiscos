CREATE DATABASE  IF NOT EXISTS `pdiscos` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `pdiscos`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: pdiscos
-- ------------------------------------------------------
-- Server version	5.7.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Album`
--

DROP TABLE IF EXISTS `Album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Album` (
  `album_name` varchar(100) NOT NULL,
  `id_album` int(11) NOT NULL AUTO_INCREMENT,
  `album_year` smallint(4) DEFAULT NULL,
  `id_artist` int(11) NOT NULL,
  PRIMARY KEY (`id_album`),
  KEY `id_artista_fk_idx` (`id_artist`),
  CONSTRAINT `id_artista_fk` FOREIGN KEY (`id_artist`) REFERENCES `Artist` (`id_artist`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Album`
--

LOCK TABLES `Album` WRITE;
/*!40000 ALTER TABLE `Album` DISABLE KEYS */;
INSERT INTO `Album` VALUES ('Nada sem ela',59,2016,59),('Olindance',60,2011,59),('10 anos triunfo',61,2018,60),('Emicidio',62,2010,60),('Sawdust',63,2007,61),('Battle Born',64,2014,61),('Hot fuss',65,2004,61),('O menino que queria ser deus',66,2018,62),('Ainda ha tempo',67,2006,63),('blvesman',68,2018,64);
/*!40000 ALTER TABLE `Album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Album_Collection`
--

DROP TABLE IF EXISTS `Album_Collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Album_Collection` (
  `id_collection` int(11) NOT NULL,
  `id_album` int(11) NOT NULL,
  PRIMARY KEY (`id_collection`,`id_album`),
  KEY `DISCO_COLECAO_Disco_FK` (`id_album`),
  CONSTRAINT `DISCO_COLECAO_Colecao_FK` FOREIGN KEY (`id_collection`) REFERENCES `collection` (`id_collection`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `DISCO_COLECAO_Disco_FK` FOREIGN KEY (`id_album`) REFERENCES `album` (`id_album`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Album_Collection`
--

LOCK TABLES `Album_Collection` WRITE;
/*!40000 ALTER TABLE `Album_Collection` DISABLE KEYS */;
INSERT INTO `Album_Collection` VALUES (115,59),(115,60),(116,61),(116,62),(115,65),(116,66),(116,68);
/*!40000 ALTER TABLE `Album_Collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Artist`
--

DROP TABLE IF EXISTS `Artist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Artist` (
  `name_artist` varchar(100) NOT NULL,
  `id_artist` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id_artist`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Artist`
--

LOCK TABLES `Artist` WRITE;
/*!40000 ALTER TABLE `Artist` DISABLE KEYS */;
INSERT INTO `Artist` VALUES ('Academia da berlinda',59),('Emicida',60),('The killers',61),('Djonga',62),('Criolo',63),('Baco Exu do Blues',64);
/*!40000 ALTER TABLE `Artist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Collection`
--

DROP TABLE IF EXISTS `Collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Collection` (
  `name_collection` varchar(100) NOT NULL,
  `id_collection` int(11) NOT NULL AUTO_INCREMENT,
  `summary_collection` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_collection`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Collection`
--

LOCK TABLES `Collection` WRITE;
/*!40000 ALTER TABLE `Collection` DISABLE KEYS */;
INSERT INTO `Collection` VALUES ('Favoritas',115,'all time fav'),('Rap',116,'rap br');
/*!40000 ALTER TABLE `Collection` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-03  8:32:12
