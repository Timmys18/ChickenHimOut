param(
    [switch]$InstallOnly
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

function Write-Step {
    param([string]$Message)
    Write-Host "`n==> $Message" -ForegroundColor Cyan
}

function Refresh-Path {
    $machinePath = [Environment]::GetEnvironmentVariable("Path", "Machine")
    $userPath = [Environment]::GetEnvironmentVariable("Path", "User")
    $env:Path = "$machinePath;$userPath"
}

function Has-Command {
    param([string]$Name)
    return $null -ne (Get-Command $Name -ErrorAction SilentlyContinue)
}

function Install-WingetPackage {
    param(
        [string]$Id,
        [string]$DisplayName
    )

    if (-not (Has-Command "winget")) {
        throw "$DisplayName не найден, а winget недоступен. Установите $DisplayName и запустите START_AI_TEAM.cmd повторно."
    }

    Write-Step "Устанавливаю $DisplayName"
    & winget install --id $Id --exact --accept-package-agreements --accept-source-agreements
    if ($LASTEXITCODE -ne 0) {
        throw "Не удалось установить $DisplayName через winget."
    }
    Refresh-Path
}

Write-Host "ChickenHimOut: настройка команды Claude + Codex" -ForegroundColor Green
Write-Host "Папка проекта: $ProjectRoot"

if (-not (Has-Command "git")) {
    Install-WingetPackage -Id "Git.Git" -DisplayName "Git for Windows"
}

if (-not (Has-Command "node") -or -not (Has-Command "npm")) {
    Install-WingetPackage -Id "OpenJS.NodeJS.LTS" -DisplayName "Node.js LTS"
}

$nodeMajor = [int]((& node --version).TrimStart('v').Split('.')[0])
if ($nodeMajor -lt 18) {
    throw "Нужен Node.js версии 18 или новее. Сейчас установлена версия $(& node --version)."
}

$gitBashCandidates = @(
    "C:\Program Files\Git\bin\bash.exe",
    "C:\Program Files (x86)\Git\bin\bash.exe"
)
$gitBash = $gitBashCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if ($gitBash) {
    $env:CLAUDE_CODE_GIT_BASH_PATH = $gitBash
    [Environment]::SetEnvironmentVariable("CLAUDE_CODE_GIT_BASH_PATH", $gitBash, "User")
}

if (-not (Has-Command "claude")) {
    Write-Step "Устанавливаю Claude Code"
    & npm install -g @anthropic-ai/claude-code
    if ($LASTEXITCODE -ne 0) {
        throw "Не удалось установить Claude Code."
    }
    Refresh-Path
}

if (-not (Has-Command "codex")) {
    Write-Step "Устанавливаю Codex"
    Invoke-Expression (Invoke-RestMethod "https://chatgpt.com/codex/install.ps1")
    Refresh-Path
}

if (-not (Has-Command "claude")) {
    throw "Claude Code установлен, но команда claude пока не появилась в PATH. Закройте окно, откройте его снова и повторите запуск."
}
if (-not (Has-Command "codex")) {
    throw "Codex установлен, но команда codex пока не появилась в PATH. Закройте окно, откройте его снова и повторите запуск."
}

Write-Step "Проверяю установку"
Write-Host "Claude: $(& claude --version)"
Write-Host "Codex:  $(& codex --version)"

$mcpPath = Join-Path $ProjectRoot ".mcp.json"
if (-not (Test-Path $mcpPath)) {
    throw "В проекте отсутствует .mcp.json. Обновите проект из GitHub и повторите запуск."
}

try {
    $mcpConfig = Get-Content $mcpPath -Raw | ConvertFrom-Json
    if (-not $mcpConfig.mcpServers.codex) {
        throw "В .mcp.json нет подключения Codex."
    }
}
catch {
    throw "Файл .mcp.json повреждён: $($_.Exception.Message)"
}

Write-Step "Проверяю вход в Codex"
& codex login status
if ($LASTEXITCODE -ne 0) {
    Write-Host "Сейчас откроется вход в Codex через аккаунт ChatGPT." -ForegroundColor Yellow
    & codex login
    if ($LASTEXITCODE -ne 0) {
        throw "Вход в Codex не завершён. Запустите файл ещё раз после авторизации."
    }
}

Write-Step "Связка готова"
Write-Host "Claude автоматически прочитает CLAUDE.md, а Codex — AGENTS.md."
Write-Host "При первом запуске Claude подтвердите использование проектного сервера codex."

if ($InstallOnly) {
    Write-Host "Установка завершена. Для работы запустите START_AI_TEAM.cmd."
    exit 0
}

Write-Step "Запускаю руководителя AI-команды"
Write-Host "После появления строки ввода напишите задачу обычным русским языком."
Write-Host "Например: Сделай магазин скинов, обсуди решение с Codex, реализуй и проверь."

& claude
