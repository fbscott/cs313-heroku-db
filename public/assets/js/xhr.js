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

/******************************************************************************
 * PRESIDENT DETAILS
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
        document.getElementById('result').innerHTML += 'President: ' + data[i]['first'] + ' ' + data[i]['last'];
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
 * PRESIDENTS BY PARTY
 * @param  {Object} data - parsed JSON object array
 *****************************************************************************/
PRES.presByPartyTemplate = data => {
    let _list = `<ul>`;

    for (var i = 0; i < data.length; i++) {
        document.getElementById('result').innerHTML += 'President: ' + data[i]['first'] + ' ' + data[i]['last'];
        _list += `<li>
                    ${data[i]['first']} ${data[i]['middle']} ${data[i]['last']} <a href="javascript:void(0);" onClick="PRES.showPresDetails('/getPresident', '${data[i]['president_id']}');">View Details</a>
                  </li>`
    }

    _list += `</ul>`;

    PRES.presDetailsContainer.innerHTML = _list;
};

/******************************************************************************
 * SHOW PRESIDENT DETAILS
 * @param  {String} route - route
 * @param  {String} id    - president id in database
 *****************************************************************************/
PRES.showPresDetails = (route, id = '') => {
    PRES.input = id || document.getElementById('president').value;
    if (!!PRES.input) {
        PRES.presDetailsContainer = document.getElementById('result');
        PRES.getData(route, PRES.presDetailsTemplate);
    } else {
        alert('Please select a president.');
    }
};

/******************************************************************************
 * SHOW PRESIDENTS BY PARTY AFFILIATION
 * @param  {String} route - route
 *****************************************************************************/
PRES.showPresByParty = route => {
    PRES.input = document.getElementById('party').value;
    if (!!PRES.input) {
        PRES.presDetailsContainer = document.getElementById('result');
        PRES.getData(route, PRES.presByPartyTemplate);
    } else {
        alert('Please select a party.');
    }
};
