console.log("@welcome-toast");

const WHITE_SPACE = 5;
let targetElement = null;
let message = "";
let overlay = null;

function applyAction() {
  const { target_element_id, message_title, message_body, background_opacity } = message;
  targetElement = document.querySelector(`#${target_element_id}`);
  const { width: widthViewport, height: heightViewport } = window.visualViewport;

  if (!targetElement) {
    return;
  }

  const {
    width: widthTarget,
    height: heightTarget,
    x: xTarget,
    y: yTarget,
  } = targetElement.getBoundingClientRect();
  const yTargetInLayout = Math.ceil(yTarget) - WHITE_SPACE;

  overlay = window.document.createElement("div");
  overlay.id = "welcomeToastOverlay";
  document.body.appendChild(overlay);
  setOverlay(
    widthViewport,
    heightViewport,
    widthTarget,
    heightTarget,
    xTarget,
    yTargetInLayout,
    background_opacity,
  );

  const popover = window.document.createElement("div");
  popover.id = "welcomeToastPopover";
  overlay.insertAdjacentElement("afterend", popover);
  setPopover();

  function handleOverlayWindowResize() {
    const { width: widthViewport, height: heightViewport } = window.visualViewport;
    const {
      width: widthTarget,
      height: heightTarget,
      x: xTarget,
      y: yTarget,
    } = targetElement.getBoundingClientRect();
    const yTargetInLayout = Math.ceil(yTarget) - WHITE_SPACE;

    return setOverlay(
      widthViewport,
      heightViewport,
      widthTarget,
      heightTarget,
      xTarget,
      yTargetInLayout,
      background_opacity,
    );
  }

  function setPopover() {
    const xTargetInLayout = xTarget + widthTarget + WHITE_SPACE;
    const popoverHeader = window.document.createElement("div");
    const popoverDescription = window.document.createElement("div");
    const popoverFooter = window.document.createElement("div");

    popoverHeader.id = "welcomeToastPopoverHeader";
    popoverDescription.id = "welcomeToastPopoverDescription";
    popoverFooter.id = "welcomeToastPopoverFooter";

    popoverHeader.innerHTML = `<span>${message_title}</span>`;
    popoverDescription.innerHTML = `<span>${message_body}</span>`;
    popoverFooter.innerHTML = `<span>${message_body}</span>`;

    popover.appendChild(popoverHeader);
    popover.appendChild(popoverDescription);
    popover.appendChild(popoverFooter);

    popover.style = `position: absolute; top: ${yTarget}px; left: ${xTargetInLayout}px; flex: auto; flex-direction: column; gap: 100px; padding: 15px; margin: 5px; border-radius: 5%; background: #242424; color: white; box-shadow: 0 1px 10px #0006; z-index: 1000000`;
    return;
  }

  function handlePopoverWindowResize() {
    const { width: widthTarget, x: xTarget, y: yTarget } = targetElement.getBoundingClientRect();
    const xTargetInLayout = xTarget + widthTarget + WHITE_SPACE;
    popover.style.top = `${yTarget}px`;
    popover.style.left = `${xTargetInLayout}px`;
    return;
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

function setOverlay(
  widthViewport,
  heigthViewport,
  widthTarget,
  heightTarget,
  xTarget,
  yTarget,
  background_opacity,
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
          id="overlayPath"
          d="M${widthViewport},0L0,0L0,${heigthViewport}L${widthViewport},${heigthViewport}L${widthViewport},0Z M${xTarget},${yTarget} h${widthTarget} a5,5 0 0 1 5,5 v${heightTarget} a5,5 0 0 1 -5,5 h-${widthTarget} a5,5 0 0 1 -5,-5 v-${heightTarget} a5,5 0 0 1 5,-5 z"
          style="fill: rgb(0, 0, 0); opacity: ${background_opacity / 100}; pointer-events: auto; cursor: auto;"
        >
        </path>
      </svg>
  `;
  return;
}

window.addEventListener("message", (e) => {
  message = e.data;
  if (!overlay) {
    applyAction();
  } else {
    const popoverHeader = document.getElementById("welcomeToastPopoverHeader");
    const popoverDescription = document.getElementById("welcomeToastPopoverDescription");
    const popoverFooter = document.getElementById("welcomeToastPopoverFooter");

    const { message_title, message_body, background_opacity } = message;
    const {
      width: widthTarget,
      height: heightTarget,
      x: xTarget,
      y: yTarget,
    } = targetElement.getBoundingClientRect();
    const yTargetInLayout = Math.ceil(yTarget) - WHITE_SPACE;

    setOverlay(
      widthViewport,
      heightViewport,
      widthTarget,
      heightTarget,
      xTarget,
      yTargetInLayout,
      background_opacity,
    );

    popoverHeader.innerHTML = `<span>${message_title}</span>`;
    popoverDescription.innerHTML = `<span>${message_body}</span>`;
    popoverFooter.innerHTML = `<span>${message_body}</span>`;
  }
});

window.addEventListener("click", (e) => {
  const target = JSON.parse(JSON.stringify(e.target.id));
  window.parent.postMessage({ target }, "*");
});
