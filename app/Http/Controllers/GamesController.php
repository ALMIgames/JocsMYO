<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class GamesController extends Controller
{

      /**
       * Get a list of all games.
       *
       */
      public function getGames()
      {
          $games = Games::get();
      }
}
