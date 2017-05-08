#extension GL_OES_standard_derivatives : enable
precision highp float;

uniform float opacity;
uniform vec3 color;
uniform sampler2D map;
uniform float iGlobalTime;
uniform float animate;
varying vec2 vUv;
varying float vLine;

#pragma glslify: aastep = require('glsl-aastep')

void main() {
  vec4 texColor = texture2D(map, vUv);
  float sdf = texColor.a;

  float alpha = 0.0;
  float animValue = pow(abs(animate * 2.0 - 1.0), 12.0 - vLine * 6.0);
  float threshold = animValue * 0.5 + 0.5;
  alpha += 0.6 * aastep(threshold, sdf);

  gl_FragColor = vec4(color, alpha);
}
