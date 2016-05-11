@extends('layouts.app')


@section('main-content')
<script type="text/javascript" src={{ asset('/js/phaser.min.js') }}></script>
<script type="text/javascript" src={{ asset('/js/doodle_jump.js') }}></script>

<div id="doodle-jump" class="game-div"></div>

@endsection
