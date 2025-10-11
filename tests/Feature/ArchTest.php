<?php

it('checks for missing debug statements', function (): void {
    expect(['dd', 'dump', 'ray'])
        ->not->toBeUsed();
});

it('checks the validator facade is not used', function (): void {
    expect(\Illuminate\Support\Facades\Validator::class)
        ->not->toBeUsed()
        ->ignoring('App\Actions\Fortify');
});
