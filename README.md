Select2-create
==============

How to use
----------

**Parameters in function**

 - dataJSON: This information that will be the options in select2 element, should have this structure :
    *[ { "id":1, "text":"mono cuco" }, { "id":2, "text":"torito" } ]*

**Parameters in-line**

 - data-url: the url to make the POST when a new element is created
 - data-create-label: The label that appears when in the create option.


Example
-------
HTML

    <input id='disfraz' data-url="/disfraces" data-create-label=" (Click to create)">

Jvascript

    var carnavalJSON = [ {"id":1, "text":"mono cuco"}, {"id":2, "text":"torito"} ];
    
    $("#disfraz").select2Create(carnavalJSON);

**Notes:** 

 - The name of the param that will be send is: term.
 - Tested with select2.js Version 3.4. It should included in header. [https://github.com/ivaynberg/select2/releases/tag/3.4.5][1]
 - The server response should be JSON with this structure: {"id":3, "text":"marimonda"}

  [1]: https://github.com/ivaynberg/select2/releases/tag/3.4.5
