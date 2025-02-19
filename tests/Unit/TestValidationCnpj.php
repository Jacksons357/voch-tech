<?php

use App\Models\Bandeira;
use App\Models\Unidade;
use App\Rules\Cnpj;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

uses(TestCase::class, RefreshDatabase::class);

test('CNPJ inválido não deve ser aceito', function () {
    $user = \App\Models\User::factory()->create();
    $this->actingAs($user);

    $this->post(route('unidades.store'), [
        'cnpj' => '11.111.111/1111-11',
        'nome_fantasia' => 'Teste',
        'razao_social' => 'Teste Ltda',
        'bandeira_id' => '3',
        'user_id' => 1,
    ])->assertSessionHasErrors('cnpj');
});

test('CNPJ válido deve ser aceito', function () {
    $user = \App\Models\User::factory()->create();
    $this->actingAs($user);

    $bandeira = Bandeira::factory()->create(['user_id' => $user->id]);

    $this->post(route('unidades.store'), [
        'cnpj' => '47.794.678/0001-57',
        'nome_fantasia' => 'Teste',
        'razao_social' => 'Teste Ltda',
        'bandeira_id' => $bandeira->id,
        'user_id' => 1,
    ])->assertRedirect(route('unidades.index'));

    $this->assertDatabaseHas('unidades', [
        'cnpj' => '47.794.678/0001-57',
    ]);
});

test('CNPJ inválido não deve ser aceito na atualização', function () {
    $user = \App\Models\User::factory()->create();
    $this->actingAs($user);

    $unidade = Unidade::factory()->create();

    $bandeira = Bandeira::factory()->create(['user_id' => $user->id]);

    $this->put(route('unidades.update', $unidade->id), [
        'cnpj' => '11.111.111/1111-11',
        'nome_fantasia' => 'Teste',
        'razao_social' => 'Teste Ltda',
        'bandeira_id' => $bandeira->id,
        'user_id' => 1,
    ])->assertSessionHasErrors('cnpj');
});

test('CNPJ válido deve ser aceito na atualização', function () {
    $user = \App\Models\User::factory()->create();
    $this->actingAs($user);

    $unidade = Unidade::factory()->create();

    $bandeira = Bandeira::factory()->create(['user_id' => $user->id]);

    $this->put(route('unidades.update', $unidade->id), [
        'cnpj' => '47.794.678/0001-57',
        'nome_fantasia' => 'Teste',
        'razao_social' => 'Teste Ltda',
        'bandeira_id' => $bandeira->id,
        'user_id' => 1,
    ])->assertRedirect(route('unidades.index'));

    $this->assertDatabaseHas('unidades', [
        'cnpj' => '47.794.678/0001-57',
    ]);
});
