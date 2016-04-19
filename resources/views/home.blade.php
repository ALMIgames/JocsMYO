@extends('layouts.app')

@section('htmlheader_title')
	Home
@endsection


@section('main-content')
	<div class="container spark-screen">
		<div class="row">


			<div class="col-md-5">
					<div class="panel-heading">Doodle Jump</div>
					<div class="panel-body">
						Estadistiques de puntuacions màximes del doodle jump.
					</div>
			</div>

			<div class="col-md-5">
					<div class="panel-heading">Infinite runner</div>
					<div class="panel-body">
						Estadistiques de puntuacions màximes del infinite runner.
					</div>
			</div>

		</div>
	</div>
@endsection
