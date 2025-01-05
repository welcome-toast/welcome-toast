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
  * [유저는 처음 방문한 웹페이지가 어렵습니다.](#%EC%9C%A0%EC%A0%80%EB%8A%94-%EC%B2%98%EC%9D%8C-%EB%B0%A9%EB%AC%B8%ED%95%9C-%EC%9B%B9%ED%8E%98%EC%9D%B4%EC%A7%80%EA%B0%80-%EC%96%B4%EB%A0%B5%EC%8A%B5%EB%8B%88%EB%8B%A4)
  * [안내 메시지 하나로, 유저의 첫 액션을 유도할 수 있습니다.](#%EC%95%88%EB%82%B4-%EB%A9%94%EC%8B%9C%EC%A7%80-%ED%95%98%EB%82%98%EB%A1%9C-%EC%9C%A0%EC%A0%80%EC%9D%98-%EC%B2%AB-%EC%95%A1%EC%85%98%EC%9D%84-%EC%9C%A0%EB%8F%84%ED%95%A0-%EC%88%98-%EC%9E%88%EC%8A%B5%EB%8B%88%EB%8B%A4)
- [기술 스택](#%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D)
  * [Script](#script)
  * [관리자 페이지](#%EA%B4%80%EB%A6%AC%EC%9E%90-%ED%8E%98%EC%9D%B4%EC%A7%80)
- [기능](#%EA%B8%B0%EB%8A%A5)
  * [script 한 줄로 끝나는 연동](#script-%ED%95%9C-%EC%A4%84%EB%A1%9C-%EB%81%9D%EB%82%98%EB%8A%94-%EC%97%B0%EB%8F%99)
  * [관리자 페이지 만으로 토스트 메시지 개인화](#%EA%B4%80%EB%A6%AC%EC%9E%90-%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%A7%8C%EC%9C%BC%EB%A1%9C-%ED%86%A0%EC%8A%A4%ED%8A%B8-%EB%A9%94%EC%8B%9C%EC%A7%80-%EA%B0%9C%EC%9D%B8%ED%99%94)
- [개발 과정](#%EA%B0%9C%EB%B0%9C-%EA%B3%BC%EC%A0%95)
  * [쉬운 연동, 보안을 고려하면서 SDK 구조를 단순화 해보자.](#%EC%89%AC%EC%9A%B4-%EC%97%B0%EB%8F%99-%EB%B3%B4%EC%95%88%EC%9D%84-%EA%B3%A0%EB%A0%A4%ED%95%98%EB%A9%B4%EC%84%9C-sdk-%EA%B5%AC%EC%A1%B0%EB%A5%BC-%EB%8B%A8%EC%88%9C%ED%99%94-%ED%95%B4%EB%B3%B4%EC%9E%90)
  * [강조할 DOM 요소를 기준으로 토스트 메시지를 띄우는 방법](#%EA%B0%95%EC%A1%B0%ED%95%A0-dom-%EC%9A%94%EC%86%8C%EB%A5%BC-%EA%B8%B0%EC%A4%80%EC%9C%BC%EB%A1%9C-%ED%86%A0%EC%8A%A4%ED%8A%B8-%EB%A9%94%EC%8B%9C%EC%A7%80%EB%A5%BC-%EB%9D%84%EC%9A%B0%EB%8A%94-%EB%B0%A9%EB%B2%95)
  * [적용된 모습을 미리 보면서 토스트 메시지를 설정할 수 있도록 하자.](#%EC%A0%81%EC%9A%A9%EB%90%9C-%EB%AA%A8%EC%8A%B5%EC%9D%84-%EB%AF%B8%EB%A6%AC-%EB%B3%B4%EB%A9%B4%EC%84%9C-%ED%86%A0%EC%8A%A4%ED%8A%B8-%EB%A9%94%EC%8B%9C%EC%A7%80%EB%A5%BC-%EC%84%A4%EC%A0%95%ED%95%A0-%EC%88%98-%EC%9E%88%EB%8F%84%EB%A1%9D-%ED%95%98%EC%9E%90)
- [회고](#%ED%9A%8C%EA%B3%A0)

<!-- tocstop -->

<br>
<br>

# 개발 배경

## 유저는 처음 방문한 웹페이지가 어렵습니다.

웹 서비스들을 보면서 처음 서비스를 방문하는 사용자에게 기능 소개, 튜토리얼 등이 더 친절하다면 좋겠다는 생각을 했습니다. 대체로 프로젝트의 런칭일이 다가옴에 따라, 중요한 기능에 집중하고 오류 점검에 바쁘기  마련입니다. 사용자를 위해 친절하게 새로운 소식을 알려주면 좋겠지만, 최종 점검으로 바쁘기 때문에 엄두가 나질 않습니다. 하지만 이렇게 런칭한 웹페이지에 사용자가 들어오면 어떨까요? 웹페이지에 처음 방문한 유저는 무엇을 해야할지 감을 잡기 어려울 수 있습니다.

<br>

## 안내 메시지 하나로, 유저의 첫 액션을 유도할 수 있습니다.

메시지 하나로 충분히 사용자를 붙잡을 수 있습니다. 웹페이지 운영자의 의도대로 사용자를 유도할 수 있을 것입니다. 스크립트 한 줄만으로 개발자 도움 없이, 웹페이지 운영자 누구나 토스트 메시지를 설정할 수 있습니다. 웹페이지에 방문한 유저에게 새로운 기능이나 콘텐츠 소식을 알려주면 어떨까요? 어렵게 방문한 사용자가 떠나지 않도록, welcome-toast로 5분 만에 토스트 메시지를 띄워보세요!

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

## 쉬운 연동, 보안을 고려하면서 SDK 구조를 단순화 해보자.



<br>

## 강조할 DOM 요소를 기준으로 토스트 메시지를 띄우는 방법

<br>

## 적용된 모습을 미리 보면서 토스트 메시지를 설정할 수 있도록 하자.

<br>
<br>

# 회고


<br>
<br>
