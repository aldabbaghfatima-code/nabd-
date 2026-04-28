<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    private string $apiKey;
    private string $baseUrl;
    private string $model;

    public function __construct()
    {
        $this->apiKey = config('gemini.api_key');
        $this->baseUrl = config('gemini.api_base_url', 'https://generativelanguage.googleapis.com');
        $this->model = config('gemini.video_model', 'gemini-2.0-flash-001');
    }

    public function analyzeFrame(string $frameBase64, ?string $context = null): array
    {
        try {
            $response = Http::timeout(30)->post("{$this->baseUrl}/v1beta/models/{$this->model}:generateContent?key={$this->apiKey}", [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $this->getSystemPrompt()],
                            [
                                'inline_data' => [
                                    'mime_type' => 'image/jpeg',
                                    'data' => $frameBase64,
                                ],
                            ],
                            ['text' => 'حلل هذه الإطار من بث الطفل وقدم التحليل بصيغة JSON.'],
                        ],
                    ],
                ],
                'generationConfig' => [
                    'temperature' => config('gemini.temperature', 1.0),
                    'maxOutputTokens' => config('gemini.max_tokens', 8192),
                    'responseMimeType' => 'application/json',
                ],
            ]);

            if ($response->successful()) {
                $data = $response->json();
                $text = $data['candidates'][0]['content']['parts'][0]['text'] ?? '{}';
                return json_decode($text, true) ?? [];
            }

            Log::error('Gemini API error', ['status' => $response->status(), 'body' => $response->body()]);
            return $this->getEmptyAnalysis();
        } catch (\Throwable $e) {
            Log::error('Gemini Service exception', ['message' => $e->getMessage()]);
            return $this->getEmptyAnalysis();
        }
    }

    public function analyzeVideo(string $videoPath, ?string $context = null): array
    {
        try {
            $videoData = base64_encode(file_get_contents($videoPath));

            $response = Http::timeout(120)->post("{$this->baseUrl}/v1beta/models/{$this->model}:generateContent?key={$this->apiKey}", [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $this->getSystemPrompt()],
                            [
                                'inline_data' => [
                                    'mime_type' => 'video/mp4',
                                    'data' => $videoData,
                                ],
                            ],
                            ['text' => 'حلل هذا الفيديو للطفل وقدم تحليلاً شاملاً بصيغة JSON يتضمن: الحالة العاطفية، مؤشرات الانتباه، التواصل البصري، النشاط الصوتي، التفاعل الاجتماعي، وأي تنبيهات سلوكية.'],
                        ],
                    ],
                ],
                'generationConfig' => [
                    'temperature' => config('gemini.temperature', 1.0),
                    'maxOutputTokens' => config('gemini.max_tokens', 8192),
                    'responseMimeType' => 'application/json',
                ],
            ]);

            if ($response->successful()) {
                $data = $response->json();
                $text = $data['candidates'][0]['content']['parts'][0]['text'] ?? '{}';
                return json_decode($text, true) ?? [];
            }

            Log::error('Gemini Video API error', ['status' => $response->status(), 'body' => $response->body()]);
            return $this->getEmptyAnalysis();
        } catch (\Throwable $e) {
            Log::error('Gemini Video Service exception', ['message' => $e->getMessage()]);
            return $this->getEmptyAnalysis();
        }
    }

    public function getSystemPrompt(): string
    {
        return config('gemini.system_prompt', 'أنت نظام ذكاء اصطناعي متخصص في تحليل السلوك غير اللفظي للأطفال. أجب بصيغة JSON فقط.');
    }

    private function getEmptyAnalysis(): array
    {
        return [
            'emotional_state' => 'unknown',
            'attention_score' => 0,
            'vocal_activity_score' => 0,
            'eye_contact_score' => 0,
            'social_interaction_score' => 0,
            'notes' => [],
            'alerts' => [],
        ];
    }
}
