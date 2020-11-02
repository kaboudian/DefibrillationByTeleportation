<!doctype html>
<html>
<head>
    <title>FHN</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <script src='http://abubujs.org/libs/Abubu.latest.js' 
	    type='text/javascript'></script>

    <link rel="stylesheet" type="text/css" href="abubu_app.css">

</head>

<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<!-- body of the html page                                             -->
<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<body>
    <h1>The FitzHugh-Nagumo Model</h1>
    <canvas id=canvas_1 width=512 height=512>
        Your browser doesn't support HTML5.0
    </canvas>
    <canvas id=canvas_2 width=512 height=512>
        Your browser doesn't support HTML5.0
    </canvas>
    <canvas id=canvas_3 width=512 height=512>
        Your browser doesn't support HTML5.0
    </canvas>
    <canvas id=canvas_4 width=512 height=512>
        Your browser doesn't support HTML5.0
    </canvas>


<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<!-- All shaders included here (codes written in GLSL)                 -->
<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->

<?php
    include "shader.php" ;
    shader('init' ) ;
    shader('march') ;
    shader('click') ;
    shader('2dPhaseMap') ;
    shader('defib') ;
    shader('phaseUpdate') ;
    shader('phaseDisplay') ;
    shader('phaseInit') ;
?>

<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<!-- main script - JavaScript code                                     -->
<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<script>
<?php
    echo file_get_contents( __dir__ . "/app.js" ) ;
?>
</script>

</body>
</html>
