//-----------------------------------------------------------------------------
// NOTE: Install the httpdispatcher with 'npm install httpdispatcher'.
//-----------------------------------------------------------------------------

// Where are we?
//var appPath = "E:/dev/cybermine/Apps/ScoringCheckWebAppBackend/Backend/";
//var appPath = "c:/scoringcheckwebapp/backend/";

// Requires: npm install httpdispatcher
var dispatcher = require( 'httpdispatcher' );

// Lets require/import the HTTP module
var http = require( 'http' );

// Lets define a port we want to listen to
const PORT = 3010;

//----------------------------------------------------------------------------- 

// We need a function which handles requests and send response

function handleRequest( request, response )
{
  try
  {
    //log the request on console
    console.log( request.url );

    //Disptach
    dispatcher.dispatch( request, response );
  }
  catch(err)
  {
    console.log( err );
  }
}

//-----------------------------------------------------------------------------

// Create a server
var server = http.createServer( handleRequest );

//-----------------------------------------------------------------------------

// Lets start our server
server.listen( PORT, function()
{
  // Callback triggered when server is successfully listening. Hurray!
  console.log( "Server listening on: http://localhost:%s", PORT );
});

//-----------------------------------------------------------------------------

// For all your static (js/css/images/etc.) set the directory name (relative path).
dispatcher.setStatic( 'resources' );

//-----------------------------------------------------------------------------

// GET requests

dispatcher.onGet( "/changelists", function( req, res )
{
  console.log('get received');
  
  var data =
    [{ "id": "12345", "username": "Username", "description": "Description...", "timestamp": "2016/05/23 21:00",
      "files": [ {
        "filename": "KFile_1.cpp", "revision": 1 },
        { "filename": "KFile_2.cpp", "revision": 2 },
        { "filename": "KFile_3.cpp", "revision": 3 },
        { "filename": "KFile_4.cpp", "revision": 4 } ] }];

  res.writeHead(
    200,
    {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    
  res.end( JSON.stringify( data ) );
});

//-----------------------------------------------------------------------------

// POST requests
/*
dispatcher.onPost( "/doc-generator", function( req, res )
{
  //console.log('post received');
  //console.log( req.body );
  
  res.writeHead(
    200,
    {
      'Content-Type': 'application/json',
	  'Access-Control-Allow-Origin': '*'
      //'Access-Control-Allow-Origin': 'http://localhost:5555'
	  //'Access-Control-Allow-Origin': 'http://beast:9877'
    } );
  
  // Dump the data to file.
  var fs = require( 'fs' );
  fs.writeFile(
    "data.json",
    req.body,
      function( err )
      {
        if( err )
        {
          console.log( err );
        }
        else
        {
          console.log( "Data written to file." );
        }
      });
  
  // Run the generator app.
  var timestamp = Math.floor( Date.now() / 1000 );
  var outputName = "Output_" + timestamp;
  
  var exec = require( 'child_process' ).execFile;
  exec(
    appPath + "Generator.exe",
    [
      "-inputFile",
      appPath + "data.json",
      "-outputName",
      "./output/" + outputName
    ],
    function( err )
    {
      console.log( err );
    });
    
    res.end( `
      {
        "docLink": "file://beast/ScoringCheckWebAppOutput/` + outputName + `.docx",
        "xmlLink": "file://beast/ScoringCheckWebAppOutput/` + outputName + `.xml"
      }` ); 
});
*/
//-----------------------------------------------------------------------------