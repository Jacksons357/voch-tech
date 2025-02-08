<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\BandeiraController;
use App\Http\Controllers\ColaboradorController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GrupoEconomicoController;
use App\Http\Controllers\UnidadeController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
  Route::controller(RegisteredUserController::class)->group(function () {
    Route::get('register', 'create')->name('register');
    Route::post('register', 'store');
  });

  Route::controller(AuthenticatedSessionController::class)->group(function () {
    Route::get('login', 'create')->name('login');
    Route::post('login', 'store');
  });

  Route::controller(PasswordResetLinkController::class)->group(function () {
    Route::get('forgot-password', 'create')->name('password.request');
    Route::post('forgot-password', 'store')->name('password.email');
  });

  Route::controller(NewPasswordController::class)->group(function () {
    Route::get('reset-password/{token}', 'create')->name('password.reset');
    Route::post('reset-password', 'store')->name('password.store');
  });
});

Route::middleware('auth')->group(function () {
  Route::get('verify-email', EmailVerificationPromptController::class)
    ->name('verification.notice');

  Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
    ->middleware(['signed', 'throttle:6,1'])
    ->name('verification.verify');

  Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
    ->middleware('throttle:6,1')
    ->name('verification.send');

  Route::controller(ConfirmablePasswordController::class)->group(function () {
    Route::get('confirm-password', 'show')->name('password.confirm');
    Route::post('confirm-password', 'store');
  });

  Route::put('password', [PasswordController::class, 'update'])->name('password.update');

  Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
    ->name('logout');

  Route::controller(GrupoEconomicoController::class)->group(function () {
    Route::get('grupos-economicos', 'index')->name('grupos-economicos.index');
    Route::get('grupos-economicos/create', 'create')->name('grupos-economicos.create');
    Route::post('grupos-economicos', 'store')->name('grupos-economicos.store');

    Route::get('/grupos-economicos/{id}/edit', [GrupoEconomicoController::class, 'edit'])->name('grupos-economicos.edit');
    Route::put('/grupos-economicos/{id}', [GrupoEconomicoController::class, 'update'])->name('grupos-economicos.update');

    Route::delete('/grupos-economicos/{id}', 'destroy')->name('grupos-economicos.destroy');
  });

  Route::controller(BandeiraController::class)->group(function () {
    Route::get('bandeiras', 'index')->name('bandeiras.index');
    Route::get('bandeiras/create', 'create')->name('bandeiras.create');
    Route::post('bandeiras', 'store')->name('bandeiras.store');

    Route::get('/bandeiras/{id}/edit', 'edit')->name('bandeiras.edit');
    Route::put('/bandeiras/{id}', 'update')->name('bandeiras.update');

    Route::delete('/bandeiras/{id}', 'destroy')->name('bandeiras.destroy');
  });

  Route::controller(UnidadeController::class)->group(function () {
    Route::get('unidades', 'index')->name('unidades.index');
    Route::get('unidades/create', 'create')->name('unidades.create');
    Route::post('unidades', 'store')->name('unidades.store');

    Route::get('/unidades/{id}/edit', 'edit')->name('unidades.edit');
    Route::put('/unidades/{id}', 'update')->name('unidades.update');

    Route::delete('/unidades/{id}', 'destroy')->name('unidades.destroy');
  });

  Route::controller(ColaboradorController::class)->group(function () {
    Route::get('colaboradores', 'index')->name('colaboradores.index');
    Route::get('colaboradores/create', 'create')->name('colaboradores.create');
    Route::post('colaboradores', 'store')->name('colaboradores.store');

    Route::get('/colaboradores/{id}/edit', 'edit')->name('colaboradores.edit');
    Route::put('/colaboradores/{id}', 'update')->name('colaboradores.update');

    Route::delete('/colaboradores/{id}', 'destroy')->name('colaboradores.destroy');
  });
});
