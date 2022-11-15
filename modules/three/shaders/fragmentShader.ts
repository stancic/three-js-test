const fragmentShader = `
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_bg;
uniform vec3 u_colorA;
uniform vec3 u_colorB;


void main() {
	  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv.x *= u_resolution.x/u_resolution.y;

    // parameters

    vec2 p[6];
    p[0] = vec2(0.5, 0.7);
    p[1] = vec2(1.2, 0.8);
    p[2] = vec2(0.22, 0.22);
    p[3] = vec2(2.2, 0.3);
    p[4] = vec2(2.4, 0.8);;
    p[5] = u_mouse;
    
    vec3 c[6];
    c[0] = vec3(0.129,0.149,0.286);
    c[1] = vec3(0.29,0.157,0.486);
    c[2] = vec3(0.29,0.157,0.486);
    c[3] = vec3(0.129,0.149,0.286);
    c[4] = vec3(0.29,0.157,0.486);
    c[5] = vec3(0.995,0.991,0.995);

    float blend = 4.0;
    
    // calc IDW (Inverse Distance Weight) interpolation
    
    float w[6];
    vec3 sum = vec3(0.0);
    float valence = 0.0;
    for (int i = 0; i < 6; i++) {
        float distance = 0.0;
        if (distance == 0.0) { distance = 1.0; }
        float w = 0.0;
        if (i == 0) {
            distance = length(uv - p[i]);
            w =  1.0 / pow(distance, blend) * 2.;
        } else {
            distance = length(uv - p[i]);
            w =  1.0 / pow(distance, blend);
        }
        
        sum += w * c[i];  
        valence += w;
    }
    sum /= valence;
    
    // apply gamma 2.2 (Approx. of linear => sRGB conversion. To make perceptually linear gradient)

    sum = pow(sum, vec3(3./2.2));
    
    // output
    
	gl_FragColor = vec4(sum.xyz, 0.5);
}

`;

export default fragmentShader;
