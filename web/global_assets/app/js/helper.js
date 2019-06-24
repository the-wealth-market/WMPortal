/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var extension = "";
var isMobile = false;
var currentSelection, myNicEditor;
$(document).ready(function () {
    performPageActions();
});
function getCurrentPage() {
//returns the current page the user is on
    var path = window.location.pathname;
    var page = path.split("/").pop();
    return page;
}
function General() {
    extension = GetExtension();
    Accordion();
    pageOptions();
//    sticky_relocate();
    checkMobile();
    $(".show").show();
    $('textarea').val("");
    $("#datepicker").val("");
    $(".hide-on-load").hide();
//    $(window).scroll(sticky_relocate);
    $(".panelClose").click(function () {
        $(this).closest(".overlay").fadeOut(500);
        $(this).closest(".overlay").addClass("hide");
    });
    $(".close_overlay").click(function () {
        $(this).closest(".overlay").fadeOut(500);
        $(this).closest(".overlay").addClass("hide");
    });
    $(".menu-item").click(function () {
        $(".menu-item").removeClass("menu-clicked");
        $(this).addClass("menu-clicked");
    });
    $(".search-btn").click(function () {
        toggleSearchPanel();
    });

    $(".panelBtn").click(function () {
        toggleReferencePanel();
    });
    $("#listview").click(function () {
        ListView();
    });
    $("#blockview").click(function () {
        BlockView();
    });
    $("#newContent").click(function () {
        window.location = extension + "index.jsp";
    });
    $("#innersearchbtn").click(function () {
        var searchtext = $("#searchtxt").val();
        filterObjects(searchtext);
    });
    $("#objectTitle").keyup(function () {
        $(this).val(capitaliseFirstLetter($(this).val()));
    });

    //-----------------------------Address-----------------------------//
    $(document).mouseup(function (e) {
        if (e.target.class !== 'searchPanel' && !$('.searchPanel').find(e.target).length) {
            closeSearchPanel();
        }
    });
}
function verifyUser() {
//This function checks if a user is signed in and responds     
    $("#wmlinks").css("visibility", "hidden");
    $("#wmlinks").hide();
    var userid = $("#userid").val();
//    alert(userid);
    if (userid === "null" || userid === "") {
        $(".forMembers").hide();
        $(".forMembers").addClass("hide");
        $(".notforMembers").show();
        $(".notforMembers").removeClass("hide");
        extension = "../../../";
        window.location = extension + "ControllerServlet?action=Link&type=Offline";
    } else {
        $(".forMembers").removeClass("hide");
        $(".forMembers").show();
        $(".notforMembers").hide();
        $(".notforMembers").addClass("hide");
    }
}
function checkUser() {
    var userid = $("#userid").val();
    if (userid === "null" || userid === "") {
        var page = getCurrentPage();
        if (page !== "index.jsp") {
//            window.location = extension+"ControllerServlet?action=Link&type=Home";
        }
    }
}
function Accordion() {
    $(".accordion-content").hide();
    $("<i />", {class: "fa fa-fw fa-chevron-up half-marginright smalltext arrow-up"}).prependTo(".accordion-handler").hide();
    $("<i />", {class: "fa fa-fw fa-chevron-down half-marginright smalltext arrow-down"}).prependTo(".accordion-handler");
    $(".accordion-expanded").show();
    $(".accordion-expanded").closest(".accordion-parent").find(".arrow-up").toggle();
    $(".accordion-expanded").closest(".accordion-parent").find(".arrow-down").toggle();
    $(".accordion-handler").click(function () {
        $(this).closest(".accordion-parent").find(".accordion-content").slideToggle(500);
        $(this).find(".arrow-up").toggle();
        $(this).find(".arrow-down").toggle();
    });
}
function GetData(action, type, callfunction, data) {
    extension = GetExtension();
    $.ajax({
        url: extension + 'ControllerServlet',
        type: 'GET',
        data: {
            action: action,
            type: type,
            data: data
        },
        success: function (data) {
            linkToFunction(callfunction, data);
        }
    });
}
function imageExists(image_url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    return http.status != 404;
}
function transferTileData(tile) {
    var dat = $(tile).find('.data1').text();
    $(tile).find(".item1").text(dat);
    $(tile).find('.edit1').val(dat);
    var dat = $(tile).find('.data2').text();
    $(tile).find(".item2").text(dat);
    $(tile).find('.edit2').val(dat);
    var dat = $(tile).find('.data3').text();
    $(tile).find(".item3").text(dat);
    $(tile).find('.edit3').val(dat);
    var dat = $(tile).find('.data4').text();
    $(tile).find(".item4").text(dat);
    $(tile).find('.edit4').val(dat);
    var dat = $(tile).find('.data5').text();
    $(tile).find(".item5").text(dat);
    $(tile).find('.edit5').val(dat);
    var dat = $(tile).find('.data6').text();
    $(tile).find(".item6").text(dat);
    $(tile).find('.edit6').val(dat);
    var dat = $(tile).find('.data7').text();
    $(tile).find(".item7").text(dat);
    $(tile).find('.edit7').val(dat);
    var dat = $(tile).find('.data8').text();
    $(tile).find(".item8").text(dat);
    $(tile).find('.edit8').val(dat);
    var dat = $(tile).find('.data9').text();
    $(tile).find(".item9").text(dat);
    $(tile).find('.edit9').val(dat);
}
function pageOptions() {
    $(".pageoptionLink").click(function () {
        var i = $(this).find(".link-num").text();
        $(".pageoption").addClass("hide");
        $(".pageoption").hide();
        $(".pageoption" + i).removeClass("hide");
//        $(".pageoptionLink").removeClass("optionSelected");
//        $(".pageoption1Link").addClass("optionSelected");
        $(".pageoption" + i).fadeIn(500);
    });
}
function mobileOptions() {
    $(".mobileoption1Link").click(function () {
        $(".mobileoption").addClass("hide");
        $(".mobileoption").hide();
        $(".mobileoption1").removeClass("hide");
        $(".mobileoption1").fadeIn(500);
    });
    $(".mobileoption2Link").click(function () {
        $(".mobileoption").addClass("hide");
        $(".mobileoption").hide();
        $(".mobileoption2").removeClass("hide");
        $(".mobileoption2").fadeIn(500);
    });
    $(".mobileoption3Link").click(function () {
        $(".mobileoption").addClass("hide");
        $(".mobileoption").hide();
        $(".mobileoption3").removeClass("hide");
        $(".mobileoption3").fadeIn(500);
    });
    $(".mobileoption4Link").click(function () {
        $(".mobileoption").addClass("hide");
        $(".mobileoption").hide();
        $(".mobileoption4").removeClass("hide");
        $(".mobileoption4").fadeIn(500);
    });
    $(".mobileoption5Link").click(function () {
        $(".mobileoption").addClass("hide");
        $(".mobileoption").hide();
        $(".mobileoption5").removeClass("hide");
        $(".mobileoption5").fadeIn(500);
    });
    $(".mobile-close").click(function () {
        $(this).closest(".mobile-menu").fadeOut(500);
        $(this).closest(".mobile-menu").addClass("hide");
    });
}
function sticky_relocate() {
    var window_top = $(window).scrollTop();
    var div_top = $('#sticky-anchor').offset().top;
    if (window_top > div_top) {
        $("#stick").css("position", "fixed");
        $('#stick').addClass('stick');
    } else {
        $("#stick").css("position", "relative");
        $('#stick').removeClass('stick');
    }
}
function toggleSearchPanel() {
    $(".searchPanel").removeClass("hide");
    $(".searchPanel").toggle(500);
    $("#searchtxt").focus();
}
function closeSearchPanel() {
    $(".searchPanel").removeClass("hide");
    $(".searchPanel").hide(500);
}
function openReferencePanel() {
    $(".refsPanel").removeClass("hide-refs");
    $("#contentList").removeClass("widenright");
    $(".rightTitle").removeClass("widen");
    $("#bookView").removeClass("widenbook");
    $(".righticon").show();
    $(".lefticon").hide();
}
function closeReferencePanel() {
    $(".refsPanel").addClass("hide-refs");
    $("#contentList").addClass("widenright");
    $(".rightTitle").addClass("widen");
    $("#bookView").addClass("widenbook");
    $(".righticon").hide();
    $(".lefticon").show();
}
function toggleReferencePanel() {
    $(".refsPanel").toggleClass("hide-refs");
    $("#contentList").toggleClass("widenright");
    $(".rightTitle").toggleClass("widen");
    $("#bookView").toggleClass("widenbook");
    $(".lefticon, .righticon").toggle();
}
function filterObjects(searchtext) {
    $("body").removeHighlight();
    if (searchtext.trim() !== "") {
        var searchObjs = $(".searchObject");
        var match = $('.searchObject:contains("' + searchtext + '")');
        if (match.text().trim()) {
            searchObjs.hide();
            match.closest(".searchObject").show();
            $(".searchObject").highlight(searchtext);
        } else {
            $(".searchObject").show();
        }
    } else {
        $(".searchObject").show();
    }
}
function checkMobile() {
    isMobile = false;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))
    {
        if (screen.width < 600) {
            $(".not-for-mobile").hide();
            $(".mobile-show").removeClass("hide");
            $(".mobile-show").show();
            mobileOptions();
        }
        isMobile = true;
//        toggleSidebar();
    } else {
        tooltip();
    }
}
function getIsMobile() {
    return isMobile;
}
function tooltip() {
    $(".tooltipParent").mouseenter(function () {
        $(this).children(".tooltip").removeClass("hide");
        $(this).children(".tooltip").show();
    });
    $(".tooltipParent").mouseleave(function () {
        $(this).children(".tooltip").addClass("hide");
        $(this).children(".tooltip").hide();
    });
}
function ListView() {
    $("#content").addClass("listview");
    openReferencePanel();
    $(".panelBtn").hide();
}
function BlockView() {
    $("#content").removeClass("listview");
    closeReferencePanel();
    $(".panelBtn").show();
}
function CustomAlert(message) {
    alert(message);
}
function GetCurrentSelection() {
    return currentSelection;
}
function showCustomLoader(loaderText) {
    $(".bottom-loader").text(loaderText);
    $(".bottom-loader").show();
}
function hideCustomLoader() {
    $(".bottom-loader").text("");
    $(".bottom-loader").hide();
}
function capitaliseFirstLetter(text) {
    if (text !== undefined) {
        return text.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
}
function getEditor() {
    return myNicEditor;
}
function placeholder(container, text) {
    $(container).text(text);
    $(container).addClass("ashtext");
    $(container).focusin(function () {
        var current_text = $(container).text();
        if (current_text === text) {
            $(container).text("");
            $(container).removeClass("ashtext");
        }
    });
    $(container).focusout(function () {
        var current_text = $(container).text();
        if (current_text === "") {
            $(container).text(text);
            $(container).addClass("ashtext");
        }
    });
}
function CustomAutoComplete(data, textbox) {
    var parent = $("<div />", {class: "parts autoCompleteParent"}).wrap(textbox);
    var result = $("<div />", {class: "autoCompleteContainer wide white border lightborder"}).appendTo(parent);
    textbox.keyup(function () {
        var text = textbox.val().trim();
        parent.find(".autoCompleteContainer").show();
        parent.find(".autoCompleteContainer").empty();
        if (text !== "") {
            $.each(data, function (index, item) {
                if (item.toLowerCase().startsWith(text)) {
//                if (item.toLowerCase().indexOf(text) >= 0) {
                    $("<div />", {class: "mini-padding-vertical whitebtn half-padding-horizontal textleft", text: item, click: function () {
                            textbox.val(item);
                            parent.find(".autoCompleteContainer").empty();
                            parent.find(".autoCompleteContainer").hide();
                            triggerSearch();
                        }}).appendTo(result);
                }
            });
        }
    });
    $(document).mouseup(function (e) {
        if (e.target.class !== 'autoCompleteContainer' && !$('.autoCompleteContainer').find(e.target).length) {
            parent.find(".autoCompleteContainer").empty();
            parent.find(".autoCompleteContainer").hide();
        }
    });
}
function PriceFormat(price) {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 2
    });
    price = formatter.format(price);
    price = price.replace("NGN", "₦");
    return price.replace(".00", "");
}

function cleanArray(actual) {
    var newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}

function showLoader() {
    $.blockUI({
        message: '<div class="blockui-message text-white rounded px-3 py-2"><i class="icon-spinner4 spinner mt-1"></i><span class="font-weight-semibold d-block mt-2">Loading</span></div>',
        overlayCSS: {
            backgroundColor: '#1b2024',
            opacity: 0.8,
            cursor: 'wait'
        },
        css: {
            border: 0,
            color: '#fff',
            padding: 0,
            backgroundColor: 'transparent'
        }
    });
}
function hideLoader() {
    $.unblockUI({
        onUnblock: function () {}
    });
}
function formatNumber(n) {
    // format number 1000000 to 1,234,567
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function formatCurrency(input, blur) {
    // appends $ to value, validates decimal side
    // and puts cursor back in right position.

    // get input value
    var input_val = input.val();

    // don't validate empty input
    if (input_val === "") {
        return;
    }

    // original length
    var original_len = input_val.length;

    // initial caret position 
    var caret_pos = input.prop("selectionStart");

    // check for decimal
    if (input_val.indexOf(".") >= 0) {

        // get position of first decimal
        // this prevents multiple decimals from
        // being entered
        var decimal_pos = input_val.indexOf(".");

        // split number by decimal point
        var left_side = input_val.substring(0, decimal_pos);
        var right_side = input_val.substring(decimal_pos);

        // add commas to left side of number
        left_side = formatNumber(left_side);

        // validate right side
        right_side = formatNumber(right_side);

        // On blur make sure 2 numbers after decimal
        if (blur === "blur") {
            right_side += "00";
        }

        // Limit decimal to only 2 digits
        right_side = right_side.substring(0, 2);

        // join number by .
        input_val = left_side;

    } else {
        // no decimal entered
        // add commas to number
        // remove all non-digits
        input_val = formatNumber(input_val);

        // final formatting
        if (blur === "blur") {
            input_val;
        }
    }

    // send updated string to input
    input.val(input_val);

    // put caret back in the right position
    var updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    input[0].setSelectionRange(caret_pos, caret_pos);
}

