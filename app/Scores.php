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

  /**
   *
   */
  public function users()
  {
    return $this->belongsTo(User::class, 'user_id');
  }

  /**
   *
   */
  public function games()
  {
    return $this->belongsTo(Games::class, 'game_id');
  }

}
