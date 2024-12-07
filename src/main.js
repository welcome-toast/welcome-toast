console.log("@welcome-toast");

function loadScript() {
	const { width: widthViewport, height: heightViewport } =
		window.visualViewport;
	const target = document.querySelector("#welcome-toast-hl");
	let {
		width: widthTarget,
		height: heightTarget,
		x: xTarget,
		y: yTarget,
	} = target.getBoundingClientRect();
	yTarget = Math.ceil(yTarget) - 5;

	const overlay = window.document.createElement("div");
	overlay.id = "welcome-toast-overlay";
	setOverlay(
		widthViewport,
		heightViewport,
		widthTarget,
		heightTarget,
		xTarget,
		yTarget,
	);
	app.insertAdjacentElement("afterend", overlay);

	function setOverlay(
		widthViewport,
		heigthViewport,
		widthTarget,
		heightTarget,
		xTarget,
		yTarget,
	) {
		overlay.innerHTML = `
      <svg
        viewBox="0 0 ${widthViewport} ${heigthViewport}"
        xmlSpace="preserve"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        preserveAspectRatio="xMinYMin slice"
        style="fill-rule: evenodd; clip-rule: evenodd; stroke-linejoin: round; stroke-miterlimit: 2; z-index: 10000; position: fixed; top: 0px; left: 0px; width: 100%; height: 100%;"
      >
        <path
          d="M${widthViewport},0L0,0L0,${heigthViewport}L${widthViewport},${heigthViewport}L${widthViewport},0Z M${xTarget},${yTarget} h${widthTarget} a5,5 0 0 1 5,5 v${heightTarget} a5,5 0 0 1 -5,5 h-${widthTarget} a5,5 0 0 1 -5,-5 v-${heightTarget} a5,5 0 0 1 5,-5 z"
          style="fill: rgb(0, 0, 0); opacity: 0.7; pointer-events: auto; cursor: auto;"
        >
        </path>
      </svg>
      `;
	}

	function handleWindowResize() {
		const { width: widthViewport, height: heightViewport } =
			window.visualViewport;
		let {
			width: widthTarget,
			height: heightTarget,
			x: xTarget,
			y: yTarget,
		} = target.getBoundingClientRect();
		yTarget = Math.ceil(yTarget) - 5;

		setOverlay(
			widthViewport,
			heightViewport,
			widthTarget,
			heightTarget,
			xTarget,
			yTarget,
		);
	}

	window.addEventListener("resize", handleWindowResize);
}

window.addEventListener("load", loadScript);
