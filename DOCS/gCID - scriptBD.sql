-- Tabela `user`
CREATE TABLE IF NOT EXISTS `user` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) DEFAULT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `userType` INT NOT NULL
);

-- Tabela `instituto`
CREATE TABLE IF NOT EXISTS `instituto` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `instcnpj` CHAR(14) NOT NULL,
  `instnome` VARCHAR(50) NOT NULL,
  `instemail` VARCHAR(256) NOT NULL,
  `insttelefone` CHAR(10) NULL,
  `instendereco` VARCHAR(100) NOT NULL,
  `instdescricao` TEXT NOT NULL,
  FOREIGN KEY (`id`) REFERENCES `user`(`id`)
);

-- Tabela `cliente`
CREATE TABLE IF NOT EXISTS `cliente` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `clicnpj` CHAR(14) NOT NULL,
  `clinome` VARCHAR(50) NOT NULL,
  `cliemail` VARCHAR(256) NOT NULL,
  `clitelefone` CHAR(10) NULL,
  `cliendereco` VARCHAR(100) NOT NULL,
  FOREIGN KEY (`id`) REFERENCES `user`(`id`)
);

-- Tabela `talento`
CREATE TABLE IF NOT EXISTS `talento` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `talmatricula` VARCHAR(20) NOT NULL,
  `talinstcnpj` CHAR(14) NOT NULL,
  `talnome` VARCHAR(60) NOT NULL,
  `talemailinstitucional` VARCHAR(256) NOT NULL,
  `talemailpessoal` VARCHAR(256) NULL,
  `taltelefone` CHAR(10) NULL,
  `talanomatricula` DATE NOT NULL,
  `talperiodo` CHAR(1) NOT NULL,
  `talanoconclusao` DATE NOT NULL,
  `talexperiencia` TEXT NULL,
  `talportfolio` VARCHAR(45) NULL,
  FOREIGN KEY (`id`) REFERENCES `user`(`id`),
  FOREIGN KEY (`talinstcnpj`) REFERENCES `instituto`(`instcnpj`)
);

-- Tabela `projeto`
CREATE TABLE IF NOT EXISTS `projeto` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `procodigo` INT UNSIGNED NOT NULL,
  `pronome` VARCHAR(60) NOT NULL,
  `prodescricao` TEXT NOT NULL,
  `protipo` ENUM('Público', 'Privado') NOT NULL,
  `profeedback` TEXT NULL,
  `cliente_id` INT UNSIGNED,
  `instituto_id` INT UNSIGNED,
  FOREIGN KEY (`cliente_id`) REFERENCES `cliente`(`id`),
  FOREIGN KEY (`instituto_id`) REFERENCES `instituto`(`id`)
);