<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

use App\Http\Requests;

class ScoresController extends Controller
{

    public function save(Request $request)
    {
      var_dump('asdadads');

       if($request->ajax()) {
         $data = Input::all();
           print_r($data);die;
           $score = Scores::create([

           ]);
       }
    }
}
