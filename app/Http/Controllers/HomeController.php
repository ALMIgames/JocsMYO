<?php

/*
 * Taken from
 * https://github.com/laravel/framework/blob/5.2/src/Illuminate/Auth/Console/stubs/make/controllers/HomeController.stub
 */

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use App\Scores;

/**
 * Class HomeController
 * @package App\Http\Controllers
 */
class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {

      $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return Response
     */
    public function index()
    {
      $scoresDoodle = Scores::where('game_id', 1)->orderBy('score', 'desc')->get();
      $scoresRunner = Scores::where('game_id', 2)->orderBy('score', 'desc')->get();
      return view('home', compact('scoresDoodle', 'scoresRunner'));
    }
}
