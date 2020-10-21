#version 300 es

precision highp int ;
precision highp float ;

in vec2 cc ;

uniform int cellType ;


// output color layouts ..................................................
layout (location = 0) out vec4 ocolor0 ;
layout (location = 1) out vec4 ocolor1 ;
layout (location = 2) out vec4 ocolor2 ;
layout (location = 3) out vec4 ocolor3 ;
layout (location = 4) out vec4 ocolor4 ;

// macros to assign color channels to physical variable ..................
#define V       color0.r
#define v       color0.r
#define vv      color0.r

#define sf      color0.g
#define Nai     color0.b
#define Ki      color0.a 

#define Cai     color1.r
#define CaSS    color1.g
#define ccass   CaSS
#define CaSR    color1.b
#define I_SumCa color1.a 

#define sm      color2.r
#define sh      color2.g
#define sj      color2.b
#define sxs     color2.a

#define sd      color3.r
#define sRR     color3.g
#define sf2     color3.b
#define sfcass  color3.a 

#define sr      color4.r
#define ss      color4.g
#define sxr1    color4.b
#define sxr2    color4.a

#define EPI     0
#define MYO     1
#define ENDO    2

/*========================================================================
 * main body of the shader
 *========================================================================
 */
void main(){
    vec4 color0, color1, color2, color3, color4 ;

    if (cellType == EPI){
        // Epi cells
        V       = -85.46 ;
        Cai     = 0.0001029;
        CaSR    = 3.432;
        CaSS    = 0.0002120;
        Nai     = 9.293;
        Ki      = 136.2;
        sm      = 0.001633;
        sh      = 0.7512;
        sj      = 0.7508;
        sxr1    = 0.0002052;
        sxr2    = 0.4736;
        sxs     = 0.003214;
        sr      = 2.326e-8;
        ss      = 1.000;
        sd      = 3.270e-5;
        sf      = 0.9767;
        sf2     = 0.9995;
        sfcass  = 1.000;
        sRR     = 0.9891;
    }else if (cellType == MYO){
        // M-cells
        V       = -84.53;
        Cai     = 0.0001156;
        CaSR    = 4.130;
        CaSS    = 0.0002331;
        Nai     = 9.322;
        Ki      = 136.0;
        sm      = 0.001694;
        sh      = 0.7466;
        sj      = 0.7457;
        sxr1    = 0.0002140;
        sxr2    = 0.4718;
        sxs     = 0.003343;
        sr      = 2.392e-8;
        ss      = 1.000;
        sd      = 3.345e-5;
        sf      = 0.9595;
        sf2     = 0.9995;
        sfcass  = 1.000;
        sRR     = 0.9874;
    }else{
        // endo
        V       = -84.70;
        Cai     = 0.0001021;
        CaSR    = 3.385;
        CaSS    = 0.0002111;
        Nai     = 9.413;
        Ki      = 136.1;
        sm      = 0.001634;
        sh      = 0.7512;
        sj      = 0.7508;
        sxr1    = 0.0002051;
        sxr2    = 0.4736;
        sxs     = 0.003213;
        sr      = 2.326e-8;
        ss      = 0.6401;
        sd      = 3.270e-5;
        sf      = 0.9771;
        sf2     = 0.9995;
        sfcass  = 1.000;
        sRR     = 0.9891;
    }

    // output colors .....................................................
    ocolor0 = vec4(color0 ) ;
    ocolor1 = vec4(color1 ) ;
    ocolor2 = vec4(color2 ) ;
    ocolor3 = vec4(color3 ) ;
    ocolor4 = vec4(color4 ) ;
}
