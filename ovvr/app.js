/*========================================================================
 * get the source code for fragment shaders
 *========================================================================
 */
function source( id ){
    return document.getElementById( id ).innerHTML ;
}
var env = {} ; // Global variable

/*========================================================================
 * loadWebGL code
 *========================================================================
 */ 
function loadWebGL(){
    env.width  = 512 ;
    env.height = 512 ;
    env.time   = 0. ;

/*------------------------------------------------------------------------
 * creating textures for time stepping 
 *------------------------------------------------------------------------
 */
    env.fcolors = [] ;
    env.scolors = [] ;
    for(var i=0; i<12; i++){
        env['fcolor'+i] = new Abubu.Float32Texture( 
                env.width, env.height, { pairable : true } ) ;
        env['scolor'+i] = new Abubu.Float32Texture( 
                env.width, env.height, { pairable : true } ) ;
        env.fcolors.push(env['fcolor'+i]) ;
        env.scolors.push(env['scolor'+i]) ;
    }
    env.colors = [ ...env.fcolors, ...env.scolors ] ;
    for(var i=0; i< env.colors.length ; i++){
        env.colors[i].pairable = true ;
    }

    function OvvrTargets1( colors ){
        this.ocolor0    = { location : 0 , target : colors[0] } ;
        this.ocolor1    = { location : 1 , target : colors[1] } ;
        this.ocolor2    = { location : 2 , target : colors[2] } ;
        this.ocolor3    = { location : 3 , target : colors[3] } ;
    }

    function OvvrTargets2( colors ){
        this.ocolor4    = { location : 0 , target : colors[4] } ;
        this.ocolor5    = { location : 1 , target : colors[5] } ;
        this.ocolor6    = { location : 2 , target : colors[6] } ;
        this.ocolor7    = { location : 3 , target : colors[7] } ;
        this.ocolor8    = { location : 4 , target : colors[8] } ;
        this.ocolor9    = { location : 5 , target : colors[9] } ;
        this.ocolor10   = { location : 6 , target : colors[10] } ;
        this.ocolor11   = { location : 7 , target : colors[11] } ;
    }

/*------------------------------------------------------------------------
 * Initial conditions  
 *------------------------------------------------------------------------
 */
    // init sets 0 to 3 ..................................................
    env.finit1 = new Abubu.Solver({
        fragmentShader : source( 'init1' ) ,
        targets : new OvvrTargets1( env.fcolors ) ,
    } ) ;
    env.sinit1 = new Abubu.Solver({
        fragmentShader : source( 'init1' ) ,
        targets : new OvvrTargets1( env.scolors ) ,
    } ) ;

    // init sets 4 to 11 .................................................
    env.finit2 = new Abubu.Solver({
        fragmentShader : source( 'init2' ) ,
        targets : new OvvrTargets2( env.fcolors ) ,
    } ) ;
    env.sinit2 = new Abubu.Solver({
        fragmentShader : source( 'init2' ) ,
        targets : new OvvrTargets2( env.scolors ) ,
    } ) ;


    // function to initialize solution ...................................
    env.initialize = function(){
        env.finit1.run() ;
        env.sinit1.run() ;
        
        env.finit2.run() ;
        env.sinit2.run() ;


        env.splot.init() ;
        env.vsgn.init(0) ;
        env.osgn.init(0) ;

        env.time = 0. ;
    }

/*------------------------------------------------------------------------
 * marching steps 
 *------------------------------------------------------------------------
 */
//
//    // reads fcolors and writes scolors ..................................
//    env.fcomp = new Abubu.Solver({
//        fragmentShader : source('comp') ,
//        uniforms : new compUniforms( env.fcolors ) ,
//        targets : new TpTargets( env.scolors ) ,
//    } ) ;
//
//    // reads scolors and writes fcolors ..................................
//    env.scomp = new Abubu.Solver({
//        fragmentShader : source('comp') ,
//        uniforms : new compUniforms( env.scolors ) ,
//        targets : new TpTargets( env.fcolors ) ,
//    } ) ;

    // marches the solution for two time steps ...........................
    env.march = function(){
        //env.fcomp.render() ;
        //env.scomp.render() ;
        env.time += 2.*env.dt ;
    } ;

/*------------------------------------------------------------------------
 * click to excite 
 *------------------------------------------------------------------------
 */
    var click = new Abubu.Solver({
        fragmentShader : source( 'click' ) ,
        uniforms : {
            inTexture       : { type : 't', value  : env.fcolor4    } ,
            clickRadius     : { type : 'f', value  : 0.1            } ,
            clickPosition   : { type : 'v2', value : [0.5,0.5]      } ,
        } ,
        targets : {
            ocolor : { location : 0 , target : env.scolor1 } ,
        }
    } ) ;
    
    var clickCopy = new Abubu.Copy( env.scolor1, env.fcolor4 ) ;
    
    var mouseDrag_1 = new Abubu.MouseListener({
        canvas : document.getElementById('canvas_1') ,
        event : 'drag' ,
        callback : function(e){
            click.uniforms.clickPosition.value = e.position ;
            click.render() ;
            clickCopy.render() ;
        }
    } ) ; 

    var mouseDrag_2 = new Abubu.MouseListener({
        canvas : document.getElementById('canvas_3') ,
        event : 'drag' ,
        callback : function(e){
            click.uniforms.clickPosition.value = e.position ;
            click.render() ;
            clickCopy.render() ;
        }
    } ) ; 

/*------------------------------------------------------------------------
 * defibrilate 
 *------------------------------------------------------------------------
 */
    env.defib = {} ;
    env.thickness  = 0.05 ;
    env.uThreshold = -20 ;
    env.vThreshold = 0.25 ;

    env.defib_s1 = new Abubu.Solver({
        fragmentShader : source('defib') ,
        uniforms :{
            inColor : { type : 's', value : env.fcolor4, 
                        magFilter: 'linear' } ,
            thickness  : { type : 'f', value : env.thickness   } ,
            uThreshold : { type : 'f', value : env.uThreshold  } ,
            vThreshold : { type : 'f', value : env.vThreshold  } ,
        } ,
        targets : {
            ocolor : { location : 0 , target : env.scolor4 } ,
        }
    } ) ;
    
    env.defib_s2 = new Abubu.Copy(env.scolor4, env.fcolor4) ;
    env.defibrillate = function(){
        env.defib_s1.render() ;
        env.defib_s2.render() ;
    }
/*------------------------------------------------------------------------
 * save and load file 
 *------------------------------------------------------------------------
 */

    // save file .........................................................
    env.csvFileName = 'colorsSets_0_4.csv' ;
    env.saveCsvFile = function(){
        var link = document.createElement('a') ;
        var data = "data:text;charset=utf-8," +
            env.fcolor0.width + ',' + 
            env.fcolor0.height ;
        var width = env.fcolor0.width ;
        var height = env.fcolor0.height ;
        var f0 = env.fcolor0.value ;
        var f1 = env.fcolor1.value ;
        var f2 = env.fcolor2.value ;
        var f3 = env.fcolor3.value ;
        var f4 = env.fcolor4.value ;

        for(var i=0 ; i<(width*height) ; i++){
            var indx = i*4 ;
            data += ','+ 
                f0[indx  ].toExponential()+ ',' +
                f0[indx+1].toExponential()+ ',' +
                f0[indx+2].toExponential()+ ',' +
                f0[indx+3].toExponential()+ ',' +
                f1[indx  ].toExponential()+ ',' +
                f1[indx+1].toExponential()+ ',' +
                f1[indx+2].toExponential()+ ',' +
                f1[indx+3].toExponential()+ ',' +
                f2[indx  ].toExponential()+ ',' +
                f2[indx+1].toExponential()+ ',' +
                f2[indx+2].toExponential()+ ',' +
                f2[indx+3].toExponential()+ ',' +
                f3[indx  ].toExponential()+ ',' +
                f3[indx+1].toExponential()+ ',' +
                f3[indx+2].toExponential()+ ',' +
                f3[indx+3].toExponential()+ ',' +
                f4[indx  ].toExponential()+ ',' +
                f4[indx+1].toExponential()+ ',' +
                f4[indx+2].toExponential()+ ',' +
                f4[indx+3].toExponential() ;
        }
        
        var csv = encodeURI( data ) ;
        link.setAttribute( 'href', csv ) ;
        link.setAttribute( 'download', env.csvFileName ) ;
        link.click() ;
    }

    // load file .........................................................
    env.loadCsvFile = document.createElement('input') ;
    env.loadCsvFile.setAttribute('type', 'file') ;
    env.loadCsvFile.onchange = function(){
        /* check if a no file was selected */
        if ( !env.loadCsvFile.files[0] ){        
            return ;
        } ;
    
        var file = env.loadCsvFile.files[0] ;
        var reader = new FileReader() ;
        reader.readAsText(file) ;
    
        // only the when the file is loaded it can be analyzed
        reader.onload = function(event){
            var result  = event.target.result ;
            var data = result.split(',') ;
    
            var width = parseInt(data[0]) ;
            var height = parseInt(data[1]) ;
    
            var tabs = [] ;
            for(var i = 0 ; i<5 ; i++){
                tabs.push( new Float32Array(width*height*4) ) ;
            }
            
            var p = 2 ;
            var indx ;

            for (var i=0 ; i< (width*height) ; i++){ // modify accordingly
                indx = i*4 ;
                for(var j=0 ; j< 5 ; j++){
                    tabs[j][ indx   ] = parseFloat( data[p++]) ;
                    tabs[j][ indx+1 ] = parseFloat( data[p++]) ;
                    tabs[j][ indx+2 ] = parseFloat( data[p++]) ;
                    tabs[j][ indx+3 ] = parseFloat( data[p++]) ;
                }
             }

            for( var j=0 ; j<5; j++){
                env.fcolors[j].data = tabs[j] ;
                env.scolors[j].data = tabs[j] ;
            }
        }
    }
    
/*------------------------------------------------------------------------
 * Postprocessing 
 *------------------------------------------------------------------------
 */
    // voltage plot ------------------------------------------------------
    env.vplot = new Abubu.Plot2D({
        target : env.fcolor4 ,
        channel: 'r' ,
        minValue : -90 ,
        maxValue : 30 ,
        colorbar : true ,
        canvas : document.getElementById('canvas_1') ,
    } ) ;
    env.vplot.init() ;

    // tplot -------------------------------------------------------------
    env.tplot = new Abubu.Solver({
        fragmentShader : source("display") ,
        uniforms : {
            inColor : { type : 't', value : env.fcolor4 } ,
            thickness  : { type : 'f', value : env.thickness   } ,
            uThreshold : { type : 'f', value : env.uThreshold  } ,
            vThreshold : { type : 'f', value : env.vThreshold  } ,
        } ,
        canvas :  document.getElementById('canvas_3') 
    } ) ;

    // signal plots ------------------------------------------------------
    env.splot = new Abubu.SignalPlot({
        noPltPoints : 1024, // number of sample points
        grid : 'on', 
        nx   : 10 , // number of division in x 
        ny   : 12 , // ... in y 

        xticks : {  mode : 'auto', unit : 'ms', font : '11pt Times' } ,
        yticks : {  mode : 'auto', unit : '' , 
                    font : '12pt Times',precision : 1  } ,
        canvas : document.getElementById('canvas_2') 
    } ) ;

    env.osgn = env.splot.addSignal( env.fcolor4, {
            channel : 'g',
            minValue : -.1,
            maxValue : 1.1 ,
            restValue : 0. ,
            color : [ 0.3,0.,0.0 ],
            visible : true ,
            timewindow : 1000 , 
            probePosition : [0.5,0.5] 
    } ) ;

    // voltage signal ....................................................
    env.vsgn = env.splot.addSignal( env.fcolor4, {
            channel : 'r',
            minValue : -90,
            maxValue : 30 ,
            restValue : -83.0 ,
            color : [ 0.,.4,0.0 ],
            visible : true ,
            timewindow : 1000 , 
            probePosition : [0.5,0.5] 
    } ) ;


    // updateSignals -----------------------------------------------------
    env.updateSignals= function(){
        env.vsgn.update(env.time) ;
        env.osgn.update(env.time) ;
    }

    // refreshDisplay ----------------------------------------------------
    env.refreshDisplay = function(){
        env.vplot.render() ;
        env.splot.render() ;
        env.tplot.render() ;
    }

/*------------------------------------------------------------------------
 * Run sequence
 *------------------------------------------------------------------------
 */
    env.skip = 30 ;
    env.running = false ;
    env.run = function(){
        if (env.running){
            for(var i = 0 ; i<env.skip ; i++){
                env.march() ;
                env.updateSignals() ; 
            }
        }
        env.refreshDisplay() ;
        requestAnimationFrame(env.run) ;
    }

    createGui() ;
    env.initialize() ;
    env.run() ;
}

/*========================================================================
 * add multiple parameters to the GUI
 *========================================================================
 */ 
function addToGui( 
        guiElemenent ,  // gui element to add options into
        obj,            // object that holds parameters
        paramList,      // array of strings that contains list 
                        // of parmeters to be added
        solverList      // array of solvers that need to be update upon 
                        // change of a parameter through gui interactions
    ){
    var elements = {} ;
    for(i in paramList){
        var param = paramList[i] ;
        elements[param] = guiElemenent.add(obj, param )  ;
        elements[param].onChange(function(){
            console.log(this) ;
            Abubu.setUniformInSolvers( 
                    this.property , // this refers to the GUI element 
                    this.object[this.property] , 
                    solverList ) ;
        } ) ;
    }
    return elements ;
}

/*========================================================================
 * createGui
 *========================================================================
 */ 
function createGui(){
    var gui = new Abubu.Gui() ;     /*  create a graphical user 
                                        interface               */
    var panel = gui.addPanel() ;    /*  add a panel to the GUI  */

    // model parameters ..................................................
    var mdl = panel.addFolder("Model Parameters") ;
    addToGui(mdl, env,[ ], [env.fcomp, env.scomp] ) ;

    // defibrilation -----------------------------------------------------
    var dfb = panel.addFolder("Defibrillation") ;
    dfb.elements = addToGui( dfb, env, 
        [
            "thickness" ,
            "uThreshold" ,
            "vThreshold" 
        ] , [ env.defib_s1, env.tplot ] ) ;
   
    dfb.add(env,'defibrillate') ;
    dfb.open() ;
    
    // csv files ---------------------------------------------------------
    var csv = panel.addFolder('Save and Load CSV') ;
    csv.add(env,'csvFileName' ) ;
    csv.add(env,'saveCsvFile' ) ;
    csv.add(env.loadCsvFile , 'click').name('loadCsvFile') ;

    // execution .........................................................
    var exe = panel.addFolder('Execution') ;
    exe.add(env,'time').listen() ;
    exe.add(env,'skip') ;
    exe.add(env,'initialize') ;
    exe.add(env,'running') ;
    exe.open() ;
}
