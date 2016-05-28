ECHO OFF
CLS
ECHO.
ECHO --- Running the Force Feed Database Shell ---
ECHO.
CD db
mongo localhost:27017/ForceFeed
