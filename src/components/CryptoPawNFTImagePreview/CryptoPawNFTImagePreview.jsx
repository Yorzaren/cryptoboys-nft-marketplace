import React from "react";
function CryptoPawNFTImagePreview(props) {

  const {
    cardBorderColor,
    cardBackgroundColor,
    digitOneColor,
    digitOneBorder,
    digitTwoColor,
    digitTwoBorder,
    digitThreeColor,
    digitThreeBorder,
    digitFourColor,
    digitFourBorder,
    digitcarpalPadColor,
    digitcarpalPadBorder,
  } = props.colors;

  // Keep
  const card = {
	  fill: `${cardBackgroundColor}`,
	  stroke: `${cardBorderColor}`,
      strokeWidth: "11.5px",
  }
  const digitOne = {
	  fill: `${digitOneColor}`,
	  stroke: `${digitOneBorder}`,
	  strokeWidth: "11.5px",
  };  
  const digitTwo = {
	  fill: `${digitTwoColor}`,
	  stroke: `${digitTwoBorder}`,
	  strokeWidth: "11.5px",
  };
  const digitThree = {
	  fill: `${digitThreeColor}`,
	  stroke: `${digitThreeBorder}`,
	  strokeWidth: "11.5px",
  };
  const digitFour = {
	  fill: `${digitFourColor}`,
	  stroke: `${digitFourBorder}`,
	  strokeWidth: "11.5px",
  };
  const carpalPad = {
	  fill: `${digitcarpalPadColor}`,
	  stroke: `${digitcarpalPadBorder}`,
	  strokeWidth: "11.5px",
  };
  return (
	<div className="App">
      <svg ref={props.svgref} width="300px" height="300px" clipRule="evenodd" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="1.5" version="1.1" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
        <rect class="background" x="20" y="20" width="460" height="460" style={card}/>
		<g>
			<path style={digitOne} d="M55.304,222.068c6.506,-11.055 69.179,-4.838 103.217,28.829c34.039,33.667 23.061,52.156 13.887,81.46c-7.608,24.299 -21.432,33.656 -42.053,47.198c-4.017,2.637 -36.989,-11.698 -64.329,-68.206c-12.689,-26.227 -17.124,-78.4 -10.722,-89.281Z"/>
			<path style={digitTwo} d="M126.994,82.566c-9.207,4.464 -38.935,49.748 3.361,117.739c24.818,39.898 53.299,44.92 75.05,32.365c21.751,-12.555 31.823,-47.678 10.721,-93.466c-28.03,-60.823 -79.925,-61.102 -89.132,-56.638Z"/>
			<path style={carpalPad} d="M257.94,227.02c56.604,-7.393 68.89,29.644 97.565,45.32c28.675,15.676 61.304,27.569 64.329,37.525c20.904,68.79 -27.787,93.276 -37.525,107.215c-9.738,13.939 -81.635,42.21 -115.116,42.886c-77.139,1.556 -99.953,-50.211 -104.674,-64.329c-3.788,-11.329 35.448,-39.746 37.525,-58.968c2.307,-21.349 23.184,-105.115 57.896,-109.649Z"/>
			<path style={digitThree} d="M293.629,208.011c11.02,-0.228 50.879,-17.007 40.433,-93.786c-2.35,-17.277 -17.242,-75.765 -64.328,-74.194c-33.441,1.116 -38.742,84.817 -37.905,89.56c0.837,4.743 6.977,79.557 61.8,78.42Z"/>
			<path style={digitFour} d="M387.67,120.384c-23.296,-1.1 -40.099,29.079 -42.886,87.627c-1.075,22.579 41.333,79.217 68.676,67.22c27.342,-11.997 43.916,-45.757 27.817,-94.024c-16.099,-48.268 -35.873,-59.986 -53.607,-60.823Z"/>
		</g>
      </svg>
    </div>
  );
};

export default CryptoPawNFTImagePreview;
