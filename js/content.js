/* jshint asi:true */
/////////////////////////content////////////////////////////
generateContent()

/**
 * [generateContent description]
 */
function generateContent() {
    var contentToc = document.querySelector('#markdown-toc')


    if (contentToc === null) {
        document.querySelector('#content').style.display = 'none'
    } else {
        // In order to smooth scrolling, using third-party libraries scroll.js 
        // Add a tag to give each class=scroll
        var aTags = contentToc.querySelectorAll('a')
        for (var i = 0; i < aTags.length; i++) {
            aTags[i].setAttribute('class', 'scroll')
        }

        // move content 
        var contentHtml = contentToc.innerHTML
        var sideContentUl = document.querySelector('#content-side')
        sideContentUl.innerHTML = contentHtml
    }

    // If there is no similar article , hide this part 
    var relatedPost = document.querySelector('.related-post');
    if (relatedPost.innerHTML.trim() === '') {
        relatedPost.style.display = 'none'
    }
}

fixSidebar()

/**
 * [fixSidebar description]
 * 滚轮滚到一定位置时，将 sidebar-wrap 添加 fixed 样式
 * 反之，取消样式
 */
function fixSidebar() {
    var sidebarWrap = document.querySelector('.sidebar-wrap')
    window.onscroll = function() {
        var sidebarWrapTop = sidebarWrap.getBoundingClientRect().top
        if (sidebarWrapTop < 21) {
            sidebarWrap.classList.add('fixed')
        }
        var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
        if (scrollTop < 78) {
            sidebarWrap.classList.remove('fixed')
        }
    }
}

controlHeight()

/**
 * [controlHeight description]
 * control the height of sidebar 
 */
function controlHeight() {
    // Get the height of first similar posts 
    // And the height of the user's browser window
    // Sets the maximum height of content
    var similarDiv = document.querySelector('.related-post')
    var contentUl = document.querySelector('.content-ul')
    var similarDivHeight = similarDiv.offsetHeight
    var windowHeight = window.innerHeight
    var contentMaxHeight = windowHeight - similarDivHeight - 77 - 60

    contentUl.style.maxHeight = contentMaxHeight + 'px'
}
