<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $featuredProducts = Product::with(['category', 'images'])
            ->active()
            ->featured()
            ->inStock()
            ->limit(8)
            ->get();

        $categories = Category::active()
            ->parent()
            ->withCount('products')
            ->orderBy('sort_order')
            ->get();

        return view('home', compact('featuredProducts', 'categories'));
    }
}
