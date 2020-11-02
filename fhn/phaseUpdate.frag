#version 300 es 

precision highp float ;
precision highp int ;

in vec2 cc ;

uniform sampler2D   icolor ;
uniform sampler2D   ucolor ;
uniform sampler2D   vcolor ;

uniform vec4        uMultiplier ;
uniform vec4        vMultiplier ;

uniform float       uMin, uMax, vMin, vMax ;

#define probe   vec2(0.5)

layout (location = 0) out vec4 ocolor ;

void main(){
    vec4  color  = texture( icolor, cc ) ;
    float u     = (dot( uMultiplier, texture( ucolor,probe ) ) - uMin)
                /(uMax-uMin)  ;
    float v     = (dot( vMultiplier, texture( vcolor,probe ) ) - vMin) 
                /(vMax-vMin) ;

    if ( color.r > 0.5 ){
        color.g = 1. ;
        color.r = 0. ;
    }

    if ( length(cc-vec2(v,u)) < 0.013 ){
        color.r = 1. ;
    }

    ocolor = vec4(color) ;

    return ;
}
