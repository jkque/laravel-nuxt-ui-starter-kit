# Laravel Vue Starter Kit

A modern Laravel 12 application with Vue 3, Inertia.js, and Tailwind CSS v4.

## Requirements

- PHP ^8.2
- Composer
- Node.js & npm
- SQLite (default) or MySQL/PostgreSQL

## Quick Setup

The fastest way to get started:

```bash
composer setup
```

This command will:
- Install PHP dependencies
- Create `.env` file from `.env.example`
- Generate application key
- Run database migrations
- Install JavaScript dependencies
- Build frontend assets

## Manual Setup

If you prefer to set up step by step:

### 1. Install Dependencies

```bash
# Install PHP dependencies
composer install

# Install JavaScript dependencies
npm install
```

### 2. Environment Configuration

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 3. Database Setup

By default, this project uses SQLite. The database file will be created automatically during migration.

If you prefer MySQL or PostgreSQL, update your `.env` file:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

Run migrations:

```bash
php artisan migrate
```

### 4. Build Frontend Assets

```bash
npm run build
```

## Development

### Start Development Server

The easiest way to start all development services:

```bash
composer run dev
```

This concurrently runs:
- Laravel development server (port 8000)
- Queue worker
- Log viewer (Laravel Pail)
- Vite dev server (hot module replacement)

### Individual Services

You can also run services individually:

```bash
# Laravel server
php artisan serve

# Vite dev server (hot reload)
npm run dev

# Queue worker
php artisan queue:listen

# Log viewer
php artisan pail
```

### Server-Side Rendering (SSR)

To run with Inertia SSR:

```bash
composer run dev:ssr
```

## Laravel Sail (Docker)

This project includes Laravel Sail for Docker-based development.

### Start Sail

```bash
# Start containers
./vendor/bin/sail up -d

# Run migrations
./vendor/bin/sail artisan migrate

# Install JavaScript dependencies
./vendor/bin/sail npm install

# Build assets
./vendor/bin/sail npm run build
```

### Common Sail Commands

```bash
# Run Artisan commands
./vendor/bin/sail artisan <command>

# Run tests
./vendor/bin/sail test

# Run specific test
./vendor/bin/sail test --filter <testMethodName>

# Composer commands
./vendor/bin/sail composer <command>

# NPM commands
./vendor/bin/sail npm <command>

# Access shell
./vendor/bin/sail shell
```

## Testing

This project uses **Pest** as the testing framework. All tests are written using Pest's expressive syntax.

### Run All Tests

```bash
composer test
```

This runs:
- Type coverage analysis (requires 100%)
- Unit and feature tests with coverage (requires 100% coverage)
- Code style checks (Pint, Rector, Prettier)
- Static analysis (PHPStan)

### Run Specific Test Suites

```bash
# All Pest tests
php artisan test

# Specific test file
php artisan test tests/Feature/ExampleTest.php

# Filter by test description
php artisan test --filter="test description"

# Run with coverage
composer run test:unit

# Type coverage check
composer run test:type-coverage

# Static analysis
composer run test:types
```

### With Laravel Sail

```bash
# All tests
./vendor/bin/sail test

# Feature tests only
./vendor/bin/sail test --testsuite=Feature

# Unit tests only
./vendor/bin/sail test --testsuite=Unit

# With coverage
./vendor/bin/sail test --coverage

# Filter by test description
./vendor/bin/sail test --filter="creates user"
```

### Writing Pest Tests

Tests use Pest's expressive syntax:

```php
it('creates a new user', function () {
    $user = User::factory()->create();

    expect($user)->toBeInstanceOf(User::class)
        ->and($user->email)->not->toBeEmpty();
});

test('user can login', function () {
    $user = User::factory()->create();

    $response = $this->post('/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $response->assertSuccessful();
});
```

Create new tests with:

```bash
# Feature test
php artisan make:test UserTest --pest

# Unit test
php artisan make:test UserTest --pest --unit
```

## Code Quality

### Linting & Formatting

```bash
# Fix all code style issues
composer run lint

# Check code style without fixing
composer run test:lint
```

Individual tools:

```bash
# PHP - Laravel Pint
vendor/bin/pint

# PHP - Rector
vendor/bin/rector

# JavaScript - ESLint
npm run lint

# JavaScript - Prettier
npm run format

# Check formatting
npm run format:check
```

## Technology Stack

### Backend
- Laravel 12
- PHP 8.2+
- Inertia.js Laravel adapter v2
- Laravel Fortify (authentication)
- Laravel Horizon (queue monitoring)
- Laravel Wayfinder (routing)

### Frontend
- Vue 3
- Inertia.js v2
- Tailwind CSS v4
- Nuxt UI (component library)
- TypeScript
- Vite

### Development Tools
- Pest (testing framework)
- Laravel Pint (code formatter)
- PHPStan (static analysis)
- Rector (automated refactoring)
- ESLint & Prettier

## Project Structure

```
.
├── app/                    # Application code
│   ├── Http/              # Controllers, middleware, requests
│   ├── Models/            # Eloquent models
│   └── ...
├── bootstrap/             # Application bootstrap
├── config/                # Configuration files
├── database/              # Migrations, seeders, factories
├── public/                # Public assets
├── resources/             # Views, JavaScript, CSS
│   ├── js/
│   │   ├── Pages/        # Inertia.js pages
│   │   └── Components/   # Vue components
│   └── css/
├── routes/                # Route definitions
├── storage/               # Application storage
├── tests/                 # Test files
│   ├── Feature/          # Feature tests
│   └── Unit/             # Unit tests
└── vendor/                # Composer dependencies
```

## Environment Variables

Key environment variables to configure:

```env
# Application
APP_NAME=Laravel
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost

# Database
DB_CONNECTION=sqlite

# Session & Cache
SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database

# Mail
MAIL_MAILER=log
```

## Troubleshooting

### Frontend Changes Not Showing

If you don't see frontend changes reflected in the browser:

```bash
# Rebuild assets
npm run build

# Or restart dev server
npm run dev
```

### Vite Manifest Error

If you encounter "Unable to locate file in Vite manifest" error:

```bash
npm run build
```

### Permission Issues

If you encounter permission issues with storage or cache:

```bash
chmod -R 775 storage bootstrap/cache
```

## Additional Resources

- [Laravel Documentation](https://laravel.com/docs)
- [Vue 3 Documentation](https://vuejs.org/)
- [Inertia.js Documentation](https://inertiajs.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Nuxt UI Documentation](https://ui.nuxt.com/)
- [Pest Documentation](https://pestphp.com/)

## License

This project is open-sourced software licensed under the MIT license.
