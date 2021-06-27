@echo OFF

REM Don't make our environment variable changes persist after script finishes.
SETLOCAL

SET BIN_TARGET="%~dp0drush"

IF NOT EXIST "%BIN_TARGET%" (
  echo ------------------------
  echo ERROR: drush not found in "%BIN_TARGET%"
  echo ------------------------
  exit 1
)

REM Run the command
@php.exe %BIN_TARGET% --php="php.exe" %*
