module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
  },
}



var frontend=document.querySelector('#jira-frontend'),container=document.querySelector('.ghx-work-wrapper'),sideNav=document.querySelector('[data-testid="ContextualNavigation"]'),topNav=document.querySelector('[aria-label="Primary Navigation"]'),boardMenu=document.querySelector('#ghx-operations'),titleHeader=document.querySelector('#ghx-header'),breadCrumbs=document.querySelector('[data-testid="rapidboard-breadcrumbs"]'),headerBanner=document.querySelector('header[role="banner"]').parentNode.parentNode,board=document.querySelector('#ghx-work');[sideNav, topNav, boardMenu, titleHeader, breadCrumbs, headerBanner].forEach(elem => elem && elem.remove());document.querySelectorAll('.ghx-issue-subtask').forEach(elem => elem.style = 'margin-left: 20px;');frontend.style = 'padding: 10px;';frontend.firstElementChild.firstElementChild.style = 'display: block;';board.style = 'height: 100vh;';document.documentElement.requestFullscreen();
