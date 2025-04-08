uniform vec2 uResolution;
uniform float uTime;
varying vec2 vUv;
void main(){

    vec4 color1 = vec4(0.35, 0.89, 0.21, 1.0);
    vec4 color2 = vec4(0.18, 0.67, 0.89, 1.0);
    vec4 colorMix = mix(color1, color2, vUv.x+sin(uTime*0.5));

    vec4 color3 = vec4(0.89, 0.8, 0.09, 1.0);
    vec4 color4 = vec4(0.91, 0.16, 0.16, 1.0);
    vec4 colorMix2 = mix(color3, color4, vUv.x+sin(uTime*0.5));

    vec4 final = mix(colorMix2, colorMix, vUv.y-cos(uTime*0.6));

    gl_FragColor = final;
}
