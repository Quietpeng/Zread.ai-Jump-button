// ==UserScript==
// @name         GitHub → Zread.ai 跳转按钮
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  在 GitHub 项目页面添加一个按钮，点击跳转到 Zread.ai 对应指南
// @author       QuietPeng
// @match        https://github.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function addZreadButton() {
        const repoPath = window.location.pathname; // e.g. /deepseek-ai/DeepSeek-V3
        if (!/^\/[^\/]+\/[^\/]+(\/)?$/.test(repoPath)) return; // 只在仓库主页生效

        const zreadUrl = 'https://zread.ai' + repoPath;

        const button = document.createElement('a');
        button.href = zreadUrl;
        button.target = '_blank';
        button.innerText = ' 在 Zread.ai 查看指南';
        button.style.marginLeft = '10px';
        button.style.padding = '6px 12px';
        button.style.backgroundColor = '#0969da';
        button.style.color = '#fff';
        button.style.borderRadius = '6px';
        button.style.textDecoration = 'none';
        button.style.fontSize = '14px';

        const actionsBar =
              document.querySelector('.pagehead-actions') ||
              document.querySelector('[data-testid="repo-actions-bar"]') ||
              document.querySelector('.d-flex.flex-wrap.gap-2');

        if (actionsBar && !document.getElementById('zread-button')) {
            button.id = 'zread-button';
            actionsBar.appendChild(button);
        }
    }

    // 页面加载完成后执行
    setTimeout(addZreadButton, 1500);
})();
