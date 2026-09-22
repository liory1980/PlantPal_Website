param(
  [string]$At = '09:00',
  [switch]$Generate,
  [string]$NodePath = (Get-Command node -ErrorAction Stop).Source
)
$ErrorActionPreference = 'Stop'
$taskRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$taskEnv = Join-Path $taskRoot '.env.publisher'
if (-not (Test-Path -LiteralPath $taskEnv)) { throw 'Create .env.publisher first; see publisher/README.md.' }
$taskScript = Join-Path $PSScriptRoot 'run.mjs'
$taskArguments = '--env-file="' + $taskEnv + '" "' + $taskScript + '"'
if ($Generate) { $taskArguments += ' --generate' }
$taskAction = New-ScheduledTaskAction -Execute $NodePath -Argument $taskArguments -WorkingDirectory $taskRoot
$taskTrigger = New-ScheduledTaskTrigger -Daily -At $At
$taskSettings = New-ScheduledTaskSettingsSet -StartWhenAvailable -MultipleInstances IgnoreNew -ExecutionTimeLimit (New-TimeSpan -Minutes 20)
$taskUser = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name
$taskPrincipal = New-ScheduledTaskPrincipal -UserId $taskUser -LogonType Interactive -RunLevel Limited
Register-ScheduledTask -TaskName 'PlantPal Content Publisher' -Action $taskAction -Trigger $taskTrigger -Settings $taskSettings -Principal $taskPrincipal -Description 'Generate optional PlantPal drafts and publish reviewed articles through the authenticated content API.' -Force | Select-Object TaskName,State
Write-Output 'Runs when this user is logged in. The PC must be awake and connected. Secrets remain in .env.publisher, not the task arguments.'
