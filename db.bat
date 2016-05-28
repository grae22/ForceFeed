ECHO OFF
CLS
ECHO.
ECHO --- Running the Force Feed Database ---
ECHO.
CD db
mongod --port 27017 --dbpath "."
