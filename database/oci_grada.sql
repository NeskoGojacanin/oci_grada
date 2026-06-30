
USE oci_grada;

CREATE TABLE Korisnik (
    id_korisnika INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    ime VARCHAR(100),
    prezime VARCHAR(100),
    telefon VARCHAR(50),
    uloga ENUM('korisnik', 'koordinator') NOT NULL DEFAULT 'korisnik',
    datum_registracije DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE NadleznaSluzba (
    id_sluzbe INT PRIMARY KEY AUTO_INCREMENT,
    naziv VARCHAR(150) NOT NULL,
    telefon VARCHAR(50),
    email VARCHAR(150)
);

CREATE TABLE Kategorija (
    id_kategorije INT PRIMARY KEY AUTO_INCREMENT,
    naziv VARCHAR(100) NOT NULL,
    opis VARCHAR(500)
);

CREATE TABLE Objava (
    id_objave INT PRIMARY KEY AUTO_INCREMENT,
    id_korisnika INT NOT NULL,
    id_kategorije INT NOT NULL,
    naslov VARCHAR(200),
    opis TEXT,
    lokacija VARCHAR(200),
    status ENUM('aktivna', 'zatvorena', 'arhivirana') DEFAULT 'aktivna',
    datum_objave DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_korisnika) REFERENCES Korisnik(id_korisnika),
    FOREIGN KEY (id_kategorije) REFERENCES Kategorija(id_kategorije)
);

CREATE TABLE Slika (
    id_slike INT PRIMARY KEY AUTO_INCREMENT,
    id_objave INT NOT NULL,
    naziv VARCHAR(200),
    putanja VARCHAR(255),
    tip VARCHAR(100),

    FOREIGN KEY (id_objave) REFERENCES Objava(id_objave)
);

CREATE TABLE Prijava (
    id_prijave INT PRIMARY KEY AUTO_INCREMENT,
    id_objave INT NOT NULL,
    id_korisnika INT NOT NULL,
    id_koordinatora INT,
    id_sluzbe INT,
    status ENUM('predana', 'u_obradi', 'proslijedjena', 'zavrsena', 'odbijena') DEFAULT 'predana',
    datum_prijave DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_objave) REFERENCES Objava(id_objave),
    FOREIGN KEY (id_korisnika) REFERENCES Korisnik(id_korisnika),
    FOREIGN KEY (id_koordinatora) REFERENCES Korisnik(id_korisnika),
    FOREIGN KEY (id_sluzbe) REFERENCES NadleznaSluzba(id_sluzbe)
);

CREATE TABLE Komentar (
    id_komentara INT PRIMARY KEY AUTO_INCREMENT,
    id_objave INT NOT NULL,
    id_korisnika INT NOT NULL,
    tekst VARCHAR(500),
    datum DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_objave) REFERENCES Objava(id_objave),
    FOREIGN KEY (id_korisnika) REFERENCES Korisnik(id_korisnika)
);