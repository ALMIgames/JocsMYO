<?php

use Illuminate\Database\Seeder;

class GamesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('games')->insert([
        [
          'name' => 'Doodle Jump',
          'description' => 'Salta les plataformes!'
        ],
        [
          'name' => 'Infinite Runner',
          'description' => 'Intenta no caure!'
        ]
      ]);
    }
}
