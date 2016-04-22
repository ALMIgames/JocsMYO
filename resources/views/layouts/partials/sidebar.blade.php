<!-- Left side column. contains the logo and sidebar -->
<aside class="main-sidebar">

    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
        <!-- Sidebar Menu -->
        <ul class="sidebar-menu">
            <li class="header">Llistat de jocs</li>
            @foreach($games as $game)
              <li><a href="#"><i class='fa fa-link'></i> <span>{{ $game->name }}</span></a></li>
            @endforeach
            <!-- Optionally, you can add icons to the links -->
            <!--<li class="active"><a href="{{ url('home') }}"><i class='fa fa-link'></i> <span>Joc 1</span></a></li>-->

        </ul><!-- /.sidebar-menu -->
    </section>
    <!-- /.sidebar -->
</aside>
