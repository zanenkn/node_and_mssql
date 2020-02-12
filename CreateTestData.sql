CREATE SCHEMA TestSchema;
GO

CREATE TABLE TestSchema.Employees (
  Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  Name NVARCHAR(50),
  Location NVARCHAR(50)
);
GO

INSERT INTO TestSchema.Employees (Name, Location) VALUES
('Zane', 'Sweden'),
('Joel', 'Sweden'),
('Ilze', 'Spain');
GO

CREATE TABLE TestSchema.Pets (
  Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  Name NVARCHAR(50),
  Type NVARCHAR(50),
  OwnerId INT,
  FOREIGN KEY (OwnerId) REFERENCES TestSchema.Employees(Id)
);
GO

INSERT INTO TestSchema.Pets (Name, Type, OwnerId) VALUES
('Kisse', 'cat', (SELECT Id FROM TestSchema.Employees WHERE Name='Zane')),
('Leif', 'cat', (SELECT Id FROM TestSchema.Employees WHERE Name='Joel')),
('Peter', 'lizard', (SELECT Id FROM TestSchema.Employees WHERE Name='Ilze'))
GO

SELECT * FROM TestSchema.Employees;
SELECT * FROM TestSchema.Pets;
GO