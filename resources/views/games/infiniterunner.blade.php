@extends('layouts.app')

@section('htmlheader_title')
	Infinite runner
@endsection


@section('main-content')
<script type="text/javascript" src={{ asset('/js/phaser.min.js') }}></script>
<script type="text/javascript" src={{ asset('/js/infinite_runner.js') }}></script>

  <h1>PLAY INFINITE RUNNER HERE</h1>

<div id="infinite-runner"></div>

@endsection
