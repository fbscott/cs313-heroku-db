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
let data;

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0' // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs


// allow server to use anything that lives in /public
APP.use(EXPRESS.static(__dirname + '/public'));

// view engine
APP.set('views', './views'); // object, directory
APP.set('view engine', 'ejs'); // render .ejs files as views

APP.get('/', (req, res) => {
    let _title = 'U.S. Presidents';
    let _details = 'Select a U.S. president to view details.';
    let _party = 'View a list of presidents by party affiliation.';
    var sql = `SELECT first, middle, last, party, image
               FROM president AS pres
               JOIN details AS d
               ON pres.id = d.president_id
               JOIN image as i
               ON i.id = d.image_id
               JOIN party as p
               ON p.id = d.party_id`;
    let _parties;

    if (!!data) {
        _parties = new PARTIES(data);

        res.render('pages/index', {
            title: _title,
            details: _details,
            party: _party,
            parties: _parties.getParties(),
            presidents: data
        });
    } else {
        pool.query(sql, function(err, result) {
            data = result.rows;
            _parties = new PARTIES(data);

            // If an error occurred...
            if (err) {
                console.log('Error in query: ')
                console.log(err);
            }

            // console.log({
            //     route: '/',
            //     result: result.rows
            // });

            // res.sendFile(PATH.join(__dirname + '/public/index.htm'));
            res.render('pages/index', {
                title: _title,
                details: _details,
                party: _party,
                parties: _parties.getParties(),
                presidents: result.rows
            });
            console.log({
                data: false
            });
        });
    }
});

APP.get('/getPresident', function(req, res) {
    const _id   = req.query.id;
    const _sql  = `SELECT first, middle, last, party, image
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

        // If an error occurred...
        if (err) {
            console.log('Error in query: ')
            console.log(err);
        }

        // console.log({
        //     route: '/getPresident',
        //     result: result.rows
        // });

        res.json(result.rows);
        // res.render('pages/test', pres);
    });
});

APP.get('/getPresidentsByParty', function(req, res) {
    const _id   = req.query.id;
    const _sql  = `SELECT first, middle, last, party, image, president_id
                   FROM president AS pres
                   JOIN details AS d
                   ON pres.id = d.president_id
                   JOIN image as i
                   ON i.id = d.image_id
                   JOIN party as p
                   ON p.id = d.party_id
                   WHERE p.party = $1`;
    let _values = [_id];
    // let parties = new PARTIES(data);

    pool.query(_sql, _values, function(err, result) {
        // var pres = new PRESIDENT(result.rows[0]);

        // If an error occurred...
        if (err) {
            console.log('Error in query: ')
            console.log(err);
        }

        // console.log({
        //     route: '/getPresidentsByParty',
        //     result: result.rows
        // });

        res.json(result.rows);
        // res.render('pages/test', pres);
    });
});

APP.listen(PORT, () => {
    console.log('Listening on ' + PORT);
});
