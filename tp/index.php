<!doctype html>
<html>
<head>
    <title>TP</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <script src='http://abubujs.org/libs/Abubu.latest.js' 
	    type='text/javascript'></script>

    <link rel="stylesheet" type="text/css" href="abubu_app.css">
</head>


<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<!-- All shaders included here (codes written in GLSL)                 -->
<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<?php
    include "shader.php" ;

    shader('init') ;
    shader('comp') ;
    shader('click') ;
    shader('display') ;
    shader('defib') ;
?>


<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<!-- main script - JavaScript code                                     -->
<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<script>
<?php
    echo file_get_contents( __dir__ . "/app.js" ) ;    
?></script>

<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<!-- body of the html page                                             -->
<!--&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-->
<body onload='loadWebGL();'>
    <h1>The TP Model</h1>
    <canvas id='canvas_1' width=512 height=512>
        Your browser does not support HTML4.0 canvas elements.
    </canvas>
    <canvas id='canvas_3' width=512 height=512>
        Your browser does not support HTML4.0 canvas elements.
    </canvas>
    <canvas id='canvas_2' width=512 height=512>
        Your browser does not support HTML4.0 canvas elements.
    </canvas>

</body>
</html>
