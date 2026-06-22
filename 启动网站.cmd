@echo off
chcp 65001 >nul
cd /d "%~dp0"
set "NODE_EXE=C:\Users\wyyda\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if not exist "%NODE_EXE%" (
  echo 未找到 Node.js 运行环境。请安装 Node.js 20 或更高版本：https://nodejs.org/
  pause
  exit /b 1
)
if not exist "node_modules\next\dist\bin\next" (
  echo 网站依赖尚未安装，请先运行：pnpm install
  pause
  exit /b 1
)
echo 正在启动 NEWME MEDTECH 网站...
echo 浏览器将在几秒后打开：http://localhost:3000
start "" powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 5; Start-Process 'http://localhost:3000'"
"%NODE_EXE%" ".\scripts\start-local.cjs"
pause
