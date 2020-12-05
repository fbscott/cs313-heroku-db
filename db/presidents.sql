DROP TABLE IF EXISTS public.details;
DROP TABLE IF EXISTS public.president;
DROP TABLE IF EXISTS public.party;
DROP TABLE IF EXISTS public.image;

CREATE TABLE public.president (
   id SERIAL NOT NULL PRIMARY KEY,
   first VARCHAR(80) NOT NULL,
   middle VARCHAR(80) NOT NULL,
   last VARCHAR(80) NOT NULL
);

CREATE TABLE public.party (
   id SERIAL NOT NULL PRIMARY KEY,
   party VARCHAR(80) NOT NULL
);

CREATE TABLE public.image (
   id SERIAL NOT NULL PRIMARY KEY,
   image VARCHAR(80) NOT NULL
);

CREATE TABLE public.details (
   id SERIAL NOT NULL PRIMARY KEY,
   president_id SMALLINT NOT NULL,
   party_id SMALLINT NOT NULL,
   image_id SMALLINT NOT NULL,
   CONSTRAINT fk_president
      FOREIGN KEY(president_id) 
         REFERENCES public.president(id),
   CONSTRAINT fk_party
      FOREIGN KEY(party_id) 
         REFERENCES public.party(id),
   CONSTRAINT fk_image
      FOREIGN KEY(image_id) 
         REFERENCES public.image(id)
);

-- add presidents
INSERT INTO president (id, first, middle, last) VALUES (default, 'George', '', 'Washington');
INSERT INTO president (id, first, middle, last) VALUES (default, 'John', '', 'Adams');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Thomas', '', 'Jefferson');
INSERT INTO president (id, first, middle, last) VALUES (default, 'James', '', 'Madison');
INSERT INTO president (id, first, middle, last) VALUES (default, 'James', '', 'Monroe');
INSERT INTO president (id, first, middle, last) VALUES (default, 'John', 'Quincy', 'Adams');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Andrew', '', 'Jackson');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Martin', '', 'Van Buren');
INSERT INTO president (id, first, middle, last) VALUES (default, 'William', 'Henry', 'Harrison');
INSERT INTO president (id, first, middle, last) VALUES (default, 'John', '', 'Tyler');
INSERT INTO president (id, first, middle, last) VALUES (default, 'James', 'K', 'Polk');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Zachary', '', 'Taylor');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Millard', '', 'Fillmore');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Franklin', '', 'Pierce');
INSERT INTO president (id, first, middle, last) VALUES (default, 'James', '', 'Buchanan');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Abraham', '', 'Lincoln');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Andrew', '', 'Johnson');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Ulysses', 'S', 'Grant');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Rutherford', 'B', 'Hayes');
INSERT INTO president (id, first, middle, last) VALUES (default, 'James', 'A', 'Garfield');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Chester', 'A', 'Arthur');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Grover', '', 'Cleveland');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Benjamin', '', 'Harrison');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Grover', '', 'Cleveland');
INSERT INTO president (id, first, middle, last) VALUES (default, 'William', '', 'McKinley');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Theodore', '', 'Roosevelt');
INSERT INTO president (id, first, middle, last) VALUES (default, 'William', 'Howard', 'Taft');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Woodrow', '', 'Wilson');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Warren', 'G', 'Harding');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Calvin', '', 'Coolidge');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Herbert', '', 'Hoover');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Franklin', 'D', 'Roosevelt');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Harry', 'S', 'Truman');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Dwight', 'D', 'Eisenhower');
INSERT INTO president (id, first, middle, last) VALUES (default, 'John', 'F', 'Kennedy');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Lyndon', 'B', 'Johnson');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Richard', '', 'Nixon');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Gerald', '', 'Ford');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Jimmy', '', 'Carter');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Ronald', '', 'Reagan');
INSERT INTO president (id, first, middle, last) VALUES (default, 'George', 'H W', 'Bush');
INSERT INTO president (id, first, middle, last) VALUES (default, 'William', '', 'Clinton');
INSERT INTO president (id, first, middle, last) VALUES (default, 'George', 'W', 'Bush');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Barack', '', 'Obama');
INSERT INTO president (id, first, middle, last) VALUES (default, 'Donald', '', 'Trump');

-- add parties
INSERT INTO party (id, party) VALUES (default, 'Unaffiliated');
INSERT INTO party (id, party) VALUES (default, 'Federalist');
INSERT INTO party (id, party) VALUES (default, 'Democratic-Republican');
INSERT INTO party (id, party) VALUES (default, 'Democratic');
INSERT INTO party (id, party) VALUES (default, 'Whig');
INSERT INTO party (id, party) VALUES (default, 'Republican');
-- INSERT INTO party (id, party) VALUES (default, 'National Republican');
-- INSERT INTO party (id, party) VALUES (default, 'National Union');

-- add images
INSERT INTO image (id, image) VALUES (default, 'seal.jpg');
INSERT INTO image (id, image) VALUES (default, 'abraham_lincoln.jpg');
INSERT INTO image (id, image) VALUES (default, 'andrew_jackson.jpg');
INSERT INTO image (id, image) VALUES (default, 'andrew_johnson.jpg');
INSERT INTO image (id, image) VALUES (default, 'barack_obama.jpg');
INSERT INTO image (id, image) VALUES (default, 'benjamin_harrison.jpg');
INSERT INTO image (id, image) VALUES (default, 'bill_clinton.jpg');
INSERT INTO image (id, image) VALUES (default, 'calvin_coolidge.jpg');
INSERT INTO image (id, image) VALUES (default, 'chester_arthur.jpg');
INSERT INTO image (id, image) VALUES (default, 'donald_trump.jpg');
INSERT INTO image (id, image) VALUES (default, 'dwight_eisenhower.jpg');
INSERT INTO image (id, image) VALUES (default, 'franklin_pierce.jpg');
INSERT INTO image (id, image) VALUES (default, 'franklin_roosevelt.jpg');
INSERT INTO image (id, image) VALUES (default, 'george_h_w_bush.jpg');
INSERT INTO image (id, image) VALUES (default, 'george_w_bush.jpg');
INSERT INTO image (id, image) VALUES (default, 'george_washington.jpg');
INSERT INTO image (id, image) VALUES (default, 'gerald_ford.jpg');
INSERT INTO image (id, image) VALUES (default, 'grover_cleveland.jpg');
INSERT INTO image (id, image) VALUES (default, 'harry_truman.jpg');
INSERT INTO image (id, image) VALUES (default, 'herbert_hoover.jpg');
INSERT INTO image (id, image) VALUES (default, 'james_buchanan.jpg');
INSERT INTO image (id, image) VALUES (default, 'james_garfield.jpg');
INSERT INTO image (id, image) VALUES (default, 'james_madison.jpg');
INSERT INTO image (id, image) VALUES (default, 'james_monroe.jpg');
INSERT INTO image (id, image) VALUES (default, 'james_polk.jpg');
INSERT INTO image (id, image) VALUES (default, 'jimmy_carter.jpg');
INSERT INTO image (id, image) VALUES (default, 'john_adams.jpg');
INSERT INTO image (id, image) VALUES (default, 'john_kennedy.jpg');
INSERT INTO image (id, image) VALUES (default, 'john_q_adams.jpg');
INSERT INTO image (id, image) VALUES (default, 'john_tyler.jpg');
INSERT INTO image (id, image) VALUES (default, 'lyndon_johnson.jpg');
INSERT INTO image (id, image) VALUES (default, 'martin_van_buren.jpg');
INSERT INTO image (id, image) VALUES (default, 'millard_fillmore.jpg');
INSERT INTO image (id, image) VALUES (default, 'richard_nixon.jpg');
INSERT INTO image (id, image) VALUES (default, 'ronald_reagan.jpg');
INSERT INTO image (id, image) VALUES (default, 'rutherford_hayes.jpg');
INSERT INTO image (id, image) VALUES (default, 'theodor_roosevelt.jpg');
INSERT INTO image (id, image) VALUES (default, 'thomas_jefferson.jpg');
INSERT INTO image (id, image) VALUES (default, 'ulysses_grant.jpg');
INSERT INTO image (id, image) VALUES (default, 'warren_harding.jpg');
INSERT INTO image (id, image) VALUES (default, 'william_h_harrison.jpg');
INSERT INTO image (id, image) VALUES (default, 'william_mckinley.jpg');
INSERT INTO image (id, image) VALUES (default, 'william_taft.jpg');
INSERT INTO image (id, image) VALUES (default, 'woodrow_wilson.jpg');
INSERT INTO image (id, image) VALUES (default, 'zachary_taylor.jpg');

-- add details
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 1, 1, 16);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 2, 2, 27);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 3, 3, 38);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 4, 3, 23);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 5, 3, 24);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 6, 3, 29);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 7, 4, 3);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 8, 4, 32);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 9, 5, 41);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 10, 5, 30);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 11, 4, 25);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 12, 5, 45);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 13, 5, 33);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 14, 4, 12);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 15, 4, 21);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 16, 6, 2);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 17, 4, 4);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 18, 6, 39);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 19, 6, 36);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 20, 6, 22);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 21, 6, 9);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 22, 4, 18);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 23, 6, 6);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 24, 4, 18);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 25, 6, 42);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 26, 6, 37);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 27, 6, 43);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 28, 4, 44);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 29, 6, 40);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 30, 6, 8);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 31, 6, 20);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 32, 4, 13);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 33, 4, 19);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 34, 6, 11);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 35, 4, 28);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 36, 4, 31);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 37, 6, 34);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 38, 6, 17);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 39, 4, 26);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 40, 6, 35);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 41, 6, 14);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 42, 4, 7);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 43, 6, 15);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 44, 4, 5);
INSERT INTO details (id, president_id, party_id, image_id) VALUES (default, 45, 6, 10);

-- query
SELECT first, last, party, image
FROM president AS pres
JOIN details AS d
ON pres.id = d.president_id
JOIN image as i
ON i.id = d.image_id
JOIN party as p
ON p.id = d.party_id
WHERE pres.id = 1;

WITH data(first, middle, last, party_id, image) AS (
   VALUES ('Homer', 'J', 'Simpson', 3, 1)
),
ins1 AS (
   INSERT INTO president (first, middle, last)
   SELECT first, middle, last
   FROM data
   RETURNING first, middle, last, id AS president_id
)
INSERT INTO details (president_id, party_id, image_id)
SELECT ins1.president_id, d.party_id, d.image
FROM data AS d
JOIN ins1 USING (first, middle, last);
