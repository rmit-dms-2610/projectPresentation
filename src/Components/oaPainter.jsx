import { Bus, GLSL, LinearCopy, NearestCopy, Node, Shaders, Uniform, connectSize } from 'gl-react';
import { Surface } from 'gl-react-dom';
import React, { useEffect, useRef, useState } from 'react';

export default function OAPainter() {
	let surfaceRef = useRef(null);
	let [surfaceWidth, setSurfaceWidth] = useState(0);
	let [panelWidth, setPanelWidth] = useState(0);
	let [surfaceHeight, setSurfaceHeight] = useState(0);

	let [isDrawing, setIsDrawing] = useState(false);

	let [brushPos, setBrushPos] = useState([0.5, 0.5]);
	let [brushRadius, setBrushRadius] = useState(0.01);
	let [brushHue, setBrushHue] = useState(1);
	let painterDownscale = 10;
	let paintBusRef = useRef(null);

	let [reset, setReset] = useState(false);
	let [paintMix, setPaintMix] = useState(1.0);
	let [previousTimeStamp, setPreviousTimeStamp] = useState();
	let [simRunning, setSimRunning] = useState(false);
	useEffect(() => {
		if(simRunning === true){
			window.requestAnimationFrame(runSim);
		}
	}, [simRunning]);
	let diffusionDownscale = 3.3;
	let reactBusRef = useRef(null);

	let textBusRef = useRef(null);

	let wrapper;

	function getMousePos(e){
		let rect = e.target.getBoundingClientRect();
		return [
			((e.clientX - rect.left) / rect.width * 3) % 1,
			(rect.bottom - e.clientY) / rect.height
		]
	}

	/* mouse event functions */
	function onMouseDown(e){
		setIsDrawing(true);
		setReset(true);
		setBrushPos(getMousePos(e));
	}
	function onMouseUp(e){
		setIsDrawing(false);
		setReset(false);
	}
	function onMouseMove(e){
		if (isDrawing){
			setBrushPos(getMousePos(e));
			setBrushRadius(0.03 + 0.01 * Math.cos(Date.now() / 1000));
			setBrushHue((Math.cos(Date.now() / 1000) + 1.0 ) * 0.45);
		}
	}
	/* can i just use mouseUp? */
	function onMouseLeave(){
		setIsDrawing(false);
	}

	function updateDimensions(){
		wrapper = document.getElementById("oaPainterWrapper");
		setSurfaceWidth(wrapper.clientWidth);
		setPanelWidth(wrapper.clientWidth / 3);
		setSurfaceHeight(wrapper.clientWidth * 0.25);
	}

	function toggleSim(){
		if(simRunning){
			setPaintMix(1.0);
			setSimRunning(false);
		} else {
			setPaintMix(0.0);
			setSimRunning(true);
		}		
	}

	function runSim(timeStamp){
		if(previousTimeStamp !== timeStamp){
			setPreviousTimeStamp(timeStamp);
		}
		if(simRunning){
			window.requestAnimationFrame(runSim);
		}
	}

	/* on init */
	useEffect(() => {
		updateDimensions();
		window.addEventListener("resize", updateDimensions);
	}, []);

	return (
		<div style={{flex: 4, display: 'flex', flexDirection: 'column', gap: '2rem'}}>
		<div id="oaPainterWrapper">
			<Surface ref={surfaceRef}
							 width={surfaceWidth}
							 height={surfaceHeight}
							 webglContextAttributes={{ preserveDrawingBuffer: true } }
							 onMouseUp={onMouseUp}
							 onMouseDown={onMouseDown}
							 onMouseMove={onMouseMove}
							 onMouseLeave={onMouseLeave}>

				{/* painter layer */}
				<Bus ref={paintBusRef}>
					<NearestCopy>
						<Node shader={shaders.paint}
									clear={null}
									width={panelWidth/painterDownscale}
									height={surfaceHeight/painterDownscale}
									uniforms={{
										isDrawing,
										brushHue,
										brushPos,
										brushRadius
									}} />
					</NearestCopy>			
				</Bus>

				{/* reaction diffusion layer */}
				<Bus ref={reactBusRef}>
					<LinearCopy>
						<BlurXY factor={5.0}>
							<ReactDiff width={panelWidth/diffusionDownscale}
												 height={surfaceHeight/diffusionDownscale}
												 reset={reset}
												 paintMix={paintMix}
												 resetTexture={() => paintBusRef.current} />
						</BlurXY>
					</LinearCopy>
				</Bus>

				{/* retexture layer */}
				<Bus ref={textBusRef}>
					<LinearCopy>
						<TextureLookup width={panelWidth/diffusionDownscale}
												 	 height={surfaceHeight/diffusionDownscale}
													 lookup={() => reactBusRef.current} />
					</LinearCopy>
				</Bus>

				{/* 3 panel output */}				
				<Node shader={shaders.threePanels}
							uniforms={{
								canvasA: () => paintBusRef.current,
								canvasB: () => reactBusRef.current,
								canvasC: () => textBusRef.current
							}} />

			</Surface>
		</div>
		<button onClick={() => toggleSim()} style={{margin: '0 auto'}}>
			{simRunning ? "Pause Simulation"
									: "Run Simulation"}			
		</button>
		</div>
	)
}

const Blur1D = connectSize(({children: t, direction, width, height}) =>
	<Node shader={shaders.blur1D}
				uniforms={{
					t,
					resolution: [width, height],
					direction
				}} />
);

const BlurXY = connectSize(({ factor, children}) => 
	<Blur1D direction={[ factor, 0 ]}>
		<Blur1D direction={[ 0, factor ]}>
			{children}
		</Blur1D>
	</Blur1D>
);
/* connect size? */
let diffusionScale = 2.0;
let backgroundMix = 0.0;
/* let paintMix = 0.0; */
let displacementAmount = 1.0;
let feedA = 0.45;
let feedB = 0.0108;
let killA = 0.04905;
let killB = 0.00558;

const ReactDiff = connectSize(({width, height, reset, paintMix, resetTexture}) => 
	<Node shader={shaders.reactDiff}
				backbuffering
				/* sync */
				uniforms={{
					texture: reset ? resetTexture : Uniform.Backbuffer,
					width,
					height,
					diffusionScale,
					backgroundMix,
					paintMix,
					displacementAmount,
					feedA,
					feedB,
					killA,
					killB
				}} />
);

const TextureLookup = connectSize(({lookup, width, height}) =>
	<Node shader={shaders.textureLookup}
				backbuffering
				ignoreUnusedUniforms={true}
				uniforms={{
					tileSheet: "/images/gts02.png",
					lookup,
					lookup_res: [720.0, 720.0],
					numCols: 8,
					numRows: 8,
					scale: 2.0,
					indexQuantise: 1.0,
					index_colorMix: 0.0,
					transform_colorMix: 1.0,
					width,
					height,
					back: Uniform.Backbuffer
				}} />
);

const shaders = Shaders.create({
	helloGL: {
    frag: GLSL`
		precision highp float;
		varying vec2 uv;
		void main() {
			gl_FragColor = vec4(uv.x, uv.y, 0.5, 1.0);
		}`},
	paint: {
		frag: GLSL`    
    precision highp float;
    varying vec2 uv;

    uniform bool isDrawing;
    uniform vec2 brushPos;
    uniform float brushHue;
    uniform float brushRadius;

		vec3 hue2rgb(float hue){
			vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
			vec3 p = abs(fract(vec3(hue,hue,hue) + K.xyz) * 6.0 - K.www);
			return 1.0 * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), 1.0);
		}

    void main() {
			vec4 hsvColour = vec4(hue2rgb(brushHue * 0.9), 1.0);

			if(isDrawing == true){
				vec2 d = uv - brushPos;
				if(length(d) < brushRadius){
					gl_FragColor = hsvColour;
				} else { discard; }
			} else { discard; }

		}`
	},
	// blur9: from https://github.com/Jam3/glsl-fast-gaussian-blur
	blur1D: {
		frag: GLSL`
		precision highp float;
		varying vec2 uv;

		uniform sampler2D t;
		uniform vec2 direction, resolution;

		vec4 blur9(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
  		vec4 color = vec4(0.0);
			vec2 off1 = vec2(1.3846153846) * direction;
			vec2 off2 = vec2(3.2307692308) * direction;
			color += texture2D(image, uv) * 0.2270270270;
			color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;
			color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;
			color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;
			color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;
			return color;
		}

		void main() {
  		gl_FragColor = blur9(t, uv, resolution, direction);
		}`
	},
	textureTest: {
		frag: GLSL`
		precision highp float;
		varying vec2 uv;

		uniform sampler2D t;

		void main() {
			gl_FragColor = mix(
				texture2D(t, uv),
				vec4(0.0),
				step(0.5, abs(uv.x - 0.5) + abs(uv.y - 0.5))
			);
		}`
	},
	threePanels: {
		frag: GLSL`
		precision highp float;
		varying vec2 uv;

		uniform sampler2D canvasA;
		uniform sampler2D canvasB;
		uniform sampler2D canvasC;

		void main() {
			vec2 st = uv;
			st.x *= 3.0;
			vec4 textureA = texture2D(canvasA, st);
			vec4 textureB = texture2D(canvasB, st - vec2(1.0,0.0));
			vec4 textureC = texture2D(canvasC, st - vec2(2.0,0.0));
			//gl_FragColor = vec4(uv.x, uv.y, 0.5, 1.0);
			gl_FragColor = mix(
				textureA, 
				mix(
					textureB,
					textureC,
					step(2.0, st.x)
				), 
				step(1.0, st.x));
		}
		`
	},
	// implement Reaction diffusion. Co-created with Asher Elazary
	reactDiff: {
    frag: GLSL`   
		precision highp float; 
    #define PI 3.14159265358979323846
    varying vec4 vertColor;
    varying vec4 vertTexCoord;
    varying vec2 uv;

		uniform sampler2D texture;
    uniform float width;
    uniform float height;

    uniform float diffusionScale;
    uniform float backgroundMix;
		uniform float paintMix;
    uniform float displacementAmount;
    uniform float feedA;
    uniform float feedB;
    uniform float killA;
    uniform float killB;    

    float u = (diffusionScale / width);
    float v = (diffusionScale / height);

    vec2 rotate2D (vec2 _st, float _angle) {
      _st -= 0.5;
      _st =  mat2(cos(_angle),-sin(_angle),
                  sin(_angle),cos(_angle)) * _st;
      _st += 0.5;
      return _st;
  }

    float laplaceA(in vec2 p, in float u, in float v){
    float A = 0.05 * texture2D(texture, uv + vec2(-u,-v))[0] + 0.2 * texture2D(texture, uv + vec2(0,- v))[0] + 0.05 * texture2D(texture, uv  + vec2(u,-v))[0] +
     0.2 * texture2D(texture, uv + vec2(-u,0))[0] - 1.0 * texture2D(texture, uv + vec2(0,0))[0] + 0.2 * texture2D(texture, uv + vec2(u, 0))[0] +
    0.05 * texture2D(texture, uv + vec2(-u,v))[0] + 0.2 * texture2D(texture, uv + vec2(0,v))[0] + 0.05 * texture2D(texture, uv + vec2(u,v))[0];
    return A;
    }

    float laplaceB(in vec2 p, in float u, in float v){
    float B = 0.05 * texture2D(texture, uv + vec2(-u,-v))[1] + 0.2 * texture2D(texture, uv + vec2(0,- v))[1] + 0.05 * texture2D(texture, uv  + vec2(u,-v))[1] +
     0.2 * texture2D(texture, uv + vec2(-u,0))[1] -1.0 * texture2D(texture, uv + vec2(0,0))[1] + 0.2 * texture2D(texture, uv + vec2(u, 0))[1] +
    0.05 * texture2D(texture, uv + vec2(-u,v))[1] + 0.2 * texture2D(texture, uv + vec2(0,v))[1] + 0.05 * texture2D(texture, uv + vec2(u,v))[1];
    return B;
    }

    void main(){

    vec4 alphatest = texture2D(texture, uv);

    if (alphatest.a == 0.0)

      gl_FragColor =  vec4(1.0, 1.0, 1.0, backgroundMix);

    else{

      float A = texture2D(texture, uv )[0] ;
      float B = texture2D(texture, uv )[1] ;

      float A_1 = A + (feedA * laplaceA(uv, u , v) - A * B * B + killA * (1.0 - A)) ;
      float B_1 = B + (feedB * laplaceB(uv, u, v) + A * B * B - (killB + killA) * B)  ;

      vec4 output1 = mix(vec4(A_1, B_1, 0.0, 1.0), alphatest , displacementAmount * 0.1);

      gl_FragColor = mix(output1, alphatest, paintMix);
      }

    //gl_FragColor = alphatest;

  }`
  },
	textureLookup: {
		frag: GLSL`
		#define PI 3.14159265358979323846

    precision highp float;

    varying vec2 uv;

        // sampler uniforms

    uniform sampler2D tileSheet;
    uniform sampler2D lookup;
    uniform sampler2D back;
    uniform vec2 lookup_res;
    uniform float width;
    uniform float height;

        //Params

    uniform float numCols;
    uniform float numRows;
    uniform float scale;
        
      //Offset not currently implemented
      //uniform float offset;

    uniform float index_colorMix;
    uniform float transform_colorMix;
    uniform float indexQuantise;

      //rotation fucntion

    vec2 rotate2D (vec2 _st, float _angle) {
        _st -= 0.5;
        _st =  mat2(cos(_angle),-sin(_angle),
                    sin(_angle),cos(_angle)) * _st;
        _st += 0.5;
        return _st;
    }

      //remap

    float map(float value, float min1, float max1, float min2, float max2) {
      return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }

      //compute distance to edge of canvas

        float man_dist_to_nearest_wall(vec2 uv)
    {
        float aspect = (width/height);
        float x_distance = uv.x < 1.0 - uv.x ? uv.x : 1.0 - uv.x;
        float y_distance = uv.y * aspect < (1.0 - uv.y) * aspect ? uv.y * aspect: (1.0 - uv.y) * aspect;
        return min(x_distance, y_distance);
    }

      // start

    void main() {

    float NumTiles = (numCols * numRows);

      //get texel with no filtering, texelFetch PORT where (2 * texture coordinate * texture side-length) / (2 * texture size)

    vec2 texelCoord = (2.0 * uv * lookup_res) / (2.0 * lookup_res);

    vec4 lookuptex = texture2D(lookup, texelCoord);

    float A_1 = lookuptex.r;
    float B_1 = lookuptex.g;
    
    float inputVal1 = mix(A_1, B_1, index_colorMix);
    float inputVal2 = mix(A_1, B_1, transform_colorMix);
        
      // calculate the index - added option for mixing between truncated and float of index location
    
    float index = 0.0;
    index += step(1., mod(uv.x,2.0));
    index += step(1., mod(uv.y,2.0))*2.0;    

    float x_index = mix((inputVal1 * NumTiles), floor(inputVal1 * NumTiles), indexQuantise);
    float y_index = mix((inputVal1 * numCols), floor(inputVal1 * numCols), indexQuantise);

      // calculate the X and Y UV coordinates

    float posX = ((mod((x_index), numCols)) * (1. / numCols));
    float posY = (((y_index * NumTiles) / numRows) * (1. / NumTiles));
    float posXPlusOne = ((mod((x_index + 1.0), numCols)) * (1. / numCols));

    vec2 newUV = vec2(posX,posY);
    vec2 newUVoffset = vec2(posXPlusOne, posY);
    
      // calculate rotation
    
    float angle = (-0.5 * map(  NumTiles * (uv.s + 0.5 * uv.t + 0.5), 0.0, NumTiles, -2.0 , 2.0)) * PI;  
        
      // calculate the coordinate bounds of the first corner tile

    vec2 CornerTileUV = mod(rotate2D(uv, angle) * scale * clamp((inputVal1 + 0.1),0.5,1.0), (1.0 / numRows));
      vec2 CornerTileUV_FlipX = mod(rotate2D(vec2(1.0 - uv.x, uv.y), angle) * scale * clamp((inputVal1 + 0.1),0.5,1.0), (1.0 / numRows));
      vec2 CornerTileUV_FlipY = mod(rotate2D(vec2(uv.x, 1.0 - uv.y), angle) * scale * clamp((inputVal1 + 0.1),0.5,1.0), (1.0 / numRows));
      
    //calulate blend coordinates for interpolation
    
    vec2 UV1 = mod(CornerTileUV + newUV, 1.0);
      vec2 UV1_FlipX = mod(CornerTileUV_FlipX + newUV, 1.0);
      vec2 UV1_FlipY = mod(CornerTileUV_FlipY + newUV, 1.0);
  
    vec2 UV2 = mod(CornerTileUV + newUVoffset, 1.0);
      vec2 UV2_FlipX = mod(CornerTileUV_FlipX + newUVoffset, 1.0);
      vec2 UV2_FlipY = mod(CornerTileUV_FlipY + newUVoffset, 1.0);

      //implement mirrored edge blending
    
    float blendAmt = 1.0 * inputVal1;
    float blendEnd = 0.5;
  
    vec4 blend1 = mix(mix(texture2D(tileSheet, UV1), texture2D(tileSheet, UV1_FlipX), smoothstep(blendAmt, blendEnd, abs(UV1.x - 0.5)) * 0.5),texture2D(tileSheet, UV1_FlipY), smoothstep(blendAmt, blendEnd, abs(UV1.y - 0.5)) * 0.5);
    vec4 blend2 = mix(mix(texture2D(tileSheet, UV2), texture2D(tileSheet, UV2_FlipX), smoothstep(blendAmt, blendEnd, abs(UV2.x - 0.5)) * 0.5),texture2D(tileSheet, UV2_FlipY), smoothstep(blendAmt, blendEnd, abs(UV2.y - 0.5)) * 0.5);
    
    vec4 color = mix(blend1, blend2, mod(inputVal1 * NumTiles , 1.0 ));

      //multiply by alpha mask
    
    float newAlpha = color.a * lookuptex.a;
    
      //calculate persistance  

    vec4 persistance = vec4(mix(color, texture2D(back, uv + vec2(0.0, 0.0)), lookuptex.g));    

      //vec4 final = vec4(persistance.rgb * vec3(newAlpha), newAlpha);  
    
    vec4 final = persistance * vec4(newAlpha);  
  
      // edge blend  

    float offset = 0.01;
    float dist = man_dist_to_nearest_wall (uv);
    float dist_s = smoothstep( offset*.05, offset*.95, dist);
    
    gl_FragColor = final * dist_s;

    }
		`
	}
})