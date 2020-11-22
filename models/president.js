/*******************************************************************************
 * model
 ******************************************************************************/

'use strict';

// var _ = require('underscore');

class President {
    constructor(options) {
        this.first = options.first;
        this.last  = options.last;
        this.party = options.party;
        this.image = options.image;
    }
}

module.exports = President;
