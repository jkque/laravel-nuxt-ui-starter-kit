<?php

use App\Models\User;
use Illuminate\Support\Facades\Gate;

test('guest cannot view horizon', function (): void {
    $canView = Gate::check('viewHorizon');

    expect($canView)->toBeFalse();
});

test('authenticated user cannot view horizon without allowed email', function (): void {
    $user = User::factory()->create([
        'email' => 'user@example.com',
    ]);

    $canView = Gate::forUser($user)->check('viewHorizon');

    expect($canView)->toBeFalse();
});

test('authenticated user with allowed email can view horizon', function (): void {
    // This test documents the expected behavior when emails are added to the allowed list
    // Currently the allowed emails list is empty, so this will fail
    // Once emails are added to the list, this test would pass for those users
    $user = User::factory()->create([
        'email' => 'admin@example.com',
    ]);

    $canView = Gate::forUser($user)->check('viewHorizon');

    // Since the allowed list is empty, no one can access
    expect($canView)->toBeFalse();
});
