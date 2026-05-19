import React, { useEffect, useRef, useState } from 'react'

export default function Ornament() {
	let wrapperRef = useRef(null);
	let svgCanvasRef = useRef(null);

	let [svgCanvasWidth, setSvgCanvasWidth] = useState(0);
	let [svgCanvasHeight, setSvgCanvasHeight] = useState(0);

	let [circleNum, setCircleNum] = useState(2);
	let [circles, setCircles] = useState([]);

	function circleGen(){
		let radius = Math.min(svgCanvasWidth, svgCanvasHeight, parseInt(getComputedStyle(document.documentElement).fontSize, 10) * 2) * 0.6;
		let yInterval = svgCanvasHeight / radius;
		setCircles([]);
		for (let i = 0; i < circleNum; i++) {
			let randRadius = randomIntRange(radius, radius * 0.75);
			console.log(yInterval*i);
			console.log(radius);
			setCircles([...circles,
				<OrnamentCircle xPos={2} yPos={yInterval*i} radius={randRadius} />
			]);
		}
	}

	function randomIntRange(min, max){
		return Math.floor(min + (Math.random() * (max -  min)));
	}

	useEffect(() => {
		setSvgCanvasWidth(wrapperRef.current.clientWidth);
		setSvgCanvasHeight(wrapperRef.current.clientHeight);
	},[]);

	useEffect(() => {
		circleGen();
	}, [svgCanvasHeight]);

	return (
		<div ref={wrapperRef} style={{width:'100%', height: '100%'}}>
			<svg ref={svgCanvasRef} viewBox={`0 0 ${svgCanvasWidth} ${svgCanvasHeight}`} xmlns="http://www.w3.org/2000/svg">
				{circles}
			</svg>
		</div>
	)
}

function OrnamentCircle({xPos, yPos, radius}) {
	return (
		<circle fill={'red'} cx={xPos} cy={yPos} r={radius} />
	)
}
