CREATE TABLE newest AS
  SELECT title, year
  FROM titles
  ORDER BY year DESC
  LIMIT 10;


CREATE TABLE dog_movies AS
  SELECT titles.title, principals.character
  FROM titles
  JOIN principals ON titles.tconst = principals.tconst
  WHERE principals.character LIKE "%dog%";


CREATE TABLE leads AS
  SELECT names.name, COUNT(*) AS lead_roles
  FROM principals
  JOIN names ON principals.nconst = names.nconst
  WHERE principals.ordering = 1
  GROUP BY names.name
  HAVING COUNT(*) > 10;


CREATE TABLE long_movies AS
  SELECT 
    ((year/10)* 10) || 's' AS decade,
    COUNT(*) AS count
  FROM titles
  WHERE runtime > 180
  GROUP BY decade
  ORDER BY decade;

