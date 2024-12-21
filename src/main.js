console.log("@welcome-toast");

const s = document.createElement("script");
s.type = "text/javascript";
s.defer = true;
s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
document.head.appendChild(s);

const TARGET_ORIGIN = "http://localhost:5173/";
const SUPABASE_URL = "https://mepmumyanfvgmvjfjpld.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lcG11bXlhbmZ2Z212amZqcGxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1Nzg2MDUsImV4cCI6MjA0OTE1NDYwNX0.HojnVr-YfuBy25jf9qy5DKYkqvdowZ0Pz2FScfIN-04";
const WHITE_SPACE = 5;
let overlay = null;
let targetElement = null;
let toastList = [];
let countToastClicked = 0;
let messageFromPreview = "";
let client;

async function getProject() {
  try {
    const href = window.location.href;
    client = supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY);

    if (href && href !== "") {
      const { data: resultProject, error } = await client
        .from("project")
        .select("*")
        .eq("link", href);

      if (resultProject.length === 0) {
        throw new Error(error);
      }

      getToastList(resultProject[0].id);
    }
  } catch (e) {
    console.log(
      "등록되지 않은 URL입니다. @welcome-toast 관리자 페이지에서 프로젝트 설정을 확인해주세요.",
    );
    console.error(e);
  }
  return;
}

async function getToastList(projectId) {
  try {
    if (projectId) {
      const INDEX_FIRST_TOAST = 0;
      const { data: resultToastList, error } = await client
        .from("toast")
        .select("*")
        .eq("project_id", projectId);

      if (resultToastList.length === 0) {
        throw new Error(error);
      }

      toastList = [...resultToastList];
      applyToast(INDEX_FIRST_TOAST);
    }
  } catch (e) {
    console.log(
      "등록된 토스트가 없습니다. @welcome-toast 관리자 페이지에서 토스트 설정을 확인해주세요.",
    );
    console.error(e);
  }
  return;
}

function applyToast(indexToast) {
  const { target_element_id, message_title, message_body, image_url, background_opacity } =
    toastList[indexToast];
  targetElement = document.querySelector(`#${target_element_id}`);

  if (!target_element_id || !targetElement) {
    console.log(
      !target_element_id ? "타겟 id가 없습니다." : "타겟 id을 가진 요소가 존재하지 않습니다.",
    );
    return;
  }

  const { window: w, target: t } = getWindowAndTargetSizePosition(targetElement);
  const yTargetInLayout = Math.ceil(t.yTarget) - WHITE_SPACE;

  createOverlay();
  setOverlay(
    w.widthViewport,
    w.heightViewport,
    t.widthTarget,
    t.heightTarget,
    t.xTarget,
    yTargetInLayout,
    background_opacity,
  );

  createPopover();
  setPopover(targetElement, message_title, message_body, image_url);

  window.addEventListener("resize", handleOverlayWindowResizeScroll);
  window.addEventListener("resize", handlePopoverWindowResizeScroll);
  window.addEventListener("scroll", handleOverlayWindowResizeScroll);
  window.addEventListener("scroll", handlePopoverWindowResizeScroll);
  window.addEventListener("click", handleRemoveToast);
  window.addEventListener("touchend", handleRemoveToast);
}

function applyToastAdminPreview() {
  const { target_element_id, message_title, message_body, image_url, background_opacity } =
    messageFromPreview;
  targetElement = document.querySelector(`#${target_element_id}`);

  if (!target_element_id || !targetElement) {
    console.log(
      !target_element_id ? "타겟 id가 없습니다." : "타겟 id을 가진 요소가 존재하지 않습니다.",
    );
    return;
  }

  const { window: w, target: t } = getWindowAndTargetSizePosition(targetElement);
  const yTargetInLayout = Math.ceil(t.yTarget) - WHITE_SPACE;
  const overlay = document.querySelector("#welcomeToastOverlay");
  const popover = document.querySelector("#welcomeToastPopover");

  if (!overlay) {
    createOverlay();
  }

  setOverlay(
    w.widthViewport,
    w.heightViewport,
    t.widthTarget,
    t.heightTarget,
    t.xTarget,
    yTargetInLayout,
    background_opacity,
  );

  if (!popover) {
    createPopover();
  }

  setPopover(targetElement, message_title, message_body, image_url);

  window.addEventListener("resize", handleOverlayWindowResizeScroll);
  window.addEventListener("resize", handlePopoverWindowResizeScroll);
  window.addEventListener("scroll", handleOverlayWindowResizeScroll);
  window.addEventListener("scroll", handlePopoverWindowResizeScroll);
  window.addEventListener("click", handleRemoveToast);
}

function getWindowAndTargetSizePosition(targetElement) {
  const { width: widthViewport, height: heightViewport } = window.visualViewport;
  const {
    width: widthTarget,
    height: heightTarget,
    x: xTarget,
    y: yTarget,
    right,
    bottom,
  } = targetElement.getBoundingClientRect();

  return {
    window: { widthViewport, heightViewport },
    target: { widthTarget, heightTarget, xTarget, yTarget, right, bottom },
  };
}

function createOverlay() {
  overlay = window.document.createElement("div");
  overlay.id = "welcomeToastOverlay";
  document.body.appendChild(overlay);
  return;
}

function setOverlay(
  widthViewport,
  heightViewport,
  widthTarget,
  heightTarget,
  xTarget,
  yTarget,
  background_opacity,
) {
  const overlay = document.querySelector("#welcomeToastOverlay");
  overlay.innerHTML = `
      <svg
        viewBox="0 0 ${widthViewport} ${heightViewport}"
        xmlSpace="preserve"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        preserveAspectRatio="xMinYMin slice"
        style="fill-rule: evenodd; clip-rule: evenodd; stroke-linejoin: round; stroke-miterlimit: 2; z-index: 10000; position: fixed; top: 0px; left: 0px; width: 100%; height: 100%;"
      >
        <path
          d="M${widthViewport},0L0,0L0,${heightViewport}L${widthViewport},${heightViewport}L${widthViewport},0Z M${xTarget},${yTarget} h${widthTarget} a5,5 0 0 1 5,5 v${heightTarget} a5,5 0 0 1 -5,5 h-${widthTarget} a5,5 0 0 1 -5,-5 v-${heightTarget} a5,5 0 0 1 5,-5 z"
          style="fill: rgb(0, 0, 0); opacity: ${Number(background_opacity) / 100}; pointer-events: auto; cursor: auto;"
        >
        </path>
      </svg>
  `;
  return;
}

function createPopover() {
  const overlay = document.querySelector("#welcomeToastOverlay");

  const popover = window.document.createElement("div");
  const popoverImage = window.document.createElement("div");
  const popoverHeader = window.document.createElement("div");
  const popoverDescription = window.document.createElement("div");
  const popoverFooter = window.document.createElement("div");

  popover.id = "welcomeToastPopover";
  popoverImage.id = "welcomeToastPopoverImage";
  popoverHeader.id = "welcomeToastPopoverHeader";
  popoverDescription.id = "welcomeToastPopoverDescription";
  popoverFooter.id = "welcomeToastPopoverFooter";

  overlay.insertAdjacentElement("afterend", popover);
  popover.appendChild(popoverImage);
  popover.appendChild(popoverHeader);
  popover.appendChild(popoverDescription);
  popover.appendChild(popoverFooter);
  return;
}

function setPopover(targetElement, message_title, message_body, image_url) {
  const popover = document.querySelector("#welcomeToastPopover");
  const popoverImage = document.querySelector("#welcomeToastPopoverImage");
  const popoverHeader = document.querySelector("#welcomeToastPopoverHeader");
  const popoverDescription = document.querySelector("#welcomeToastPopoverDescription");
  const popoverFooter = document.querySelector("#welcomeToastPopoverFooter");

  const { window: w, target: t } = getWindowAndTargetSizePosition(targetElement);
  const gapRight = w.widthViewport - (t.right + t.widthTarget);
  const xTargetInLayout = t.xTarget + t.widthTarget + WHITE_SPACE;

  popoverHeader.innerHTML = `<span style="font-weight: bold;">${message_title}</span>`;
  popoverDescription.innerHTML = `<span>${message_body}</span>`;
  popoverFooter.innerHTML = `<div style="width: 60%"></div><button id="welcomeToastPopoverButton" type="button">확인</button>`;

  if (image_url) {
    popoverImage.innerHTML = `<img src=${image_url} alt="popoverFooter" width="100%" />`;
  }

  welcomeToastPopoverButton.addEventListener("click", handleToastButtonClick);

  if (gapRight < 300) {
    popover.style = `position: absolute; top: ${t.yTarget + t.heightTarget + WHITE_SPACE + window.scrollY}px; right: ${w.widthViewport - t.xTarget - t.widthTarget - WHITE_SPACE}px; flex: auto; flex-direction: column; max-height: 250px; min-width: 200px; max-width: 250px; padding: 15px; border: 1px; margin: 5px; border-radius: 5%; background: #242424; color: white; box-shadow: 0 1px 10px #0006; z-index: 1000000; overflow: clip; overflow-wrap: break-word; word-break: break-all;`;
    popoverHeader.style = "margin-bottom: 5px;";
    popoverDescription.style = "margin-bottom: 5px;";
    popoverFooter.style = "display: flex; align-items: center; justify-content: space-between;";
    return;
  }

  popover.style = `position: absolute; top: ${t.yTarget}px; left: ${xTargetInLayout}px; flex: auto; flex-direction: column; max-height: 250px; min-width: 200px; max-width: 250px; padding: 15px; border: 1px; margin: 5px; border-radius: 5%; background: #242424; color: white; box-shadow: 0 1px 10px #0006; z-index: 1000000; overflow: clip; overflow-wrap: break-word; word-break: break-all;`;
  popoverHeader.style = "margin-bottom: 10px;";
  popoverDescription.style = "margin-bottom: 10px;";
  popoverFooter.style = "display: flex; align-items: center; justify-content: space-between;";
  return;
}

function handleToastButtonClick() {
  const overlay = document.querySelector("#welcomeToastOverlay");
  const popover = document.querySelector("#welcomeToastPopover");

  overlay.remove();
  popover.remove();

  if (countToastClicked === toastList.length - 1) {
    return;
  }

  countToastClicked += 1;
  applyToast(countToastClicked);
  return;
}

function handleOverlayWindowResizeScroll() {
  const { target_element_id, background_opacity } = toastList[0];
  const targetElement = document.querySelector(`#${target_element_id}`);
  const { window: w, target: t } = getWindowAndTargetSizePosition(targetElement);
  const yTargetInLayout = Math.ceil(t.yTarget) - WHITE_SPACE;

  setOverlay(
    w.widthViewport,
    w.heightViewport,
    t.widthTarget,
    t.heightTarget,
    t.xTarget,
    yTargetInLayout,
    background_opacity,
  );
  return;
}

function handlePopoverWindowResizeScroll() {
  const { target_element_id } = toastList[0];
  const targetElement = document.querySelector(`#${target_element_id}`);
  const popover = document.querySelector("#welcomeToastPopover");
  const { window: w, target: t } = getWindowAndTargetSizePosition(targetElement);
  const gapRight = w.widthViewport - (t.right + t.widthTarget);

  if (!popover) {
    return;
  }

  if (gapRight < 400) {
    if (!window.scrollY) {
      popover.style.top = `${t.bottom + WHITE_SPACE}px`;
    }
    popover.style.left = `${t.xTarget - WHITE_SPACE}px`;
    return;
  }

  popover.style.top = `${t.yTarget}px`;
  popover.style.left = `${t.right + WHITE_SPACE}px`;
  return;
}

function handleRemoveToast(event) {
  const overlay = document.querySelector("#welcomeToastOverlay");
  const popover = document.querySelector("#welcomeToastPopover");

  if (event.target.tagName === "path") {
    overlay.remove();
    popover.remove();
  }
  return;
}

function handleMessageParent(event) {
  const target = JSON.parse(JSON.stringify(event.target.id));
  window.parent.postMessage({ target }, TARGET_ORIGIN);
  return;
}

window.addEventListener("load", getProject);
window.addEventListener("message", (event) => {
  if (event.origin === TARGET_ORIGIN) {
    messageFromPreview = event.data;
    applyToastAdminPreview();
  }
  return;
});
window.addEventListener("click", handleMessageParent);
