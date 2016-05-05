@extends('layouts.app')


@section('main-content')
<script type="text/javascript" src={{ asset('/js/phaser.min.js') }}></script>
<script type="text/javascript" src={{ asset('/js/infinite_runner.js') }}></script>

<div id="infinite-runner" class="game-div"></div>

@endsection
