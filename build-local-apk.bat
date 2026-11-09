@echo off
setlocal enabledelayedexpansion

echo ========================================================
echo       AnaPharm - Official Android APK Builder (Release)
echo ========================================================
echo.

:: 1. Set Java 17 and Android SDK environment
echo [1/4] Setting Java 17 and Android SDK paths...
set "JAVA_HOME=%USERPROFILE%\.jdk\jdk-17.0.21+9"
set "ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk"
set "PATH=%JAVA_HOME%\bin;%PATH%"

:: 2. Shorten path using virtual drive P: to bypass Windows MAX_PATH (260 char) C++ Ninja limit
echo [2/4] Initializing virtual drive for build environment...
subst P: /d >nul 2>&1
set "PROJ_ROOT=%~dp0"
if "%PROJ_ROOT:~-1%"=="\" set "PROJ_ROOT=%PROJ_ROOT:~0,-1%"
subst P: "%PROJ_ROOT%"

:: Ensure C++ codegen junctions for React Native 0.88
if exist "P:\node_modules\react-native-safe-area-context\android\build\generated\source\codegen\jni" (
    if not exist "P:\node_modules\react-native-safe-area-context\android\src\main\jni\codegen" (
        mklink /J "P:\node_modules\react-native-safe-area-context\android\src\main\jni\codegen" "P:\node_modules\react-native-safe-area-context\android\build\generated\source\codegen\jni" >nul 2>&1
    )
)
if exist "P:\node_modules\react-native-screens\android\build\generated\source\codegen\jni" (
    if not exist "P:\node_modules\react-native-screens\android\src\main\jni\codegen" (
        mklink /J "P:\node_modules\react-native-screens\android\src\main\jni\codegen" "P:\node_modules\react-native-screens\android\build\generated\source\codegen\jni" >nul 2>&1
    )
)

:: 3. Run Gradle Release Build from P:\android
echo [3/4] Building Standalone Official Release APK...
cd /d P:\android
call gradlew.bat assembleRelease --no-daemon
set BUILD_STATUS=%errorlevel%

:: 4. Save APK output exclusively to AnaPharm\apk folder (never desktop)
if %BUILD_STATUS% equ 0 (
    echo [4/4] Exporting signed release APK to AnaPharm\apk...
    if not exist "P:\apk" mkdir "P:\apk"
    if exist "P:\android\app\build\outputs\apk\release\app-release.apk" (
        copy /y "P:\android\app\build\outputs\apk\release\app-release.apk" "P:\apk\AnaPharm.apk" >nul
        echo.
        echo ========================================================
        echo [SUCCESS] Official Signed Release APK created successfully!
        echo Output Location: %~dp0apk\AnaPharm.apk
        echo Security Doc:    %~dp0apk\INSTALLATION_SECURITY_GUIDE.md
        echo ========================================================
    ) else (
        echo [ERROR] Expected release APK file was not found.
    )
) else (
    echo.
    echo [ERROR] Release build encountered an error.
)

:: Clean up virtual drive
cd /d "%~dp0"
subst P: /d >nul 2>&1

if %BUILD_STATUS% neq 0 (
    pause
    exit /b %BUILD_STATUS%
)
echo.
pause