<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('confirm password screen can be rendered', function (): void {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('password.confirm'));

    $response->assertInertia(fn (Assert $page): \Inertia\Testing\AssertableInertia => $page
        ->component('auth/ConfirmPassword')
    );
});

test('password confirmation requires authentication', function (): void {
    $response = $this->get(route('password.confirm'));

    $response->assertRedirect(route('login'));
});
