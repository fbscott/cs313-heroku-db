// global namespace: Presidents (PRES)
var PRES = PRES || {};

/******************************************************************************
 * LOAD DOCUMENT
 * Perform an XMLHttpRequest (AJAX) request and pass the response data to the
 * callback.
 *****************************************************************************/
PRES.getData = (url, callback) => {
    // placeholder while loading
    PRES.presDetailsContainer.innerHTML = `<div class="spinner"></div>`;

    let _xhr = new XMLHttpRequest();

    _xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // response (parsed as JSON)
            let _jsonObject = JSON.parse(this.responseText);

            // pass the parsed response to the DOM loader
            callback(_jsonObject);
        }
    };

    _xhr.open('GET', url + '?id=' + PRES.input, true);
    _xhr.send();
};

PRES.setData = (url, callback) => {
    // placeholder while loading
    PRES.presDetailsContainer.innerHTML = `<div class="spinner"></div>`;

    let _xhr = new XMLHttpRequest();

    _xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            // pass the parsed response to the DOM loader
            callback({first: PRES.first, last: PRES.last});
        }
    };

    _xhr.open('GET', url + '?first=' + PRES.first + '&last=' + PRES.last + '&party=' + PRES.party, true);
    _xhr.send();
};

/******************************************************************************
 * TEMPLATE - PRESIDENT DETAILS
 * @param  {Object} data - parsed JSON object array
 *****************************************************************************/
PRES.presDetailsTemplate = data => {
    let _table = `<table>
                    <tr>
                      <th>President</th>
                      <th>Party</th>
                      <th>Image</th>
                    </tr>`;

    for (var i = 0; i < data.length; i++) {
        _table += `<tr>
                     <td>${data[i]['first']} ${data[i]['middle']} ${data[i]['last']}</td>
                     <td>${data[i]['party']}</td>
                     <td><img src="./assets/img/${data[i]['image']}" alt="Image of President ${data[i]['first']} ${data[i]['last']}"></td>
                   </tr>`
    }

    _table += `</table>`;

    PRES.presDetailsContainer.innerHTML = _table;
};

/******************************************************************************
 * TEMPLATE - PRESIDENTS BY PARTY
 * @param  {Object} data - parsed JSON object array
 *****************************************************************************/
PRES.presByPartyTemplate = data => {
    let _list = `<ul>`;

    for (var i = 0; i < data.length; i++) {
        _list += `<li>
                    ${data[i]['first']} ${data[i]['middle']} ${data[i]['last']} <a href="javascript:void(0);" onClick="PRES.getPresDetails('/getPresident', '${data[i]['president_id']}');">View Details</a>
                  </li>`
    }

    _list += `</ul>`;

    PRES.presDetailsContainer.innerHTML = _list;
};

/******************************************************************************
 * TEMPLATE - ADD PRESIDENT TO DATABASE
 * @param  {Object} data - parsed JSON object array
 *****************************************************************************/
PRES.presAddPresTemplate = data => {
    PRES.presDetailsContainer.innerHTML = `<p class="margin-top-2">${data.first} ${data.last} has been added to the database.</p>`;
};

/******************************************************************************
 * GET PRESIDENT DETAILS
 * @param  {String} route - route
 * @param  {String} id    - president id in database
 *****************************************************************************/
PRES.getPresDetails = (route, id = '') => {
    PRES.input = id || document.getElementById('president').value;

    if (!!PRES.input) {
        PRES.presDetailsContainer = document.getElementById('result');
        PRES.getData(route, PRES.presDetailsTemplate);
    } else {
        alert('Please select a president.');
    }
};

/******************************************************************************
 * GET PRESIDENTS BY PARTY AFFILIATION
 * @param  {String} route - route
 *****************************************************************************/
PRES.getPresByParty = route => {
    PRES.input = document.getElementById('party').value;

    if (!!PRES.input) {
        PRES.presDetailsContainer = document.getElementById('result');
        PRES.getData(route, PRES.presByPartyTemplate);
    } else {
        alert('Please select a party.');
    }
};

/******************************************************************************
 * ADD PRESIDENT
 * @param  {String} route - route
 *****************************************************************************/
PRES.addPresident = route => {
    PRES.first = document.getElementById('first').value;
    PRES.last  = document.getElementById('last').value;
    PRES.party = document.getElementById('party').value;

    if (PRES.first && PRES.last && PRES.party) {
        PRES.presDetailsContainer = document.getElementById('result');
        PRES.setData(route, PRES.presAddPresTemplate);
    } else {
        alert('Please complete all fields.');
    }
};

/******************************************************************************
 * GET ROUTE
 * @param  {String} route - route
 *****************************************************************************/
PRES.getRoute = route => {
    location.href = route;
};
