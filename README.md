VARIABLE NAMES




DATES AND LOCATIONS

Locations should be stored as a string in "lat:lng"
They will always be parsed upon retrieval and posting from/to the database so you should never have to worry about parsing yourself


If the function name has "my" in it, it means that it will be using the user object that lives on ```req.session.user```