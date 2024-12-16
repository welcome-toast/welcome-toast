console.log("@welcome-toast");

const s = document.createElement("script");
s.type = "text/javascript";
s.defer = true;
s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
document.head.appendChild(s);

const TARGET_ORIGIN = "http://localhost:5173";
const SUPABASE_URL = "https://mepmumyanfvgmvjfjpld.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lcG11bXlhbmZ2Z212amZqcGxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1Nzg2MDUsImV4cCI6MjA0OTE1NDYwNX0.HojnVr-YfuBy25jf9qy5DKYkqvdowZ0Pz2FScfIN-04";
const WHITE_SPACE = 5;
let overlay = null;
let targetElement = null;
let actionList = [];
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

      getAction(resultProject[0].id);
    }
  } catch (e) {
    console.log(
      "등록되지 않은 URL입니다. @welcome-toast 관리자 페이지에서 프로젝트 설정을 확인해주세요.",
    );
    console.error(e);
  }
  return;
}

async function getAction(projectId) {
  try {
    if (projectId) {
      const { data: resultAction, error } = await client
        .from("action")
        .select("*")
        .eq("project_id", projectId);

      if (resultAction.length === 0) {
        throw new Error(error);
      }

      actionList = [...resultAction];
      applyAction();
    }
  } catch (e) {
    console.log(
      "등록된 액션이 없습니다. @welcome-toast 관리자 페이지에서 액션 설정을 확인해주세요.",
    );
    console.error(e);
  }
  return;
}

function applyAction() {
  const { target_element_id, message_title, message_body, background_opacity } = actionList[0];
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
  setPopover(targetElement, message_title, message_body);

  window.addEventListener("resize", handleOverlayWindowResize);
  window.addEventListener("resize", handlePopoverWindowResize);
  window.addEventListener("click", (event) => handleRemovePopover(event));
}

function applyActionAdminPreview() {
  const { target_element_id, message_title, message_body, background_opacity } = messageFromPreview;
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

  setPopover(targetElement, message_title, message_body);

  window.addEventListener("resize", handleOverlayWindowResize);
  window.addEventListener("resize", handlePopoverWindowResize);
  window.addEventListener("click", handleRemovePopover);
}

function getWindowAndTargetSizePosition(targetElement) {
  const { width: widthViewport, height: heightViewport } = window.visualViewport;
  const {
    width: widthTarget,
    height: heightTarget,
    x: xTarget,
    y: yTarget,
  } = targetElement.getBoundingClientRect();

  return {
    window: { widthViewport, heightViewport },
    target: { widthTarget, heightTarget, xTarget, yTarget },
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
  const popoverHeader = window.document.createElement("div");
  const popoverDescription = window.document.createElement("div");
  const popoverFooter = window.document.createElement("div");

  popover.id = "welcomeToastPopover";
  popoverHeader.id = "welcomeToastPopoverHeader";
  popoverDescription.id = "welcomeToastPopoverDescription";
  popoverFooter.id = "welcomeToastPopoverFooter";

  overlay.insertAdjacentElement("afterend", popover);
  popover.appendChild(popoverHeader);
  popover.appendChild(popoverDescription);
  popover.appendChild(popoverFooter);
  return;
}

function setPopover(targetElement, message_title, message_body) {
  const popover = document.querySelector("#welcomeToastPopover");
  const popoverHeader = document.querySelector("#welcomeToastPopoverHeader");
  const popoverDescription = document.querySelector("#welcomeToastPopoverDescription");
  const popoverFooter = document.querySelector("#welcomeToastPopoverFooter");

  const { window: w, target: t } = getWindowAndTargetSizePosition(targetElement);
  const xTargetInLayout = t.xTarget + t.widthTarget + WHITE_SPACE;

  popoverHeader.innerHTML = `<span style="font-weight: bold;">${message_title}</span>`;
  popoverDescription.innerHTML = `<span>${message_body}</span>`;
  popoverFooter.innerHTML = `<span>${message_body}</span>`;

  if (t.xTarget > w.widthViewport * 0.7) {
    popover.style = `position: absolute; top: ${t.yTarget + t.heightTarget + WHITE_SPACE}px; right: ${w.widthViewport - t.xTarget - t.widthTarget - WHITE_SPACE}px; flex: auto; flex-direction: column; max-height: 250px; min-width: 200px; max-width: 250px; padding: 15px; border: 1px; margin: 5px; border-radius: 5%; background: #242424; color: white; box-shadow: 0 1px 10px #0006; z-index: 1000000; overflow: clip; overflow-wrap: break-word; word-break: break-all;`;
    popoverHeader.style = "margin-bottom: 5px;";
    popoverDescription.style = "margin-bottom: 5px;";
    return;
  }

  popover.style = `position: absolute; top: ${t.yTarget}px; left: ${xTargetInLayout}px; flex: auto; flex-direction: column; max-height: 250px; max-width: 250px; padding: 15px; border: 1px; margin: 5px; border-radius: 5%; background: #242424; color: white; box-shadow: 0 1px 10px #0006; z-index: 1000000; overflow: clip; overflow-wrap: break-word; word-break: break-all;`;
  popoverHeader.style = "margin-bottom: 5px;";
  popoverDescription.style = "margin-bottom: 5px;";
  return;
}

function handleOverlayWindowResize() {
  const { target_element_id, background_opacity } = actionList[0];
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

function handlePopoverWindowResize() {
  const { target_element_id } = actionList[0];
  const targetElement = document.querySelector(`#${target_element_id}`);
  const popover = document.querySelector("#welcomeToastPopover");
  const { window: w, target: t } = getWindowAndTargetSizePosition(targetElement);
  const xTargetInLayout = t.xTarget + t.widthTarget + WHITE_SPACE;

  if (!popover) {
    return;
  }

  if (t.xTarget > w.widthViewport * 0.7) {
    popover.style.top = `${t.yTarget + t.heightTarget + WHITE_SPACE}px`;
    popover.style.right = `${w.widthViewport - t.xTarget - t.widthTarget - WHITE_SPACE}px`;
    return;
  }

  if (w.widthViewport / 2 < 350) {
    popover.style.top = `${t.yTarget + t.heightTarget + WHITE_SPACE}px`;
    popover.style.left = `${t.xTarget - WHITE_SPACE}px`;
    return;
  }

  popover.style.top = `${t.yTarget}px`;
  popover.style.left = `${xTargetInLayout}px`;
  return;
}

function handleRemovePopover(event) {
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
  if (event.data.source) {
    return;
  }

  messageFromPreview = event.data;

  applyActionAdminPreview();
});
window.addEventListener("click", handleMessageParent);
