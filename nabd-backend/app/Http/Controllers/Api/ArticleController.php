<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Article\StoreArticleRequest;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ArticleController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Article::with('author')->where('is_published', true);

        if ($request->filled('category')) {
            $query->where('category', $request->input('category'));
        }

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        $articles = $query->latest('published_at')->paginate($request->input('per_page', 12));

        return ArticleResource::collection($articles);
    }

    public function show(Request $request, string $slug): JsonResponse
    {
        $article = Article::with('author')
            ->where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        $article->increment('views_count');

        return response()->json(ArticleResource::make($article));
    }

    public function store(StoreArticleRequest $request): JsonResponse
    {
        $article = Article::create(array_merge($request->validated(), [
            'author_id' => $request->user()->id,
            'slug' => \Str::slug($request->title),
            'is_published' => $request->boolean('is_published', false),
            'published_at' => $request->boolean('is_published') ? now() : null,
        ]));

        return response()->json([
            'message' => 'تم إنشاء المقال بنجاح',
            'article' => ArticleResource::make($article->load('author')),
        ], 201);
    }

    public function update(StoreArticleRequest $request, Article $article): JsonResponse
    {
        $article->update(array_merge($request->validated(), [
            'slug' => \Str::slug($request->title),
            'published_at' => $request->boolean('is_published') && ! $article->published_at ? now() : $article->published_at,
        ]));

        return response()->json([
            'message' => 'تم تحديث المقال',
            'article' => ArticleResource::make($article->fresh()->load('author')),
        ]);
    }

    public function destroy(Request $request, Article $article): JsonResponse
    {
        $article->delete();

        return response()->json(['message' => 'تم حذف المقال']);
    }
}
