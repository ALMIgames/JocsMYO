<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Games extends Model
{
  protected $table = 'games';

  protected  $fillable = [
      'name',
      'description',
    ];

  /**
   *
   */
  public function scores()
  {
    return $this->hasMany(Scores::class);
  }
}
