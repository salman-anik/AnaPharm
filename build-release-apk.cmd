@echo off
set "JAVA_HOME=%USERPROFILE%\.jdk\jdk-17.0.21+9"
set "ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk"
set "PATH=%JAVA_HOME%\bin;%PATH%"

subst P: /d >nul 2>&1
subst P: "%~dp0."

cd /d P:\android
call gradlew.bat assembleRelease --no-daemon
set BUILD_STATUS=%errorlevel%

if %BUILD_STATUS% equ 0 (
    if not exist "P:\apk" mkdir "P:\apk"
    if exist "P:\android\app\build\outputs\apk\release\app-release.apk" (
        copy /y "P:\android\app\build\outputs\apk\release\app-release.apk" "P:\apk\AnaPharm-v3.0.0.apk" >nul
        copy /y "P:\android\app\build\outputs\apk\release\app-release.apk" "P:\apk\AnaPharm-v1.0.0.apk" >nul
        echo APK_BUILD_SUCCESS
    )
)

cd /d "%~dp0"
subst P: /d >nul 2>&1
exit /b %BUILD_STATUS%
