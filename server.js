/*******************************************************************************
 * controller
 ******************************************************************************/

const PATH             = require('path');
const EXPRESS          = require('express');
const APP              = EXPRESS();
const PORT             = process.env.PORT || 5000;
const connectionString = process.env.DATABASE_URL || 'postgres://lphndjosiujnrb:c9bdf89e631fb1b26e8e594a6dec9184d9f75821c53469de13a61cdb55aaaee2@ec2-3-211-176-230.compute-1.amazonaws.com:5432/df2n0i8d9gh20?ssl=true';
const { Pool }         = require('pg');
const PRESIDENT        = require('./models/president.js');
const pool             = new Pool({connectionString: connectionString});

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0' // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs

// var sql = 'SELECT * FROM person';
var sql = `SELECT first, last, party, image
           FROM president AS pres
           JOIN details AS d
           ON pres.id = d.president_id
           JOIN image as i
           ON i.id = d.image_id
           JOIN party as p
           ON p.id = d.party_id`;

pool.query(sql, function(err, result) {
    // If an error occurred...
    if (err) {
        // console.log('Error in query: ')
        // console.log(err);
    }

    // Log this to the console for debugging purposes.
    // console.log('Back from DB with result:');
    // console.log(result.rows);
});

// allow server to use anything that lives in /public
APP.use(EXPRESS.static(__dirname + '/public'));

// view engine
APP.set('views', './views'); // object, directory
APP.set('view engine', 'ejs'); // render .ejs files as views

APP.get('/', (req, res) => {
    res.sendFile(PATH.join(__dirname + '/public/index.htm'));
});

APP.get('/getPresident', function(req, res) {

    const id = req.query.id;
    // res.render('');

    // var sql = 'SELECT * FROM person WHERE id = $1';
    var values = [id];
    var sql = `SELECT first, last, party, image
               FROM president AS pres
               JOIN details AS d
               ON pres.id = d.president_id
               JOIN image as i
               ON i.id = d.image_id
               JOIN party as p
               ON p.id = d.party_id
               WHERE pres.id = $1`;

    pool.query(sql, values, function(err, result) {
        // var pres = new PRESIDENT(result.rows[0]);

        // If an error occurred...
        if (err) {
            // console.log('Error in query: ')
            // console.log(err);
        }

        // Log this to the console for debugging purposes.
        // console.log('Back from DB with result:');

        res.json(result.rows);
        // res.render('pages/test', pres);
    });

});

APP.listen(PORT, () => {
    console.log('Listening on ' + PORT);
});
