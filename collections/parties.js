/*******************************************************************************
 * parties collection
 ******************************************************************************/

'use strict';

var _ = require('underscore');

class Parties {
    constructor(options) {
        this.parties = options;
    }

    getParties() {
        return _.uniq(_.pluck(this.parties, 'party'));
    }
}

module.exports = Parties;
