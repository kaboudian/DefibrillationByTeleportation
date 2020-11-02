#version 300 es 

precision highp float ;
precision highp int ;


in vec2 cc ;
uniform sampler2D   icolor ;

out vec4 ocolor ;

#define     u   color.r
#define     v   color.g
void main(){
    vec4 color = texture( icolor, cc ) ;

    if ( u > 0.5 ){
        ocolor = vec4( .8, 0.,0.,1. ) ;
        return ;
    }

    if ( v>0.5 ){
        ocolor = vec4(.378,0.639,0.851,1.) ;
        return ;
    }

    ocolor=vec4(0) ;
    //ocolor= vec4(vec3(0.99),1.) ;
    return ;
}
