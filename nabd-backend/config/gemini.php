<?php

return [
    'api_key' => env('GEMINI_API_KEY'),
    'live_model' => env('GEMINI_LIVE_MODEL', 'gemini-2.0-flash-live-001'),
    'video_model' => env('GEMINI_VIDEO_MODEL', 'gemini-2.0-flash-001'),
    'report_model' => env('GEMINI_REPORT_MODEL', 'gemini-2.0-flash-001'),
    'thinking_level_realtime' => env('GEMINI_THINKING_LEVEL_REALTIME', 'low'),
    'thinking_level_video' => env('GEMINI_THINKING_LEVEL_VIDEO', 'high'),
    'thinking_level_report' => env('GEMINI_THINKING_LEVEL_REPORT', 'medium'),
    'media_resolution' => env('GEMINI_MEDIA_RESOLUTION', 'media_resolution_high'),
    'max_tokens' => env('GEMINI_MAX_TOKENS', 8192),
    'temperature' => env('GEMINI_TEMPERATURE', 1.0),
    'api_base_url' => env('GEMINI_API_BASE_URL', 'https://generativelanguage.googleapis.com'),
    'api_version' => env('GEMINI_API_VERSION', 'v1beta'),
    'system_prompt' => env('GEMINI_SYSTEM_PROMPT', 'أنت نظام ذكاء اصطناعي متخصص في تحليل السلوك غير اللفظي للأطفال المتضررين في مناطق النزاع. حلل البث المرئي والصوتي وقدم: الحالة العاطفية، مؤشرات الاستجابة، تحليل الصوت، ملاحظات سلوكية، وتنبيهات. أجب بصيغة JSON فقط.'),
];
