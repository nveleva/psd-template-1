/*
    #HTML/CSS/JS TEST SPECIFICATION AND REQUIREMENTS
    
    ##YOU MUST NOT USE!!!
    - scripts you didn't write yourself
    - JS libraries and frameworks
    - CSS "frameworks"
    
    ##Page overals
    - Liquid layout
    - max content wrapper width: 1280px, min widht: 800
    - content centered on the page
    - right column width: 30% of content wrapper
    - left column and right column padding 10px
    - page main title - embed font -> HelveticaInserat LT
    - Logo element should be fixed at all time at the left border of the page
    
    ##Dynamics
    - main navigation, drop down menu based on JS - don't use ready scripts
    - right column dynamic boxes:
        click to open, click to close
        two boxes must not be open in the same time 
    
    ##Cross-browser
    - 10+
    - FF
    - Chrome
    
    ##Language menu
    - hover makes flag opaque
    - selected flag is opaque
    
    ##Misc
    - font sizes and box sizes may be in %, px or em
    
    ##Your test does NOT qualifie for review if:
    - JSON content is not loaded with AJAX
    - We need to fiddle with your code to make it work
    - JS global scope is polluted
 

     ##Table Task:
     1. Your script must be able to handle number of columns dynamically (i.e. more or less columns, depending on the JSON sent)
     2. Do not use any ready scripts and libraries 
     3. Decide on the table HTML structure by yourself
     4. All your JS code MUST be into this file
     5. Bonus: Implement sorting on the column headers
     6. Get content with XMLHTTP request from here: http://cn.sbtech.com/sb-test/content.json
*/

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

var toggle = function(el){

    if(hasClass(el, 'open')){
        el.className = '';
    } else{
        el.className = 'open';
    }
    
};
var findActive = function(){
    var asideItems = document.getElementsByClassName('open-info')[0];
    return asideItems;
};
var changeLinkText = function(el, isCurrentlyOpen){
    var text = '';
    if(isCurrentlyOpen){
        text = 'Click to close';
    } else{
        text = 'Click to open';
    }
     
    // remove old text
    var node = el.childNodes[0];
    el.removeChild(node);

    //set new text;
    var newText = document.createTextNode(text);
    el.appendChild(newText);
};
var toggleAside = function(el){
    var newText = '';
    if(hasClass(el, 'open-info')){
        el.className = '';
        changeLinkText(el, false);
        return;
    }

    var active = findActive();
    if(active){
        active.className = '';
        changeLinkText(active, false);
    }
    el.className = 'open-info';
    changeLinkText(el, true);
};

// create dinamic table
var thead = document.getElementsByTagName('thead')[0];
var tbody = document.getElementsByTagName('tbody')[0];
var createTable = (function(){
    // get data
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'http://cn.sbtech.com/sb-test/content.json', true);
    xhttp.send();
    // handle response
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && (xhttp.status == 200 || xhttp.status == 304)) {
            var data = xhttp.responseText;
            var dataAsObject = JSON.parse(data);
            dataAsObject = dataAsObject.sort(function(a, b){
                return parseInt(a.ID) - parseInt(b.ID);
            });
    
            // generate table head
            var firstEl = dataAsObject[0];
            var tr = document.createElement('tr');
            thead.appendChild(tr);
            for(var prop in firstEl){
                var th = document.createElement('th');
                tr.appendChild(th);
                var textTableHead = document.createTextNode(prop);
                th.appendChild(textTableHead);
        }
        // generate table body
        for (var i = 0; i < dataAsObject.length; i++) {
            var person = dataAsObject[i];
            tr = document.createElement('tr');
            tbody.appendChild(tr);
            for(prop in person){
                var td = document.createElement('td');
                tr.appendChild(td);
                var textNode = document.createTextNode(person[prop]);
                td.appendChild(textNode);
            }
        }
    }
    };
})();
