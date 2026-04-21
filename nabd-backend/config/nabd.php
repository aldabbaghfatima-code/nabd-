<?php

return [
    'name' => env('APP_NAME', 'Nabd'),
    'frontend_url' => env('FRONTEND_URL', 'http://localhost:3000'),
    'api_rate_limit' => env('API_RATE_LIMIT', 60),
    'analysis_rate_limit' => env('ANALYSIS_RATE_LIMIT', 10),
    'max_video_size' => 100 * 1024 * 1024,
    'max_photo_size' => 5 * 1024 * 1024,
    'allowed_video_mimes' => ['video/mp4', 'video/avi', 'video/mov', 'video/webm'],
    'allowed_photo_mimes' => ['image/jpeg', 'image/png', 'image/webp'],
    'pagination_default' => 12,
];
