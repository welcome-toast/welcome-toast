console.log("@welcome-toast");

function loadScript() {
  const WHITE_SPACE = 5;
  const { width: widthViewport, height: heightViewport } = window.visualViewport;
  const target = document.querySelector("#welcome-toast-hl");
  const {
    width: widthTarget,
    height: heightTarget,
    x: xTarget,
    y: yTarget,
  } = target.getBoundingClientRect();
  const yTargetInLayout = Math.ceil(yTarget) - WHITE_SPACE;

  const overlay = window.document.createElement("div");
  overlay.id = "welcomeToastOverlay";
  setOverlay(widthViewport, heightViewport, widthTarget, heightTarget, xTarget, yTargetInLayout);
  app.insertAdjacentElement("afterend", overlay);

  const popover = window.document.createElement("div");
  popover.id = "welcomeToastPopover";
  overlay.insertAdjacentElement("afterend", popover);
  setPopover();

  function setPopover() {
    const xTargetInLayout = xTarget + widthTarget + WHITE_SPACE;
    const popoverHeader = window.document.createElement("div");
    const popoverDescription = window.document.createElement("div");
    const popoverFooter = window.document.createElement("div");

    popoverHeader.id = "welcomeToastPopoverHeader";
    popoverDescription.id = "welcomeToastPopoverDescription";
    popoverFooter.id = "welcomeToastPopoverFooter";

    popoverHeader.innerHTML = "<span>header area</span>";
    popoverDescription.innerHTML = "<span>desc area</span>";
    popoverFooter.innerHTML = "<span>footer area</span>";

    popover.appendChild(popoverHeader);
    popover.appendChild(popoverDescription);
    popover.appendChild(popoverFooter);

    popover.style = `position: absolute; top: ${yTarget}px; left: ${xTargetInLayout}px; flex: auto; flex-direction: column; gap: 100px; padding: 15px; margin: 5px; border-radius: 5%; background: #242424; color: white; box-shadow: 0 1px 10px #0006; z-index: 1000000`;
    return;
  }

  function handlePopoverWindowResize() {
    const { width: widthTarget, x: xTarget, y: yTarget } = target.getBoundingClientRect();
    const xTargetInLayout = xTarget + widthTarget + WHITE_SPACE;
    popover.style.top = `${yTarget}px`;
    popover.style.left = `${xTargetInLayout}px`;
    return;
  }

  function setOverlay(widthViewport, heigthViewport, widthTarget, heightTarget, xTarget, yTarget) {
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
    return;
  }

  function handleOverlayWindowResize() {
    const { width: widthViewport, height: heightViewport } = window.visualViewport;
    const {
      width: widthTarget,
      height: heightTarget,
      x: xTarget,
      y: yTarget,
    } = target.getBoundingClientRect();
    const yTargetInLayout = Math.ceil(yTarget) - WHITE_SPACE;

    return setOverlay(
      widthViewport,
      heightViewport,
      widthTarget,
      heightTarget,
      xTarget,
      yTargetInLayout,
    );
  }

  function handleRemovePopover(event) {
    if (event.target.tagName === "path") {
      overlay.remove();
      popover.remove();
      return;
    }
    return;
  }

  window.addEventListener("resize", handleOverlayWindowResize);
  window.addEventListener("resize", handlePopoverWindowResize);
  window.addEventListener("click", (event) => handleRemovePopover(event));
}

window.addEventListener("load", loadScript);
