<?php

namespace App\Actions\Fortify;

use App\Models\User;
use App\Models\Tenant;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use App\Concerns\PasswordValidationRules; // Verify these exist
use App\Concerns\ProfileValidationRules;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user and their school (tenant).
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'school_name' => ['required', 'string', 'max:100', 'unique:tenants,school_name'],
            'password' => $this->passwordRules(),
        ])->validate();

        return DB::transaction(function () use ($input) {
            // Create the Tenant (School) first
            $tenant = Tenant::create([
                'school_name' => $input['school_name'],
                'address' => $input['address'] ?? null,
            ]);

            // Create the User and link them to the new tenant's ID
            return User::create([
                'tenant_id' => $tenant->tenant_id,
                'name' => $input['name'],
                'email' => $input['email'],
                'password' => Hash::make($input['password']),
            ]);
        });
    }
}
