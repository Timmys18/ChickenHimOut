@echo off
chcp 65001 >nul
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\setup-ai-team.ps1"
if errorlevel 1 (
  echo.
  echo Настройка не завершена. Текст ошибки находится выше.
  pause
)
