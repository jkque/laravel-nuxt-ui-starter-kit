# Laravel Nuxt UI Starter Kit

A production-ready Laravel 12 starter kit with Vue 3, Inertia.js v2, Nuxt UI components, and Tailwind CSS v4. Built for developers who want to start their next web application with modern tools and best practices already configured.

## Why Use This Starter Kit?

Skip the repetitive setup and start building features immediately. This starter kit provides:

- **Zero Configuration**: Everything is pre-configured and ready to use
- **Best Practices**: Modern architecture patterns and coding standards built-in
- **Full Authentication**: Complete auth system you can customize or use as-is
- **Beautiful UI**: Nuxt UI component library with Tailwind CSS v4
- **Type Safety**: TypeScript on frontend, PHP 8.2+ with strict types on backend
- **Developer Tools**: Testing, linting, formatting, and quality checks ready to go
- **Example Code**: Reference implementations for common patterns

Perfect for MVPs, SaaS applications, internal tools, or any Laravel project needing a modern frontend.

## Installation

### Via Laravel Installer

You may create a new project using the [Laravel installer](https://laravel.com/docs/12.x/installation#creating-a-laravel-project):

```bash
laravel new my-app --kit=jkque/laravel-nuxt-ui-starter-kit
```

### Via Composer

Or, you can create a new project using Composer's `create-project` command:

```bash
composer create-project jkque/laravel-nuxt-ui-starter-kit my-app
```

After creating the project, start the development server:

```bash
cd my-app
composer run dev
```

This will:
- Install all PHP and JavaScript dependencies
- Set up your environment configuration
- Run database migrations
- Build frontend assets
- Start Laravel server, queue worker, logs viewer, and Vite dev server

Your application will be available at `http://localhost:8000`.

### Alternative: Clone Repository

You can also clone this repository directly:

```bash
git clone https://github.com/jkque/laravel-nuxt-ui-starter-kit.git my-app
cd my-app
composer setup
composer run dev
```

## Quick Start

Once installed, you can immediately:

1. **Access your application** at `http://localhost:8000`
2. **Register a new account** using the built-in authentication
3. **Explore the dashboard** and sample pages
4. **Review the code** in `resources/js/pages/` to see implementation examples
5. **Start building** your features using the included components and patterns

The starter kit includes:
- Pre-built authentication pages (login, register, password reset, 2FA)
- Dashboard with example layouts and components
- Settings pages demonstrating forms and user preferences
- Type-safe routing with Laravel Wayfinder
- Configured testing environment with Pest

## What's Included

This starter kit comes with everything you need to build modern web applications:

### Authentication & Authorization
- Complete authentication system powered by Laravel Fortify
- Login, registration, and email verification
- Password reset functionality
- Two-factor authentication support
- Email verification
- Password confirmation for sensitive actions

### Frontend Stack
- **Vue 3** with TypeScript support
- **Inertia.js v2** for seamless SPA experience without API complexity
- **Nuxt UI** component library for beautiful, accessible UI components
- **Tailwind CSS v4** for utility-first styling
- **Lucide Vue** icons
- **Vite** for lightning-fast development and optimized production builds
- Server-Side Rendering (SSR) support with Inertia

### Sample Application Pages
- Welcome/landing page
- Dashboard with example UI
- Customer management page
- Inbox interface
- Settings pages (Profile, Security, Notifications, Members)
- Complete authentication flow pages

### Backend Features
- **Laravel 12** with modern PHP 8.2+ features
- **Laravel Wayfinder** for type-safe routing between Laravel and Vue
- **Laravel Horizon** for queue monitoring and management
- **Database queue driver** configured by default
- SQLite database (easily switchable to MySQL/PostgreSQL)
- Session and cache management

### Developer Experience
- **Pest PHP** testing framework with 100% coverage requirements
- **PHPStan** for static analysis
- **Laravel Pint** for PHP code formatting
- **Rector** for automated refactoring
- **ESLint** and **Prettier** for JavaScript/Vue formatting
- Type coverage analysis
- Concurrent development server (Laravel + Queue + Logs + Vite)
- **Laravel Pail** for beautiful log viewing
- **Laravel Sail** Docker environment included

### Code Quality Tools
- Automated code formatting and linting
- 100% test coverage enforcement
- 100% type coverage requirements
- Pre-configured testing scripts
- Parallel test execution

## Requirements

- PHP ^8.2
- Composer
- Node.js & npm
- SQLite (default) or MySQL/PostgreSQL

## Manual Setup

If you cloned the repository directly and need to set up manually, or want to customize the installation process:

#### 1. Install Dependencies

```bash
# Install PHP dependencies
composer install

# Install JavaScript dependencies
npm install
```

#### 2. Environment Configuration

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

#### 3. Database Setup

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

#### 4. Build Frontend Assets

```bash
npm run build
```

### What's Next?

After installation, you can:

1. **Start Development**: Run `composer run dev` to start all development services
2. **Explore Sample Pages**: Visit the dashboard, settings, and other pre-built pages
3. **Customize Authentication**: Modify the authentication pages and flow to match your needs
4. **Build Your Features**: Use the included components and patterns as a starting point
5. **Add Your Routes**: Define new routes in `routes/web.php` and create corresponding Inertia pages
6. **Customize UI**: Leverage Nuxt UI components and Tailwind CSS for your design

The starter kit includes example pages demonstrating common patterns like forms, tables, navigation, and layouts. Use these as references while building your application.

## Development

### Using This Starter Kit

This starter kit is structured to help you build applications quickly:

- **Pages**: Create new Inertia pages in `resources/js/pages/`
- **Components**: Reusable Vue components in `resources/js/components/`
- **Layouts**: Page layouts in `resources/js/layouts/`
- **Routes**: Define routes in `routes/web.php` using Laravel Wayfinder for type-safety
- **Actions**: Backend actions in `resources/js/actions/`
- **Composables**: Reusable composition functions in `resources/js/composables/`

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
