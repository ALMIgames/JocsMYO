<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Scores extends Model
{
  protected $table = 'scores';

  protected  $fillable = [
      'user_id',
      'game_id',
      'score'
    ];
}
