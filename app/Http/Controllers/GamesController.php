<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Games;
use View;

class GamesController extends Controller
{

      /**
       * Get a list of all games.
       *
       */
      public function doodlejump(){
        //carregar doodle jump

        return response()->view('games.doodlejump');
      }

     public function infiniterunner(){
       //carregar infinite runner
       $title = "Infinite runner";
       return response()->view('games.infiniterunner', compact('title'));
     }
}
