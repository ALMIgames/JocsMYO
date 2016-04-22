<?php

use Illuminate\Database\Seeder;

class ScoresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      for ($i=0; $i < 50; $i++) {
        DB::table('scores')->insert([[
          'user_id' => rand(1, 10),
          'game_id' => rand(1, 2),
          'score' => rand(0, 9999)
        ]]);
      }
    }
}
