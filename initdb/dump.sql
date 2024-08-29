-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: gcid
-- ------------------------------------------------------
-- Server version	11.5.2-MariaDB-ubu2404

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
-- Table structure for table `area`
--

DROP TABLE IF EXISTS `area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `area` (
  `id` varchar(36) NOT NULL,
  `areanome` varchar(60) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id` varchar(36) NOT NULL,
  `cnpj` varchar(14) DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `email` varchar(256) DEFAULT NULL,
  `telefone` varchar(15) DEFAULT NULL,
  `endereco` varchar(100) DEFAULT NULL,
  `userId` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_e20981b80ef5571232c163f6a4` (`userId`),
  CONSTRAINT `FK_e20981b80ef5571232c163f6a4e` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES ('06abd9d4-2b94-41ef-8a65-3bfdde25b632','43375930000990','DENSO INDUSTRIAL DA AMAZONIA LTDA','denso@email.com','(92) 2121-4200','Avenida Buriti, 3600, Distrito Industrial I','1067539f-fc4f-466d-a87b-ed63581b038e');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conhecimento_projeto`
--

DROP TABLE IF EXISTS `conhecimento_projeto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conhecimento_projeto` (
  `projetoId` varchar(36) NOT NULL,
  `areaId` varchar(36) NOT NULL,
  PRIMARY KEY (`projetoId`,`areaId`),
  KEY `IDX_0ee323d56234ca72b6031b85e2` (`projetoId`),
  KEY `IDX_d2400c12fd6d18cf26f64748bc` (`areaId`),
  CONSTRAINT `FK_0ee323d56234ca72b6031b85e24` FOREIGN KEY (`projetoId`) REFERENCES `projeto` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_d2400c12fd6d18cf26f64748bc5` FOREIGN KEY (`areaId`) REFERENCES `area` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conhecimento_projeto`
--

LOCK TABLES `conhecimento_projeto` WRITE;
/*!40000 ALTER TABLE `conhecimento_projeto` DISABLE KEYS */;
/*!40000 ALTER TABLE `conhecimento_projeto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipe`
--

DROP TABLE IF EXISTS `equipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipe` (
  `id` varchar(36) NOT NULL,
  `equnome` varchar(60) NOT NULL,
  `equinstituto` varchar(60) NOT NULL,
  `data_criacao` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `projetoId` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_87e53dc88c465099ab6efb0b8c7` (`projetoId`),
  CONSTRAINT `FK_87e53dc88c465099ab6efb0b8c7` FOREIGN KEY (`projetoId`) REFERENCES `projeto` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipe`
--

LOCK TABLES `equipe` WRITE;
/*!40000 ALTER TABLE `equipe` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipe_talento`
--

DROP TABLE IF EXISTS `equipe_talento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipe_talento` (
  `id` varchar(36) NOT NULL,
  `cargo` varchar(100) NOT NULL,
  `equipeId` varchar(36) DEFAULT NULL,
  `talentoId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a8f36f7bdd1f314681a847caf70` (`equipeId`),
  KEY `FK_aa2d2eac602ff05b17cac8f06a4` (`talentoId`),
  CONSTRAINT `FK_a8f36f7bdd1f314681a847caf70` FOREIGN KEY (`equipeId`) REFERENCES `equipe` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_aa2d2eac602ff05b17cac8f06a4` FOREIGN KEY (`talentoId`) REFERENCES `talento` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipe_talento`
--

LOCK TABLES `equipe_talento` WRITE;
/*!40000 ALTER TABLE `equipe_talento` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipe_talento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experiencia`
--

DROP TABLE IF EXISTS `experiencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experiencia` (
  `id` varchar(36) NOT NULL,
  `exptitulo` varchar(60) NOT NULL,
  `expinstituicao` varchar(60) NOT NULL,
  `expdtinicio` datetime NOT NULL,
  `expdtfim` datetime NOT NULL,
  `expdescricao` varchar(60) NOT NULL,
  `talentoId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c18d85921a4987b4dde9fece1ea` (`talentoId`),
  CONSTRAINT `FK_c18d85921a4987b4dde9fece1ea` FOREIGN KEY (`talentoId`) REFERENCES `talento` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiencia`
--

LOCK TABLES `experiencia` WRITE;
/*!40000 ALTER TABLE `experiencia` DISABLE KEYS */;
/*!40000 ALTER TABLE `experiencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habilidade`
--

DROP TABLE IF EXISTS `habilidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habilidade` (
  `id` varchar(36) NOT NULL,
  `habnome` varchar(60) NOT NULL,
  `habnivel` int(11) NOT NULL,
  `experienciaId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_36d777daef4ddfbf3ab5616e5e9` (`experienciaId`),
  CONSTRAINT `FK_36d777daef4ddfbf3ab5616e5e9` FOREIGN KEY (`experienciaId`) REFERENCES `experiencia` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habilidade`
--

LOCK TABLES `habilidade` WRITE;
/*!40000 ALTER TABLE `habilidade` DISABLE KEYS */;
/*!40000 ALTER TABLE `habilidade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `idioma`
--

DROP TABLE IF EXISTS `idioma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `idioma` (
  `id` varchar(36) NOT NULL,
  `idinome` varchar(60) NOT NULL,
  `idinivel` int(11) NOT NULL,
  `talentoId` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_07c7a4278e7c1ccddbe6b10c360` (`talentoId`),
  CONSTRAINT `FK_07c7a4278e7c1ccddbe6b10c360` FOREIGN KEY (`talentoId`) REFERENCES `talento` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `idioma`
--

LOCK TABLES `idioma` WRITE;
/*!40000 ALTER TABLE `idioma` DISABLE KEYS */;
/*!40000 ALTER TABLE `idioma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instituto`
--

DROP TABLE IF EXISTS `instituto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instituto` (
  `id` varchar(36) NOT NULL,
  `instcnpj` varchar(14) NOT NULL,
  `instnome` varchar(60) NOT NULL,
  `instendereco` varchar(60) NOT NULL,
  `instcidade` varchar(60) NOT NULL,
  `instestado` varchar(60) NOT NULL,
  `insttelefone` varchar(13) NOT NULL,
  `instemail` varchar(60) NOT NULL,
  `instdescricao` varchar(255) NOT NULL DEFAULT '',
  `intranking` decimal(3,2) NOT NULL DEFAULT 5.00,
  `userId` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_8ff78cc43cda7a72bf5ba44523` (`userId`),
  CONSTRAINT `FK_8ff78cc43cda7a72bf5ba445236` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instituto`
--

LOCK TABLES `instituto` WRITE;
/*!40000 ALTER TABLE `instituto` DISABLE KEYS */;
INSERT INTO `instituto` VALUES ('32851822-4a1f-47af-a575-6e19e7a620bb','05123972000278','Centro de P e D Em Tecnologia de Software','Avenida Governador Danilo Areosa, 1199, Bloco J e K','manaus','amazonas','33081121','icts@email.com','',5.00,'6b80e047-d36e-4b38-804c-f6fdb3c30724'),('44ad19bb-6067-400b-a844-a11035f0bf38','02437460000530','Instituto de Pesquisa Eldorado','Avenida Mario Ypiranga, 315, Andar 16 e 17','Manaus','amazonas','33057800','eldorado@email.com','',5.00,'ecade5c0-6ba4-4711-b9e5-b35e23bede66'),('a37af59b-9de7-4ecc-bb75-7f8fabe6fcd1','05994459000686','SIDIA INSTITUTO DE CIENCIA E TECNOLOGIA','EDIF REGUS PALACIO DE AGR','Brasilia','Distrito Federal','32123436','sidia@email.com','',5.00,'2a721285-ab35-4eb8-931c-3e4438734ed8');
/*!40000 ALTER TABLE `instituto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projeto`
--

DROP TABLE IF EXISTS `projeto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projeto` (
  `id` varchar(36) NOT NULL,
  `projnome` varchar(60) NOT NULL,
  `projdescricao` varchar(255) NOT NULL,
  `projstatus` int(11) NOT NULL DEFAULT 0,
  `projdtfim` datetime DEFAULT NULL,
  `projdtcadastro` datetime(6) DEFAULT current_timestamp(6),
  `projdtatualizacao` datetime(6) DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `projfeedback` varchar(255) DEFAULT NULL,
  `projdtfeedback` datetime DEFAULT NULL,
  `publico` tinyint(4) NOT NULL,
  `estimativaValor` int(11) DEFAULT NULL,
  `projdtinicio` datetime DEFAULT NULL,
  `clienteId` varchar(36) NOT NULL,
  `institutoId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e6afc5f1bceae1d453265f0c538` (`clienteId`),
  KEY `FK_d06a9ca1c40a334c6de723f6501` (`institutoId`),
  CONSTRAINT `FK_d06a9ca1c40a334c6de723f6501` FOREIGN KEY (`institutoId`) REFERENCES `instituto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_e6afc5f1bceae1d453265f0c538` FOREIGN KEY (`clienteId`) REFERENCES `cliente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projeto`
--

LOCK TABLES `projeto` WRITE;
/*!40000 ALTER TABLE `projeto` DISABLE KEYS */;
INSERT INTO `projeto` VALUES ('b6b47653-346f-42cf-be9b-241b809c6896','Projeto Site 2025','Desejamos criar um novo site, com design bonito e elegante, que atraia mais clientes. ',0,NULL,'2024-08-29 22:42:42.577657','2024-08-29 22:42:42.577657',NULL,NULL,0,NULL,NULL,'06abd9d4-2b94-41ef-8a65-3bfdde25b632',NULL),('be8fd5a3-ee70-496a-b665-c84aeaaf5304','Projeto de IOT 4.0','Desejamos um projeto que faça todas as nossas maquinas se comunicarem com dispositos IOT de temperatura, pois para seguirmos padrão de qualidades, ela so podem funcionar em uma faixa especifica. ',0,'2024-12-01 00:00:00','2024-08-29 22:34:43.660573','2024-08-29 22:41:35.000000',NULL,NULL,0,50000,'2024-08-01 00:00:00','06abd9d4-2b94-41ef-8a65-3bfdde25b632','32851822-4a1f-47af-a575-6e19e7a620bb'),('e87e09a9-eb86-43e1-9940-9cd123e2c011','Projeto de CQ','Este projeto tem o intuito de realizar o controle de qualidade dos processos da fabrica. Desejamos ter um sistema fácil de usar que seja possivel gerenciar o ciclo de defeitos. ',0,NULL,'2024-08-29 22:25:55.272445','2024-08-29 22:26:11.000000',NULL,NULL,0,NULL,NULL,'06abd9d4-2b94-41ef-8a65-3bfdde25b632',NULL);
/*!40000 ALTER TABLE `projeto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proposta`
--

DROP TABLE IF EXISTS `proposta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proposta` (
  `id` varchar(36) NOT NULL,
  `aceito` tinyint(4) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 0,
  `message` varchar(255) NOT NULL,
  `messageResposta` varchar(255) DEFAULT NULL,
  `estimativaValor` int(11) DEFAULT NULL,
  `previsaoInicio` datetime NOT NULL,
  `previsaoFim` datetime NOT NULL,
  `dataCriacao` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `dataExclusao` datetime(6) DEFAULT NULL,
  `institutoId` varchar(36) NOT NULL,
  `projetoId` varchar(36) NOT NULL,
  `clienteId` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_476228c6f1cf8e4c90d1793ad85` (`institutoId`),
  KEY `FK_91b1d0ef514302ce47fdf691ed5` (`projetoId`),
  KEY `FK_fa6b82c3755f4c30a4f9e11a158` (`clienteId`),
  CONSTRAINT `FK_476228c6f1cf8e4c90d1793ad85` FOREIGN KEY (`institutoId`) REFERENCES `instituto` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_91b1d0ef514302ce47fdf691ed5` FOREIGN KEY (`projetoId`) REFERENCES `projeto` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_fa6b82c3755f4c30a4f9e11a158` FOREIGN KEY (`clienteId`) REFERENCES `cliente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proposta`
--

LOCK TABLES `proposta` WRITE;
/*!40000 ALTER TABLE `proposta` DISABLE KEYS */;
INSERT INTO `proposta` VALUES ('065196e3-4ddb-49ac-b8dd-8333f0b1746b',0,0,'Vocês tem interesse em participar desse desenvolvimento?',NULL,NULL,'2024-08-01 00:00:00','2024-08-30 00:00:00','2024-08-29 22:43:55.703699',NULL,'44ad19bb-6067-400b-a844-a11035f0bf38','b6b47653-346f-42cf-be9b-241b809c6896','06abd9d4-2b94-41ef-8a65-3bfdde25b632'),('5fc4c530-3f58-4869-8c04-1d4741a73319',1,2,'Teria interesse, soube que vocês são especialistas em automação industrial ','Teriamos sim, pois é nossa especialidade. Este valor é somente uma estimativa, podendo ser alterado na negociação dos requisitos',50000,'2024-08-01 00:00:00','2024-12-01 00:00:00','2024-08-29 22:40:15.537000',NULL,'32851822-4a1f-47af-a575-6e19e7a620bb','be8fd5a3-ee70-496a-b665-c84aeaaf5304','06abd9d4-2b94-41ef-8a65-3bfdde25b632'),('6ef4a71f-272b-42b1-91b6-5a0524b52fb0',0,0,'Vocês tem interesse em participar desse desenvolvimento?',NULL,NULL,'2024-11-01 00:00:00','2025-02-01 00:00:00','2024-08-29 22:43:23.670292',NULL,'a37af59b-9de7-4ecc-bb75-7f8fabe6fcd1','b6b47653-346f-42cf-be9b-241b809c6896','06abd9d4-2b94-41ef-8a65-3bfdde25b632'),('b0cd0fdb-eff1-47ad-a195-dcd1a41b2390',0,1,'Vocês teriam interesse em participar deste desenvolvimento, me mande um valor estimado.','Aceitariamos sim, como estamos no ciclo de projetos podemos captar por um valor agradável. ',750000,'2024-09-01 00:00:00','2025-02-01 00:00:00','2024-08-29 22:28:06.536000',NULL,'44ad19bb-6067-400b-a844-a11035f0bf38','e87e09a9-eb86-43e1-9940-9cd123e2c011','06abd9d4-2b94-41ef-8a65-3bfdde25b632'),('b2eae002-36bb-4732-9cba-7db64eac2469',0,3,'Vocês teriam interesse em participar deste desenvolvimento, me mande um valor estimado.','Como o prazo seria curto, pensamos em um valor um pouco maior que o normal. Qualquer duvida entre em contato',1000000,'2024-09-01 00:00:00','2025-02-01 00:00:00','2024-08-29 22:27:44.939000',NULL,'a37af59b-9de7-4ecc-bb75-7f8fabe6fcd1','e87e09a9-eb86-43e1-9940-9cd123e2c011','06abd9d4-2b94-41ef-8a65-3bfdde25b632'),('de2981a9-9be9-4f69-bdc2-eca62fc24a00',0,0,'Teria interesse? entre em contato conosco com um valor estimado',NULL,NULL,'2024-08-01 00:00:00','2024-11-01 00:00:00','2024-08-29 22:37:31.170054',NULL,'32851822-4a1f-47af-a575-6e19e7a620bb','e87e09a9-eb86-43e1-9940-9cd123e2c011','06abd9d4-2b94-41ef-8a65-3bfdde25b632');
/*!40000 ALTER TABLE `proposta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `talento`
--

DROP TABLE IF EXISTS `talento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `talento` (
  `id` varchar(36) NOT NULL,
  `talnome` varchar(60) NOT NULL,
  `talinstituicao` varchar(60) NOT NULL,
  `talcurso` varchar(60) NOT NULL,
  `taldtinicio` datetime NOT NULL,
  `taldtfim` datetime NOT NULL,
  `talemail` varchar(60) NOT NULL,
  `taltelefone` varchar(13) NOT NULL,
  `talnacionalidade` varchar(30) NOT NULL,
  `taldtnascimento` datetime NOT NULL,
  `talcidade` varchar(30) NOT NULL,
  `talestado` varchar(30) NOT NULL,
  `talgithub` varchar(255) DEFAULT NULL,
  `tallinkedin` varchar(255) DEFAULT NULL,
  `talpathmatricula` varchar(255) NOT NULL,
  `talpathhistorico` varchar(255) NOT NULL,
  `talranking` decimal(5,2) NOT NULL DEFAULT 5.00,
  `talcoeficiente` float(5,2) NOT NULL,
  `userId` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_2b9692bfcdb3ecf9e353b22203` (`userId`),
  CONSTRAINT `FK_2b9692bfcdb3ecf9e353b222031` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `talento`
--

LOCK TABLES `talento` WRITE;
/*!40000 ALTER TABLE `talento` DISABLE KEYS */;
INSERT INTO `talento` VALUES ('c82198ef-1873-4f1d-8f2e-d8df2040b96a','Edson Magno Bacalhao Neto','IFAM - Instituto Federal do Amazonas','Tecnologia em Analise e Desenvolvimento de Sistemas','2023-01-01 00:00:00','2025-11-01 00:00:00','e.magnobn@gmail.com','92984597088','Brasileiro','1998-03-14 00:00:00','manaus','Amazonas',NULL,NULL,'/app/uploads/talento/matricula/gcid-d708ef05-c0fc-415d-8a5e-4b42d2b7ed51.bmp','/app/uploads/talento/historico/gcid-e08c30f7-cc9b-4064-8c00-5d20f4a1c327.png',5.00,7.90,'2f340d12-8d7a-4455-b0e5-51892f715b02');
/*!40000 ALTER TABLE `talento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `userType` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('1067539f-fc4f-466d-a87b-ed63581b038e','denso','denso@email.com',1,'$2b$10$XjqgvbmB9l4oMLy8MPXT9OpbTAXbWwhgT5w0lzAdlydKOwAA5p4qq',NULL,1),('2a721285-ab35-4eb8-931c-3e4438734ed8','sidia','sidia@email.com',1,'$2b$10$5uFDTYpRR7rnbbsxj6rXvOEbcA/spILZA.ybMg1uhKJNoEqECHX6m',NULL,2),('2f340d12-8d7a-4455-b0e5-51892f715b02','aluno','aluno@email.com',1,'$2b$10$Z/LmHQ98PywZg4s73z/y6uCxLrh4piGTrlJZtEJ/Tuy7bH0alDbhi',NULL,3),('6b80e047-d36e-4b38-804c-f6fdb3c30724','icts','icts@email.com',1,'$2b$10$8hvM572pO6C3sE53kNbp6OPVrZeh3RVPOy6CrRXBOccA9BFW1k5Ky',NULL,2),('ecade5c0-6ba4-4711-b9e5-b35e23bede66','eldorado','eldorado@email.com',1,'$2b$10$UB5ga4IJD7HbR32u/eGBkONmYmujLctGWgKPLCqy4hNXj8zgxBIp.',NULL,2);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'gcid'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-29 18:56:34
