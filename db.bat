ECHO OFF
CLS
ECHO.
ECHO --- Running the Force Feed Database ---
ECHO.
IF NOT EXIST .\db\ mkdir db
CD db
mongod --port 27017 --dbpath "."
PAUSE