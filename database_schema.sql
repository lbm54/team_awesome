-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: meetupprojectdb
-- ------------------------------------------------------
-- Server version	5.7.21

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
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (4,'hey',2,'2018-07-25 13:23:32',NULL,2),(5,'hey there',2,'2018-07-25 13:25:36',NULL,2),(6,'hey',2,'2018-07-25 13:59:00',85,NULL);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (2,'2008-10-03 22:59:52','2008-10-03 22:59:52',91,'new eventss',NULL,'2018-07-24 14:19:17'),(3,'2008-10-04 00:00:00','2008-10-04 00:00:00',91,'gggg',NULL,'2018-07-25 13:28:54');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `events_tags`
--

LOCK TABLES `events_tags` WRITE;
/*!40000 ALTER TABLE `events_tags` DISABLE KEYS */;
INSERT INTO `events_tags` VALUES (2,107,'2018-07-24 14:19:17'),(2,108,'2018-07-24 14:19:17'),(3,108,'2018-07-25 13:39:06'),(3,109,'2018-07-25 13:39:06');
/*!40000 ALTER TABLE `events_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `events_users`
--

LOCK TABLES `events_users` WRITE;
/*!40000 ALTER TABLE `events_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `events_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (81,'Team Awesome Group2',93,2,'test',NULL,'2018-07-25 09:15:25','hey','2008-10-03 22:59:52','2008-10-03 22:59:52','Tuesday'),(82,'Team Awesome Group23',94,2,'test',NULL,'2018-07-25 09:17:16','hey','2008-10-03 22:59:52','2008-10-03 22:59:52','Tuesday'),(83,'Team Awesome Group234',95,2,'test',NULL,'2018-07-25 09:17:51','hey','2008-10-03 22:59:52','2008-10-03 22:59:52','Tuesday'),(85,'Team Awesome Group2345',97,2,'test',NULL,'2018-07-25 09:18:37','hey','2008-10-03 22:59:52','2008-10-03 22:59:52','Tuesday'),(86,'will this worksssss',97,2,'test',NULL,'2018-07-25 14:06:27','hey',NULL,NULL,'Tuesday');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `groups_tags`
--

LOCK TABLES `groups_tags` WRITE;
/*!40000 ALTER TABLE `groups_tags` DISABLE KEYS */;
INSERT INTO `groups_tags` VALUES (85,1,'2018-07-25 09:18:37'),(85,109,'2018-07-25 09:18:37'),(86,107,'2018-07-25 14:06:51');
/*!40000 ALTER TABLE `groups_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `groups_users`
--

LOCK TABLES `groups_users` WRITE;
/*!40000 ALTER TABLE `groups_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `groups_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (91,'3977 River Pointe Lane','test123','Birmingham','Alabama','35216','2018-07-24 14:07:06','test'),(93,NULL,NULL,NULL,NULL,NULL,'2018-07-25 09:15:25',NULL),(94,NULL,NULL,NULL,NULL,NULL,'2018-07-25 09:17:16',NULL),(95,NULL,NULL,NULL,NULL,NULL,'2018-07-25 09:17:51',NULL),(96,NULL,NULL,NULL,NULL,NULL,'2018-07-25 09:18:33',NULL),(97,NULL,NULL,NULL,NULL,NULL,'2018-07-25 09:18:37',NULL),(98,'3977 River Pointe Lane','test123','Birmingham','Alabama','35216','2018-07-25 12:22:11',NULL),(99,'3977 River Pointe Lane','test123','Birmingham','Alabama','35216','2018-07-25 12:31:49',NULL),(103,NULL,NULL,NULL,NULL,NULL,'2018-07-25 12:45:22',NULL),(104,'3977 River Pointe Lane','test','Birmingham','Alabama','35216','2018-07-25 13:01:53','test2'),(106,'3977 River Pointe Lane','test123','Birmingham','Alabama','35216','2018-07-25 13:02:44','testggghh'),(107,NULL,NULL,NULL,NULL,NULL,'2018-07-25 14:06:27',NULL);
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'foo','2018-07-24 14:27:16'),(107,'new tag 1changed12345','2018-07-24 14:19:17'),(108,'new tag 2','2018-07-24 14:19:17'),(109,'Samwise','2018-07-25 09:18:37'),(110,'testtesttest','2018-07-25 12:24:26'),(113,'testtesttest123','2018-07-25 12:28:02'),(114,'testtesttest123ggg','2018-07-25 12:29:31'),(116,'foogg','2018-07-25 13:03:16');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'lee.b.martin@gmail.com','$2b$12$HCWN/ND/GPO5ClPioSM5UO74OOkAJhppfarTMs00jmNsRTlPpN0ga','2018-07-24 14:07:06',91,'testtesttest','Lee','C','Martin',NULL,'205-902-3043','lbm54'),(3,'lee.b.martin@gmail.com1235677','$2b$12$XeDX27gT/pQVWLv6zfst3On5N2eFdrjXI9JWyNmfcVwuiHPQ/1cZS','2018-07-25 12:48:52',NULL,'test','Lee','C','Martin',NULL,'205-902-3043','lbm54'),(4,'1','$2b$12$8ddLdEutporvuAQJ9nuanelBLNXv9tJ51I4r61ODu8L8OmJpM/fJK','2018-07-25 12:50:14',NULL,'test','Lee','C','Martin',NULL,'205-902-3043','lbm54'),(5,'2','$2b$12$1nQFxsUnK.eB0GqMKqNtN.WJzcBc.dq.t9EYRngpgGC5gRyJJa3zG','2018-07-25 12:52:18',NULL,'test','Lee','C','Martin',NULL,'205-902-3043','lbm54'),(6,'23','$2b$12$rcNnCMIgbwf/q2DajS7csuVHuyOktpQngyqOQiDHPBNR4gP/OHp0W','2018-07-25 12:53:11',NULL,'test','Lee','C','Martin',NULL,'205-902-3043','lbm54'),(7,'234','$2b$12$6Rt1AetTZv1i7NByHAwpjOfC5wWpkB8vcv8ITjpT6r6puZfKpfp5u','2018-07-25 12:53:47',91,'test','Lee','C','Martin',NULL,'205-902-3043','lbm54'),(8,'2345','$2b$12$Y5.DZvAiwE.hzCKHHFQqG.YS5.PW82TedIn0d.ZtXr/4iGSvvJPaK','2018-07-25 12:54:48',NULL,'test1','Lee','C','Martin',NULL,'205-902-3043','lbm54'),(9,'23456','$2b$12$FRqav2rfWE6nETCS8iIDr.72WyEgWhiR0w87u.wwo7fp2YnLzT9DO','2018-07-25 12:55:32',91,'test1','Lee','C','Martin',NULL,'205-902-3043','lbm54'),(11,'1lee.b.martin@gmail.com','$2b$12$JkVxRAtyBoYsKukwHIJyCeM21.aQG5f9xZKQRYAuDSaDOr.udJQLO','2018-07-25 12:59:09',91,'test1','Lee','C','Martin',NULL,'205-902-3043','lbm54'),(12,'12lee.b.martin@gmail.com','$2b$12$Zf6lFnVoSRVuKfyj/cIT.OREmnG6nrX8VP/NphVc8Ws7wYyS51F6u','2018-07-25 13:01:54',104,'test1','Lee','C','Martin',NULL,'205-902-3043','lbm54');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-25 15:32:09
