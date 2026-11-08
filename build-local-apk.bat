@echo off
setlocal enabledelayedexpansion

echo ========================================================
echo       AnaPharm - Local Android APK Builder
echo ========================================================
echo.

:: 1. Setup Virtual Drive H: to bypass Windows 260-char path limits
echo [1/4] Configuring build paths...
subst H: /d >nul 2>&1
subst H: "%~dp0." >nul 2>&1
if not exist "H:\" (
    echo [ERROR] Failed to map virtual drive H:
    pause
    exit /b 1
)

:: 2. Set Java 17 and Android SDK environment
echo [2/4] Setting environment variables...
set "JAVA_HOME=%USERPROFILE%\.jdk\jdk-17.0.21+9"
set "ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk"
set "PATH=%JAVA_HOME%\bin;%PATH%"

:: 3. Run Gradle Build inside H:
echo [3/4] Building Standalone Android APK (Release)...
cd /d H:\android
call gradlew.bat assembleRelease --no-daemon
if errorlevel 1 (
    echo.
    echo [ERROR] Build failed. Checking debug build fallback...
    call gradlew.bat assembleDebug --no-daemon
    if errorlevel 1 (
        echo [ERROR] Both release and debug builds failed.
        pause
        exit /b 1
    )
    copy /y "H:\android\app\build\outputs\apk\debug\app-debug.apk" "%USERPROFILE%\Desktop\AnaPharm.apk" >nul
) else (
    copy /y "H:\android\app\build\outputs\apk\release\app-release.apk" "%USERPROFILE%\Desktop\AnaPharm.apk" >nul
)

:: 4. Done
echo.
echo ========================================================
echo [SUCCESS] APK built successfully!
echo Saved to: %USERPROFILE%\Desktop\AnaPharm.apk
echo ========================================================
echo.
pause
