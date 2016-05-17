<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class ScoresController extends Controller
{

    public function save_score($data)
    {
      if(Request::ajax()) {
        $data = Input::all();
        print_r($data);die;
      }
    }
}
