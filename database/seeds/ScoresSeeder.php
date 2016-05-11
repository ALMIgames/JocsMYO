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
       $faker = Faker\Factory::create('es_ES');
       for ($i=0; $i < 30; $i++) {
         DB::table('scores')->insert([[
           'user_id' => 1,
           'game_id' => 1,
           'score' => rand(0, 9999)
         ]]);
     }
     for ($i=0; $i < 30; $i++) {
       DB::table('scores')->insert([[
         'user_id' => 1,
         'game_id' => 2,
         'score' => rand(0, 9999)
       ]]);
     }
   }
}
