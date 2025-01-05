# welcome-toast

<div align="center">
  <p>
    <b>스크립트 한 줄로 끝.</b><br/>
    <b>개발자 도움 없이 웹사이트에 토스트 메시지와 툴팁을 5분 만에 추가해보세요!</b>
  </p>
  GitHub
  <a href="https://github.com/welcome-toast/welcome-toast">Script</a> | <a href="https://github.com/welcome-toast/admin">관리자 페이지</a>
</div>

<br>

<img width="100%" src="./src/asset/docs-logo.png" alt="docs-logo" />

<br>
<br>

# 목차

<!-- toc -->

- [개발 배경](#%EA%B0%9C%EB%B0%9C-%EB%B0%B0%EA%B2%BD)
  * [유저는 처음 방문한 웹사이트가 어렵습니다](#%EC%9C%A0%EC%A0%80%EB%8A%94-%EC%B2%98%EC%9D%8C-%EB%B0%A9%EB%AC%B8%ED%95%9C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8%EA%B0%80-%EC%96%B4%EB%A0%B5%EC%8A%B5%EB%8B%88%EB%8B%A4)
  * [안내 메시지 하나로, 유저의 첫 액션을 유도할 수 있습니다](#%EC%95%88%EB%82%B4-%EB%A9%94%EC%8B%9C%EC%A7%80-%ED%95%98%EB%82%98%EB%A1%9C-%EC%9C%A0%EC%A0%80%EC%9D%98-%EC%B2%AB-%EC%95%A1%EC%85%98%EC%9D%84-%EC%9C%A0%EB%8F%84%ED%95%A0-%EC%88%98-%EC%9E%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
- [기술 스택](#%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D)
  * [Script](#script)
  * [관리자 페이지](#%EA%B4%80%EB%A6%AC%EC%9E%90-%ED%8E%98%EC%9D%B4%EC%A7%80)
- [기능](#%EA%B8%B0%EB%8A%A5)
  * [script 한 줄로 끝나는 연동](#script-%ED%95%9C-%EC%A4%84%EB%A1%9C-%EB%81%9D%EB%82%98%EB%8A%94-%EC%97%B0%EB%8F%99)
  * [관리자 페이지 만으로 토스트 메시지 개인화](#%EA%B4%80%EB%A6%AC%EC%9E%90-%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%A7%8C%EC%9C%BC%EB%A1%9C-%ED%86%A0%EC%8A%A4%ED%8A%B8-%EB%A9%94%EC%8B%9C%EC%A7%80-%EA%B0%9C%EC%9D%B8%ED%99%94)
- [개발 과정](#%EA%B0%9C%EB%B0%9C-%EA%B3%BC%EC%A0%95)
  * [쉬운 연동, 보안을 고려하면서 SDK 구조를 단순화 해보자](#%EC%89%AC%EC%9A%B4-%EC%97%B0%EB%8F%99-%EB%B3%B4%EC%95%88%EC%9D%84-%EA%B3%A0%EB%A0%A4%ED%95%98%EB%A9%B4%EC%84%9C-sdk-%EA%B5%AC%EC%A1%B0%EB%A5%BC-%EB%8B%A8%EC%88%9C%ED%99%94-%ED%95%B4%EB%B3%B4%EC%9E%90)
  * [강조할 DOM 요소를 기준으로 토스트 메시지를 띄우는 방법](#%EA%B0%95%EC%A1%B0%ED%95%A0-dom-%EC%9A%94%EC%86%8C%EB%A5%BC-%EA%B8%B0%EC%A4%80%EC%9C%BC%EB%A1%9C-%ED%86%A0%EC%8A%A4%ED%8A%B8-%EB%A9%94%EC%8B%9C%EC%A7%80%EB%A5%BC-%EB%9D%84%EC%9A%B0%EB%8A%94-%EB%B0%A9%EB%B2%95)
    + [토스트를 띄울 위치 계산](#%ED%86%A0%EC%8A%A4%ED%8A%B8%EB%A5%BC-%EB%9D%84%EC%9A%B8-%EC%9C%84%EC%B9%98-%EA%B3%84%EC%82%B0)
    + [오버레이 구현 : 타겟 요소를 제외한 배경을 어둡게 함으로써 타겟을 강조하는 방법](#%EC%98%A4%EB%B2%84%EB%A0%88%EC%9D%B4-%EA%B5%AC%ED%98%84--%ED%83%80%EA%B2%9F-%EC%9A%94%EC%86%8C%EB%A5%BC-%EC%A0%9C%EC%99%B8%ED%95%9C-%EB%B0%B0%EA%B2%BD%EC%9D%84-%EC%96%B4%EB%91%A1%EA%B2%8C-%ED%95%A8%EC%9C%BC%EB%A1%9C%EC%8D%A8-%ED%83%80%EA%B2%9F%EC%9D%84-%EA%B0%95%EC%A1%B0%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95)
  * [관리자 페이지(GUI)로 만드는 토스트 메시지 : 사용자가 작성해야 할 코드를 최소화 하자.](#%EA%B4%80%EB%A6%AC%EC%9E%90-%ED%8E%98%EC%9D%B4%EC%A7%80gui%EB%A1%9C-%EB%A7%8C%EB%93%9C%EB%8A%94-%ED%86%A0%EC%8A%A4%ED%8A%B8-%EB%A9%94%EC%8B%9C%EC%A7%80--%EC%82%AC%EC%9A%A9%EC%9E%90%EA%B0%80-%EC%9E%91%EC%84%B1%ED%95%B4%EC%95%BC-%ED%95%A0-%EC%BD%94%EB%93%9C%EB%A5%BC-%EC%B5%9C%EC%86%8C%ED%99%94-%ED%95%98%EC%9E%90)
  * [적용된 모습을 미리 보면서 토스트 메시지를 설정할 수 있도록 하자](#%EC%A0%81%EC%9A%A9%EB%90%9C-%EB%AA%A8%EC%8A%B5%EC%9D%84-%EB%AF%B8%EB%A6%AC-%EB%B3%B4%EB%A9%B4%EC%84%9C-%ED%86%A0%EC%8A%A4%ED%8A%B8-%EB%A9%94%EC%8B%9C%EC%A7%80%EB%A5%BC-%EC%84%A4%EC%A0%95%ED%95%A0-%EC%88%98-%EC%9E%88%EB%8F%84%EB%A1%9D-%ED%95%98%EC%9E%90)
- [레퍼런스 분석](#%EB%A0%88%ED%8D%BC%EB%9F%B0%EC%8A%A4-%EB%B6%84%EC%84%9D)
    + [안정성 높은 SDK (채널톡, 인터콤)](#%EC%95%88%EC%A0%95%EC%84%B1-%EB%86%92%EC%9D%80-sdk-%EC%B1%84%EB%84%90%ED%86%A1-%EC%9D%B8%ED%84%B0%EC%BD%A4)
    + [유사 서비스 (Driver.js)](#%EC%9C%A0%EC%82%AC-%EC%84%9C%EB%B9%84%EC%8A%A4-driverjs)
- [회고](#%ED%9A%8C%EA%B3%A0)

<!-- tocstop -->

<br>
<br>

# 개발 배경

## 유저는 처음 방문한 웹사이트가 어렵습니다

웹 서비스들을 보면서 처음 서비스를 방문하는 사용자에게 기능 소개, 튜토리얼 등이 더 친절하다면 좋겠다는 생각을 했습니다. 대체로 프로젝트의 런칭일이 다가옴에 따라, 중요한 기능에 집중하고 오류 점검에 바쁘기  마련입니다. 사용자를 위해 친절하게 새로운 소식을 알려주면 좋겠지만, 최종 점검으로 바쁘기 때문에 엄두가 나질 않습니다. 하지만 이렇게 런칭한 웹사이트에 사용자가 들어오면 어떨까요? 웹사이트에 처음 방문한 유저는 무엇을 해야할지 감을 잡기 어려울 수 있습니다.

<br>

## 안내 메시지 하나로, 유저의 첫 액션을 유도할 수 있습니다

메시지 하나로 충분히 사용자를 붙잡을 수 있습니다. 스크립트 한 줄만으로 개발자 도움 없이, 웹사이트 운영자 누구나 토스트 메시지를 설정할 수 있습니다. 방문한 유저에게 새로운 기능이나 콘텐츠 소식을 알려주면 어떨까요? 어렵게 방문한 사용자가 떠나지 않도록, welcome-toast로 5분 만에 토스트 메시지를 띄워보세요!

<br>
<br>

# 기술 스택

## Script

<table>
  <thead>
    <tr style="border-bottom: 2px solid #000000">
      <th style="width: 50%; border-right: 1px solid #000000">개발</th>
      <th style="width: 50%; border-right: 1px solid #000000">배포(CDN)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border-right: 1px solid #000000">
        <li>Vanilla JavaScript</li>
      </td>
      <td style="border-right: 1px solid #000000; vertical-align: top">
        <li>jsDelivr</li>
      </td>
    </tr>
  </tbody>
</table>

<br>

## 관리자 페이지

<table>
  <thead>
    <tr style="border-bottom: 2px solid #000000">
      <th style="width: 20%; border-right: 1px solid #000000">Frontend</th>
      <th style="width: 20%; border-right: 1px solid #000000">Backend</th>
      <th style="width: 20%; border-right: 1px solid #000000">배포(Web)</th>
      <th style="width: 20%; border-right: 1px solid #000000">린터/포매터</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border-right: 1px solid #000000">
        <li>React</li>
        <li>React Router Dom</li>
        <li>Tailwind CSS</li>
        <li>Vite</li>
      </td>
      <td style="border-right: 1px solid #000000; vertical-align: top">
        <li>Supabase</li>
      </td>
      <td style="border-right: 1px solid #000000; vertical-align: top">
        <li>Netlify</li>
      </td>
      <td style="border-right: 1px solid #000000; vertical-align: top">
        <li>Biome</li>
      </td>
    </tr>
  </tbody>
</table>

<br>
<br>

# 기능

## script 한 줄로 끝나는 연동


## 관리자 페이지 만으로 토스트 메시지 개인화


<br>
<br>

# 개발 과정

## 쉬운 연동, 보안을 고려하면서 SDK 구조를 단순화 해보자


<br>


<br>

## 강조할 DOM 요소를 기준으로 토스트 메시지를 띄우는 방법

사용자는 웹사이트의 특정 DOM 요소를 타겟으로 강조할 수 있습니다. 이를 위해 '타겟 요소, 토스트 메시지의 정확한 위치 계산'은 프로젝트 내내 중요한 과제였습니다. 타겟 요소를 제외한 배경을 어둡게 함으로써 타겟을 강조하는 것, 타겟 요소 주변에 토스트 메시지를 띄우는 것. 이 2가지를 위해 정확한 위치 계산이 필요했습니다. 특히 사용자의 스크롤이나 화면 크기가 바뀌어도 안정적으로 동작해야 했기 때문에, DOM API를 활용해서 동적으로 위치를 계산하는 로직을 구현했습니다.

### 토스트를 띄울 위치 계산

먼저 `Element.getBoundingClientRect()`로 타겟 요소의 위치, 크기 정보를 얻었습니다. 고정된 값이 아니라, 현재 사용자에게 보이는 뷰포트를 기준으로 타겟 요소의 상대적 위치를 반환했습니다. 덕분에 scroll, resize에도 동적으로 위치를 계산할 수 있었습니다.

```js
// window, target 요소의 위치, 크기 정보를 연산하여 반환하는 함수
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
```

### 오버레이 구현 : 타겟 요소를 제외한 배경을 어둡게 함으로써 타겟을 강조하는 방법

타겟 요소를 강조하면서 토스트 메시지를 띄울 때에, 2가지가 필요합니다. 바로 오버레이(overlay, 배경)와 팝오버(popover, 토스트 메시지)입니다. 전체 화면을 덮는 오버레이는 SVG를 활용해 구현했습니다. 그리고 타겟 요소 부분만 뚫려 있는 마스크 효과를 주기 위해, `SVG path`의 `fill-rule`을 `evenodd`로 설정했습니다.

사용자가 화면을 스크롤하거나, 브라우저 창의 크기가 변하면 오버레이, 팝오버 SVG 모두 다시 그려야 합니다. 이에 scroll, resize event의 핸들러를 설정해서 동적으로 SVG 속성을 변경하도록 했습니다. 특히 브라우저 창 너비가 줄어들더라도 토스트 메시지가 화면을 벗어나지 않도록 팝오버의 위치를 보정하는 로직을 추가했습니다.

<details>
  <summary>
    오버레이 함수 구현
  </summary>
  <div markdown="1">

  <br>

```js
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
```

  <br>

    </div>
  </details>

<br>
<br>

## 관리자 페이지(GUI)로 만드는 토스트 메시지 : 사용자가 작성해야 할 코드를 최소화 하자.

GUI 기반으로 토스트 메시지를 쉽게 설정할 수 있는 방향을 구현했습니다. 유사 라이브러리 Driver.js가 코드 기반 설정만을 제공하는 것과 다른 방식입니다. 이는 인터콤의 관리자 페이지를 직접 써본 경험의 영향이 컸습니다. GUI로 설정하는 방식이 개발자와 비개발자 모두에게 직관적인 경험을 제공할 수 있다는 것을 체감했기 때문입니다.

처음에는 모든 설정을 코드로 관리하는 방식을 택했습니다. 유저 데이터(메시지 콘텐츠, 스타일 설정 데이터)들을 서비스에서 저장할 필요 혹은, 웹페이지에서 UI 표시 과정에서 매번 서버와 통신할 필요 없는 것이 장점이라 생각했습니다. 하지만 개발자 외에는 설정 어려웠습니다. 또 개발자도 코드 적용결과를 따로 확인하고, 코드 레벨에서 디버깅 필요할 수 있으므로 번거로움이 있었습니다.

물론, GUI 방식에도 고려해야 할 사항이 있었습니다. UI 시나리오가 늘어날 때 마다 연동된 페이지 클라이언트는 `@welcome-toast` 서버와 통신이 필요합니다. 이러한 통신이 성능에 어떤 영향을 미칠지 예측이 어려웠습니다. 하지만 이는 구현을 하면서 테스트와 검증이 필요한 부분이라 판단하고, 문제가 발생하면 그 때 대응하기로 했습니다. 실제로 구현을 하며 다행히 성능상 문제가 없었습니다. 지속적으로 모니터링하며 문제 발생시 최적화를 진행할 예정입니다.

<br>
<br>

## 적용된 모습을 미리 보면서 토스트 메시지를 설정할 수 있도록 하자

<br>
<br>

# 레퍼런스 분석

### 안정성 높은 SDK (채널톡, 인터콤)

> 채널톡과 인터콤은 웹사이트 고객 상담 채널을 구축을 쉽게 도와주는 SDK입니다.
> - 각각 국내와 해외 시장에서 안정적으로 운영되고 있는 대표 사례입니다.
> - 연동할 웹사이트에 스크립트를 삽입하여 채팅 버튼 표시 등 DOM을 조작하는 관점에서 유사점이 많다고 보았습니다.

모두 레퍼런스, 기존 서비스들의 소스 코드를 분석한 후 설계를 진행했습니다. 먼저 채널톡 소스 코드 분석을 통해 의사결정한 주요 사항은 아래와 같습니다.

1. script를 직접 로드하는 방식 채택.
    - SDK 제공 방식에는 script를 직접 로드하는 방식, module로써 패키지를 배포하는 방식 2가지가 있었습니다. 이 중 높은 확장성, 빠른 테스트를 위해 script 로드 방식을 택했습니다.
    - 패키지로 구현하면 버전 관리, 의존성 관리가 용이하지만, 호환성 이슈로 script 로드 방식을 유지했습니다. 패키지를 사용할 수 없는, 즉 node_module이 동작하지 않는 환경을 고려해야 했기 때문입니다.
2. SPA, MPA 각각 대응
2. script 로직의 순서를 결정.
    - 스크립트의 첫 동작은 초기화(initialize) 함수 호출이었고, 이는 SDK가 안정적으로 동작할 수 있는 환경을 구축하는 역할을 했습니다.
    - 예시 : 스크립트 태그 동적으로 생성, window 객체의 메소드 선언 등

인터콤 소스 코드 분석을 통해 의사결정 했습니다.

1. 클라이언트 사용자를 식별하는 방법을 배웠습니다.
    - 네트워크상 `ping` 요청 확인 결과, 서버는 요청을 보낸 해당 클라이언트와 매핑된 정보를 제공했습니다.
    - 클라이언트는 서버에 의해 식별될 수 있는 값을 파라미터로 담아 요청을 보냈고, 그 결과로 클라이언트가 활용할 수 있는 응답을 받는 구조임을 배웠습니다.
2. 개발자 도움 없이 웹사이트 운영자 누구나 설정할 수 있게 하자.
    - 인터콤은 ‘메신저 커스텀 설정’(정렬, padding, z-index 등)을 코드로 작성하도록 합니다.
      ```js
      // 메신저 정렬을 설정하는 코드
      window.intercomSettings = {
        app_id: "abc123",
        alignment: "left", // Left or right position on the page
        horizontal_padding: 20, // Horizontal padding
        vertical_padding: 20 // Vertical padding
      }
      ```
    - 개발자 입장에서는 명시적이고 자유롭게 설정할 수 있었지만, 반대로 개발자에 의존성이 크다는 점을 느꼈습니다.
    - 웹사이트의 기능 소개, 안내 메시지는 웹사이트 운영자 누구나 작성할 수 있도록 GUI로 설정할 수 있는 범위를 늘려야겠다고 생각했습니다.
    - 이전에는 개발자라면 모든 설정을 코드로 하는게 편할 것이라 추측했었습니다. 하지만 인터콤 관리자 페이지에서 GUI로 편하게 설정해보면서, 방향성을 수월하게 결정할 수 있었습니다.

<br>

### 유사 서비스 (Driver.js)

[Driver.js](https://driverjs.com/)는 웹사이트 투어, 하이라이트를 도와주는 라이브러리로 ([23k GitHub Stars](https://github.com/kamranahmedse/driver.js))로 많은 사용자를 확보하고 있었습니다. 주요 참고사항은 아래와 같습니다.

1. Window resize, scroll 이벤트 발생시 동적으로 SVG 생성 (+ 반응형 지원)
2. 모듈화가 잘 된 코드 구조
    - main 파일 driver.js에서 highlight 함수, popover, overlay 함수 파일들은 별개 모듈로 두어 기능을 조합했습니다.
    - 소스 코드를 분석하며 각 역할별 함수 모듈화가 잘 되어 있다는 점을 참고하여 서비스에 적용했습니다.

<br>
<br>

# 회고


<br>
<br>
