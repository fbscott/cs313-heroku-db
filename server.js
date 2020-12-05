/*******************************************************************************
 * controller
 ******************************************************************************/

const PATH             = require('path');
const EXPRESS          = require('express');
const APP              = EXPRESS();
const PORT             = process.env.PORT || 5000;
const connectionString = process.env.DATABASE_URL || 'postgres://lphndjosiujnrb:c9bdf89e631fb1b26e8e594a6dec9184d9f75821c53469de13a61cdb55aaaee2@ec2-3-211-176-230.compute-1.amazonaws.com:5432/df2n0i8d9gh20?ssl=true';
const { Pool }         = require('pg');
const PARTIES          = require('./collections/parties.js');
const pool             = new Pool({connectionString: connectionString});

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0' // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs

// allow server to use anything that lives in /public
APP.use(EXPRESS.static(__dirname + '/public'));
APP.set('views', './views'); // object, directory
APP.set('view engine', 'ejs'); // render .ejs files as views

APP.get('/', (req, res) => {
    let _title       = 'Select an Action';
    let _description = {
        details: 'View details about a president.',
        party: 'View a sorted list of presidents by party affiliation.',
        add: 'Add Joe Biden as the next president of the United States.'
    };

    res.render('pages/index', {
        title       : _title,
        description : _description
    });
});

APP.get('/queryPresident', (req, res) => {
    let _title       = 'U.S. President Details';
    let _description = 'Select a U.S. president to view details.';
    var _sql         = `SELECT president_id, first, middle, last, party, image
                        FROM president AS pres
                        JOIN details AS d
                        ON pres.id = d.president_id
                        JOIN image as i
                        ON i.id = d.image_id
                        JOIN party as p
                        ON p.id = d.party_id`;

    pool.query(_sql, function(err, result) {
        let _data = result.rows;

        if (err) {
            console.log('Error in queryPresident: ')
            console.log(err);
        }

        // res.sendFile(PATH.join(__dirname + '/public/index.htm'));
        res.render('pages/queryPresident', {
            title       : _title,
            description : _description,
            presidents  : _data
        });
    });
});

APP.get('/queryParty', (req, res) => {
    let _title       = 'U.S. Presidents Details by Party Affiliation';
    let _description = 'Select a party to view a list of U.S. presidents with that affiliation.';
    const _sql       = `SELECT * FROM party`;

    pool.query(_sql, function(err, result) {
        let _data    = result.rows;
        let _parties = new PARTIES(_data);

        if (err) {
            console.log('Error in queryParty: ')
            console.log(err);
        }

        // res.json(result.rows);
        res.render('pages/queryParty', {
            title       : _title,
            description : _description,
            parties     : _parties.getParties()
        });
    });
});

APP.get('/addPresident', (req, res) => {
    let _title       = 'Add a U.S. President';
    let _description = 'Add Joe Biden as next President of the United States.';
    const _sql       = `SELECT * FROM party`;

    pool.query(_sql, function(err, result) {
        let _data    = result.rows;
        let _parties = new PARTIES(_data);

        if (err) {
            console.log('Error in queryParty: ')
            console.log(err);
        }

        // res.json(result.rows);
        res.render('pages/addPresident', {
            title       : _title,
            description : _description,
            parties     : _parties.getParties()
        });
    });
});

APP.get('/getPresident', function(req, res) {
    const _id  = req.query.id;
    const _sql = `SELECT first, middle, last, party, image
                  FROM president AS pres
                  JOIN details AS d
                  ON pres.id = d.president_id
                  JOIN image as i
                  ON i.id = d.image_id
                  JOIN party as p
                  ON p.id = d.party_id
                  WHERE pres.id = $1`;
    let _values = [_id];

    pool.query(_sql, _values, function(err, result) {
        // var pres = new PRESIDENT(result.rows[0]);

        if (err) {
            console.log('Error in getPresident: ')
            console.log(err);
        }

        res.json(result.rows);
        // res.render('pages/test', pres);
    });
});

APP.get('/getPresidentsByParty', function(req, res) {
    const _id   = req.query.id;
    let _values = [_id];
    const _sql  = `SELECT first, middle, last, party, image, president_id
                   FROM president AS pres
                   JOIN details AS d
                   ON pres.id = d.president_id
                   JOIN image as i
                   ON i.id = d.image_id
                   JOIN party as p
                   ON p.id = d.party_id
                   WHERE p.party = $1`;

    pool.query(_sql, _values, function(err, result) {
        // var pres = new PRESIDENT(result.rows[0]);

        if (err) {
            console.log('Error in getPresidentsByParty: ')
            console.log(err);
        }

        res.json(result.rows);
        // res.render('pages/test', pres);
    });
});

APP.get('/setPresident', function(req, res) {
    const _first = req.query.first;
    const _last  = req.query.last;
    const _party = parseInt(req.query.party);
    console.log({
        party: _party,
        type: typeof _party
    });
    let _values  = [_first, _last, _party];
    const _sql = `WITH data(first, middle, last, party_id, image) AS (
                     VALUES ($1, '', $2, $3::smallint, 1)
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
                  JOIN ins1 USING (first, middle, last)`;

    pool.query(_sql, _values, function(err, result) {
        // var pres = new PRESIDENT(result.rows[0]);

        if (err) {
            console.log('Error in setPresident: ')
            console.log(err);
        }

        res.json(result);
        // res.render('pages/test', pres);
    });
});

APP.listen(PORT, () => {
    console.log('Listening on ' + PORT);
});
