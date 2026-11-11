varying vec2 vUv;
uniform float uScrollSpeed;

void main(){

    vec3 pos = position;
    float normalizeY = pos.y * 2.0;
    float curveFactor = 0.1 - normalizeY * normalizeY;
    pos.x += curveFactor * uScrollSpeed * 0.9;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vUv = uv;
}