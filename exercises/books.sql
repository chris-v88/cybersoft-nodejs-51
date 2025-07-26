DROP DATABASE IF EXISTS `demo_db`;
CREATE DATABASE IF NOT EXISTS `demo_db`;
USE `demo_db`;

CREATE TABLE `authors` (
	`author_id` INT PRIMARY KEY AUTO_INCREMENT,
	`first_name` VARCHAR(255),
	`last_name` VARCHAR(255),
	`nick_name` VARCHAR(255)
);

CREATE TABLE `books` (
	`book_id` INT NOT NULL AUTO_INCREMENT,
	`title` VARCHAR(100),
	`author_id` INT,
	`released_year` INT,
	`stock_quantity` INT,
	`pages` INT,
		
	PRIMARY KEY (`book_id`),
	FOREIGN KEY (`author_id`) REFERENCES `authors`(`author_id`)
);


-- Insert 20 authors
DROP TABLE IF EXISTS `authors`;
INSERT INTO `authors` (`first_name`, `last_name`, `nick_name`) VALUES
('Alice',    'Walker',     'Ally'),
('Brandon',  'Sanderson',  'B. Sand'),
('Catherine','Johnson',    'Cat'),
('David',    'Mitchell',   'D.M.'),
('Elena',    'Fisher',     'Lena'),
('Frank',    'Herbert',    'F.H.'),
('Grace',    'McCleen',    'Gracie'),
('Henry',    'Miller',     'Hank'),
('Isabel',   'Allende',    'Isa'),
('Jack',     'London',     'J.L.'),
('Karen',    'Russell',    'Kay'),
('Liam',     'O’Flaherty', 'Lee'),
('Maya',     'Angelou',    'M.A.'),
('Nathan',   'Hawthorne',  'Nate'),
('Olivia',   'Buchanan',   'Liv'),
('Peter',    'Straub',     'P.S.'),
('Quincy',   'Adams',      'Q'),
('Rosa',     'Montero',    'Rose'),
('Samuel',   'Beckett',    'Sam'),
('Tara',     'Westover',   'T.W.');

-- Insert 20 books (each referencing one of the author_ids above)
INSERT INTO `books` (`title`, `author_id`, `released_year`, `stock_quantity`, `pages`) 
VALUES
('Shadows of Tomorrow',                   1, 2015, 12,  320),
('The Lost Expedition',                   2, 2020,  7,  410),
('Whispers in the Wind',                  3, 2008, 11,  289),
('Echoes of Eternity',                    4, 2012,  5,  534),
('Beneath Crimson Skies',                 5, 2019,  9,  380),
('Dune: The Awakening',                   6, 1965, 14,  412),
('River of Secrets',                      7, 2017,  6,  275),
('Tropic of Discontent',                  8, 1961,  4,  318),
('Spirit of the Andes',                   9, 1982, 10,  352),
('Wolf of the North',                    10, 1907,  8,  301),
('Unfathomable Depths',                  11, 2011, 13,  365),
('Songs of the Lost Isle',               12, 1935,  3,  290),
('I Know Why',                         13, 1969, 15,  289),
('Scarlet Letters',                     14, 1850,  2,  412),
('Blue Moon Rising',                    15, 2006,  9,  298),
('The Night Chamber',                   16, 1978,  5,  342),
('Revolution Road',                     17, 1816,  7,  270),
('The Invisible Wall',                  18, 2000, 11,  330),
('Waiting for the End',                 19, 1953,  6,  256),
('Mountains Beyond Mountains',          20, 2018,  8,  290);


-- ------------- LESSON ------------- --

-- how select work
SELECT 1+4

-- CONCAT
SELECT CONCAT(author_fname, author_lname) FROM books;

-- CONCAT with space
SELECT CONCAT(author_fname, ' ', author_lname) FROM books;

-- with AS
SELECT CONCAT(author_fname, ' ', author_lname) AS `full_name` FROM books;

-- CONCAT_WS
SELECT CONCAT_WS('!', 'hello', 'hi', 'bye');

-- CONCAT turn 10 char and ... for title
SELECT CONCAT(SUBSTR(title, 1, 10), '...') AS short_title FROM books;

-- CONCAT initial author name
SELECT CONCAT(
		SUBSTR(author_fname, 1, 1),
		'.',
		SUBSTR(author_lname, 1, 1)
	) AS author_initial
FROM books;

-- END LESSON --


TRUNCATE TABLE books;

ALTER TABLE books 
DROP COLUMN author_fname;

ALTER TABLE books 
DROP COLUMN author_lname;

ALTER TABLE books 
ADD COLUMN author_id INT AFTER title;


-- ---------------------------------
-- book with 'the' in their title
SELECT * FROM `books`
WHERE `title` LIKE '%the%'

-- Any book with :
SELECT * FROM `books`
WHERE `title` LIKE '%:%'

-- book start with 'the' in the title
SELECT * FROM `books`
WHERE `title` LIKE 'the%'

-- find author name with 4 character in first name
SELECT * FROM `authors`
WHERE `first_name` LIKE '____'

-- find author name with 4 character in first name and end with 'a'
SELECT * FROM `authors`
WHERE `first_name` LIKE '___a'

INSERT INTO `books` (`title`,                         `author_id`, `released_year`, `stock_quantity`, `pages`) VALUES
('!Exclamation Point',                                1,        2021,             5,     220),
('#HashTag Chronicles',                               2,        2022,             8,     310),
('$Dollar Dreams$',                                   3,        2018,            12,     295),
('%Percent of Us',                                    4,        2019,             3,     278),
('&And Then There Were None&',                         5,        2020,             7,     275),
('*Asterisk Adventures*',                              6,        2021,            10,     330),
('~Tilde Tales~',                                     7,        2023,             4,     260),
('^Caret Capers',                                     8,        2022,             9,     305),
('_Underscore Story_',                                 9,        2020,             6,     215),
('Back\\Slash Book\\',                                10,       2021,             2,     189);

-- find book title start with %
SELECT * FROM `books`
WHERE `title` LIKE '\%%';

SELECT * FROM `books`
WHERE `title` LIKE '%\\';

-- REfiniing Selection Exercise
-- find titles that contains `of`
SELECT `title` FROM `books`
WHERE `title` LIKE '%of%';


-- find the longest book - print out title and page count
SELECT `title`, `pages` FROM `books`
ORDER BY `pages` DESC
LIMIT 1

-- print summary containing the title and year for 3 most recent books
SELECT CONCAT(`title`, ' - ', `released_year`) AS `summary`
FROM `books`
ORDER BY `released_year` DESC
LIMIT 3

-- print author full name and nick_name where their nickname contain `.`
SELECT CONCAT(`first_name`, ' ', `last_name`) AS `full_name`, `nick_name`
FROM `authors`
WHERE `nick_name` LIKE '%.%';

-- find books with lowest stock, show title, year and stock
SELECT `title`, `released_year`, `stock_quantity`
FROM `books`
ORDER BY `stock_quantity`
LIMIT 3

-- print title, year, sort first by year, then by title
SELECT `title`, `released_year`
FROM `books`
WHERE `title` NOT LIKE '%\!%'
AND `title` NOT LIKE '%\#%'
AND `title` NOT LIKE '%\$%'
AND `title` NOT LIKE '%\%%'
AND `title` NOT LIKE '%\&%'
AND `title` NOT LIKE '%\*%'
AND `title` NOT LIKE '%\~%'
AND `title` NOT LIKE '%\^%'
AND `title` NOT LIKE '%\_%'
AND `title` NOT LIKE '%\\\\%' 
ORDER BY `released_year` DESC, `title` ASC;

-- sort author by last NAME
SELECT CONCAT(`first_name`, ' ', `last_name`)
FROM `authors`
ORDER BY `last_name`;

-- --- Aggregate Function --- --
-- COUNT
SELECT COUNT(*) FROM `books`;
SELECT COUNT(`first_name`) FROM `authors`;
SELECT COUNT(DISTINCT `released_year`) FROM `books`;

-- how many tilte contains 'the'
SELECT COUNT(*) FROM `books`
WHERE `title` LIKE '%the%';


-- GROUP BY
SELECT `author_id`, COUNT(*) AS `books_written` FROM `books`
GROUP BY `author_id`
ORDER BY `books_written` DESC;

SELECT `released_year`, COUNT(*) AS `books_in_year` FROM `books`
GROUP BY `released_year`
ORDER BY `books_in_year` DESC;

-- MAX
SELECT `title`, `pages` FROM `books` 
ORDER BY `pages` DESC LIMIT 1;

SELECT `title`, `pages` FROM `books`
WHERE `pages` = (SELECT MAX(`pages`) FROM `books`);