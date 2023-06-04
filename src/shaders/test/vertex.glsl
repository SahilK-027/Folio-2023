/// Varyngs to send uv co-ordinates to frag shader
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 eyeVector;
varying vec3 vBary;
attribute vec3 aBary;



void main()
{
    vNormal = normalize(normalMatrix * normal);
    vec3 newPosition = position;
    vec4 worldPosition = modelMatrix * vec4(newPosition, 1.0);
    eyeVector = normalize(worldPosition.xyz - cameraPosition);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);


    // All varyings go here
    vUv = uv;
    vBary = aBary;
}