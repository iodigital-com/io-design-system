$(document).ready(function () {
    /**
     * To load all blocks after initial html page load
     */
    var url = decodeURI(window.location.pathname);
    $.ajax({
        type: 'POST',
        url: '/ajax/get-dynamic-blocks/',
        data: { url: url },
        success: function (data) {
            $('#skeleton').hide();

            if (data) {
                $('#sublevel-menu').css('display', '');
                $('.sublevel-menu').css('display', '');
                $('#content').hide().append(data).show(100).css('min-height', 'auto');
                $('#sidebar').show(100);
                $('.footer').show(100);

                // Remove/hide settings icons
                if (isManualAdmin) {
                    $('.block .control').hide();
                } else {
                    $('.block .control').remove();
                    $('.block .block-editable-overlay').remove();
                }

                setTimeout(function () {
                    /**
                     * Initialize common block functions for all manuals
                     */
                    initCommonBlockInitializingFunctionsOnPageLoad();

                    /**
                     * For initialize manual specific javascript functions
                     */
                    if (typeof initManualSpecificCustomFunctionsOnPageLoad === 'function') {
                        initManualSpecificCustomFunctionsOnPageLoad();
                    }
                }, 300);
            }

            return true;
        },
    });
});

/**
 * Initialize common block functions for all manuals
 */
function initCommonBlockInitializingFunctionsOnPageLoad() {
    $('#content-area').addClass('ui-sortable');

    /** Plugins & styles initialization **/
    initEachCodeBlock();

    if (typeof initPlyrIO === 'function') {
        initPlyrIO();
    }

    // Initiate autoplay on show mode - after page load
    if (typeof addFullWidthVideoAutoPlay === 'function') {
        addFullWidthVideoAutoPlay();
    }

    if ($('.block-gallery').length > 0) {
        // Initialize in every gallery block
        $('#wrapper .block-gallery').each(function () {
            initGridALicious($(this).attr('id'));
        });
        resizeSquareGrid();
    }

    if (typeof resizeDynamicImageBlock === 'function') {
        resizeDynamicImageBlock();
    }

    if (typeof addActiveClassOnInPageNavigation === 'function') {
        addActiveClassOnInPageNavigation();
    }

    if (typeof resizeColorBlockHeightsToMatch === 'function') {
        resizeColorBlockHeightsToMatch();
    }

    // Initialize left menu
    if (typeof generateLeafMenu === 'function') {
        generateLeafMenu();
    }

    // Init start page navigation
    if (typeof initStartPageNavigation === 'function') {
        initStartPageNavigation();
    }

    // Lazyload images
    if (typeof initImageLazyLoader === 'function') {
        initImageLazyLoader();
    }

    if (typeof initSortable === 'function') {
        initSortable();
    }

    if (typeof resizeBlockNavigation === 'function') {
        resizeBlockNavigation();
    }

    if (typeof changeText2ImgColumn === 'function') {
        changeText2ImgColumn();
    }

    if (typeof changeText2Column === 'function') {
        changeText2Column();
    }

    if (typeof initScrollTop === 'function') {
        initScrollTop();
    }

    if (typeof initSmoothScroll === 'function') {
        initSmoothScroll();
    }

    if (typeof initScrollToTopOnPageLoad === 'function') {
        initScrollToTopOnPageLoad();
    }

    if (typeof initSidebarSortable === 'function') {
        initSidebarSortable();
    }

    if (typeof initTopSortable === 'function') {
        initTopSortable();
    }

    if (typeof reloadGalleryBlock === 'function') {
        reloadGalleryBlock();
    }

    if (typeof initHistoryPlugins === 'function') {
        initHistoryPlugins();
    }

    if (typeof initRetinaJS === 'function') {
        initRetinaJS();
    }

    if (typeof initiateFloatingButtonPlacement === 'function') {
        initiateFloatingButtonPlacement();
    }
}
