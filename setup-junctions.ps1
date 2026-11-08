$safeAreaJni = "node_modules\react-native-safe-area-context\android\src\main\jni"
$safeAreaCodegen = (Resolve-Path "node_modules\react-native-safe-area-context\android\build\generated\source\codegen\jni").Path
$safeAreaCommon = (Resolve-Path "node_modules\react-native-safe-area-context\common\cpp").Path

if (Test-Path "$safeAreaJni\codegen") { Remove-Item -Force "$safeAreaJni\codegen" }
if (Test-Path "$safeAreaJni\common") { Remove-Item -Force "$safeAreaJni\common" }

New-Item -ItemType Junction -Path "$safeAreaJni\codegen" -Target $safeAreaCodegen | Out-Null
New-Item -ItemType Junction -Path "$safeAreaJni\common" -Target $safeAreaCommon | Out-Null

$screensJni = "node_modules\react-native-screens\android\src\main\jni"
$screensCodegen = (Resolve-Path "node_modules\react-native-screens\android\build\generated\source\codegen\jni").Path
$screensCommon = (Resolve-Path "node_modules\react-native-screens\common\cpp").Path

if (Test-Path "$screensJni\codegen") { Remove-Item -Force "$screensJni\codegen" }
if (Test-Path "$screensJni\common") { Remove-Item -Force "$screensJni\common" }

New-Item -ItemType Junction -Path "$screensJni\codegen" -Target $screensCodegen | Out-Null
New-Item -ItemType Junction -Path "$screensJni\common" -Target $screensCommon | Out-Null

Write-Host "Junctions created successfully"
