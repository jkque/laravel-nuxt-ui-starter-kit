<?php

use App\Models\User;
use Laravel\Fortify\Features;

test('security page is displayed', function (): void {
    if (! Features::canManageTwoFactorAuthentication()) {
        $this->markTestSkipped('Two-factor authentication is not enabled.');
    }

    Features::twoFactorAuthentication([
        'confirm' => true,
        'confirmPassword' => true,
    ]);

    $user = User::factory()->withoutTwoFactor()->create();

    $response = $this
        ->withSession(['auth.password_confirmed_at' => time()])
        ->actingAs($user)
        ->get('/settings/security');

    $response->assertStatus(200);
});
