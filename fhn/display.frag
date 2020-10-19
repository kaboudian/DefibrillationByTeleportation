#version 300 es
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * display.frag : calculate the colors for the various regions of
 * activation
 *
 * PROGRAMMER   : ABOUZAR KABOUDIAN
 * DATE         : Mon 19 Oct 2020 14:23:21 (EDT)
 * PLACE        : Chaos Lab @ GaTech, Atlanta, GA
 *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
precision highp float ;
precision highp int ;

// interface variables ---------------------------------------------------
in vec2 cc ;
uniform sampler2D   inColor ;
uniform float       uThreshold, vThreshold ;
uniform float       thickness ;

layout (location=0) out vec4 ocolor ;

// macros ----------------------------------------------------------------
#define ut  uThreshold
#define vt  vThreshold

#define u   color.r
#define v   color.g

/*========================================================================
 * main body 
 *========================================================================
 */
void main(){
    vec4 color = texture(inColor , cc ) ;

    float f = (u>ut) ? 1. : 0. ;
    float g = (v>vt) ? 1. : 0. ;

    ocolor = vec4(f,g,0.,1.) ;

    return ;
}
