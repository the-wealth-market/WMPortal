/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var extension = "", userid, StaffUserID, StaffUserName, type, username, switchuserid, loginuseremail, useracctstmt, paymentStatus;
var userdata = new Array();

function performPageActions() {
    verifyUser();
    var page = getCurrentPage();
    userid = $("#userid").val();
    paymentStatus = $("#paymentStatus").val();
    switchuserid = $("#switchuserid").val();
    type = $("#usertype").val();
    username = $("#username").val();
    if (page === "index.jsp") {
        LoginFunctions();
    } else if (page === "login.jsp") {
        extension = "../../";
        LoginFunctions();
    } else if (page === "register.jsp") {
        extension = "../../";
        $('.ValdateFound').daterangepicker({
            singleDatePicker: true,
            locale: {
                format: 'YYYY-MM-DD'
            }
        });
    } else if (page === "validate.jsp") {
        extension = "../../";
        GetData("User", "GetBanks", "LoadBanks");

    } else if (page === "termsAndConditions.jsp") {
        extension = "../../";
    } else if (page === "resetPassword.jsp") {
        $("#ResetPass").click(function () {
            var useremail = $("#resetemail").val();
            if (useremail !== "") {
                $("#holdEmail").text(useremail);
                GetData("User", "SendEmailVerification", "LoadPassword", useremail);
            }
        });
        $("#ResendCode").click(function () {
            var useremail = $("#holdEmail").text();
            if (useremail !== "") {
                GetData("User", "SendEmailVerification", "LoadPassword", useremail);
            }
        });
        $("#ValidateRecoveryCode").click(function () {
            var validatecode = $("#emailvalidationcode").val();
            if (validatecode !== "") {
                GetData("User", "ValidateRecoveryCode", "LoadRecovery", validatecode);
            }
        });
        $("#SetNewPassword").click(function () {
            var newpassword = $("#newpassword").val();
            var UserMemberID = $("#UserMemberID").text();
            var newpassword2 = $("#newpassword2").val();
            if (newpassword === newpassword2 || newpassword === "") {
                var data = [UserMemberID, newpassword];
                GetData("User", "ResetNewPassword", "LoadAfterPasswordReset", data);
            }
        });
        extension = "../../";
    } else if (page === "profile.jsp") {
        extension = "../../../";
        profilePageFunctions();
        $("#id-profile").addClass("active");
        $("#id-profile_details").addClass("active bg-white blacktext");
    } else if (page === "business_staff_perms.jsp") {
        extension = "../../../";
        StaffUserID = $("#StaffUserID").val();
        StaffUserName = $("#StaffUserName").val();
        manageBizStaffPermPage();
    } else if (page === "products.jsp") {
        extension = "../../../";
        productPageFunctions();
        $("#id-profile").addClass("active");
        $("#id-profile_products").addClass("active bg-white blacktext");
    } else if (page === "product_listing.jsp") {
        extension = "../../../";
        $("#id-profile").addClass("active");
        $("#id-profile_products_listing").addClass("active bg-white blacktext");
        productListingPageFunctions();
        DropifyScript();
    } else if (page === "contacts.jsp") {
        extension = "../../../";
        contactPageFunctions();
        $("#id-profile").addClass("active");
        $("#id-profile_contacts").addClass("active bg-white blacktext");
    } else if (page === "staff.jsp") {
        extension = "../../../";
        staffPageFunctions();
        $("#id-profile").addClass("active");
        $("#id-profile_staff").addClass("active bg-white blacktext");
    } else if (page === "history.jsp") {
        extension = "../../../";
        historyPageFunctions();
        $("#id-profile").addClass("active");
        $("#id-profile_history").addClass("active bg-white blacktext");
    } else if (page === "services.jsp") {
        extension = "../../../";
        $("#id-profile").addClass("active");
        $("#id-profile_services").addClass("active bg-white blacktext");
    } else if (page === "favorites.jsp") {
        extension = "../../../";
        favoritePageFunctions();
        $("#id-profile").addClass("active");
        $("#id-profile_favorite").addClass("active bg-white blacktext");
    } else if (page === "permissions.jsp") {
        extension = "../../../";
        permissionsPageFunctions();
        $("#id-profile").addClass("active");
        $("#id-profile_permissions").addClass("active bg-white blacktext");
    } else if (page === "dashboard.jsp") {
        extension = "../../../";
        dashboardFunctions();
        $("#id-dashboard").addClass("active");
    } else if (page === "messages.jsp") {
        extension = "../../../";
        MessagesFunctions("inbox");
        $("#id-messages").addClass("active");
        $("#id-messages-inbox").addClass("active bg-white blacktext");
    } else if (page === "trash.jsp") {
        extension = "../../../";
        MessagesFunctions("trash");
        $("#id-messages").addClass("active");
        $("#id-messages-trash").addClass("active bg-white blacktext");
    } else if (page === "sent.jsp") {
        extension = "../../../";
        MessagesFunctions("sent");
        $("#id-messages").addClass("active");
        $("#id-messages-sent").addClass("active bg-white blacktext");
    } else if (page === "compose.jsp") {
        extension = "../../../";
        MessagesFunctions();
        $("#id-messages").addClass("active");
        $("#id-messages-compose").addClass("active bg-white blacktext");
    } else if (page === "accounts.jsp") {
        extension = "../../../";
        AccountsFunctions(1);
        $("#id-accttrans").addClass("active");
        $("#id-accttrans-warrants").addClass("active bg-white blacktext");
    } else if (page === "reflation.jsp") {
        extension = "../../../";
        AccountsFunctions(2);
        $("#id-accttrans").addClass("active");
        $("#id-accttrans-reflation").addClass("active bg-white blacktext");
    } else if (page === "parcash.jsp") {
        extension = "../../../";
        AccountsFunctions(3);
        $("#id-accttrans").addClass("active");
        $("#id-accttrans-parcash").addClass("active bg-white blacktext");
    } else if (page === "business.jsp") {
        extension = "../../../";
        BusinessFunctions();
        $("#id-biz").addClass("active");
        $("#id-biz-biz").addClass("active bg-white blacktext");
    } else if (page === "semple.jsp") {
        extension = "../../../";
        ContractFunctions();
        $("#id_main_semple").addClass("active");
        $("#id_semple_semple").addClass("active bg-white blacktext");
    } else if (page === "uppep.jsp") {
        extension = "../../../";
        ContractFunctions();
        $("#id_main_semple").addClass("active");
        $("#id_semple_uppep").addClass("active bg-white blacktext");
    } else if (page === "mansar.jsp") {
        extension = "../../../";
        ContractFunctions();
        $("#id_main_semple").addClass("active");
        $("#id_semple_mansar").addClass("active bg-white blacktext");
    } else if (page === "mobilisation.jsp") {
        extension = "../../../";
        ContractFunctions();
        $("#id_main_semple").addClass("active");
        $("#id_main_money").addClass("active");
        $("#id_main_mobi").addClass("active bg-white blacktext");
    } else if (page === "monetisation.jsp") {
        extension = "../../../";
        ContractFunctions();
        $("#id_main_semple").addClass("active");
        $("#id_main_money").addClass("active");
    } else if (page === "commoditisation.jsp") {
        extension = "../../../";
        ContractFunctions();
        $("#id_main_semple").addClass("active");
        $("#id_main_money").addClass("active");
        $("#id_main_commod").addClass("active bg-white blacktext");
    } else if (page === "warrantsMarket.jsp") {
        extension = "../../../";
        WMarketFunctions("All");
        $("#id-wm").addClass("active");
        $("#id-wm-wmarket").addClass("active bg-white blacktext");
    } else if (page === "mylistings.jsp") {
        extension = "../../../";
        WMarketFunctions("My");
        $("#id-wm").addClass("active");
        $("#id-wm-mylisting").addClass("active bg-white blacktext");
    } else if (page === "mybids.jsp") {
        extension = "../../../";
//        WMarketFunctions("My");
        $("#id-wm").addClass("active");
        $("#id-wm-mybids").addClass("active bg-white blacktext");
    } else if (page === "monetisation_application.jsp") {
        extension = "../../../";
        MonetisationFunctions();
        $("#id_main_semple").addClass("active");
        $("#id_main_money").addClass("active");
    } else if (page === "my_monetisation_applications.jsp") {
        extension = "../../../";
        MonetisationFunctions();
        $("#id_main_semple").addClass("active");
        $("#id_main_money").addClass("active");
    }
    checkUser();
    btnEvents();
    General();
    AppFunctions();
    GreetingMessage();

}

function GetExtension() {
    return extension;
}

function AppFunctions() {
    GetData("User", "GetMemberDetails", "LoadMemberDetails", userid);
    GetData("Messages", "GetUserUnreadMessages", "LoadUnreadMessages", userid);
    data = [userid, type, "Contact"];
    GetData("Favorite", "GetUserFavorites", "LoadUserContacts", data);
}

function btnEvents() {
    $(".CallIndex").click(function () {
        window.location = extension + "ControllerServlet?action=Link&type=Login";
    });

    $(".CallSignUp").click(function () {
        window.location = extension + "ControllerServlet?action=Link&type=Register";
    });

    $(".callDashboard").click(function () {
        window.location = extension + "ControllerServlet?action=Link&type=Dashboard";
    });

    $("#LinkHelp").click(function () {
        window.open('http://thewealthmarket.com/WealthMarketShop/pages/general/supports.jsp', '_blank');
    });

    $("#LinkContact").click(function () {
        window.open('http://thewealthmarket.com/WealthMarketShop/pages/general/contactus.jsp', '_blank');
    });

    $("#LinkAbout").click(function () {
        window.open('http://thewealthmarket.com/WealthMarketShop/pages/general/contactus.jsp', '_blank');
    });

    $("#LinkTerms").click(function () {
        window.location = extension + "ControllerServlet?action=Link&type=Terms";
    });

    $("#GenAcctStmt").click(function () {
        var file_url = extension + "global_assets/app/img/PDFAccountStatements/account-statement-user-" + userid + ".pdf";
        if (imageExists(file_url) === false) {
            swal({
                title: "Account Statement",
                text: "Please Generate Account Statement",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn-danger waves-effect waves-light w-md',
                confirmButtonText: 'Ok!'
            });
        } else {
            window.open(file_url);
        }

    });

    $("#QTransferBtn").click(function () {
        GetData("Accounts", "CheckDailyLimit", "LoadDailyLimit", userid);
    });

    $("#changePin").click(function () {
        $(".modal_basic_changePin").modal("show");
    });

    $(".SMSTransactions").click(function () {
        $(".modal_basic_SMSTransactions").modal("show");
    });

    $(".ListNewBusiness").click(function () {
        $(".bd-example-modalListNewBusiness").modal("show");
    });

    $(".buyWarrants").click(function () {
        $(".modal_basic_buyWarrants").modal("show");
    });

    $("#GenerateAccount").click(function () {
        var datepicker = $("#daterangepicker").val();
        var accountDefName = $("#accountDefName").val();
        if (accountDefName === "0" || accountDefName === 0) {
            swal({
                title: "Message",
                text: "Please Select Account Type",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-danger',
                confirmButtonText: 'Ok!',
                onClose: function () {
                }
            });
        } else {
            var data = [userid, accountDefName, datepicker];
            GetData("Accounts", "GenerateUserTransactionStatement", "LoadGenerateUserTransactionStatement", data);
            $(".bd-example-tdmodal3").modal("hide");
        }

    });

    $("#StatementPeriod").click(function () {
        var datepicker = $("#daterangepicker2").val();
        var accountDefName = $("#accountDefName2").val();
        var data = [userid, accountDefName, datepicker];
        GetData("Accounts", "GetUserTransactions", "LoadTransactions", data);
        $(".bd-example-tdmodal33").modal("hide");
    });

    $(".msg-link").click(function () {
        $(".msg-link").removeClass("active");
        $(this).addClass("active");
    });

    $("#CallInboxMsg").click(function () {
        var data = [userid, "inbox"];
        GetData("Messages", "GetUserMessages", "LoadMessages", data);
    });

    $("#CallSentMsg").click(function () {
        var data = [userid, "sent"];
        GetData("Messages", "GetUserMessages", "LoadMessages", data);
    });

    $("#CallDeletedMsg").click(function () {
        var data = [userid, "trash"];
        GetData("Messages", "GetUserMessages", "LoadMessages", data);
    });

    $(".SendMessage").click(function () {
        var contactid = $("#msguserID").text();
        var subject = $("#msgsubject").val();
        var body = $($(".summernote").summernote("code")).text().trim();
        if (contactid === 0 || contactid === "0" || contactid === "" || contactid === "null" || contactid === undefined) {
            swal({
                title: "Message",
                text: "Please select or search contact",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-danger',
                confirmButtonText: 'Ok!',
                onClose: function () {
                }
            });
        } else {
            var data = [userid, contactid, subject, body];
            GetData("Messages", "NewMessage", "LoadNewMessage", data);
        }


    });

    $("#CallRegister").click(function () {
        window.location = extension + "ControllerServlet?action=Link&type=Register";
    });

    $("#usersearch").keyup(function () {
        var txt = $(this).val();
        if (txt.length > 2) {
            var data = [txt];
            GetData("User", "GetMembers", "LoadUsersList", data);
        }
    });

    $("#searchUsers").click(function () {
        var data = $("#quicksearchtext").val();
        GetData("Accounts", "GetSearchUserDetails", "LoadUserDetails", data);
    });

    $("#SearchUsers").click(function () {
        var data = $("#searchText").val();
        if (data.length > 2) {
            GetData("Messages", "GetSearchUserDetails", "LoadSearchResultUserDetails", data);
        } else {
            swal({
                title: "Message",
                text: "Invalid Email Address",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-danger',
                confirmButtonText: 'Ok!',
                onClose: function () {
                }
            });
        }
    });

    $("form[name=QuickTransferForm]").submit(function (e) {
        var benid = $(".quicktransbenid").text();
        var AccountDefID = $("input[name=accountdefinition]:checked").val();
        var PIN = $("#PIN").val();
        var TransferAmount = $("#TransferAmount").val();
        var Narration = $("#narration").val();
        var data = [userid, benid, AccountDefID, TransferAmount, PIN, Narration];
        if (benid === "") {
            $(".bd-example-modaltransfer").modal("hide");
        } else {
            $(".bd-example-modaltransfer").modal("hide");
            showLoader();
            GetData("Accounts", "CheckDebitLimit", "LoadDebitLimit", data);
        }
        e.preventDefault();

    });

    $("#resetPassword").click(function () {
        window.location = extension + "LinksServlet?type=Reset";
    });

    $("#CallLogin").click(function () {
        window.location = extension + "LinksServlet?type=Login";
    });

    $(".CallLogout").click(function () {
        swal({
            title: "Are you sure you want to log out?",
            text: "Press No if you want to continue work. Press Yes to logout current user.",
            type: 'info',
            showCancelButton: true,
            confirmButtonText: '<i class="icon-switch2 mr-2"></i> Yes ',
            cancelButtonText: '<i class="icon-reading mr-2"></i> No',
            confirmButtonClass: 'btn btn-info',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(function (dismiss) {
            if (dismiss.value) {
                window.location = extension + "ControllerServlet?action=Link&type=LogOut";
            } else {
                swal({
                    title: 'Safe',
                    text: "Your work is safe!",
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'Ok!',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
            }
        });
    });

    $("#newstates").change(function () {
        var stateid = $(this).val();
        GetData("User", "GetLGAs", "LoadLGAs", stateid);
        GetData("User", "GetTowns", "LoadTowns", stateid);
    });

    $("form[name=loginForm]").submit(function (e) {
        var f = $(this);
        f.parsley().validate();
        if (f.parsley().isValid()) {
            var email_phone = $(".email").val();
            var password = $("#pass").val();
            var data = [email_phone, password];
            if ($("#remember_me").is(':checked')) {
                localStorage.Email = email_phone;
                localStorage.Pass = password;
                localStorage.chkbx = $('#remember_me').val();
            } else {
                localStorage.Email = '';
                localStorage.Pass = '';
                localStorage.chkbx = '';
            }
            GetData("User", "Login", "LoadUserLogin", data);
        } else {
            swal({
                title: "Login Error",
                text: "Please check login details",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-danger',
                confirmButtonText: 'Ok!'
            });
        }
        e.preventDefault();
    });

    $("form[name=registerForm]").submit(function (e) {
        var regform = $(this);
        regform.parsley().validate();
        if (regform.parsley().isValid()) {
            var firstname = $("#fname").val();
            var lastname = $("#lastname").val();
            var dob = $("#datepicker-autoclose").val();
            var phonenumber = $("#phone").val();
            var password = $("#password").val();
            var emailaddress = $("#email").val();
            var gender = $("#gender").val();
            if ($("#checkTerms").is(':checked')) {
                var data = [firstname, lastname, emailaddress, phonenumber, password, gender, dob];
                GetData("User", "MemberRegistration", "LoadRegistration", data);
            } else {
                swal({
                    title: "Registration Error",
                    text: "Please accept our Terms & Conditions",
                    type: "error",
                    showCancelButton: false,
                    confirmButtonClass: 'btn btn-danger',
                    confirmButtonText: 'Ok!'
                });
            }

        }
        e.preventDefault();
    });

    $("form[name=ChangePinForm]").submit(function (e) {
        var newpin = $("#newTransactionPin").val();
        var userpassword = localStorage.UserPass;
        ChangeTransactionPIN(newpin, userpassword);
        $(".modal_basic_changePin").modal("hide");
        e.preventDefault();
    });

    $(".check-input").prop("disabled", true);
    $(".check").prop("checked", false);
    $(".check-input").val("");
    $(".check").click(function () {
        var group = $(this).closest(".check-parent").find(".check-group").text();
        if (this.checked) {
            $(this).closest(".check-parent").find(".check-input").prop("disabled", false);
            $('.' + group).not($(this).closest(".check-parent")).each(function (ind, item) {
                $(item).closest(".check-parent").find(".check-input").prop("disabled", true);
                $(item).closest(".check-parent").find(".check").prop("checked", false);
            });
        } else {
            $(this).closest(".check-parent").find(".check-input").prop("disabled", true);
            $('.' + group).not($(this).closest(".check-parent")).each(function (ind, item) {
                $(item).closest(".check-parent").find(".check-input").prop("disabled", false);
                $(item).closest(".check-parent").find(".check").prop("checked", true);
            });
        }
    });

    $("#listBtn").click(function () {
        var offer_warrants = $("#parinput1").val();
        var offer_reflation = $("#parinput2").val();
        var offer_pcr = $("#parinput3").val();
        var request_warrants = $("#parinput5").val();
        var request_reflation = $("#parinput6").val();
        var request_pcr = $("#parinput7").val();
        var offers = "";
        var requests = "";
        if (offer_warrants !== "")
            offers = offers + "1-" + offer_warrants + ";";
        if (offer_reflation !== "")
            offers = offers + "2-" + offer_reflation + ";";
        if (offer_pcr !== "")
            offers = offers + "3-" + offer_pcr + ";";
        if (request_warrants !== "")
            requests = requests + "1-" + request_warrants + ";";
        if (request_reflation !== "")
            requests = requests + "2-" + request_reflation + ";";
        if (request_pcr !== "")
            requests = requests + "3-" + request_pcr + ";";
        swal({
            title: 'Confirm Listing',
            text: "The values you have offered would be moved to your Escrow Account!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Continue',
            cancelButtonText: 'Cancel',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: true
        }).then(function (dismiss) {
            if (dismiss.value) {
                $(".bd-modal-list-for-sale").modal("hide");
                var data = [offers, requests];
                GetData("Warrants", "ListValueForSale", "ListValue", data);
            } else {
                swal({
                    title: 'Cancelled',
                    text: "Your address is safe!",
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonText: 'Ok!',
                    confirmButtonClass: 'btn btn-warning',
                    buttonsStyling: false
                });
            }
        });

    });

    $("#AddBankInfo").click(function () {
        var f = $(this);
        f.parsley().validate();
        if (f.parsley().isValid()) {
            var bkname = $("#BankName").val();
            var bkaccttype = $("#AcctType").val();
            var bkacctno = $("#AcctNumber").val();
            var bkbvn = $("#BVNNumber").val();
            var data = [userid, bkname, bkaccttype, bkacctno, bkbvn];
            GetData("User", "AddBankDetails", "LoadBankDetails", data);
        } else {
            swal({
                title: "Bank Information Error",
                text: "Please check details",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-danger',
                confirmButtonText: 'Ok!'
            });
        }
    });

    $("form[name=ValaddBankDetails]").submit(function (e) {
        var f = $(this);
        f.parsley().validate();
        if (f.parsley().isValid()) {
            var valuserid = $("#ValID").val();
            var bkname = $("#ValBankName").val();
            var bkaccttype = $("#ValAcctType").val();
            var bkacctno = $("#ValAcctNumber").val();
            var bkbvn = $("#ValBVNNumber").val();
            swal({
                title: "Validation Fees",
                text: "A compulsory fees of ₦1500 is required to validate your account and ₦500 will be refunded to the same registered account.",
                type: "success",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-success',
                confirmButtonText: 'OK!',
                onClose: function () {
                    var data = [valuserid, bkname, bkaccttype, bkacctno, bkbvn];
                    GetData("User", "AddBankDetails", "LoadBankDetails2", data);
                }
            });

        } else {
            swal({
                title: "Bank Information Error",
                text: "Please check details",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-danger',
                confirmButtonText: 'Ok!'
            });
        }
        e.preventDefault();
    });

    $("#staffsearch").keyup(function () {
        var txt = $(this).val();
        if (txt.length > 2) {
            var data = [txt];
            GetData("User", "GetMembers", "LoadStaffList", data);
        }
    });
    $("#payCash").click(function () {
        var email = loginuseremail;
        var amount = $("#cashAmount").val();
        if (amount === "") {
            swal({
                title: 'Empty',
                text: "Please enter the cash amount!",
                type: 'warning',
                showCancelButton: false,
                confirmButtonText: 'Ok!',
                confirmButtonClass: 'btn btn-warning',
                buttonsStyling: false
            });
        } else {
            var newPaymentAmount = CalculatePercentage(amount);
            payWithPaystack(userid, newPaymentAmount, email, amount, "Buy Warrants With Cash");
        }

    });
    $("#InitPayStack").click(function () {
        var data = [userid, 200000, "st.deemene@yahoo.com"];
        showLoader();
        GetData("Accounts", "InitPayment", "LoadInitPaymentUrl", data);

    });
    $("#PayInspectionFees").click(function () {
        var email = loginuseremail;
        var amount = 1500;
        var newPaymentAmount = CalculatePercentage(amount);
        payWithPaystack(userid, newPaymentAmount, email, amount, "Inspection Fees");

    });
    $("#cashAmount").on("input", function () {
        var val = $(this).val();
        $(".expected-par-warrants").text(PriceFormat(val));
        $(".expected-par-reflation-rights").text(PriceFormat(val));
        $(".expected-par-pcr").text(PriceFormat(val));
    });
    $("#refCashAmount").on("input", function () {
        var val = $(this).val();
        var ref = $("#refRightsAmount").val();
        $(".expected-ref-warrants").text(PriceFormat(val));
        $(".expected-ref-reflation-rights").text(PriceFormat(val));
        $(".expected-ref-pcr").text(PriceFormat(val));
    });
    $("#bizindustry").change(function () {
        var data = $(this).val();
        GetData("User", "GetBusinessTypes", "LoadBusinessTypes", data);
    });
    $(".SwitchBack").click(function () {
        swal({
            title: 'Swtich To Personal Account?',
            text: "Are you sure you want to switch to your personal account!",
            type: 'info',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: true
        }).then(function (dismiss) {
            if (dismiss.value) {
                var data = [userid, switchuserid];
                GetData("User", "SwitchTo", "LoadSwitchTo", data);
                var data = [userid, "Switch Account", "Switch Account", "Switched to Member Account"];
                GetData("Favorite", "LogActivities", "LoadLogActivities", data);
            } else {
                swal({
                    title: 'Cancelled',
                    text: "Cancelled!",
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'Ok!',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
            }
        });

    });

    $("#AcceptContract").click(function () {
        var contractid = $("#ContrtID").text().trim();
        $(".semple-contract-display1-modal").modal("hide");
        ConfirmSempleContractSigning(contractid);
    });
    $("#RejectContract").click(function () {
        var contractid = $("#ContrtID").text().trim();
        $(".semple-contract-display1-modal").modal("hide");
        showLoader();
        GetData("Schemes", "RejectSempleContract", "LoadSempleRejectedContract", contractid);

    });
    $("#UpdatePassword").click(function () {
        var userinputpass = $('.oldpassword').val();
        var pass1 = $('#newpassword').val();
        var pass2 = $('#newpassword2').val();
        var userpassword = localStorage.UserPass;
        if (userinputpass === userpassword) {
            if (pass1 === pass2) {
                var data = [userid, pass1, "Password"];
                GetData("User", "UpdateUserDetails", "LoadUpdateUserDetails", data);
            } else {
                swal({
                    title: 'Password',
                    text: "Password Mismatch!",
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonText: 'Ok!',
                    confirmButtonClass: 'btn btn-danger',
                    buttonsStyling: false
                });
            }
        } else {
            swal({
                title: 'Password',
                text: "Invalid User Password Input!",
                type: 'error',
                showCancelButton: false,
                confirmButtonText: 'Ok!',
                confirmButtonClass: 'btn btn-danger',
                buttonsStyling: false
            });
        }

    });
    $("#UpdateLastName").click(function () {
        var userinputpass = $('.oldpassword').val();
        var newLastName = $('#newLastName').val();
        var userpassword = localStorage.UserPass;
        if (userinputpass === userpassword) {
            var data = [userid, newLastName, "LastName"];
            GetData("User", "UpdateUserDetails", "LoadUpdateUserDetails", data);
        } else {
            swal({
                title: 'Password',
                text: "Invalid User Password Input!",
                type: 'error',
                showCancelButton: false,
                confirmButtonText: 'Ok!',
                confirmButtonClass: 'btn btn-danger',
                buttonsStyling: false
            });
        }

    });
    $("#UpdateFirstName").click(function () {
        var userinputpass = $('.oldpassword2').val();
        var newFirstName = $('#newFirstName').val();
        var userpassword = localStorage.UserPass;
        if (userinputpass === userpassword) {
            var data = [userid, newFirstName, "FirstName"];
            GetData("User", "UpdateUserDetails", "LoadUpdateUserDetails", data);
        } else {
            swal({
                title: 'Password',
                text: "Invalid User Password Input!",
                type: 'error',
                showCancelButton: false,
                confirmButtonText: 'Ok!',
                confirmButtonClass: 'btn btn-danger',
                buttonsStyling: false
            });
        }
    });
    $("#SkipAddBank").click(function () {
        var valuserid = $("#ValID").val();
        var valemail = $("#ValEmail").val();
        username = $("#ValUserName").val();
        payWithPaystack(valuserid, 1500, valemail, 15000, "Validation Fees");
    });

    $("._newL").click(function () {
        $('._newlcdas').val("");
        $('._hideL').show();

        $('._newLok').click(function () {
            if ($('._newlcdas').val() === "" || $('._newlcdas').val() === "0") {
                $('._hideL').hide();
            } else {
                $('._hideL').hide();
                InsertMissingSection("lcdas");
            }
        });
    });
    $("._newT").click(function () {
        $('._newtowns').val("");
        $('._hideT').show();

        $('._newTok').click(function () {
            if ($('._newtowns').val() === "" || $('._newtowns').val() === "") {
                $('._hideT').hide();
            } else {
                $('._hideT').hide();
                InsertMissingSection("towns");
            }
        });
    });
    $('._newB').click(function () {
        $('._newbusstop').val("");
        $('._hideB').show();
        var cLcda = $("._lcda").val();

        $('._newBok').click(function () {
            if ($('._newbusstop').val() === "" || $('._newbusstop').val() === "") {
                $('._hideB').hide();
            } else {
                $('._hideB').hide();
                InsertMissingSection("busstop");
            }
        });
    });
    $('._newS').click(function () {
        $('._newstreet').val("");
        $('._hideS').show();

        $('._newSok').click(function () {
            if ($('._newstreet').val() === "" || $('._newstreet').val() === "") {
                $('._hideS').hide();
            } else {
                $('._hideS').hide();
                InsertMissingSection("street");

            }
        });
    });
    $("#states").change(function () {
        var stateid = $(this).val();
        if (stateid === "24" || stateid === "27") {
            $("#lcdas").show();
        }
        PopulateLGAs(stateid, ""); //populates the lga section
        PopulateLCDAsFromState(stateid, ""); //populates the lcda section
        PopulateTownsFromState(stateid, "");
    });
    $("#lgas").change(function () {
        var lgaid = $(this).val();
        PopulateLCDAsFromLGA(lgaid, ""); //populates the lcda section
        PopulateTownsFromLGA(lgaid, ""); //populates the town section
        PopulateBstopsFromLGA(lgaid, ""); //populates the busstop section
    });
    $("#lcdas").change(function () {
        var lcdaid = $(this).val();
        PopulateTownsFromLCDA(lcdaid, ""); //populates the town section
        PopulateBstopsFromLCDA(lcdaid, ""); //populates the bstop section

        SetLCDAValues("state"); //sets the vale of the state to that corresponding to users choice
        SetLCDAValues("lga");
    });
    $("#towns").change(function () {
        var townid = $(this).val();
        PopulateBstopsFromTown(townid, ""); //populates the bus stop section
        PopulateStreetsFromTown(townid, ""); //populates the street section

        SetTownValues("state"); //sets the value of the state based on the corresponding user choice
        SetTownValues("lga"); //sets the value of that LGA section based on the user choice
        SetTownValues("lcda"); //sets the vale of the LCDA section to that corresponding to the user choice
    });
    $("#busstops").change(function () {
        var bstopid = $(this).val();
        PopulateStreetsFromBstop(bstopid, ""); //populates the  street section

        SetBstopValues("lga"); //sets the value of the LGA section to that corresponding to the user choic
        SetBstopValues("lcda"); //sets the value of the LCDA section to that corresponding to the user choice
        SetBstopValues("town"); //sets the value of the Town to that corresponding to the user choice
    });
    $("#streets").change(function () {
        SetStreetValues("town"); //sets the value of the town section to that corresponding to the users choice
        SetStreetValues("bstop"); //sets the value of the bus stop section based on the user choice
    });

    $("#contactT").change(function () {
        var data = $(this).children("option:selected").val();
        GetData("Accounts", "GetSearchUserDetails", "LoadUserDetails", data);
    });

    $("input[data-type='currency']").on({
        keyup: function () {
            formatCurrency($(this));
        },
        blur: function () {
            formatCurrency($(this), "blur");
        }
    });

    $("form[name=RequestPermission]").submit(function (e) {
        var f = $(this);
        f.parsley().validate();
        if (f.parsley().isValid()) {
            var newPermName = $("#newPermName").val();
            var newPermDesc = $("#newPermDesc").val();
            swal({
                title: 'Request New Permission',
                type: 'warning',
                showCancelButton: true,
                text: 'Your request will undergo administrative approval and you will be notified once it has been approved.',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false
            }).then(function (dismiss) {
                if (dismiss.value) {
                    var data = [userid, newPermName, newPermDesc];
                    showLoader();
                    GetData("Permissions", "AddRequestedPermission", "LoadGeneralAlert", data);
                } else {
                    swal({
                        title: 'Safe',
                        text: "Your permission is safe!",
                        type: 'success',
                        showCancelButton: false,
                        confirmButtonText: 'Ok!',
                        confirmButtonClass: 'btn btn-success',
                        buttonsStyling: false
                    });
                }
            });
        } else {
            swal({
                title: "Permission Request Error",
                text: "Please check all fields",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-danger',
                confirmButtonText: 'Ok!'
            });
        }
        e.preventDefault();
    });
//    $('#SearchMessages').keypress(function(e){
//        if(e.which === 13){
//            var txt = $(this).val();
//            if (txt.length > 2) {
//                var data = [txt];
//                GetData("Messages", "GetSearchInboxDetails", "LoadMessages", data);
//            }
//        }
//    });
    $("#ChangeEmail").click(function () {
        var userinputpass = $('#oldpassword2').val();
        var newMail = $('#newMail').val();
        var userpassword = localStorage.UserPass;
        var subject = "Change Email";
        if (userinputpass === userpassword && newMail !== localStorage.email) {
            var data = [userid, subject, localStorage.email, newMail, "Email"];
            GetData("User", "RequestChangeDetails", "LoadRequestChange", data);
        } else {
            swal({
                title: 'Error',
                text: "Ooops Something went wrong!",
                type: 'error',
                showCancelButton: false,
                confirmButtonText: 'Ok!',
                confirmButtonClass: 'btn btn-danger',
                buttonsStyling: false
            });
        }
    });
    $("#ChangePhoneNumber").click(function () {
        var userinputpass = $('#oldpassword2').val();
        var userpassword = localStorage.UserPass;
        var newPhone = $('#newPhone').val();
        var subject = "Change Phone Number";
        if (userinputpass === userpassword && newPhone !== localStorage.phone && newPhone.length >= 11) {
            var data = [userid, subject, localStorage.phone, newPhone, "Phone"];
            GetData("User", "RequestChangeDetails", "LoadRequestChange", data);
        } else {
            swal({
                title: 'Error',
                text: "Ooops Something went wrong!",
                type: 'error',
                showCancelButton: false,
                confirmButtonText: 'Ok!',
                confirmButtonClass: 'btn btn-danger',
                buttonsStyling: false
            });
        }
    });
    $("#SearchMessages").keyup(function () {
        var txt = $(this).val();
        if (txt.length > 2) {
            var data = [txt];
            GetData("Messages", "GetSearchMessageDetails", "LoadMessages", data);
        }
    });
    $('#SearchMessages').keypress(function (e) {
        if (e.which === 13) {
            var txt = $(this).val();
            if (txt.length > 2) {
                var data = [txt];
                GetData("Messages", "GetSearchInboxDetails", "LoadMessages", data);
            }
        }
    });
}

function GreetingMessage() {
    var thehours = new Date().getHours();
    var themessage;
    var morning = ('Good Morning');
    var afternoon = ('Good Afternoon');
    var evening = ('Good Evening');

    if (thehours >= 0 && thehours < 12) {
        themessage = morning;

    } else if (thehours >= 12 && thehours < 17) {
        themessage = afternoon;

    } else if (thehours >= 17 && thehours < 24) {
        themessage = evening;
    }
    $('.greeting').append(themessage);

}

function CalculatePercentage(userAmt) {
    var addedPerc = (parseInt(userAmt) * parseFloat(0.02));
    var newAmt = parseInt(userAmt) + parseInt(addedPerc);
    if (parseInt(userAmt) >= parseInt(2500)) {
        newAmt = parseInt(userAmt) + parseInt(100);
    }
    return newAmt;
}

function ChangeTransactionPIN(NewValue, CurrentPassword) {
    swal({
        title: 'Confirmation',
        text: 'Enter Your Password',
        showCancelButton: true,
        inputClass: 'form-control',
        input: 'password',
        inputPlaceholder: 'Enter your password',
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel!',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
        inputAttributes: {
            'autocapitalize': 'off',
            'autocorrect': 'off'
        },
        inputValidator: function (value) {
            return !value && 'Please provide your password!'
        }
    }).then(function (newPassword) {
        if (newPassword.value) {
            if (newPassword.value === CurrentPassword) {
                var data = [userid, NewValue];
                GetData("User", "ChangeTransactionPIN", "LoadChangeTransactionPIN", data);
            } else {
                swal({
                    title: 'Oops...',
                    text: 'Wrong Password Input!',
                    type: 'error'
                });
                return false;
            }

        }
    });
}

function UpdateUserInfo(Action, NewValue, CurrentPassword) {
    swal({
        title: 'Confirmation!',
        text: 'Enter Your Password',
        type: 'input',
        showCancelButton: true,
        closeOnConfirm: false,
        animation: 'slide-from-top',
        showLoaderOnConfirm: true,
        confirmButtonColor: '#6490f2',
        inputPlaceholder: 'password'
    }, function (newPassword) {
        if (newPassword === false) {
            return false;
        }
        if (newPassword === '') {
            swal.showInputError('You need to enter your current password!');
            return false;
        }
        if (newPassword === CurrentPassword) {
            var data = [userid, NewValue, Action];
            GetData("User", "UpdateUserDetails", "LoadUpdateUserDetails", data);
        } else {
            swal.showInputError('Wrong Input!');
            return false;
        }
    });
}

function UpdateBizInfo(Action, NewValue, CurrentBiz) {
    swal({
        title: 'Confirmation!',
        text: 'Enter Your Business Name',
        type: 'input',
        showCancelButton: true,
        closeOnConfirm: false,
        animation: 'slide-from-top',
        showLoaderOnConfirm: true,
        confirmButtonColor: '#6490f2',
        inputPlaceholder: 'Business Name'
    }, function (newValue) {
        if (newValue === false) {
            return false;
        }
        if (newValue === '') {
            swal.showInputError('You need to enter your current password!');
            return false;
        }
        if (newValue === CurrentBiz) {
            var data = [userid, NewValue, Action];
            GetData("User", "UpdateUserDetails", "LoadUpdateUserDetails", data);
        } else {
            swal.showInputError('Wrong Input!');
            return false;
        }
    });
}

function contactPageFunctions() {
    data = [userid, type, "Contact"];
    GetData("Favorite", "GetUserFavorites", "LoadUserContacts", data);

}

function staffPageFunctions() {
    showLoader();
    data = [userid, type, "Staff"];
    GetData("Favorite", "GetUserFavorites", "LoadUserStaff", data);
    GetData("Permissions", "GetBusinessPemissions", "LoadBusinessPermissions", 2);


    $(".CreateBizStaffAndAssignPerms").click(function () {
        var objectTypeIDs = $.map($('input[name="objectTypePermCheck"]:checked'), function (c) {
            return c.value;
        });
        var contactid = $(this).closest(".permcontainer").find(".unameid").text();
        var contactname = $(this).closest(".permcontainer").find(".uname").text();
        var objTIDs = objectTypeIDs.toString();
        var objTids = objTIDs.replace(/,/g, ':');
        var data = [userid, contactid, type, "Staff", objTids];
        if (objTIDs === "") {
            swal({
                title: "Select Permission",
                text: "Please make a selection",
                type: 'error',
                showCancelButton: false,
                confirmButtonText: 'Ok!',
                confirmButtonClass: 'btn btn-danger',
                buttonsStyling: false
            });
        } else {
            $(".bd-example-modal-addstaff").modal("hide");
            swal({
                title: "My Staff",
                text: "Add " + contactname + " to your staff list",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes!',
                cancelButtonText: 'No!',
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false
            }).then(function (dismiss) {
                if (dismiss.value) {
                    showLoader();
                    GetData("User", "AddStaff", "LoadContactAction", data);
                } else {
                    swal({
                        title: 'Cancelled',
                        text: "No action taken!",
                        type: 'success',
                        showCancelButton: false,
                        confirmButtonText: 'Ok!',
                        confirmButtonClass: 'btn btn-success',
                        buttonsStyling: false
                    });
                }
            });
        }
    });

}

function historyPageFunctions() {
    GetData("Favorite", "GetUserHistory", "LoadUserHistory", userid);
}

function favoritePageFunctions() {
    var data = [userid, "Book"];
    GetData("Favorite", "GetUserFavorites", "LoadFavoriteBooks", data);
    GetData("Product", "GetAllProductCategories", "LoadAllProductCategories");
}

function permissionsPageFunctions() {
    showLoader();
    GetData("Permissions", "GetUserPemissions", "LoadUserPermissions", userid);
    GetData("Permissions", "GetUserRequestedPemissions", "LoadUserRequestedPemissions", userid);
}

function manageBizStaffPermPage() {
    $(".staffUserName").text(StaffUserName);
    $(".allperms").text(StaffUserName + "'s Business Assigned Permissions");
    var data = [StaffUserID, userid];
    GetData("Permissions", "GetUserGroupStaffPermissions", "LoadPermissions", data);
    $(".clearSpecialPerms").click(function () {
        var data = [StaffUserID, userid];
        swal({
            title: 'Clear Staff Permission(s)',
            text: "Clear all business staff permissions assigned to " + StaffUserName + ", do you wish to continue?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(function (dismiss) {
            if (dismiss.value) {
                showLoader();
                GetData("Permissions", "ClearBusinessStaffPermissions", "LoadGeneralAlert", data);
            } else {
                swal({
                    title: 'Safe',
                    text: "Your permissions are safe!",
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'Ok!',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
            }
        });
    });
    $("#getUGrpPerms").click(function () {
        $(".selectedPs").removeClass("hide");
        $(".allperms").addClass("hide");
        $("#BizPermissionList").removeClass("hide");
        $("#BizPermissionList").show();
        $("#StaffPermissionList").addClass("hide");
        $(".selectedWMObjectType").text(username + " - Business");
        showLoader();
        GetData("Permissions", "GetUserPemissions", "LoadPermissions2", userid);
    });

    $(".getuserperms").click(function () {
        $(".allperms").text(StaffUserName + "'s Business Assigned Permissions");
        $(".selectedPs").addClass("hide");
        $(".allperms").removeClass("hide");
        $("#BizPermissionList").addClass("hide");
        $("#BizPermissionList").show();
        $("#StaffPermissionList").removeClass("hide");
        showLoader();
        var data = [StaffUserID, userid];
        GetData("Permissions", "GetUserGroupStaffPermissions", "LoadPermissions", data);
    });

}

function productPageFunctions() {
    data = [userid];
    GetData("Product", "GetUserProducts", "LoadUserProducts", userid);
    GetData("Product", "GetUserListedProducts", "LoadUserListedProducts", userid);
    GetData("User", "GetInspectionFees", "LoadInspectionFees", userid);
    GetData("Product", "GetUserOrderedProducts", "LoadUserOrderedProducts", userid);
}

function productListingPageFunctions() {
    var userProdList = $("#UserPendingProductsList");
    var Total = 0;
    var subtotalPrice = userProdList.find(".subtotalPrice");
    var TotalLotValue = userProdList.find("#gTotal");
    var totalLotValue = 0;
    var price = userProdList.find(".productPrice").text();
    var Quantity = userProdList.find(".productQuantity").text();
    GetData("Category", "GetTopCategories", "LoadTopCategories");
    GetData("Product", "GetProductMeasurementUnits", "LoadProductUnits");
    GetData("Product", "GetUserPendingProducts", "LoadUserPendingProducts", userid);
    GetData("Product", "GetProductHscodes", "LoadProductHscodes");

    $("#single-btn").click(function () {
        listingDefault();
        $("#single-listing").removeClass("hide");
        $("#single-listing").show();

    });
    $("#batch-btn").click(function () {
        listingDefault();
        $("#batch-listing").removeClass("hide");
        $("#batch-listing").show();
    });
    $("#lot-btn").click(function () {
        listingDefault();
        $("#lot-listing").removeClass("hide");
        $("#lot-listing").show();
    });
    $(".back").click(function () {
        $(".first-content").show();
        $(".second-content").hide();
    });
    $("#warrantyCheck").click(function () {
        if ($(this).prop("checked") == true) {
            $("#prod-warranty-type").removeClass("hide");
            $("#prod-warranty-type").show();
        } else {
            $("#prod-warranty-type").hide();
        }

    });
    $("#lotReleaseSet").click(function (event) {
        totalLotValue = $("#lotTotal").text();
        var lotReleasepercent = $("#lotReleasePercent").val();
        var lotReleaseValue = parseInt(lotReleasepercent)/100 * parseInt(totalLotValue);
        $("#lotReleaseValue").text(PriceFormat(lotReleaseValue));
        event.preventDefault();
    });
    
    $("#prodSearch").click(function(){
        
    })
    
    $("#searchProduct").keyup(function () {
        var txt = $(this).text();
        if (txt.length > 2) {
//            alert(txt);
        }
    });
    $('#searchProduct').keypress(function (e) {
        if (e.which === 13) {
            var txt = $(this).text();
            if (txt.length > 2) {
//              alert(txt);  
            }
        }
    });
    function listingDefault() {
        $("#lot-listing").hide();
        $("#batch-listing").hide();
        $(".first-content").hide();
        $("#single-listing").hide();
        $(".second-content").show();
    }
}

function listProduct() { //call this function from custom.js
    var Name = $("#prodName").val();
    var category = $("#prodCategories").val();
    var Summary = $("#prodSummary").val();
    var Description = $("#prodDesc").val();
    var Details = "";
    var Material = $("#prodMat").val();
    var Weight = $("#prodWeight").val() + $("#weightUnit").text();
    Details = Details + Material + "," + Weight;
    var quantity = $("#prod-prop-quantity").val();
    var price = $("#prod-prop-price").val();
    var unit = $("#prod-prop-unit").val();
    var tags = $("#prodtags").val();
    var properties = "";
    var variants = "";
    $.each($(".properties-group"), function (ind, item) {
        var propTxt = $(this).find(".prop-name").text();
        var propVal = $(this).find(".prop-val").val();
        properties = properties + propTxt + "-" + propVal + ";";
    });
    var data = [userid, Name, category, Summary, Description, quantity, price, properties, tags, unit, variants, Details];
    GetData("Product", "ListMemberProduct", "UploadProductImage", data);
}

function listProductByLot() { //call this function from custom.js

}

function listBusiness() {//call this function from custom.js
    var bizindustry = $("#bizindustry").val();
    var biztype = $("#biztype").val();
    var bizname = $("#bizname").val();
    var bizdfound = $("#dateFound").val();
    var bizcacnumber = $("#bizCACNumber").val();
    var bizemail = $("#bizEmail").val();
    var bizphone = $("#bizPhone").val();
    var bizwebadd = $("#bizWebaddress").val();
    var bizdescription = $("#bizDesc").val();
    var data = [userid, bizindustry, biztype, bizname, bizdfound, bizcacnumber, bizemail, bizphone, bizwebadd, bizdescription];
    GetData("User", "BusinessRegistration", "UploadUserImage", data);
}

function profilePageFunctions() {
    data = [userid];
    GetData("User", "GetBanks", "LoadBanks");
    PopulateStates("");
    //GetData("User", "GetStates", "LoadStates");
    var data = [userid, "Profile Page", "Visited Profile Page", "Visited Profile Page"];
    GetData("Favorite", "LogActivities", "LoadLogActivities", data);
    $(".showPass").click(function () {
        $(".userPass").removeClass("hide");
        $(".showPass").addClass("hide");
        $(".hidePass").removeClass("hide");
    });
    $(".hidePass").click(function () {
        $(".userPass").addClass("hide");
        $(".showPass").removeClass("hide");
        $(".hidePass").addClass("hide");
    });

    $(".showPass2").click(function () {
        $(".UserTransactionPin").removeClass("hide");
        $(".showPass2").addClass("hide");
        $(".hidePass2").removeClass("hide");
    });
    $(".hidePass2").click(function () {
        $(".UserTransactionPin").addClass("hide");
        $(".showPass2").removeClass("hide");
        $(".hidePass2").addClass("hide");
    });
    GetData("Messages", "GetUserMessageCounts", "LoadMessageCounts", userid);
    GetData("Product", "GetUserProducts", "LoadUserProducts", userid);

    DropifyScript();
//    EditableFunctions();

    $('.timeline-toggle .btn').on('click', function (e) {
        var val = $(this).find('input').val();
        if (val === 'stacked') {
            $('.timeline').addClass('stacked');
        } else {
            $('.timeline').removeClass('stacked');
        }
    });
    $("form[name=AddAddressForm]").submit(function (e) {
        var f = $(this);
        f.parsley().validate();
        if (f.parsley().isValid()) {
            var checker = $("#checker").val();
            var name = $("#addressname").val();
            var states = $("#states").val();
            var lgas = $("#lgas").val();
            var lcdas = $("#lcdas").val();
            var towns = $("#towns").val();
            var busstop = $("#busstops").val();
            var street = $("#streets").val();
            var desc = $("#desc").val();

            if (checker === "add" || checker === "Add") {
                var data = [name, states, lgas, lcdas, towns, busstop, street, desc, userid];
                GetData("Product", "AddUserAddress", "LoadAddress", data);
            } else {
                var data = [name, states, lgas, lcdas, towns, busstop, street, desc, checker];
                ;
                GetData("Product", "EditUserAddress", "LoadAddressAfterEdit", data);
            }

        } else {
            swal({
                title: "Oop!!!",
                text: "Please check all inputs",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-danger',
                confirmButtonText: 'Ok!',
                buttonsStyling: false
            });
        }
        e.preventDefault();
    });
    GetData("Permissions", "GetUserRequestedChanges", "LoadUserRequestedChanges", userid);
}

function EditableFunctions() {
    $("#changeBkName").click(function () {
        var bankid = $("#ChangeBankName").val();
        var currentpass = $("#UserPassword").text();
        if (currentpass === "" || currentpass === null || currentpass === "null") {
            var currentbiz = $('.bizName').text();
            UpdateBizInfo("BankName", bankid, currentbiz);
        } else {
            var currentpass = $('#UserPassword').text();
            UpdateUserInfo("BankName", bankid, currentpass);
        }
    });
    $("#userdoB").editable({
        type: 'combodate',
        format: 'yyyy-mm-dd',
        datepicker: {
            format: 'yyyy-mm-dd'
        },
        validate: function (value) {
            if ($.trim(value) === '') {
                return 'This field is required';
            } else {
                var currentpass = $('#UserPassword').text();
                var newValue = new Date(value);
                var month = ("0" + (newValue.getMonth() + 1).toString()).slice(-2); // The getMonth() method returns the month (from 0 to 11) for the specified date
                var day = ("0" + newValue.getDate().toString()).slice(-2);
                var year = newValue.getFullYear().toString();
                var date = year + "-" + month + "-" + day;
                UpdateUserInfo("DateOfBirth", date, currentpass);
            }
        }
    });
    $("#userfname").editable({
        type: 'text',
        validate: function (value) {
            if ($.trim(value) === '') {
                return 'This field is required';
            } else {
                UpdateUserInfo("FirstName", value);
            }
        }
    });
    $(".userPass").editable({
        type: 'text',
        validate: function (value) {
            if ($.trim(value) === '') {
                return 'This field is required';
            } else {
                var currentpass = $('#UserPassword').text();
                UpdateUserInfo("Password", value, currentpass);
            }
        }
    });
    $("#userPhone").editable({
        type: 'text',
        validate: function (value) {
            if ($.trim(value) === '') {
                return 'This field is required';
            } else {
                var currentpass = $('#UserPassword').text();
                UpdateUserInfo("Phone", value, currentpass);
            }
        }
    });

    $("#userEmail").editable({
        type: 'email',
        validate: function (value) {
            if ($.trim(value) === '') {
                return 'This field is required';
            } else {
                var currentpass = $('#UserPassword').text();
                UpdateUserInfo("Email", value, currentpass);
            }
        }
    });
    $("#userlname").editable({
        type: 'text',
        validate: function (value) {
            if ($.trim(value) === '') {
                return 'This field is required';
            } else {
                var currentpass = $('#UserPassword').text();
                UpdateUserInfo("LastName", value, currentpass);
            }
        }
    });
    $("#userAcctBVN").editable({
        type: 'text',
        validate: function (value) {
            if ($.trim(value) === '') {
                return 'This field is required';
            } else if ($.trim(value).length > 11 || $.trim(value).length < 11) {
                return 'Wrong Input!';
            } else {
                var currentpass = $('#UserPassword').text();
                if (currentpass === "" || currentpass === null || currentpass === "null") {
                    var currentbiz = $('.bizName').text();
                    UpdateBizInfo("BVNNumber", value, currentbiz);
                } else {
                    var currentpass = $('#UserPassword').text();
                    UpdateUserInfo("BVNNumber", value, currentpass);
                }
            }
        }
    });

    $("#userAcctNo").editable({
        type: 'text',
        validate: function (value) {
            if ($.trim(value) === '') {
                return 'This field is required';
            } else if ($.trim(value).length > 10 || $.trim(value).length < 10) {
                return 'Wrong Input!';
            } else {
                var currentpass = $('#UserPassword').text();
                if (currentpass === "" || currentpass === null || currentpass === "null") {
                    var currentbiz = $('.bizName').text();
                    UpdateBizInfo("AccountNumber", value, currentbiz);
                } else {
                    var currentpass = $('#UserPassword').text();
                    UpdateUserInfo("AccountNumber", value, currentpass);
                }
            }
        }
    });
    $("#usersex").editable({
        prepend: "Select gender",
        source: [
            {value: 'Male', text: 'Male'},
            {value: 'Female', text: 'Female'}
        ],
        validate: function (value) {
            if ($.trim(value) === '') {
                return 'This field is required';
            } else {
                var currentpass = $('#UserPassword').text();
                UpdateUserInfo("Gender", value, currentpass);
            }
        }
    });
    $("#userAcctType").editable({
        prepend: "Select Account Type",
        source: [
            {value: 'Savings', text: 'Savings'},
            {value: 'Current', text: 'Current'}
        ],
        validate: function (value) {
            if ($.trim(value) === '') {
                return 'This field is required';
            } else {
                var currentpass = $('#UserPassword').text();
                if (currentpass === "" || currentpass === null || currentpass === "null") {
                    var currentbiz = $('.bizName').text();
                    UpdateBizInfo("AccountType", value, currentbiz);
                } else {
                    var currentpass = $('#UserPassword').text();
                    UpdateUserInfo("AccountType", value, currentpass);
                }
            }
        }
    });
    $("#bizEmail").editable({
        type: 'email',
        validate: function (value) {
            if ($.trim(value) === '') {
                return 'This field is required';
            } else {
                var currentbiz = $('.bizName').text();
                UpdateBizInfo("Email", value, currentbiz);
            }
        }
    });
    $("#bizPhone").editable({
        type: 'tel',
        validate: function (value) {
            if ($.trim(value) === '') {
                return 'This field is required';
            } else if ($.trim(value).length > 11 || $.trim(value).length < 11) {
                return 'Wrong Input!';
            } else {
                var currentbiz = $('.bizName').text();
                UpdateBizInfo("Phone", value, currentbiz);
            }
        }
    });
    $("#bizCACNumber").editable({
        type: 'text',
        validate: function (value) {
            if ($.trim(value) === '') {
                return 'This field is required';
            } else {
                var currentbiz = $('.bizName').text();
                UpdateBizInfo("CACNumber", value, currentbiz);
            }
        }
    });
    $("#bizWebAddress").editable({
        type: 'url',
        placement: "top",
        validate: function (value) {
            if ($.trim(value) === '') {
                var currentbiz = $('.bizName').text();
                UpdateBizInfo("WebsiteAddress", value, currentbiz);
            } else {
                var currentbiz = $('.bizName').text();
                UpdateBizInfo("WebsiteAddress", value, currentbiz);
            }
        }
    });
    $("#bizDesc").editable({
        type: 'textarea',
        showbuttons: 'bottom',
        validate: function (value) {
            if ($.trim(value) === '') {
                return 'This field is required';
            } else if ($.trim(value).length > 185) {
                return 'Maximum characters 180';
            } else {
                var currentbiz = $('.bizName').text();
                UpdateBizInfo("Description", value, currentbiz);
            }
        }
    });
    $("#bizDateFound").editable({
        type: 'combodate',
        format: 'yyyy-mm-dd',
        datepicker: {
            format: 'yyyy-mm-dd'
        },
        validate: function (value) {
            if ($.trim(value) === '') {
                return 'This field is required';
            } else {
                var currentbiz = $('.bizName').text();
                var newValue = new Date(value);
                var month = ("0" + (newValue.getMonth() + 1).toString()).slice(-2); // The getMonth() method returns the month (from 0 to 11) for the specified date
                var day = ("0" + newValue.getDate().toString()).slice(-2);
                var year = newValue.getFullYear().toString();
                var date = year + "-" + month + "-" + day;
                UpdateBizInfo("DateFound", date, currentbiz);
            }
        }
    });
}

function dashboardFunctions() {
    GetData("User", "GetMemberDetails", "LoadMemberDetails", userid);
    var daterange = "null";
    var data = [userid, 1, daterange];
    GetData("Accounts", "GetUserAccountBalances", "LoadAccountBalances", data);
    data = [userid, type, "Contact"];
    GetData("Favorite", "GetUserFavorites", "LoadUserDashboardContacts", data);
    data = [userid];
    GetData("Favorite", "GetUserDashboardActivities", "LoadUserDashboardActivities", data);
    var data = [userid, "inbox"];
    GetData("Messages", "GetUserMessages", "LoadUserDashboardMessages", data);
    data = [userid, type, "Business"];
    GetData("Favorite", "GetUserFavorites", "LoadUserDashboardBusiness", data);
    var data = [userid, "Dashboard Page", "Visited Dashboard Page", "Visited Dashboard Page"];
    GetData("Favorite", "LogActivities", "LoadLogActivities", data);
}

function MessagesFunctions(option) {
    GetData("Messages", "GetUserMessageCounts", "LoadMessageCounts", userid);
    data = [userid, type, "Contact"];
    GetData("Favorite", "GetUserFavorites", "LoadUserContacts", data);
    data = [userid, type, "Staff"];
    GetData("Favorite", "GetUserFavorites", "LoadUserStaff", data);
    var data = [userid, "Messages Page", "Visited Messages Page", "Visited Messages Page"];
    GetData("Favorite", "LogActivities", "LoadLogActivities", data);
    if (option === "inbox") {
        var data = [userid, "inbox"];
        GetData("Messages", "GetUserMessages", "LoadMessages", data);
    } else if (option === "sent") {
        var data = [userid, "sent"];
        GetData("Messages", "GetUserMessages", "LoadMessages", data);
    } else if (option === "trash") {
        var data = [userid, "trash"];
        GetData("Messages", "GetUserMessages", "LoadMessages", data);

    }
    GetData("Messages", "GetUserUnreadMessages", "LoadUnreadMessages", userid);

}

function AccountsFunctions(acctdefid) {
    showLoader();
    GetData("Accounts", "GetUserAccountDefinitions", "LoadAccountDefinitions");
    var daterange = "null";
    var data = [userid, acctdefid, daterange];
    GetData("Accounts", "GetUserAccountBalances", "LoadAccountBalances", data);
    GetData("Accounts", "GetUserTransactions", "LoadTransactions", data);

    // Button class options
    $('.daterange-buttons').daterangepicker({
        applyClass: 'btn-success',
        cancelClass: 'btn-danger',
        showDropdowns: true,
        locale: {
            format: 'YYYY-MM-DD',
            direction: 'rtl'
        }
    });
    $('.daterange-buttons2').daterangepicker({
        applyClass: 'btn-success',
        cancelClass: 'btn-danger',
        showDropdowns: true,
        locale: {
            format: 'YYYY-MM-DD',
            direction: 'rtl'
        }
    });
    var data = [userid, "Accounts Page", "Visited Accounts Page", "Visited Accounts Page"];
    GetData("Favorite", "LogActivities", "LoadLogActivities", data);
}

function BusinessFunctions() {
    data = [userid, type, "Business"];
    GetData("Favorite", "GetUserFavorites", "LoadBusinesses", data);
    GetData("User", "GetBusinessIndustries", "LoadBusinessIndustries");
    var data = [userid, "Business Page", "Visited Business Page", "Visited Business Page"];
    GetData("Favorite", "LogActivities", "LoadLogActivities", data);

    DropifyScript();
    $('.dateFound').daterangepicker({
        singleDatePicker: true,
        locale: {
            format: 'YYYY-MM-DD'
        }
    });


}

function WMarketFunctions(data) {
    GetData("Warrants", "GetLiveListings", "LoadListings", data);
    var daterange = "null";
    var data = [userid, 2, daterange];
    GetData("Accounts", "GetUserAccountBalances", "LoadAccountBalances", data);
    var data = [userid, "Warrants Page", "Visited Warrants Page", "Visited Warrants Page"];
    GetData("Favorite", "LogActivities", "LoadLogActivities", data);
}

function ContractFunctions() {
    var data = "All";
    CallSempleContract(data);
    $("#AllSemple").click(function () {
        var data = "All";
        CallSempleContract(data);
    });
    $("#PendingSemple").click(function () {
        var data = "Pending";
        CallSempleContract(data);
    });
    $("#SignedSemple").click(function () {
        var data = "Signed";
        CallSempleContract(data);
    });
    $("#On-GoingSemple").click(function () {
        var data = "On-Going";
        CallSempleContract(data);
    });
    $("#CompletedSemple").click(function () {
        var data = "Completed";
        CallSempleContract(data);
    });
    $("#RejectedSemple").click(function () {
        var data = "Rejected";
        CallSempleContract(data);
    });
}

function CallSempleContract(data) {
    sessionStorage.setItem("sempleStatus", data);
    var newdata = [userid, data];
    showLoader();
    GetData("Schemes", "GetSempleContracts", "LoadSempleContracts", newdata);
}

function MonetisationFunctions(){
    GetData("Schemes", "GetMyMonApplications", "LoadMyMonApplications", userid);
}

function LoginFunctions() {
    $("form").parsley();
    if (localStorage.chkbx && localStorage.chkbx !== '') {
        $("#remember_me").attr('checked', 'checked');
        $("#email").val(localStorage.Email);
        $("#pass").val(localStorage.Pass);
    } else {
        $("#remember_me").removeAttr('checked');
        $("#email").val('');
        $("#pass").val('');
    }
}

function payWithPaystack(userID, paymentamount, email, actualamount, PaymentType) {
    var userDetail;
    if (username) {
        userDetail = username;
    } else {
        userDetail = email;
    }
    var handler = PaystackPop.setup({
        key: 'pk_test_b3685f824518679567d6356e2636fc184878e833',
        email: email,
        amount: paymentamount + "00",
        ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        metadata: {
            custom_fields: [
                {
                    display_name: "Customer Name",
                    variable_name: "Customer Name",
                    value: userDetail
                },
                {
                    display_name: "Payment Type",
                    variable_name: "Payment Type",
                    value: PaymentType
                }
            ]
        },
        callback: function (response) {
            var data = [userID, actualamount, response.reference, response.trans, PaymentType];
            GetData("Accounts", "ValidatePaystackTransaction", "LoadPaymentResponse", data);
        },
        onClose: function () {
            swal({
                title: "PayStack CheckOut!",
                text: "CheckOut closed, transaction terminated",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-danger',
                conffirmButtonText: 'Retry',
                onClose: function () {
                    window.location.reload();
                }
            });
        }
    });
    handler.openIframe();
}

function DisplayUserLogin(data) {
    if (data === "Account has not been activated") {
        swal({
            title: "Oops!",
            text: "Your account has not been activated and validated",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Activate Account',
            onClose: function () {
                window.location = extension + "ControllerServlet?action=Link&type=Validate";
            }
        });
    } else if (data === "Incorrect Login Details") {
        swal({
            title: "Oops!",
            text: "Incorrect Login Details, Please try again!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Retry',
            onClose: function () {
                window.location = extension + "ControllerServlet?action=Link&type=Login";
            }
        });
    } else if (data === "Email or Phone Number Entered Doesn't Exist") {
        swal({
            title: "Oops!",
            text: "Email or Phone Number Entered Doesn't Exist!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Retry',
            onClose: function () {
                window.location = extension + "ControllerServlet?action=Link&type=Login";
            }
        });
    } else if (data === "Blocked") {
        swal({
            title: "Oops!",
            text: "Your account has been Blocked, please contact WM-Admin!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Ok',
            onClose: function () {
                window.location = extension + "ControllerServlet?action=Link&type=Login";
            }
        });
    } else {
        swal({
            title: "Welcome to The WealthMarket",
            text: "Successful login",
            type: "success",
            showCancelButton: false,
            confirmButtonText: '<i class="icon-thumbs-up2 mr-2"></i> Continue ',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false,
            onClose: function () {
                verifyUser();
                window.location = extension + "ControllerServlet?action=Link&type=Dashboard";
            }
        });

    }
}

function DisplaySwitchTo(data) {
    if (data === "success") {
        swal({
            title: "Switched",
            text: "Switched Successfully",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Continue',
            onClose: function () {
                verifyUser();
                window.location = extension + "ControllerServlet?action=Link&type=Dashboard";
            }
        });
    }
}

function DisplayBankDetails(data) {
    if (data === "success") {
        swal({
            title: "Bank Details",
            text: "Bank details added successfully",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'OK!',
            onClose: function () {
                GetData("User", "GetMemberDetails", "LoadMemberDetails", userid);
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Sorry, something went wrong! oohh",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Retry',
            onClose: function () {
                GetData("User", "GetMemberDetails", "LoadMemberDetails", userid);
            }

        });
    }
}

function DisplayBankDetails2(data) {
    var valuserid = $("#ValID").val();
    var valemail = $("#ValEmail").val();
    if (data === "success") {
        swal({
            title: "Bank Details",
            text: "Bank details added successfully.",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'OK!',
            onClose: function () {
                payWithPaystack(valuserid, 1500, valemail, 15000, "Validation Fees");
            }
        });
    } else if (data === "added") {
        swal({
            title: "Oops!",
            text: "Sorry, Bank details has been added.",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Ok!',
            onClose: function () {
                payWithPaystack(valuserid, 1500, valemail, 15000, "Validation Fees");
            }

        });
    } else {
        swal({
            title: "Oops!",
            text: "Sorry, something went wrong",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location = extension + "ControllerServlet?action=Link&type=Login";
            }

        });
    }
}

function DisplayValidateAccount(data) {
    if (data[1] === "success") {
        swal({
            title: "Account Activated",
            text: "Your Account has been activated",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                var email = data[2];
                var password = data[3];
                var data = [email, password];
                GetData("User", "Login", "LoadUserLogin", userdetails);
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Sorry, something went wrong! Please contact the admin (IF) the payment was successful to activate your account",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Retry',
            onClose: function () {
                window.location = extension + "LinksServlet?type=Login";
            }
        });
    }
}

function DisplayMemberDetails(data) {
    if (data !== "none") {
        var utype = data["usertype"];
        if (utype === "Business") {
            $(".bizinfo").removeClass("hide");
            $(".bizinfo").show();
            $(".SwitchBack").removeClass("hide");
            $(".SwitchBack").show();
            $(".memberinfo").addClass("hide");
            $(".memberinfo").hide("");
            $(".bizBusinessLink").addClass("hide");
            $(".bizBusinessLink").hide("");
            $(".bizContractLink").removeClass("hide");
            $(".bizContractLink").show();
            $(".bizstaffLink").removeClass("hide");
            $(".bizstaffLink").show();
        } else {
            $(".bizinfo").addClass("hide");
            $(".bizinfo").hide();
            $(".memberinfo").removeClass("hide");
            $(".memberinfo").show("");
            $(".bizContractLink").addClass("hide");
            $(".bizContractLink").hide();
            $(".bizstaffLink").addClass("hide");
            $(".bizstaffLink").hide();
        }
        var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + data["userID"] + ".png";
        if (imageExists(image_url) === false) {
            image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
        }
        $(".UserImage").attr("src", image_url);
        $(".bgUserImage").css("background-image", "url('" + extension + "global_assets/app/img/ProfilePicture/user-" + data["userID"] + ".png')");
        $(".bgUserImage").css("background-repeat", "no-repeat");
        $(".bgUserImage").css("background-position", "center center");
        $(".UserFirstName").text(data["first_name"]);
        $(".UserLastName").text(data["last_name"]);
        $(".UserEmailAddress").text(data["email"]);
        $(".UserPhone").text(data["phone_number"]);
        $("#UserPassword").text(data["password"]);
        $(".UserTransactionPin").text(data["transactionpin"]);
        $(".UserStatus").text(data["status"]);
        $(".UserofflineID").text(data["offlineID"]);
        localStorage.UserPass = data["password"];
        localStorage.phone = data["phone_number"];
        localStorage.email = data["email"];
        $(".UserType").text(data["usertype"]);
        $(".UserGender").text(data["sex"]);
        $(".UserDateJoined").text(data["date_joined"]);
        $(".UserDOB").text(data["dob"]);
        $(".UserName").text(data["user_name"]);
        loginuseremail = data["email"];
        username = data["user_name"];
        $(".bizName").text(data["Name"]);
        $(".bizIndustry").text(data["BusinessIndustry"]);
        $(".bizType").text(data["BusinessType"]);
        $(".bizEmail").text(data["email"]);
        $(".bizPhone").text(data["phone_number"]);
        $(".bizDateFound").text(data["DateFounded"]);
        $(".bizCACNumber").text(data["CACNumber"]);
        $(".BizDesc").text(data["Description"]);
        $(".BizWebAddress").text(data["Website"]);
        $(".BankName").text(data["BankName"]);
        $(".AccountType").text(data["accountType"]);
        $(".AccountBVN").text(data["bvnNumber"]);
        $(".AccountNumber").text(data["accountNumber"]);
        var acctNumber = data["accountNumber"];
        if (acctNumber === undefined || acctNumber === "undefined") {
            $("#addbkinfo").removeClass("hide");
            $("#addbkinfo").show();
            $(".bankInfo").addClass("hide");
            $(".bankInfo").hide();
        } else {
            $("#addbkinfo").addClass("hide");
            $("#addbkinfo").hide();
            $(".bankInfo").removeClass("hide");
            $(".bankInfo").show();
        }
        var parent = $(".user-addresses");
        var childclone = parent.find(".clone");
        var addresses = data["addresses"];
        var count = 0;
        $.each(addresses, function (ind, item) {
            var newchild = childclone.clone();
            newchild.removeClass("clone");
            count++;
            newchild.find(".address-sn").text(count);
            newchild.find(".address-name").text(item["addressname"]);
            newchild.find(".UserAddress").text(item["addressString"]);
            var btnDelete = newchild.find(".btnDeleteAdd");
            btnDelete.click(function () {
                data = item["id"];
                swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'No, cancel!',
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    buttonsStyling: false
                }).then(function (dismiss) {
                    if (dismiss.value) {
                        GetData("User", "DeleteUserAddress", "LoadAddress", data);
                    } else {
                        swal({
                            title: 'Safe',
                            text: "Your address is safe!",
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonText: 'Ok!',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        });
                    }
                });
            });
            var btnEdit = newchild.find(".btnEditAdd");
            btnEdit.click(function () {
                var addID = item["id"];
                PopulateStates(item["state"]);
                PopulateLGAs(item["state"], item["lga"]); //populates the lga section
                PopulateLCDAsFromState(item["state"], item["lcda"]); //populates the lcda section
                PopulateTownsFromState(item["state"], item["town"]);
                PopulateBstopsFromTown(item["town"], item["busstop"]); //populates the bus stop section
                PopulateStreetsFromTown(item["town"], item["street"]);
                $(".bd-example-modaladdress").on("show.bs.modal", function () {

                    $("#addressname").val(item["addressname"]);
                    $("#checker").val(addID);
                    $("addbtn").html('Edit').button("refresh");
                });
            });

            newchild.appendTo(parent);
        });
        $(".useraddressCount").text(count);
        childclone.hide();
    }
}

function DisplayUpdateUserDetails(data) {
    if (data[0] === "success") {
        swal({
            title: "Detail Updated",
            text: "Your " + data[1] + " has been updated",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
                GetData("User", "GetMemberDetails", "LoadMemberDetails", userid);
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "something went wrong",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Retry',
            onClose: function () {
                window.location.reload();
                GetData("User", "GetMemberDetails", "LoadMemberDetails", userid);
            }
        });
    }
}

function DisplayRequestChange(data) {
    if (data === "success") {
        swal({
            title: "Request Success",
            text: "Your Request has been made",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
//                GetData("User", "GetMemberDetails", "LoadMemberDetails", userid);
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "something went wrong",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Retry',
            onClose: function () {
                window.location.reload();
//                GetData("User", "GetMemberDetails", "LoadMemberDetails", userid);
            }
        });
    }
}

function DisplayBanks(data) {
    var cs = $("#BankName");
    cs.empty();
    if (data === "empty") {
    } else {
        cs.append($('<option/>').val(0).text("Select your Bank Name"));
        $.each(data, function (key, value) {
            cs.append($('<option/>').val(key).text(value));
        });
    }
    var bs = $("#ChangeBankName");
    bs.empty();
    if (data === "empty") {
    } else {
        $.each(data, function (key, value) {
            bs.append($('<option/>').val(key).text(value));
        });
    }
    var bs = $("#ValBankName");
    bs.empty();
    if (data === "empty") {
    } else {
        $.each(data, function (key, value) {
            bs.append($('<option/>').val(key).text(value));
        });
    }
}

function DisplayBusinessIndustries(data) {
    var cs = $("#bizindustry");
    cs.empty();
    if (data === "empty") {
    } else {
        cs.append($('<option/>').val(0).text("Select Business Industry"));
        $.each(data, function (key, value) {
            cs.append($('<option/>').val(key).text(value));
        });
    }
}

function DisplayBusinessTypes(data) {
    var cs = $("#biztype");
    cs.empty();
    if (data === "empty") {
    } else {
        $.each(data, function (key, value) {
            cs.append($('<option/>').val(key).text(value));
        });
    }
}

function DisplayUserDetails(data) {
    var parent = $(".verifyUser-list");
    parent.find(".newclone").remove();
    if (data["BeneficiaryName"] === "none") {
        //parent.text("No Members match your search");
        var childclone = parent.find(".verifyclone");
        var newchild = childclone.clone();
        newchild.removeClass("verifyclone");
        newchild.addClass("newclone");
        var image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";

        newchild.find(".user-list-Image").attr("src", image_url);
        newchild.find(".user-list-name").text("No Members match your search");
        newchild.find(".user-list-phone").text("No Members match your search");
        newchild.find(".user-list-email").text("Select a valid Member");
        newchild.find(".user-list-id").text("No Members match your search");
        newchild.appendTo(parent).show();
        childclone.hide();
    } else {
        var childclone = parent.find(".verifyclone");
        var newchild = childclone.clone();
        newchild.removeClass("verifyclone");
        newchild.addClass("newclone");
        var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + data["Beneficiaryid"] + ".png";
        if (imageExists(image_url) === false) {
            image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
        }
        newchild.find(".user-list-Image").attr("src", image_url);
        newchild.find(".user-list-name").text(data["BeneficiaryName"]);
        newchild.find(".user-list-phone").text(data["BeneficiaryPhone"]);
        newchild.find(".user-list-email").text(data["BeneficiaryEmail"]);
        newchild.find(".user-list-id").text(data["Beneficiaryid"]);
        newchild.appendTo(parent).show();
        childclone.hide();
    }
}

function DisplaySearchResultUserDetails(data) {
    var parent = $(".verifymsg-list");
    parent.find(".newclone").remove();
    if (data["BeneficiaryName"] === "none") {
        $("#msguserEmail").val("No Members match your search");
        parent.text("No Members match your search");
    } else {
        var childclone = parent.find(".verifyclone");
        var newchild = childclone.clone();
        newchild.removeClass("clone");
        newchild.addClass("newclone");
        var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + data["Beneficiaryid"] + ".png";
        if (imageExists(image_url) === false) {
            image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
        }
        newchild.find(".msg-list-Image").attr("src", image_url);
        newchild.find(".msg-list-name").text(data["BeneficiaryName"]);
        newchild.find(".msg-list-phone").text(data["BeneficiaryPhone"]);
        newchild.find(".msg-list-email").text(data["BeneficiaryEmail"]);
        newchild.find(".msg-list-id").text(data["Beneficiaryid"]);
        $("#msguserEmail").val(data["BeneficiaryName"] + "  -  " + data["BeneficiaryEmail"] + "  -  " + data["BeneficiaryPhone"]);
        $("#msguserID").text(data["Beneficiaryid"]);
        newchild.appendTo(parent).show();
        childclone.hide();
    }
}

function DisplayQuickTransfer(data) {
    hideLoader();
    var acctdefid = data[1];
    var contactid = data[2];
    var daterange = "null";
    if (data[0] === "success") {
        swal({
            title: "Transfer Successful",
            text: "Transfer Completed, Add Beneficiary to contact list?!",
            type: "success",
            showCancelButton: true,
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No!',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(function (dismiss) {
            if (dismiss.value) {
                var data = [userid, contactid, type, "Contact"];
                $(".bd-example-modaltransfer").modal("hide");
                GetData("User", "addUser", "LoadContactAction", data);
                var data1 = [userid, acctdefid, daterange];
                GetData("Accounts", "GetUserAccountBalances", "LoadAccountBalances", data1);
                GetData("Accounts", "GetUserTransactions", "LoadTransactions", data1);
            } else {
                swal({
                    title: 'Cancelled',
                    text: "No action taken!",
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'Ok!',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false,
                    onClose: function () {
                        var data = [userid, acctdefid, daterange];
                        GetData("Accounts", "GetUserAccountBalances", "LoadAccountBalances", data);
                        GetData("Accounts", "GetUserTransactions", "LoadTransactions", data);
                    }
                });
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: data[0],
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Ok',
            onClose: function () {
                var data = [userid, acctdefid, daterange];
                GetData("Accounts", "GetUserAccountBalances", "LoadAccountBalances", data);
                GetData("Accounts", "GetUserTransactions", "LoadTransactions", data);
            }
        });
    }

}

function DisplayAddress(data) {
    if (data === "successful") {
        swal({
            title: "Address Deleted",
            text: "Your address has been deleted successfully",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Ok!',
            grow: 'row',
            onClose: function () {
                window.location.reload();
                GetData("User", "GetMemberDetails", "LoadMemberDetails", userid);
            }
        });
    } else {
        swal({
            title: "Address Added",
            text: "Your address has been added successfully",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
                GetData("User", "GetMemberDetails", "LoadMemberDetails", userid);

            }
        });
    }
}

function DisplayRemoveFromPool(data) {
    if (data === "successful") {
        swal({
            title: 'Deleted!',
            text: 'Your product has been deleted from your product list!',
            type: 'success',
            showCloseButton: true,
            confirmButtonClass: 'btn btn-primary',
            confirmButtonText: 'Ok',
            onClose: function () {
                window.location.reload();
                GetData("User", "GetMemberDetails", "LoadMemberDetails", userid);
            }
        });
    } else {
        swal({
            title: 'Oops!',
            text: 'Something went wrong!',
            type: 'error',
            showCloseButton: true,
            confirmButtonClass: 'btn btn-primary',
            confirmButtonText: 'Ok',
            onClose: function () {
                window.location.reload();
                GetData("User", "GetMemberDetails", "LoadMemberDetails", userid);
            }
        });
    }
}

function DisplayPaymentResponse(data) {
    if (data[0] === "Buy Warrants With Cash" || data[0] === "Inspection Fees") {
        swal({
            title: "Payment Advice",
            text: data[2],
            type: data[1],
            showCancelButton: false,
            confirmButtonClass: 'btn btn-' + data[1],
            confirmButtonText: 'Continue',
            onClose: function () {
                $(".modal_basic_buyWarrants").modal("hide");
                window.location.reload();
            }
        });
    } else if (data[0] === "Validation Fees") {
        DisplayValidateAccount(data);
    } else if (data[0] === "Monetisation Application Fee") {
        DisplayMonPayAppFee(data);
    }
}

function InitPaymentUrl(data) {
    hideLoader();
    var datares = data[2];
    var url = datares["authorization_url"];
    window.open(url, "_blank");
}

function DisplayAccountDefinitions(data) {
    if (data !== "none") {
        var parent = $("#AccountDefinitions");
        $.each(data, function (index, value) {
            var alink = $("<a />", {href: "#"}).appendTo(parent);
            $("<i />", {class: "material-icons", text: "person_pin"}).appendTo(alink);
            $("<span />", {class: "", text: value["name"], click: function () {
                    var daterange = "null";
                    var defid = value["id"];
                    var data = [userid, defid, daterange];
                    showLoader();
                    GetData("Accounts", "GetUserAccountBalances", "LoadAccountBalances", data);
                    GetData("Accounts", "GetUserTransactions", "LoadTransactions", data);
                }}).appendTo(alink);
            $("<span />", {class: "", id: "Definitionid", text: value["id"]}).appendTo(alink).hide();
        });
        var cs = $("#accountDefName");
        cs.empty();
        if (data === "empty") {
        } else {
            cs.append($('<option/>').val(0).text("Select Account Type"));
            $.each(data, function (key, value) {
                cs.append($('<option/>').val(key).text(value["name"]));
            });
        }
        var cs = $("#accountDefName2");
        cs.empty();
        if (data === "empty") {
        } else {
            cs.append($('<option/>').val(0).text("Select Account Type"));
            $.each(data, function (key, value) {
                cs.append($('<option/>').val(key).text(value["name"]));
            });
        }
    } else {

    }


}

function DisplayAccountBalanaces(data) {
    hideLoader();
    if (data !== "none") {
        $(".AcctAccountName").text(data["AccountName"]);
        $(".AcctAccountType").text(data["AccountDefinitionName"]);
        $(".AcctAccountNumber").text(data["AccountNumber"]);
        $(".AcctLedgerBalance").text(PriceFormat(data["Ledger_Balance"]));
        $(".AcctDirectBalance").text(PriceFormat(data["Available_Balance"]));
        $(".AcctBlockedBalance").text(PriceFormat(data["Blocked_Balance"]));
        $(".AcctODLineBalance").text(PriceFormat(data["ODLine_Balance"]));
        if (data["AccountDefinitionName"] === "Warrants") {
            $("#offbal").removeClass("hide");
            $("#offbal").show();
            $(".AcctOfflineBalance").text(PriceFormat(data["Offline_Balance"]));
        } else {
            $("#offbal").addClass("hide");
            $("#offbal").hide();
        }
        $(".AcctEscrowBalance").text(PriceFormat(data["Escrow_Balance"]));
        $(".AcctRefDiscount").text(data["Reflation_Discount"]);
        $(".AcctRefInterest").text(data["Reflation_Interest"]);
    } else {

    }
}

function DisplayBusinessList(data) {
    hideLoader();
    var parent = $(".bizcontainer");
    parent.find(".newclone").remove();
    if (data === "none") {
        var childclone = parent.find(".bizclone");
        var newchild = childclone.clone();
        newchild.removeClass("bizclone");
        newchild.addClass("newclone");
        newchild.find(".businessName").text("No Businesses");
        newchild.appendTo(parent).show();
        childclone.hide();
    } else {
        $.each(data, function (id, details) {
            var childclone = parent.find(".bizclone");
            var newchild = childclone.clone();
            newchild.removeClass("bizclone");
            newchild.addClass("newclone");
            newchild.find(".businessName").text(details["Name"]);
            newchild.click(function () {
                data = [id, type, "Staff"];
                GetData("Favorite", "GetUserFavorites", "LoadUserStaff", data);
                GetData("Favorite", "GetUserHistory", "LoadBusinessHistory", id);
                DisplayBusinessDetails(details);
            });
            newchild.appendTo(parent).show();
            childclone.hide();
        });
    }
    var image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
    $(".bizImage").attr("src", image_url);
    $(".profile-cover-img").css("background-image", "url('" + image_url + "')");


}

function DisplayBusinessDetails(data) {
    var bizid = data["userId"];
    var bizname = data["Name"];
    var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + bizid + ".png";
    if (imageExists(image_url) === false) {
        image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
    }
    $(".bizImage").attr("src", image_url);
    $(".profile-cover-img").css("background-image", "url('" + image_url + "')");
    $(".bizname").text(data["Name"]);
    $(".bizindus").text(data["BusinessIndustry"]);
    $(".biztyp").text(data["BusinessType"]);
    $(".bizdescriptn").text(data["Description"]);
    $(".bizdatefd").text(data["DateFounded"]);
    $(".bizcacnumb").text(data["CACNumber"]);
    $(".bizweb").text(data["Website"]);
    $(".bizemail").text(data["email"]);
    $(".bizphone").text(data["phone_number"]);

    $("#SwitchToBizAcct").click(function () {
        var data = [userid, bizid];
        swal({
            title: "Switch to " + bizname,
            text: "Are you sure you want to switch?",
            type: 'info',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-primary',
            buttonsStyling: false
        }).then(function (dismiss) {
            if (dismiss.value) {
                GetData("User", "SwitchTo", "LoadSwitchTo", data);
            } else {
                swal({
                    title: 'Cancelled',
                    text: "Cancelled!",
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonText: 'Ok!',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
            }
        });

    });


}

function DisplayUserDashboardBusiness(data) {
    var parent = $("#dBusiness-list");
    parent.find(".newclone").remove();
    if (data === "none") {
        parent.text("No Business was Found!");
    } else {
        $.each(data, function (id, details) {
            var childclone = parent.find(".dbizclone");
            var newchild = childclone.clone();
            newchild.removeClass("dbizclone");
            newchild.addClass("newclone");
            var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + id + ".png";
            if (imageExists(image_url) === false) {
                image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
            }
            newchild.find(".DBizUserImage").attr("src", image_url);
            newchild.find(".dbizName").text(details["Name"]);
            newchild.find(".dbizDesc").text(details["Description"]);
            newchild.find(".dbizDatefound").text(details["DateFounded"]);
            newchild.appendTo(parent).show();
            childclone.hide();
        });
    }
}

function DisplayMessages(data) {
    var parent = $(".message-list");
    parent.find(".clone-child").remove();
//    parent.empty();
    if (data !== "none") {
        var ids = data[0];
        var msgdetails = data[1];
        var childclone = parent.find(".clone").removeClass("hide");
        $.each(ids, function (index, id) {
            var result = msgdetails[id];
            var newchild = childclone.clone();
            var isread = result["is_read"];
            newchild.removeClass("clone");
            newchild.addClass("clone-child");
            newchild.find(".chk").prop("id", "chk" + index);
            newchild.find(".toggle").prop("for", "chk" + index);
            if (data[2] === "inbox") {
                var uid = result["from_member_id"];
                var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + uid + ".png";
                if (imageExists(image_url) === false) {
                    image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
                }
                newchild.find(".messageImage").attr("src", image_url);
                newchild.find(".sender-name").text(result["SenderName"]);
            } else if (data[2] === "sent") {
                var uid = result["to_member_id"];
                var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + uid + ".png";
                if (imageExists(image_url) === false) {
                    image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
                }
                newchild.find(".messageImage").attr("src", image_url);
                newchild.find(".sender-name").text(result["RecieverName"]);
            } else if (data[2] === "trash") {
                var uid = result["from_member_id"];
                var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + uid + ".png";
                if (imageExists(image_url) === false) {
                    image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
                }
                newchild.find(".messageImage").attr("src", image_url);
                newchild.find(".sender-name").text(result["SenderName"]);
            }

            newchild.find(".subject-title").text(result["subject"]);
            newchild.find(".body").text(result["body"]);
            newchild.find(".message-time").text(result["msgtime"]);
            if (isread !== "0")
                newchild.removeClass("unread");
            newchild.click(function () {
                var msgid = result["id"];
                GetData("Messages", "MarkAsRead", "", msgid);
                $("#ReadMessage").removeClass("hide");
                $("#ReadMessage").show();

                $("#InboxMessage").addClass("hide");
                $("#InboxMessage").hide();
                $("#TrashMessage").addClass("hide");
                $("#TrashMessage").hide();
                $("#SentMessage").addClass("hide");
                $("#SentMessage").hide();
                DisplayMessageDetails(result, data[2]);
            });
            newchild.appendTo(parent).show();
        });
        childclone.hide();
    } else {
        $("<li />", {class: "wide center clone-child", text: "No Result", colspan: "6"}).appendTo(parent);
    }
}

function DisplayUnreadMessages(data) {
    var parent = $(".unreadmessagelist");
    parent.find(".newclone").remove();
    if (data !== "none") {
        var ids = data[0];
        var msgdetails = data[1];
        var childclone = parent.find(".unreadclone").removeClass("hide");
        $.each(ids, function (index, id) {
            var result = msgdetails[id];
            var newchild = childclone.clone();
            newchild.removeClass("unreadclone");
            newchild.addClass("newclone");
            var uid = result["from_member_id"];
            var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + uid + ".png";
            if (imageExists(image_url) === false) {
                image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
            }
            newchild.find(".unreadMsgImage").attr("src", image_url);
            newchild.find(".unreadMsgSubject").text(result["subject"]);
            newchild.find(".unreadMsgBody").text(result["body"]);
            newchild.find(".unreadMsgTime").text(result["msgtime"]);
            newchild.appendTo(parent).show();

        });
        $(".unreadcount").text(data[2]);
        childclone.hide();
    } else {
        $("<li />", {class: "wide center clone-child", text: "No Result", colspan: "6"}).appendTo(parent);
    }
}

function DisplayNewMessage(data) {
    if (data === "success" || data === "successful") {
        swal({
            title: "Message",
            text: "Message Sent!",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok',
            onClose: function () {
                window.location.reload();
            }
        }, function (isConfirm) {
            if (isConfirm) {
                var data = [userid, "sent"];
                GetData("Messages", "GetUserMessages", "LoadMessages", data);
            }
        });
    }

}

function DisplayMessageCounts(data) {
    $(".inboxcount").text(data[0]);
    $(".sentcount").text(data[1]);
    $(".trashcount").text(data[2]);
}

function DisplayMessageDetails(data, option) {
    if (option === "inbox") {
        $("#msgHeader").text("Inbox");
        var uid = data["from_member_id"];
        var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + uid + ".png";
        if (imageExists(image_url) === false) {
            image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
        }
        $(".senderName").text(data["SenderName"]);
        $(".SenderEmail").text(data["SenderEmail"]);
        $(".recievercnt").addClass("hide");
        $(".msg-Image").attr("src", image_url);
    } else if (option === "sent") {
        $("#msgHeader").text("Sent");
        var uid = data["to_member_id"];
        var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + uid + ".png";
        if (imageExists(image_url) === false) {
            image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
        }
        $(".recipientName").text(data["RecieverName"]);
        $(".RecieverEmail").text(data["RecieverEmail"]);
        $(".sendercnt").addClass("hide");
        $(".msg-Image").attr("src", image_url);
    } else if (option === "trash") {
        $("#msgHeader").text("Trash");
        var uid = data["from_member_id"];
        var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + uid + ".png";
        if (imageExists(image_url) === false) {
            image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
        }
        $(".senderName").text(data["SenderName"]);
        $(".SenderEmail").text(data["SenderEmail"]);
        $(".recievercnt").addClass("hide");
        $(".msg-Image").attr("src", image_url);
    }

    $(".msg-title").text(data["subject"]);
    $(".date-time").text(data["msgdate"] + " at " + data["msgtime"]);
    $(".msg-bdy").html(data["body"]);
    var recover = $(".btnRecoverMessage");
    var trashmsg = $(".btnTrashMessage");
    var trashbox = $(".trashbox");
    var sentbox = $(".sentbox");
    if (option === "trash") {
        trashbox.removeClass("hide");
        trashbox.show();
        sentbox.addClass("hide");
        sentbox.hide();


        trashmsg.click(function () {
            var MsgId = data["id"];
            data = [MsgId, option];
            swal({
                title: "Trash Message!",
                text: "Are you sure you want to delete this message, it cannot be restored",
                type: "info",
                showCancelButton: true,
                confirmButtonClass: 'btn btn btn-success',
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                cancelButtonClass: 'btn btn-warning'
            }).then(function (dismiss) {
                if (dismiss.value) {
                    GetData("Messages", "TrashMessage", "LoadTrashMessage", data);
                } else {
                    swal({
                        title: 'Safe',
                        text: "Your message is safe!",
                        type: 'success',
                        showCancelButton: false,
                        confirmButtonText: 'Ok!',
                        confirmButtonClass: 'btn btn-success',
                        buttonsStyling: false
                    });
                }
            });

        });
        recover.click(function () {
            var MsgId = data["id"];
            data = [MsgId, option];
            swal({
                title: "Restore Message!",
                text: "Are you sure you want to restore this message?",
                type: "info",
                showCancelButton: true,
                confirmButtonClass: 'btn btn btn-success',
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                cancelButtonClass: 'btn btn-warning'
            }).then(function (dismiss) {
                if (dismiss.value) {
                    GetData("Messages", "RecoverMessage", "LoadRecoveredMessage", data);

                } else {
                    swal({
                        title: 'Safe',
                        text: "Your message is safe!",
                        type: 'success',
                        showCancelButton: false,
                        confirmButtonText: 'Ok!',
                        confirmButtonClass: 'btn btn-success',
                        buttonsStyling: false
                    });
                }
            });
        });
    }
    $(".btnDeleteMessage").click(function () {
        var MsgId = data["id"];
        data = [MsgId, option];
        swal({
            title: "Delete Message!",
            text: "Are you sure you want to delete this message?",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: 'btn btn btn-success',
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            cancelButtonClass: 'btn btn-warning'
        }).then(function (dismiss) {
            if (dismiss.value) {
                GetData("Messages", "TrashMessage", "LoadTrashMessage", data);
            } else {
                swal({
                    title: 'Safe',
                    text: "Your message is safe!",
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'Ok!',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
            }
        });

    });
    $(".showInboxMessage").click(function () {
        window.location.reload();
    });



}

function DisplayTrashMessage(data) {
    if ((data[0] === "success") || (data[0] === "successful")) {
        swal({
            title: "Message",
            text: "Message Deleted!",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn btn-success',
            confirmButtonText: "Ok",
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Sorry, something went wrong!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Retry',
            onClose: function () {
                window.location.reload();
            }
        });
    }
}

function DisplayRecoveredMessage(data) {
    if ((data[0] === "success") || (data[0] === "successful")) {
        swal({
            title: "Message",
            text: "Message Recovered!",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn-success',
            confirmButtonText: 'Ok',
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Sorry, something went wrong!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Retry',
            onClose: function () {
                window.location.reload();
            }
        });
    }
}

function DisplayTransactions(data) {
    hideLoader();
    var parent = $("#RecentTransDisplay");
    parent.find(".newclone").remove();
    if (data !== "none") {
        var ids = data[0];
        var details = data[1];
        var count = 0;
        var childclone = parent.find(".transclone").removeClass("hide");
        $.each(ids, function (index, id) {
            count++;
            var result = details[id];
            var newchild = childclone.clone();
            newchild.removeClass("unreadclone");
            newchild.addClass("newclone");
            var type = result["OtherTransactionType"];
            newchild.find(".transCount").text(count);
            newchild.find(".transID").text(result["TransactionRef"]);

            newchild.find(".transName").text(result["NameOfTransaction"]);
            newchild.find(".transDate").text(result["NewDate"]);
            var ViewTransDetails = newchild.find(".ViewTransDetails");
            newchild.find(".transTool").text(result["ValueType"]);
            if (type === "Debit") {
                newchild.find(".transAmount").text(PriceFormat(result["DebitAmount"]));
            } else if (type === "Credit") {
                newchild.find(".transAmount").text(PriceFormat(result["CreditAmount"]));
            }
            ViewTransDetails.click(function () {
                DisplayTransactionDetails(result);
            });

            newchild.appendTo(parent).show();
        });
        $(".transTotalCount").text(count);
        childclone.hide();
    } else {
        $("<li />", {class: "wide center clone-child", text: "No Result", colspan: "6"}).appendTo(parent);
    }

}

function DisplayTransactionDetails(data) {
    $(".SenderName").text(data["PrimaryAccountName"]);
    $(".DebitAccountNumber").text(data["DebitAccountNumber"]);
    $(".DebitAccountDefinitionName").text(data["AccountDefinitionName"]);
    $(".RecieverName").text(data["OtherAccountName"]);
    $(".CreditAccountNumber").text(data["CreditAccountNumber"]);
    $(".CreditAccountDefinitionName").text(data["AccountDefinitionName"]);
    $(".TransactionId").text(data["TransactionRef"]);
    $(".TransactionType").text(data["NameOfTransaction"]);
    $(".Transaction").text(data["OtherTransactionType"]);
    $(".DebitAmount").text(PriceFormat(data["DebitAmount"]));
    $(".CreditAmount").text(PriceFormat(data["CreditAmount"]));
    $(".Amount").text(PriceFormat(data["Amount"]));
    $(".Description").text(data["Description"]);
    $(".ChargesAmount").text(PriceFormat(data["AppliedCharge"]));
    $(".Comment").text(data["Comment"]);
    $(".Date").text(data["NewDate"]);
    $(".Time").text(data["NewTime"]);
    $(".transtool").text(data["ValueType"]);
    if (data["ValueType"] === "Warrants") {
        $(".ttools").removeClass("hide");
        $(".SenderBal").text(PriceFormat(data["FromUserNewBalance"]));
        $(".RecieverBal").text(PriceFormat(data["ToUserNewBalance"]));
    }
}

function DisplayContactAction(data) {
    swal({
        title: "Added!",
        text: data,
        type: "success",
        showCancelButton: false,
        confirmButtonClass: 'btn btn-success',
        confirmButtonText: 'Ok!',
        onClose: function () {
            window.location.reload();
            data = [userid, type, "Contact"];
            GetData("Favorite", "GetUserFavorites", "LoadUserContacts", data);
        }
    });
}

function DisplayPasswordReset(data) {
    if (data === "success") {
        swal({
            title: "Email Sent",
            text: "Please check for an email from The WealthMarket and enter the recovery code in the box below.",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                $("#resetInstruction").text("Enter the new recovery code");
                $("#formSendEmail").hide();
                $("#formSendEmail").addClass("hide");
                $("#formValidateEmail").show();
                $("#formValidateEmail").removeClass("hide");
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Please email entered doesn't exist or something went wrong!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Retry',
            onClose: function () {
                window.location = extension + "LinksServlet?type=Reset";
            }
        });
    }
}

function DisplayLogActivities(data) {

}

function DisplayRecovery(data) {
    if (data[0] === "success") {
        swal({
            title: "Set New Password",
            text: "Password recovery/reset was successful, please create new password",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!'
        }, function (isConfirm) {
            if (isConfirm) {
                $("#resetInstruction").text("Create new password");
                $("#formSendEmail").hide();
                $("#formSendEmail").addClass("hide");
                $("#formValidateEmail").hide();
                $("#formValidateEmail").addClass("hide");
                $("#formNewPassword").show();
                $("#formNewPassword").removeClass("hide");
                $("#UserMemberID").text(data[1]);
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Invalid recovery code or something went wrong",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Retry'
        }, function (isConfirm) {
            if (isConfirm) {
                $("#resetInstruction").text("Enter the new recovery code");
                $("#formSendEmail").hide();
                $("#formSendEmail").addClass("hide");
                $("#formValidateEmail").show();
                $("#formValidateEmail").removeClass("hide");
            }
        });
    }
}

function DisplayRegistration(data) {
    if (data === "success") {
        swal({
            title: "Account created",
            text: "Your Account has been created successfully, click Ok to validate and activate your account!",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location = extension + "LinksServlet?type=Validate";
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: data,
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Retry',
            onClose: function () {
                window.location = extension + "LinksServlet?type=Register";
            }
        });
    }
}

function DisplayChangeTransactionPIN(data) {
    if (data === "success") {
        swal({
            title: "Transaction PIN",
            text: "Your Transaction Pin has been changed, please check your message inbox",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!'
        });
    } else {
        swal({
            title: "Oops!",
            text: "Something went wrong, Please try again!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Retry'
        });
    }
}

function DisplayUserProducts(data, parent) {
//    parent.empty();
    parent.find(".clone-child").remove();
    if (data === "none") {
        $("<div />", {class: "padding", text: "No Product"}).appendTo(parent);
    } else {
        var count = 0;

        var childclone = parent.find(".clone");
        $.each(data, function (id, details) {
            count++;
            var newchild = childclone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.addClass("clone-child");

            var image_url = extension + "global_assets/app/img/UnlistedProductImages/product-" + id + ".png";
            if (imageExists(image_url) === false) {
                image_url = extension + "global_assets/app/img/ProductImages/product-0.png";
            }
            newchild.find(".productSN").text(count);
            newchild.find(".productImage").attr("src", image_url);
            var name = capitaliseFirstLetter(details["product_name"]);
            newchild.find(".productName").text(name);
            newchild.find(".productDesc").text(details["description"]);
            newchild.find(".productCategory").text(details["category_name"]);
            newchild.find(".productSummary").text(details["summary"]);
            var price = details["proposed_price"];
            var newprice = PriceFormat(price);
            newchild.find(".productPrice").text(newprice);
            var Quantity = parseInt(details["quantity"]);
            if (Quantity > 0) {
                newchild.find(".productQuantity").text(Quantity).addClass("badge badge-info");
            } else {
                newchild.find(".productQuantity").text(Quantity).addClass("badge badge-danger");
            }
            var status = details["status"];
            if (status === "Accepted") {
                newchild.find(".productStatus").text(status).addClass("badge badge-success");
            } else if (status === "Pending") {
                newchild.find(".productStatus").text(status).addClass("badge badge-primary");
            } else if (status === "Declined") {
                newchild.find(".productStatus").text(status).addClass("badge badge-danger");
            }
            var btnDeleteProduct = newchild.find(".btnDeleteProduct");
            var btnViewProductDetatails = newchild.find(".btnViewProductDetatails");

            newchild.find(".productStatus").text(status);
            if (status === "Declined" || status === "Pending") {
                btnDeleteProduct.removeClass("hide");
            } else {
                btnViewProductDetatails.removeClass("hide");
            }
            btnViewProductDetatails.click(function () {
                $(".product-details-image").attr("src", image_url);
                DisplayProductDetails(details, image_url);
            });
            btnDeleteProduct.click(function () {
                var pid = details["product_id"];
                swal({
                    title: 'My Products(s)',
                    text: "Do you want to remove - " + name + " - from your Product List",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'No, cancel it!',
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    buttonsStyling: false
                }).then(function (dismiss) {
                    if (dismiss.value) {
                        GetData("Product", "RemoveFromPool", "LoadRemoveFromPool", pid);
                    } else {
                        swal({
                            title: 'Safe',
                            text: "Your product is safe!",
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonText: 'Ok!',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        });
                    }
                });
            });
            newchild.appendTo(parent).show();
        });
        $(".listedProductsNum").text(count);
        var image_url1 = extension + "global_assets/images/placeholders/product-0.png";
        $(".imagepopup").attr("href", image_url1);
        childclone.hide();
    }
}

function DisplayUserPendingProducts(data, parent) {
    //    parent.empty();
    parent.find(".clone-child").remove();
    if (data === "none") {
        $("<div />", {
            class: "padding",
            text: "No Product"
        }).appendTo(parent);
    } else {
        var count = 0;
        var childclone = parent.find(".clone");
        var Total = 0;
        var TotalLotValue = $("#gTotal");
        var totalValue = $("#lotTotal");
        $.each(data, function (id, details) {
            count++;
            var newchild = childclone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.addClass("clone-child");

            var image_url = extension + "global_assets/app/img/UnlistedProductImages/product-" + id + ".png";
            if (imageExists(image_url) === false) {
                image_url = extension + "global_assets/app/img/ProductImages/product-0.png";
            }
            newchild.find(".productSN").text(count);
            newchild.find(".productImage").attr("src", image_url);
            var name = capitaliseFirstLetter(details["product_name"]);
            newchild.find(".productName").text(name);
            newchild.find(".productCategory").text(details["category_name"]);
            var price = details["proposed_price"];
            var newprice = PriceFormat(price);
            newchild.find(".productPrice").text(newprice);
            var addbutton = newchild.find("#lotcheck");
            var subtotalPrice = newchild.find(".subtotalPrice");
            var Quantity = parseInt(details["quantity"]);
            if (Quantity > 0) {
                newchild.find(".productQuantity").text(Quantity).addClass("badge badge-info");
            } else {
                newchild.find(".productQuantity").text(Quantity).addClass("badge badge-danger");
            }
            addbutton.click(function () {
                $("#lotReleaseValue").empty();
                $("#lotReleasePercent").empty();
                var subtotal = parseInt(price) * Quantity;
                if ($(this).prop("checked")) {
                    subtotalPrice.text(PriceFormat(subtotal));
                    Total = Total + subtotal;
                    TotalLotValue.text(PriceFormat(Total));
                    totalValue.text(Total);
                } else {
                    Total = Total - subtotal;
                    subtotalPrice.empty();
                    TotalLotValue.text(PriceFormat(Total));
                    totalValue.text(Total);
                }
            });
            newchild.appendTo(parent).show();
        });
        $(".listedProductsNum").text(count);
        var image_url1 = extension + "global_assets/images/placeholders/product-0.png";
        $(".imagepopup").attr("href", image_url1);
        childclone.hide();
    }

}

function DisplayUserOrderedProducts(data, parent) {
    parent.find(".clone-child").remove();
    if (data === "none") {
        $("<div />", {class: "padding", text: "No Product"}).appendTo(parent);
    } else {
        var count = 0;
        var childclone = parent.find(".clone");
        $.each(data, function (id, details) {
            count++;
            var newchild = childclone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.addClass("clone-child");

            var image_url = extension + "global_assets/app/img/ProductImages/product-" + details["product_id"] + ".png";
            if (imageExists(image_url) === false) {
                image_url = extension + "global_assets/app/img/ProductImages/product-0.png";
            }
            newchild.find(".productSN").text(count);
            newchild.find(".productImage").attr("src", image_url);
            var name = capitaliseFirstLetter(details["name"]);
            newchild.find(".productName").text(name);
            newchild.find(".productDesc").text(details["description"]);
            newchild.find(".productCategory").text(details["category_name"]);
            newchild.find(".productSummary").text(details["summary"]);
            newchild.find(".productOrderNumber").text("#" + details["OrderNumber"]);
            newchild.find(".productSerialNumber").text(details["serial_number"]);
            var price = details["productprice"];
            var newprice = PriceFormat(price);
            newchild.find(".productPrice").text(newprice);
            var Quantity = parseInt(details["productquantity"]);
            newchild.find(".productQuantity").text(Quantity).addClass("badge badge-info");
            var status = details["OrderStatus"];
            if (status === "Shipped") {
                newchild.find(".productStatus").text(status).addClass("badge badge-success");
            } else if (status === "Cancelled") {
                newchild.find(".productStatus").text(status).addClass("badge badge-primary");
            } else if (status === "Processing") {
                newchild.find(".productStatus").text(status).addClass("badge badge-danger");
            } else if (status === "Delivered") {
                newchild.find(".productStatus").text(status).addClass("badge badge-warning");
            }
            newchild.appendTo(parent).show();
        });
        $(".listedOrderedProductsNum").text(count);
        var image_url1 = extension + "global_assets/images/placeholders/product-0.png";
        $(".imagepopup").attr("href", image_url1);
        childclone.hide();
    }
}

function DisplayUserListedProducts(data) {
    var parent = $("#ShopProductsList");
    parent.empty();
    if (data === "none") {
        $("<div />", {class: "padding", text: "No Product"}).appendTo(parent);
    } else {
        var count = 0;
        $.each(data, function (id, details) {
            count++;
            var row = $("<tr />").appendTo(parent);
            $("<td />", {class: "tinywide", text: count}).appendTo(row);
            var imageBox = $("<td />").appendTo(row);
            var imgbox = $("<div />", {class: ""}).appendTo(imageBox);
            var image_url = extension + "global_assets/app/img/UnlistedProductImages/product-" + id + ".png";
            if (imageExists(image_url) === false) {
                image_url = extension + "global_assets/app/img/ProductImages/user-0.png";
            }

            $('<img src="' + image_url + '" class="avatar avatar-lg img-thumbnail">').appendTo(imgbox);
            var pname = $("<td />", {class: "doublesmallerwide"}).appendTo(row);
            var name = capitaliseFirstLetter(details["name"]);
            $("<div />", {class: "product-name bold", text: name}).appendTo(pname);
            var desc = $("<td />", {class: "textcontrol cursor linkbtn"}).appendTo(row);
            $("<span />", {text: details["description"], class: "pdesc"}).appendTo(desc);
            $("<td />", {text: details["category_name"], class: ""}).appendTo(row);
            var price = details["price"];
            var newprice = PriceFormat(price);
            $("<td />", {text: newprice, class: "blacktext"}).appendTo(row);
            var quantitycheck = $("<td />", {class: "text-center"}).appendTo(row);
            var Quantity = parseInt(details["quantity"]);
            if (Quantity > 0) {
                $("<span />", {class: "btn btn-success m-r-xs m-b-xs btn-xs", text: Quantity}).appendTo(quantitycheck);
            } else {
                $("<span />", {class: "btn btn-danger m-r-xs m-b-xs btn-xs", text: Quantity}).appendTo(quantitycheck);
            }
            var statusCheck = $("<td />", {class: "text-center"}).appendTo(row);
            var status = details["status"];
            if (status === "Listed") {
                $("<button />", {type: "button", text: "Listed", class: "btn btn-outline-success m-r-xs m-b-xs"}).appendTo(statusCheck);
            } else if (status === "Not Listed") {
                $("<button />", {type: "button", text: "Unlisted", class: "btn btn-outline-primary m-r-xs m-b-xs"}).appendTo(statusCheck);
            }
        });
    }
}

function DisplayListAndUnlistProduct(data) {
    if (data[0] === "Listed") {
        if (data[1] === "success") {
            swal({
                title: "Product Listed",
                text: "Your product has been listed on The WealthMarket Shop",
                type: "success",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-success',
                confirmButtonText: 'Ok!'
            }, function (isConfirm) {
                if (isConfirm) {
                    GetData("Product", "GetUserProducts", "LoadUserProducts", userid);
                }
            });
        } else {
            swal({
                title: "Oops!",
                text: "Sorry, something went wrong! oohh",
                type: "info",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-info',
                confirmButtonText: 'Retry'
            }, function (isConfirm) {
                if (isConfirm) {
                    GetData("Product", "GetUserProducts", "LoadUserProducts", userid);
                }
            });
        }
    } else if (data[0] === "UnListed") {
        if (data[1] === "success") {

            swal({
                title: "Product UnListed",
                text: "Your product has been unlisted from The WealthMarket Shop",
                type: "success",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-success',
                confirmButtonText: 'Ok!'
            }, function (isConfirm) {
                if (isConfirm) {
                    GetData("Product", "GetUserProducts", "LoadUserProducts", userid);
                }
            });
        } else {
            swal({
                title: "Oops!",
                text: "Sorry, something went wrong! oohh",
                type: "info",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-info',
                confirmButtonText: 'Retry'
            }, function (isConfirm) {
                if (isConfirm) {
                    GetData("Product", "GetUserProducts", "LoadUserProducts", userid);
                }
            });
        }
    }


}

function DisplayFavBooks(data, parent) {
    parent.empty();
    if (data === "none") {
        parent.text("No Article was Found!");
    } else {
        $.each(data, function (id, details) {
            var col = $("<div />", {class: "col-lg-4"}).appendTo(parent);
            var card = $("<div />", {class: "card"}).appendTo(col);
            var image_url = extension + "global_assets/app/img/ProfilePicture/product-" + id + ".png";
            if (imageExists(image_url) === false) {
                image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
            }
            $('<img src="' + image_url + '" class="card-img-top img-fluid">').appendTo(card);
            var cardBlock = $("<div />", {class: "card-block"}).appendTo(card);
            $("<h5 />", {class: "card-title", text: details["Title"]}).appendTo(cardBlock);
            $("<p />", {class: "card-text", text: details["Summary"]}).appendTo(cardBlock);
            var ad = $("<p />", {class: "card-text"}).appendTo(cardBlock);
            $("<span />", {class: "text-muted", text: "Last updated 3 mins ago" + details[""]}).appendTo(ad);
        });
    }
}

function DisplayUserContacts(data, parent, objecttype) {
    hideLoader();
    if (data === "none") {
        parent.text("No Contacts or Staff").css("text-align", "center");
    } else {

        parent.find(".newclone").remove();
        $.each(data, function (id, details) {
            var childclone = parent.find(".contactclone");
            var newchild = childclone.clone();
            newchild.removeClass("contactclone");
            newchild.addClass("newclone");
            var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + id + ".png";
            if (imageExists(image_url) === false) {
                image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
            }
            var contactid = id;
            newchild.find(".UsercontactImage").attr("src", image_url);
            newchild.find(".UsercontactName").text(details["user_name"]);
            newchild.find(".UsercontactType").text(details["usertype"]);
            newchild.find(".UsercontactPhone").text(details["phone_number"]);
            newchild.find(".UsercontactEmail").text(details["email"]);
            var btnSendContactMsg = newchild.find(".btnSendContactMsg");
            btnSendContactMsg.tooltip({
                position: {
                    my: "center bottom-40",
                    at: "center top"
                }
            });
            btnSendContactMsg.click(function () {
                $("#searchtext").val(details["email"]);
            });
            var btntransfer = newchild.find(".btntransfer");
            btntransfer.tooltip({
                position: {
                    my: "center bottom-40",
                    at: "center top"
                }
            });
            btntransfer.click(function () {
                $("#quicksearchtext").val(details["email"]);
                var data = details["email"];
                GetData("Accounts", "GetSearchUserDetails", "LoadUserDetails", data);
            });
            var btnSetPermission = newchild.find(".btnSetPermission");
            btnSetPermission.tooltip({
                position: {
                    my: "center bottom-40",
                    at: "center top"
                }
            });
            btnSetPermission.click(function () {
                window.location = extension + "ControllerServlet?action=Link&type=ManageBusinessStaffPermission&StaffUserID=" + id + "&StaffUserName=" + details["user_name"];
            });

            var btndelete = newchild.find(".btnDeleteContact");
            btndelete.tooltip({
                position: {
                    my: "center bottom-40",
                    at: "center top"
                }
            });
            btndelete.click(function () {
                if (objecttype === "Contact") {
                    swal({
                        title: "My Contact(s)",
                        text: "Do you want to remove " + details["user_name"] + " from your Contact List",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        confirmButtonClass: 'btn btn-success',
                        cancelButtonClass: 'btn btn-danger',
                        buttonsStyling: false
                    }).then(function (dismiss) {
                        if (dismiss.value) {
                            var data = [userid, contactid, type, objecttype];
                            GetData("User", "removeUser", "LoadContactAction", data);
                            window.location.reload();
                        } else {
                            swal({
                                title: 'Safe',
                                text: "No action taken!",
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonText: 'Ok!',
                                confirmButtonClass: 'btn btn-success',
                                buttonsStyling: false
                            });
                        }
                    });
                } else if (objecttype === "Staff") {
                    swal({
                        title: "My Staff",
                        text: "Do you want to remove " + details["user_name"] + " from your Staff List",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        confirmButtonClass: 'btn btn-success',
                        cancelButtonClass: 'btn btn-danger',
                        buttonsStyling: false
                    }).then(function (dismiss) {
                        if (dismiss.value) {
                            var data = [userid, contactid, type, objecttype];
                            GetData("User", "removeUser", "LoadContactAction", data);
                            window.location.reload();
                        } else {
                            swal({
                                title: 'Safe',
                                text: "No action taken!",
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonText: 'Ok!',
                                confirmButtonClass: 'btn btn-success',
                                buttonsStyling: false
                            });
                        }
                    });
                }
            });

            newchild.appendTo(parent).show();
            childclone.hide();
        });

        var cs = $("#MyContactslist");
        cs.empty();
        cs.append($('<option/>').val(0).text("Select the user from your contact list here"));
        $.each(data, function (key, value) {
            var info = value["user_name"] + " - " + value["email"] + " - " + value["phone_number"];
            cs.append($('<option/>').val(key).text(info));
        });

        cs.change('select2:select', function () {
            //Use $option (with the "$") to see that the variable is a jQuery object
            var option = $(this).find('option:selected');
            //Added with the EDIT
            var id = option.val();//to get content of "value" attrib
            var text = option.text();//to get <option>Text</option> content
            $("#msguserEmail").val(text);
            $("#msguserID").text(id);

        });

    }
}

function DisplayUserContactsHeader(data) {
    var parent = $(".profile_userContacts2");
    if (data === "none") {
        parent.text("No Contacts or Staff").css("text-align", "center");
    } else {
        parent.find(".newclone").remove();
        var count = 0;
        $.each(data, function (id, details) {
            count++;
            var childclone = parent.find(".contactclone");
            var newchild = childclone.clone();
            newchild.removeClass("contactclone");
            newchild.addClass("newclone");
            var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + id + ".png";
            if (imageExists(image_url) === false) {
                image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
            }
            newchild.find(".UsercontactImage").attr("src", image_url);
            newchild.find(".UsercontactName").text(details["user_name"]);
            newchild.find(".UsercontactType").text(details["usertype"]);
            newchild.find(".UsercontactPhone").text(details["phone_number"]);
            newchild.find(".UsercontactEmail").text(details["email"]);
            newchild.appendTo(parent).show();
            childclone.hide();
        });
        $(".ContactTotalCount").text(count);
        var contTransfer = $("#contactT");
        contTransfer.find("option").remove();
        $('<option>').val("select").text("Select Contact").appendTo(contTransfer);
        $.each(data, function (key, value) {
            $('<option>').val(value["email"]).text(value["user_name"]).appendTo(contTransfer);
        });
    }
}

function DisplayBusinessStaffList(data) {
    var parent = $(".bizStaffList");
    if (data === "none") {
        parent.text("No Staff").css("text-align", "center");
        $(".biz-staff-count").text(0);
    } else {
        parent.find(".newclone").remove();
        var count = 0;
        $.each(data, function (id, details) {
            count++;
            var childclone = parent.find(".staffclone");
            var newchild = childclone.clone();
            newchild.removeClass("staffclone");
            newchild.removeClass("hide");
            newchild.addClass("newclone");
            var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + id + ".png";
            if (imageExists(image_url) === false) {
                image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
            }
            newchild.find(".staff-image").attr("src", image_url);
            newchild.find(".staff-name").text(details["user_name"]);
            newchild.find(".staff-phone").text(details["phone_number"]);
            newchild.find(".staff-email").text(details["email"]);
            newchild.appendTo(parent).show();
            childclone.hide();
        });
        $(".biz-staff-count").text(count);
    }
}

function DisplayUserDashboardContacts(data, parent) {
//    parent.empty();
    if (data === "none") {
        parent.text("No Contacts").css("text-align", "center");
    } else {
        $.each(data, function (id, details) {
            var newchild = $(".contact-clone").clone();
            newchild.removeClass("contact-clone");
            var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + details["id"] + ".png";
            if (imageExists(image_url) === false) {
                image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
            }
            newchild.find(".MsgUserImage").attr("src", image_url);
            newchild.find(".contact-name").text(details["user_name"]);
            newchild.find(".contact-type").text(details["usertype"]);
            newchild.appendTo(parent);
        });
        $(".contact-clone").remove();
    }
}

function DisplayUserHistory(data, parent) {
    parent.find(".clearclone1").remove();
    if (data === "none") {
        parent.text("No History");
    } else {
        var i = 0;
        $.each(data, function (id, details) {
            i++;
            var newchild = parent.find(".clone").clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.addClass("clearclone1");

            var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + details["userId"] + ".png";
            if (imageExists(image_url) === false) {
                image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
            }
            newchild.find(".histUserImage").attr("src", image_url);
            newchild.find(".histUserName").text(details["user_name"]);
            newchild.find(".histUserType").text(details["usertype"]);
            newchild.find(".histTitle").text(details["Topic"]);
            newchild.find(".histDetails").text(details["Details"]);
            newchild.find(".histDate").text(details["Date"]);
            newchild.find(".histTime").text(details["Time"]);
            if (i && (i % 3 === 0)) {
                $("#timelinearray").removeClass("timeline-row-full");
                $("#timelinearray").addClass("timeline-row-left");
            } else if (i && (i % 5 === 0)) {
                $("#timelinearray").removeClass("timeline-row-full");
                $("#timelinearray").removeClass("timeline-row-left");
                $("#timelinearray").addClass("timeline-row-right");
            } else {
                $("#timelinearray").removeClass("timeline-row-left");
                $("#timelinearray").removeClass("timeline-row-right");
                $("#timelinearray").addClass("timeline-row-full");
            }
            newchild.appendTo(parent).show();
        });
    }
}

function DisplayUserDashboardActivities(data, parent) {
//parent.empty();
    if (data === "none") {
        parent.text("No Activities");
    } else {
        $.each(data, function (id, details) {
            var newchild = parent.find(".clone-item").clone();
            newchild.removeClass("clone-item");
            newchild.find(".activity-details").text(details["Category"]);
            newchild.find(".activity-name").text(details["Topic"]);
            newchild.find(".activity-time").text(details["Date" + "  " + "Time"]);
            newchild.find(".activity-msg").text(details["Details"]);
            newchild.appendTo(parent);
        });
        parent.find(".clone-item").remove();
    }
}

function DisplayUserDashboardMessages(data) {
    var parent = $("#dmessage-list");
    if (data === "none") {
        parent.text("No Message");
    } else {
        var ids = data[0];
        var msgdetails = data[1];
        var childclone = parent.find(".dmsgClone");
        $.each(ids, function (index, id) {
            var result = msgdetails[id];
            var newchild = childclone.clone();
            var isread = result["is_read"];
            newchild.removeClass("dmsgClone");
            newchild.addClass("clone-child");
            var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + result["from_member_id"] + ".png";
            if (imageExists(image_url) === false) {
                image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
            }
            newchild.find(".DMsgUserImage").attr("src", image_url);
            newchild.find(".dmsgSender").text(result["SenderName"]);
            newchild.find(".dmsg-bdy").text(result["subject"]);
            newchild.find(".dmsgtime").text(result["msgtime"]);
            if (isread !== "0")
                newchild.removeClass("unread");
            newchild.appendTo(parent).show();
        });
        childclone.hide();
    }
}

function DisplayListBusiness(data) {
    $("#loggedinuserid").val(data);
    $(".listUserBusinessForm").addClass("hide");
    $(".listUserBusinessForm").hide();
    $(".listBusinessImageForm").removeClass("hide");
    $(".listBusinessImageForm").show();
}

function DisplayMembersList(data, parent, objecttype) {
    if (data === "none") {
        parent.text("No Members match your search");
    } else {
        parent.find(".newclone").remove();
        $.each(data, function (id, details) {
            var childclone = parent.find(".contact-list-clone").removeClass("hide");
            var newchild = childclone.clone();
            newchild.removeClass("contact-list-clone");
            newchild.addClass("newclone");
            var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + details["userID"] + ".png";
            if (imageExists(image_url) === false) {
                image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
            }
            newchild.find(".contact-list-Image").attr("src", image_url);
            newchild.find(".contact-list-name").text(details["user_name"]);
            newchild.find("#contact-list-userid").text(details["userID"]);
            newchild.find(".contact-list-email").text(details["email"]);

            if (objecttype === "Contact") {
                newchild.find(".addcontactbtn").removeClass("hide");
                newchild.find(".addstaffbtn").addClass("hide");
            } else if (objecttype === "Staff") {
                newchild.find(".addcontactbtn").addClass("hide");
                newchild.find(".addstaffbtn").removeClass("hide");
            }
            newchild.find(".addcontactbtn").click(function () {
                var contactid = details["userID"];
                var data = [userid, contactid, type, objecttype];
                $(".bd-example-modal-1").modal("hide");
                $("#usersearch").val('');
                swal({
                    title: "My Contact",
                    text: "Do you want to add " + details["user_name"] + " to your contact list",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes!',
                    cancelButtonText: 'No!',
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    buttonsStyling: false
                }).then(function (dismiss) {
                    if (dismiss.value) {
                        GetData("User", "addUser", "LoadContactAction", data);
                    } else {
                        swal({
                            title: 'Cancelled',
                            text: "No action taken!",
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonText: 'Ok!',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        });
                    }
                });

            });
            newchild.find(".addstaffbtn").click(function () {
                $(".searchcontainer").addClass("hide");
                $(".permcontainer").removeClass("hide");
                $(".uname").text(details["user_name"]);
                $(".unameid").text(details["userID"]).hide();
            });
            newchild.find(".sendmsgbtn").click(function () {
                window.location = extension + "ControllerServlet?action=Link&type=Compose";
//                $("#Usercontactid").val(details["userID"]);
//                $("#Usercontactname").val(details["user_name"]);
            });
            newchild.appendTo(parent).show();
            childclone.hide();
        });

    }
}

function DisplayTopCategories(data, parent) {
    parent.empty();
    if (data === "none") {
    } else {
        $("<option />", {text: 'select Top category', value: 0}).appendTo(parent);
        $.each(data, function (id, name) {
            $("<option />", {text: capitaliseFirstLetter(name), value: id}).appendTo(parent);
        });
        parent.change(function () {
            var catid = $(this).val();
//            var catname = $('#prodTopCategories :selected').text();
            GetData("Category", "GetCategories", "LoadCategories", catid);
            GetData("Category", "GetCategoryProperties", "LoadCategoryProps", catid);
            GetData("Category", "GetCategoryVariants", "LoadCategoryVariants", catid);
        });

    }
}

function DisplayCategories(data, parent) {
    parent.empty();
    if (data === "none") {
    } else {
        $.each(data, function (id, name) {
            $("<option />", {text: capitaliseFirstLetter(name), value: id}).appendTo(parent);
        });
        $(".prod-cat-info").removeClass("hide");
        $(".prod-cat-info").show();
        $(".prod-info").removeClass("hide");
        $(".prod-info").show();
        parent.change(function () {
            var catid = $(this).val();
            GetData("Category", "GetSubCategories", "LoadSubCategory", catid);
        });
    }
}

function DisplayProductCategoryVariants(data, parent) {
    //    parent.empty();
    if (data === "none") {
    } else {
        $.each(data, function (id, details) {
            var name = details["name"];
            if (details["value"].length != 0) {
                var values = details["value"].split(",");
                var newchild = parent.find(".clone");
                var childClone = newchild.clone();
                childClone.removeClass("clone");
                var variant = childClone.find("#variantSelect");
                variant.empty();
                $("<option />", {
                    text: "Select " + capitaliseFirstLetter(name),
                    value: 0
                }).appendTo(variant);
                var count = 1;
                $.each(values, function (option) {
                    $("<option />", {
                        text: option,
                        value: count
                    }).appendTo(variant).show();
                    count++;
                });
                childClone.appendTo(parent);
                newchild.hide();
            }
        });

    }
}

function DisplaySubCategories(data, parent) {
    parent.empty();
    if (data === "none") {
    } else {
        $.each(data, function (id, name) {
            $("<option />", {text: capitaliseFirstLetter(name), value: id}).appendTo(parent);
        });
        $(".prod-sub-cat-info").removeClass("hide");
        $(".prod-sub-cat-info").show();
    }
}

function DisplayCategoryProps(data, parent) {
    parent.empty();
    if (data === "none") {
    } else {
        $.each(data, function (id, name) {
            var group = $("<div />", {class: "form-group parts-top marginright halfwide-minus-padding properties-group"}).appendTo(parent);
            $("<label />", {for : "#prod-prop" + id, text: capitaliseFirstLetter(name)}).appendTo(group);
            $("<input />", {class: "form-control prop-val", placeholder: "Nil", id: "prod-prop" + id}).appendTo(group);
            $("<div />", {class: "prop-name", text: name}).appendTo(group).hide();
        });
    }
}

function DisplayProductUnits(data, parent) {
    parent.empty();
    if (data == "none") {
        parent.text("No Units");
    } else {
        parent.append($('<option/>').val(0).text("Select Unit"));
        $.each(data, function (id, Unit) {
            var unitName = Unit["abbreviation"] + " - " + " (" + Unit["name"] + ") " + " : " + Unit["description"];
            $("<option />", {
                text: capitaliseFirstLetter(unitName),
                value: id
            }).appendTo(parent);
        });

    }
}

function DisplayProductHscodes(data, parent) {
    parent.empty();
    if (data == "none") {
        parent.text("No codes");
    } else {
        parent.append($('<option/>').val(0).text("type hscode or product name"));
        $.each(data, function (id, code) {
            var code = code["hscode"] + " - " + code["description"]
            $("<option />", {
                text: capitaliseFirstLetter(unitName),
                value: id
            }).appendTo(parent);
        });

    }
}

function DisplayListings(data, parent) {
    if (data === "none") {
        parent.text("No Listing");
    } else {
        var ids = data[0];
        parent.find(".newclone").remove();
        var count = 0;
        $.each(ids, function (index, id) {
            var details = data[1][id];
            count++;
            var childclone = parent.find(".listclone");
            var newchild = childclone.clone();
            newchild.removeClass("listclone");
            newchild.removeClass("hide");
            newchild.addClass("newclone");
            newchild.find(".list-fullname").text(details["fullname"]);
            newchild.find(".list-time").text(details["time_listed"]);
            newchild.find(".list-date").text(details["date_listed"]);
            newchild.find(".list-bid-count").text(details["bid_count"] + " Bid(s)");
            newchild.find(".list-status").text(capitaliseFirstLetter(details["status"]));


            var parentlistoffer = newchild.find(".parentlist-offer");
            var offered = details["offered"].split(";");
            var newoffered = cleanArray(offered);
            parentlistoffer.find(".newofferclone").remove();
            $.each(newoffered, function (ind, item) {
                var chilofferclone = parentlistoffer.find(".list-offer-clone");
                var newofferchild = chilofferclone.clone();
                newofferchild.removeClass("list-offer-clone");
                newofferchild.removeClass("d-none");
                newofferchild.addClass("newofferclone");
                var o_defId = item.split("-")[0];
                var o_value = item.split("-")[1];
                var o_cls = "";
                if (o_defId === "1") {
                    o_cls = "Market Warrants";
                } else if (o_defId === "2") {
                    o_cls = "Reflation Rights";
                } else if (o_defId === "3") {
                    o_cls = "Par Cash Rights";
                }
                if (o_defId !== "") {
                    newofferchild.find(".list-offer").text(o_cls);
                    var r_amt = PriceFormat(o_value);
                    newofferchild.find(".list-offer-value").text(r_amt);
                }

                newofferchild.appendTo(parentlistoffer).show();
                chilofferclone.hide();
            });

            var parentlistexpect = newchild.find("#parentlist-expect");
            var requested = details["requested"].split(";");
            var newrequested = cleanArray(requested);
            parentlistexpect.find(".newexpectclone").remove();
            $.each(newrequested, function (ind, item) {
                var childexpectclone = parentlistexpect.find(".list-expect-clone");
                var newexpectchild = childexpectclone.clone();
                newexpectchild.removeClass("list-expect-clone");
                newexpectchild.removeClass("d-none");
                newexpectchild.addClass("newexpectclone");
                var r_defId = item.split("-")[0];
                var r_value = item.split("-")[1];
                var r_cls = "";
                if (r_defId === "1") {
                    r_cls = "Market Warrants";
                } else if (r_defId === "2") {
                    r_cls = "Reflation Rights";
                } else if (r_defId === "3") {
                    r_cls = "Par Cash Rights";
                }
                if (r_defId !== "") {
                    newexpectchild.find(".list-expect").text(r_cls);
                    var r_amt = PriceFormat(r_value);
                    newexpectchild.find(".list-expect-value").text(r_amt);
                }

                newexpectchild.appendTo(parentlistexpect).show();
                childexpectclone.hide();
            });


            newchild.appendTo(parent).show();
            childclone.hide();
        });

    }
}

function DisplaySempleRejectedContract(data) {
    hideLoader();
    if (data === "success") {
        swal({
            title: "Contract Rejected",
            text: "Successful",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Something went wrong!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    }
}

function DisplaySignedSempleContract(data) {
    hideLoader();
    if (data === "true") {
        swal({
            title: "Semple Contract Signed",
            text: "Successful",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Something went wrong! or Invalid Transaction Pin",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    }
}

function ConfirmSempleContractSigning(ContractID) {
    swal({
        title: 'Contract Signing',
        text: 'Please Enter Your Buisness Transaction PIN',
        input: 'number',
        type: 'info',
        animation: 'slide-from-top',
        inputPlaceholder: 'Transaction Pin',
        showCancelButton: true,
        confirmButtonText: 'Submit!',
        cancelButtonText: 'Cancel!',
        closeOnConfirm: false,
        closeOnCancel: false,
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-warning',
        inputClass: 'form-control',
        inputValidator: function (value) {
            return !value && 'Invalid input!';
        }
    }).then(function (result) {
        if (result.value) {
            var TransactionPin = result.value;
            var data = [userid, ContractID, TransactionPin];
            showLoader();
            GetData("Schemes", "SignSempleContract", "LoadSignedSempleContract", data);
        }
    });
}

function DisplayGenerateUserTransactionStatement(data) {
    if (data === "success") {
        swal({
            title: "Account Statement Generated",
            text: "Successful",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!'
        }, function (isConfirm) {
            if (isConfirm) {
                $("#GenAcctStmt").click();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Something went wrong!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Ok!'
        }, function (isConfirm) {
            if (isConfirm) {

            }
        });
    }
}

function DisplayInspectionFees(data) {
    if (data === "success") {
        $(".inpectionfee").addClass("hide");
        $(".inpectionfee").hide();
    } else {
        $(".inpectionfee").removeClass("hide");
        $(".inpectionfee").show();
    }
}

function DisplayProductDetails(data, image_url) {
    var imagepopup = $(".imagepopup");
    imagepopup.click(function () {
        $(".product-details-image").attr("src", image_url);
        $(".imagepopup").attr("href", image_url);
    });
    var name = capitaliseFirstLetter(data["product_name"]);
    $(".product-detail-name").text(name);
    var price = PriceFormat(data["proposed_price"]);
    $(".product-detail-price").text(price);
    $(".product-details-description").text(data["description"]);
    $(".product-detail-quantity").text(data["quantity"]);
    $(".product-id-gen").text(data["product_id"]);
    $(".product-detail-categoryname").text(data["category_name"]);
    $(".product-details-summary").text(data["summary"]);
}

function DisplayAllProductCategories(data) {
    var CatList = data[0];
    var TopCatSubs = data[1];
    var parent = $("#productCategory");
    if (data === "none") {
        parent.text("No Result");
    } else {
        var childclone = parent.find(".clone");
        $.each(TopCatSubs, function (id, subs) {
            var newchild = childclone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.addClass("category-clone");
            var details = CatList[id];
            var image_url2 = extension + "assets/images/CategoryImages/category-" + id + ".png";
            if (imageExists(image_url2) === false) {
                image_url2 = extension + "assets/images/CategoryImages/category-0.png";
            }
            newchild.find(".category-image").css("background-image", "url('" + image_url2 + "')");
            newchild.find(".category-name").text(capitaliseFirstLetter(details["name"]));
            var subParent = newchild.find(".catSubs");
            var subchildclone = subParent.find(".subclone");
            $.each(subs, function (ind, subid) {
                var newsubchild = subchildclone.clone();
                newsubchild.removeClass("clone");
                newsubchild.removeClass("hide");
                newsubchild.addClass("sub-category-clone");
                var subdetails = CatList[subid];
                newsubchild.find(".subcategory-name").text(capitaliseFirstLetter(subdetails["name"]));
                newsubchild.find(".subcategory-desc").text(subdetails["description"]);
                var image_url = extension + "assets/images/CategoryImages/category-" + subid + ".png";
                if (imageExists(image_url) === false) {
                    image_url = extension + "assets/images/CategoryImages/category-0.png";
                }
                var imagebtn = newsubchild.find(".subcategory-image").attr("src", image_url);
                imagebtn.click(function () {
                    $("#catid").val(subid);
                    $(".bd-example-changeCategoryImage").modal("show");
                });
                var detailbtn = newsubchild.find(".categorydetailbtn");
                detailbtn.click(function () {
                    var image_url11 = extension + "assets/images/CategoryImages/category-" + subid + ".png";
                    if (imageExists(image_url11) === false) {
                        image_url11 = extension + "assets/images/CategoryImages/category-0.png";
                    }
                    $(".product-details-image").attr("src", image_url11);
                    $(".cat-details-name").text(capitaliseFirstLetter(subdetails["name"]));
                    $(".cat-details-description").text(subdetails["description"]);
                    $(".cat-details-properties").text(subdetails["properties"]);
                });
                newsubchild.appendTo(subParent);
            });
            newchild.appendTo(parent);
        });
        childclone.hide();
    }
}

function DisplaySempleContracts(data) {
    hideLoader();
    var status = sessionStorage.getItem("sempleStatus");
    var parent = "";
    if (status === "All") {
        parent = $("#allSemple");
    } else if (status === "Pending") {
        parent = $("#pendingSemple");
    } else if (status === "Signed") {
        parent = $("#signedSemple");
    } else if (status === "On-Going") {
        parent = $("#ongoingSemple");
    } else if (status === "Completed") {
        parent = $("#completedSemple");
    } else if (status === "Rejected") {
        parent = $("#rejectedSemple");
    }
    if (data[0] === "none") {
        parent.text("No result").addClass("bold mt-2 mb-2 ml-2 mr-2 text-center");
    } else {
        var counter = 0;
        var childClone = parent.find(".clone");
        $.each(data, function (id, details) {
            counter++;
            var newchild = childClone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.find(".sSN").text(counter);
            newchild.find(".sInitiatorName").text(details["initiatorName"]);
            newchild.find(".sRecipientName").text(details["recipientName"]);
            newchild.find(".sDate").text(details["issue_date"]);
            var status = details["status"];
            var sta = newchild.find(".sStatus");
            if (status === "Pending") {
                $("<span />", {class: "badge badge-flat border-info text-info-600", text: details["status"]}).appendTo(sta);
            } else if (status === "On-Going") {
                $("<span />", {class: "badge badge-flat border-primary text-primary-600", text: details["status"]}).appendTo(sta);
            } else if (status === "Completed") {
                $("<span />", {class: "badge badge-flat border-success text-success-600", text: details["status"]}).appendTo(sta);
            } else if (status === "Signed") {
                $("<span />", {class: "badge badge-flat border-grey text-grey-600", text: details["status"]}).appendTo(sta);
            } else if (status === "Rejected") {
                $("<span />", {class: "badge badge-flat border-danger text-danger-600", text: details["status"]}).appendTo(sta);
            }
            var btn = newchild.find(".sempleBtn");
            btn.unbind("click").click(function () {
                if (details["status"] === "Pending") {
                    $(".semple-contract-display1-modal").modal("show");
                    $("#ContrtID").text(id);
                    $("#AcceptContract").show();
                    $("#AcceptContract").removeClass("hide");
                    $("#RejectContract").show();
                    $("#RejectContract").removeClass("hide");
                    $(".PendingContract").html(details["contract_body"]);
                } else if (details["status"] === "Rejected") {
                    $(".semple-contract-display1-modal").modal("show");
                    $("#AcceptContract").hide();
                    $("#AcceptContract").addClass("hide");
                    $("#RejectContract").hide();
                    $("#RejectContract").addClass("hide");
                    $(".PendingContract").html(details["contract_body"]);
                } else {
                    $(".semple-contract-display2-modal").modal("show");
                    var document_url = extension + "global_assets/app/img/PDFDocuments/" + details["document_Url"] + ".pdf";
                    $(".PDFContainer").attr("src", document_url);

                }
            });
            newchild.appendTo(parent);
        });
        childClone.hide();

    }
}


function PopulateStates(returnValue) {
    var Section = "State";
    var value = "157";
    var data = [value, Section, returnValue];
    GetData("User", "Populate", "LoadStates", data);
}

function PopulateLGAs(value, returnValue) {
    var data;
    var Section = "LGA";
    data = [value, Section, returnValue];
    GetData("User", "Populate", "LoadLGAs", data);
}

function PopulateLCDAsFromState(value, returnValue) {
    var data;
    var Section = "LCDAfromState";
    data = [value, Section, returnValue];
    GetData("User", "Populate", "LoadLCDAs", data);
}

function PopulateLCDAsFromLGA(value, returnValue) {
    var data;
    var Section = "LCDAfromLGA";
    data = [value, Section, returnValue];
    GetData("User", "Populate", "LoadLCDAs", data);
}

function PopulateTownsFromState(value, returnValue) {
    var data;
    var Section = "TownfromState";
    data = [value, Section, returnValue];
    GetData("User", "Populate", "LoadTowns", data);
}

function PopulateTownsFromLCDA(value, returnValue) {
    var data;
    var Section = "TownfromLCDA";
    data = [value, Section, returnValue];
    GetData("User", "Populate", "LoadTowns", data);
}

function PopulateTownsFromLGA(value, returnValue) {
    var data;
    var Section = "TownfromLGA";
    data = [value, Section, returnValue];
    GetData("User", "Populate", "LoadTowns", data);
}

function PopulateBstopsFromLGA(value, returnValue) {
    var data;
    var Section = "BstopfromLGA";
    data = [value, Section, returnValue];
    GetData("User", "Populate", "LoadBusStops", data);
}

function PopulateBstopsFromLCDA(value, returnValue) {
    var data;
    var Section = "BstopfromLCDA";
    data = [value, Section, returnValue];
    GetData("User", "Populate", "LoadBusStops", data);
}

function PopulateBstopsFromTown(value, returnValue) {
    var data;
    var Section = "BstopfromTown";
    data = [value, Section, returnValue];
    GetData("User", "Populate", "LoadBusStops", data);
}

function PopulateStreetsFromTown(value, returnValue) {
    var data;
    var Section = "StreetfromTown";
    data = [value, Section, returnValue];
    GetData("User", "Populate", "LoadStreets", data);
}

function PopulateStreetsFromBstop(value, returnValue) {
    var data;
    var Section = "StreetfromBstop";
    data = [value, Section, returnValue];
    GetData("User", "Populate", "LoadStreets", data);
}

function InsertMissingSection(Section) {

    var data1;
    var NewAddition = $('._new' + Section).val();
    var LGAValue1 = $('#lgas').val();
    var StateValue1 = $('#states').val();
    var TownValue1 = $('#towns').val();
    var BStopValue1 = $('#busstops').val();
    var LCDAValue1 = $('#lcdas').val();
    switch (Section) {
        case "lcdas":
        {
            data1 = [Section, NewAddition, LGAValue1, StateValue1];
            break;
        }
        case "towns":
        {
            if (LCDAValue1 === "0" || LCDAValue1 === "Select Your LCDA") {
                data1 = [Section, NewAddition, LGAValue1, StateValue1];
            } else {
                data1 = [Section, NewAddition, LCDAValue1, LGAValue1, StateValue1];
            }
            break;
        }
        case "busstop":
        {
            if (LCDAValue1 === "0" || LCDAValue1 === "Select Your LCDA") {
                data1 = [Section, NewAddition, TownValue1, LGAValue1];
            } else {
                data1 = [Section, NewAddition, TownValue1, LCDAValue1, LGAValue1];
            }
            break;
        }
        case "street":
        {
            data1 = [Section, NewAddition, BStopValue1, TownValue1];
            break;
        }

    }
    GetData("User", "InsertSection", "LoadNewSection", data1);
    $('._new' + Section).val("");
}

//*****************************SetValue
function SetLCDAValues(section) {
    var value1 = $("#lcdas").children("option:selected").val();
    var data1 = [value1, section, "LCDA"];
    GetData("User", "GetValues", "Show" + section + "Value", data1);
}

function SetTownValues(section) {

    var value1 = $("#towns").children("option:selected").val();
    var data1 = [value1, section, "Town"];
    GetData("User", "GetValues", "Show" + section + "Value", data1);
}

function SetBstopValues(section) {

    var value1 = $("#busstops").children("option:selected").val();
    var data1 = [value1, section, "Bstop"];
    GetData("User", "GetValues", "Show" + section + "Value", data1);
}

function SetStreetValues(section) {
    var value1 = $("#streets").children("option:selected").val();
    var data1 = [value1, section, "Street"];
    GetData("User", "GetValues", "Show" + section + "Value", data1);
}

//****************Display value
function DisplayLGAValue(params) {
    var SectionOptions1 = $("#lgas").children();
    SectionOptions1.find("option:selected").removeAttr('selected');
    var value = params.toString();
    $.each(SectionOptions1, function () {
        if ($(this).val() === value) {
            $(this).attr('selected', 'selected');
        }
    });

}

function DisplayStateValue(params) {
    var StateSectionOptions = $("#userstates").children();
    var StateSectionOptions1 = $("#states").children();
    StateSectionOptions.find("option:selected").removeAttr('selected');
    var value = params.toString();
    $.each(StateSectionOptions, function () {
        if ($(this).val() === value) {
            $(this).attr('selected', 'selected');
        }
    });
    $.each(StateSectionOptions1, function () {
        if ($(this).val() === value) {
            $(this).attr('selected', 'selected');
        }
    });
}

function DisplayLCDAValue(params) {
    var SectionOptions = $("#userlcdas").children();
    var SectionOptions1 = $("#lcdas").children();
    SectionOptions.find("option:selected").removeAttr('selected');
    var value = params.toString();
    $.each(SectionOptions, function () {
        if ($(this).val() === value) {
            $(this).attr('selected', 'selected');
        }
    });
    $.each(SectionOptions1, function () {
        if ($(this).val() === value) {
            $(this).attr('selected', 'selected');
        }
    });
}

function DisplayTownValue(params) {
    var SectionOptions1 = $("#towns").children();
    SectionOptions1.find("option:selected").removeAttr('selected');
    var value = params.toString();
    $.each(SectionOptions1, function () {
        if ($(this).val() === value) {
            $(this).attr('selected', 'selected');
        }
    });
}

function DisplayBstopValue(params) {
    var SectionOptions1 = $("#busstops").children();
    SectionOptions1.find("option:selected").removeAttr('selected');
    var value = params.toString();
    $.each(SectionOptions1, function () {
        if ($(this).val() === value) {
            $(this).attr('selected', 'selected');
        }
    });
}

function DisplayNewSection(params) {

    var usersection1;
    var Section = params[0];
    var Section_Name = params[1];
    var value = params[2];
    switch (Section) {
        case "lcdas":
        {

            usersection1 = "#lcdas";
            break;
        }
        case "towns":
        {
            usersection1 = "#towns";
            break;
        }
        case "busstop":
        {
            usersection1 = "#busstops";
            break;
        }
        case "street":
        {
            usersection1 = "#streets";
            break;
        }
    }
    //$("<option>").val(value).text(Section_Name).attr('selected', 'selected').appendTo(pickupsection);
    //pickupsection.append($('<option/>').val(value).text(Section_Name).attr('selected', 'selected'));
    $("<option>").val(value).text(Section_Name).attr('selected', 'selected').appendTo(usersection1);
}

function DisplayStates(data) {
    var ds = $("#states");
    ds.empty();
    if (data === "empty") {
    } else {
        $('<option/>').val("0").text("Select State").appendTo(ds);
        $.each(data, function (index, value) {
            $.each(value, function (key, value) {
                $('<option>').val(key).text(value).appendTo(ds);
            });
            if (index === "") {

            } else {
                var fx = ds.children();
                $.each(fx, function () {
                    if ($(this).val() === index) {
                        $(this).attr('selected', 'selected');
                    }
                });
            }
        });

    }

}

function Displaylgas(data) {
    var ds = $("#lgas");
    ds.empty();
    if (data === "empty") {
    } else {
        $('<option/>').val("0").text("Select LGA").appendTo(ds);
        $.each(data, function (index, value) {
            $.each(value, function (key, value) {
                $('<option>').val(key).text(value).appendTo(ds);
            });
            if (index === "") {

            } else {
                var fx = ds.children();
                $.each(fx, function () {
                    if ($(this).val() === index) {
                        $(this).attr('selected', 'selected');
                    }
                });
            }
        });

    }

}

function DisplayLCDAs(data) {
    var ds = $("#lcdas");
    ds.empty();
    if (data === "empty") {
    } else {
        $('<option/>').val("0").text("Select LCDA").appendTo(ds);
        $.each(data, function (index, value) {
            $.each(value, function (key, value) {
                $('<option>').val(key).text(value).appendTo(ds);
            });
            if (index === "") {

            } else {
                var fx = ds.children();
                $.each(fx, function () {
                    if ($(this).val() === index) {
                        $(this).attr('selected', 'selected');
                    }
                });
            }
        });

    }

}

function DisplayTowns(data) {
    var ds = $("#towns");
    ds.empty();
    if (data === "empty") {
    } else {
        $('<option/>').val("0").text("Select Town").appendTo(ds);
        $.each(data, function (index, value) {
            $.each(value, function (key, value) {
                $('<option>').val(key).text(value).appendTo(ds);
            });
            if (index === "") {

            } else {
                var fx = ds.children();
                $.each(fx, function () {
                    if ($(this).val() === index) {
                        $(this).attr('selected', 'selected');
                    }
                });
            }
        });

    }

}

function DisplayBusStops(data) {
    var ds = $("#busstops");
    ds.empty();
    if (data === "empty") {
    } else {
        $('<option/>').val("0").text("Select Bus Stop").appendTo(ds);
        $.each(data, function (index, value) {
            $.each(value, function (key, value) {
                $('<option>').val(key).text(value).appendTo(ds);
            });
            if (index === "") {

            } else {
                var fx = ds.children();
                $.each(fx, function () {
                    if ($(this).val() === index) {
                        $(this).attr('selected', 'selected');
                    }
                });
            }
        });

    }

}

function DisplayStreets(data) {
    var ds = $("#streets");
    ds.empty();
    if (data === "empty") {
    } else {
        $('<option/>').val("0").text("Select Street").appendTo(ds);
        $.each(data, function (index, value) {
            $.each(value, function (key, value) {
                $('<option>').val(key).text(value).appendTo(ds);
            });
            if (index === "") {

            } else {
                var fx = ds.children();
                $.each(fx, function () {
                    if ($(this).val() === index) {
                        $(this).attr('selected', 'selected');
                    }
                });
            }
        });

    }

}

function DisplayAddressAfterEdit(data) {
    if (data === "success") {
        swal({
            title: "Address Editted",
            text: "Successful",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success btn-sm',
            confirmButtonText: "Ok",
            onClose: function () {
                $(".bd-example-modaladdress").modal("hide");
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Something went wrong!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info btn-sm',
            confirmButtonText: 'Ok',
            onClose: function () {
                window.location.reload();
                $(".bd-example-modaladdress").modal("hide");
            }
        });
    }
}

function DisplayDailyLimit(data) {
    if (data === "success") {
        $(".bd-example-modaltransfer").on("show.bs.modal", function () {
            var data = [userid, type, "Contact"];
            GetData("Favorite", "GetUserFavorites", "LoadUserContacts", data);
        }).modal("show");
    } else {
        swal({
            title: "Limit Exceeded!",
            text: "You have exceeded the number of allowed transaction for today!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info btn-sm',
            confirmButtonText: 'Ok',
            onClose: function () {
                $(".bd-example-modaltransfer").modal("hide");
                window.location.reload();
            }
        });
    }
}

function DisplayDebitLimit(params) {
    $.each(params, function (index, value) {
        var result = index;
        var data = value;
        if (result === "success") {
            GetData("Accounts", "CheckCreditLimit", "LoadCreditLimit", data);
        } else {
            swal({
                title: "Limit Exceeded!",
                text: "You have exceeded the debit limit allowed for today! Consider trying a lower Amount",
                type: "info",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-info btn-sm',
                confirmButtonText: 'Ok',
                onClose: function () {
                    $(".bd-example-modaltransfer").modal("hide");
                    window.location.reload();
                }
            });
        }
    });

}

function DisplayCreditLimit(params) {
    $.each(params, function (index, value) {
        var result = index;
        var data = value;
        if (result === "success") {
            GetData("Accounts", "QuickTransfer", "LoadQuickTransfer", data);
        } else {
            swal({
                title: "Limit Exceeded!",
                text: "The beneficiary has exceeded the credit limit allowed for today! Consider trying a lower Amount",
                type: "info",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-info btn-sm',
                confirmButtonText: 'Ok',
                onClose: function () {
                    $(".bd-example-modaltransfer").modal("hide");
                    window.location.reload();
                }
            });
        }
    });
}

function DisplayBusinessPermissions(data) {
    var par = $(".BusinessPermissionsList");
    hideLoader();
    if (data === "none") {
        par.text("No Objects");
    } else {
        var ChildClone = par.find(".clone");
        $.each(data, function (id, details) {
            var newchild = ChildClone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.find(".objName").text(details["name"]);
            newchild.find(".objectTypePermCheck").val(id);
            newchild.appendTo(par);
        });
        ChildClone.hide();
    }
}

function DisplayUserPermissions(data) {
    var par = $("#UserPerms");
    hideLoader();
    if (data === "none") {
        par.text("No Objects");
    } else {
        var ChildClone = par.find(".clone");
        $.each(data, function (id, details) {
            var newchild = ChildClone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.find(".PermName").text(details["name"]);
            newchild.appendTo(par);
        });
        ChildClone.hide();
    }
}

function DisplayGeneralAlert(data) {
    hideLoader();
    swal({
        title: data[2],
        text: data[0],
        type: data[1],
        showCancelButton: false,
        confirmButtonClass: 'btn btn-' + data[1],
        confirmButtonText: 'Ok!',
        onClose: function () {
            window.location.reload();
        }
    });
}

function DisplayPermissions(data, parent) {
    hideLoader();
    parent.find(".newclone").remove();
    if (data === "none") {
        parent.text("No Permissions").addClass("bold");
    } else {
        var childClone = parent.find(".perm-clone");
        $.each(data, function (id, details) {
            var newchild = childClone.clone();
            newchild.removeClass("perm-clone");
            newchild.removeClass("hide");
            newchild.addClass("newclone");
            var permName = newchild.find(".permName").val(details["permName"]);
            var setPerms = newchild.find("#setPerms");
            var setRestrict = newchild.find("#setRestrict");


            permName.click(function () {
                DisplayPermDetails(details);
            });

            setPerms.click(function () {
                var extra = "Add " + details["permName"] + " as an new permission to the list of " + StaffUserName + "'s assigned permissions";
                SetSpecialPerms(StaffUserID, userid, id, extra, "Add");
            });

            setRestrict.click(function () {
                var extra = "Remove " + details["permName"] + " from the list of " + StaffUserName + "'s assigned permissions";
                SetSpecialPerms(StaffUserID, userid, id, extra, "Remove");
            });
            newchild.appendTo(parent).show();
        });
        childClone.hide();
    }
}

function DisplayPermDetails(details) {
    $(".PermID").text(details["permID"]);
    $(".permissionname").text(details["permName"]);
    $(".permCreator").text(details["permCreatedBy"]);
    $(".permTime").text(details["time"]);
    $(".permDate").text(details["date"]);
    $(".ObjectTypeName").text(details["ObjectTypeName"]);
    var usergroupParent = $("#uGroupList");
    usergroupParent.find(".unewclone").remove();
    var usergroupdata = details["userGroups"];
    if (usergroupdata === "none") {
        usergroupParent.text("No User Groups");
    } else {
        var childClone = usergroupParent.find(".clone");
        $.each(usergroupdata, function (id, name) {
            var newchild = childClone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.addClass("unewclone");
            var ubtn = newchild.find(".ugroupName").text(name);
            ubtn.click(function () {
                $(".selectedPs").removeClass("hide");
                $(".allperms").addClass("hide");
                $(".selectedWMObjectType").text(name);
                loadedtype = "UserGroup";
                loadedid = id;
                showLoader();
                GetData("Permissions", "GetUserGroupPermissions", "LoadPermissions", id);
            });
            newchild.appendTo(usergroupParent).show();
        });

        childClone.hide();
    }

    var permgroupParent = $("#pGroupList");
    permgroupParent.find(".pnewclone").remove();
    var permgroupdata = details["permGroups"];
    if (permgroupdata !== "none") {
        var ChildClone = permgroupParent.find(".clone");
        $.each(permgroupdata, function (id, name) {
            var newchild = ChildClone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.addClass("pnewclone");
            var pbtn = newchild.find(".pgroupName").text(name);
            pbtn.click(function () {
                $(".selectedPs").removeClass("hide");
                $(".allperms").addClass("hide");
                $(".selectedWMObjectType").text(name);
                loadedtype = "PermissionGroup";
                loadedid = id;
                showLoader();
                GetData("Permissions", "GetPermGroupPermissions", "LoadPermissions", id);
            });
            newchild.appendTo(permgroupParent).show();
        });
        ChildClone.hide();
    } else {
    }
}

function SetSpecialPerms(StaffUserID, BusinessUserID, permid, extra, action) {
    var data = [StaffUserID, BusinessUserID, permid, action];
    swal({
        title: 'Update Permission',
        text: extra,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
    }).then(function (dismiss) {
        if (dismiss.value) {
            showLoader();
            GetData("Permissions", "SetUserGroupStaffPermissions", "LoadGeneralAlert", data);
        } else {
            swal({
                title: 'Safe',
                text: "Your permissions are safe!",
                type: 'success',
                showCancelButton: false,
                confirmButtonText: 'Ok!',
                confirmButtonClass: 'btn btn-success',
                buttonsStyling: false
            });
        }
    });
}

function DisplayLoadUserRequestedPemissions(data) {
    var par = $("#RequestedPermissions");
    hideLoader();
    if (data === "none") {
        par.text("No Objects");
    } else {
        var count = 0;
        var ChildClone = par.find(".clone");
        $.each(data, function (id, details) {
            var newchild = ChildClone.clone();
            newchild.removeClass("clone");
            count++;
            newchild.removeClass("hide");
            newchild.find(".newPermCount").text(count);
            newchild.find(".newPermUserName").text(details["Username"]);
            newchild.find(".newPermName").text(details["perm_name"]);
            newchild.find(".newPermDesc").text(details["perm_description"]);
            newchild.find(".newPermStatus").text(details["status"]);
            newchild.find(".newPermDateAndTime").text(details["DateTime"]);
            newchild.appendTo(par);
        });
        ChildClone.hide();
    }
}

function DisplayUserRequestedChanges(data) {
    hideLoader();
    var parent = $(".RequestedChanges");
    if (data === "none") {
        parent.text("No result");
    } else {
        var childClone = parent.find(".clone");
        var newcount = 0;
        $.each(data, function (id, details) {
            var newchild = childClone.clone();
            newchild.removeClass("clone");
            newcount++;
            newchild.find(".reqchangesCount").text(newcount);
            newchild.find(".reqchangesSubject").text(details["subject"]);
            newchild.find(".reqchangesOld").text(details["old_detail"]);
            newchild.find(".reqchangesNew").text(details["new_detail"]);
            newchild.find(".reqchangesDateAndTime").text(details["date"]);
            newchild.find(".reqchangesStatus").text(details["status"]);
            if (details["status"] === "Pending") {
                newchild.find(".reqchangesStatus").text(details["status"]).addClass("badge bg-orange");
            } else if (details["status"] === "Rejected") {
                newchild.find(".reqchangesStatus").text(details["status"]).addClass("badge badge-danger");
            } else if (details["status"] === "Approved") {
                newchild.find(".reqchangesStatus").text(details["status"]).addClass("badge badge-success");
            }
            newchild.appendTo(parent);
        });
        $(".reqchangesCounticon").text(newcount);
        childClone.hide();
    }
}

function DisplaySearchResultInboxDetails(data) {
    var parent = $(".message-list");
//    parent.find(".clone-child").remove();
//    parent.empty();
    if (data !== "none") {
        var childclone = parent.find(".clone").removeClass("hide");
        $.each(data, function (id, details) {
            var result = msgdetails[id];
            var newchild = childclone.clone();
            var isread = result["is_read"];
            newchild.removeClass("clone");
            newchild.addClass("clone-child");
            newchild.find(".chk").prop("id", "chk" + index);
            newchild.find(".toggle").prop("for", "chk" + index);


            newchild.find(".subject-title").text(details["subject"]);
            newchild.find(".body").text(details["body"]);
            newchild.find(".message-time").text(details["msgtime"]);
            if (isread !== "0")
                newchild.removeClass("unread");
            newchild.click(function () {
                var msgid = result["id"];
                GetData("Messages", "MarkAsRead", "", msgid);
                $("#ReadMessage").removeClass("hide");
                $("#ReadMessage").show();

                $("#InboxMessage").addClass("hide");
                $("#InboxMessage").hide();
                $("#TrashMessage").addClass("hide");
                $("#TrashMessage").hide();
                $("#SentMessage").addClass("hide");
                $("#SentMessage").hide();
                DisplayMessageDetails(result, data[2]);
            });
            newchild.appendTo(parent).show();
        });
        childclone.hide();
    } else {
        $("<li />", {class: "wide center clone-child", text: "No Result", colspan: "6"}).appendTo(parent);
    }
}

function DropifyScript() {
    $('.dropify').dropify({
        messages: {
            'default': 'Drag and drop a file here or click to select',
            'replace': 'Drag and drop or click to replace file',
            'remove': 'Remove file',
            'error': 'Ooops, something wrong was appended.'
        },
        error: {
            'fileSize': 'The file size is too big.'
        }
    });
}

//Monetsation
function schmVal(val) {
    $(".schmVal").val(val);
    GetData("Schemes", "GetAllMonetisationRules", "LoadAllMonetisationRules");
    $(".monStep1").hide();
    $(".monStep2").removeClass("hide");
    $(".monSteps").text("Step 2");

}

function DisplayMonetisationRules(params) {
    var parent = $("#monRulesParent");
    parent.find(".newCloneElement").hide();
    var cloneThis = parent.find(".monRulesClone");
    var schmVal = $(".schmVal").val();
    $.each(params, function (ind, value) {
        var schm = ind.split("-")[1];
        var monType;
        value["mon_type"] === 0 ? monType = "Not Specified!" : value["mon_type"] === 1 ? monType = "Full" : value["mon_type"] === 2 ? monType = "Half" : monType = "Quarter";
        if (schm === schmVal) {
            var childClone = cloneThis.clone();
            childClone.addClass("newCloneElement");
            childClone.removeClass("monRulesClone");
            childClone.removeClass("hide");
            childClone.find(".monRuleName").text(value["rule_name"]);
            childClone.find(".monRulePercent").text(value["percent"] + "%");
            childClone.find(".monRuleDesc").text(value["rule_desc"]);
            childClone.find(".monRuleMinVal").text(value["min_value"]);
            childClone.find(".monRuleMaxStage").text(value["max_stage"]);
            childClone.find(".monRuleMonType").text(monType);
            childClone.find(".monRadio").attr("id", ind);
            var radioVal = JSON.stringify(value);
            childClone.find(".monRadio").attr("value", radioVal);
            childClone.find(".monRadioLabel").attr("for", ind);
            childClone.appendTo(parent).show();
        }
        cloneThis.hide();
    });
}

function monStep3() {
    var selectedMonRule = $("input[name='monRuleSelected']:checked").val();
    if (selectedMonRule === "" || selectedMonRule === "on" || selectedMonRule == undefined) {
        alert("You have not selected a rule");
    } else {
        var schmVal = $(".schmVal").val();
        $(".monSteps").text("Step 3");
        $(".monStep2").addClass("hide");
        $(".monStep3").removeClass("hide");
        $(".monStep4").addClass("hide");
        if (schmVal === "Monetisation") {
            GetData("Product", "GetUserProducts", "LoadUserProductsMon", userid);
        } else if (schmVal === "Mobilisation" || schmVal === "Commoditisation") {
            //GetData("Product", "GetUserProducts", "LoadUserProductsMon", userid);
        }

    }

}

function monStep4() {
    var toMonitize = [];
    var totalValue = 0;
    var StringifiedValue = "";
    $.each($("input[name='monSelectedGoods']:checked"), function () {
        toMonitize.push($(this).val());
    });
    if (toMonitize.length === 0) {
        monStep3();
    } else {
        if (minValue > totalValue) {

        } else {
            $.each(toMonitize, function (index, value) {
                var item = JSON.parse(toMonitize[index]);
                totalValue += item[4];
                StringifiedValue += "" + item[0] + ">" + item[1] + ">" + item[2] + ">" + item[3] + ">" + item[4];
                if (index < (toMonitize.length - 1)) {
                    StringifiedValue += ":";
                }
            });
            var selectedMonRule = $("input[name='monRuleSelected']:checked").val();
            var monRule = JSON.parse(selectedMonRule);
            var minValue = monRule["min_value"];
            var feePercent = parseInt(monRule["percent"]);
            var eqiVal = parseInt(monRule["mon_type"]);
            var monRuleID = monRule["id"];
            var charges = 0;
            var appFee = ((feePercent / 100) * totalValue) + charges;
            $(".monAppFee").text(PriceFormat(appFee));
            $(".monProdTotVal").text(PriceFormat(totalValue));
            $(".monWarrant").text(PriceFormat(totalValue / eqiVal));
            var schmVal = $(".schmVal").val();
            $(".schemeType").text(schmVal);
            if (minValue > totalValue) {
                $(".monProdTotVal").removeClass("text-primary");
                $(".monProdTotVal").addClass("text-danger");
                $(".monPay").addClass("hide");
                $(".errMsg").removeClass("hide");
            } else {
                $(".monPay").removeClass("hide");
                $(".errMsg").addClass("hide");
                $(".monProdTotVal").addClass("text-primary");
                $(".monProdTotVal").removeClass("text-danger");
            }
            $(".monSteps").text("Step 4");
            $(".monStep3").addClass("hide");
            $(".monStep4").removeClass("hide");
            var data = [StringifiedValue, monRuleID, userid];
            $(".monPay").click(function () {
                //payWithPaystack(userid, appFee, loginuseremail, actualamount + ":" + appFee, "Monetisation Application Fee", StringifiedValue + ";" + monRuleID);
                GetData("Schemes", "SubmitMonetisationApplication", "LoadSubmitMonApp", data);
            });
        }

    }

}

function DisplaySubmitMonApplication(params){
    if(params === "success"){
        swal({
            title: "Submitted!",
            text: "Application submitted and awaiting approval.",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    }
}

function DisplayUserProductsMon(params) {
    var parent = $("#monGoodParent");
    parent.find(".clone-child").remove();
    if (params === "none") {
        $("<div />", {class: "padding", text: "No Product"}).appendTo(parent);
    } else {
        var count = 0;
        var childclone = parent.find(".monGoodClone");
        $.each(params, function (id, details) {
            var status = details["status"];
            if (status === "Accepted") {
                count++;
                var newchild = childclone.clone();
                newchild.removeClass("monGoodClone");
                newchild.removeClass("hide");
                newchild.addClass("clone-child");
                var image_url = extension + "global_assets/app/img/UnlistedProductImages/product-" + id + ".png";
                if (imageExists(image_url) === false) {
                    image_url = extension + "global_assets/app/img/ProductImages/product-0.png";
                }
                newchild.find(".monGoodCount").text(count);
                newchild.find(".monGoodImage").attr("src", image_url);
                newchild.find(".monGoodImage").attr("alt", "Product " + count + " Listied by " + id + " on the wealth market");
                var name = capitaliseFirstLetter(details["product_name"]);
                newchild.find(".monGoodName").text(name);
                newchild.find(".monGoodDesc").text(details["description"]);
                var checkid = "check" + id;
                newchild.find(".monGoodCheck").attr("id", checkid);
                newchild.find(".monGoodCheckLabel").attr("for", checkid);
                var price = details["proposed_price"];
                var newprice = PriceFormat(price);
                newchild.find(".monGoodPrice").text(newprice);
                var Quantity = parseInt(details["quantity"]);
                var subTotal;
                if (Quantity > 0) {
                    newchild.find(".monGoodQuantity").text(Quantity).val(Quantity).attr("max", Quantity);
                    subTotal = Quantity * parseInt(price);
                    newchild.find(".monGoodSubtotal").text(subTotal);
                } else {
                    newchild.find(".monGoodQuantity").text("Invalid").prop("disabled", true);
                }

                var quantInput = newchild.find(".monGoodQuantity");
                var goodChecked = newchild.find("#" + checkid);
                quantInput.change(function () {
                    var quant = parseInt($(this).val());
                    if (quant > Quantity) {
                        $(this).val(Quantity);
                    } else {
                        var amt = parseInt(price);
                        var subTtl = quant * amt;
                        newchild.find(".monGoodSubtotal").text(subTtl);
                        goodChecked.click();
                    }
                });
                goodChecked.click(function () {
                    var quant = parseInt(quantInput.val());
                    var Total = parseInt($("#gTotal").text());
                    if (this.checked) {
                        var arr = new Array();
                        arr[0] = id;
                        arr[1] = name;
                        arr[2] = parseInt(price);
                        arr[3] = parseInt(newchild.find(".monGoodQuantity").val());
                        arr[4] = parseInt(newchild.find(".monGoodSubtotal").text());
                        var value = JSON.stringify(arr);
                        $(this).val(value);
                        var vl = $(this).val();
                        vl = JSON.parse(vl);
                        alert("Item Added Successfully \nName: " + details["product_name"] + "\nQuantity = " + quant);
                        newchild.find(".monGoodQuantity").prop('disabled', true);
                        Total += subTotal;

                        $("#gTotal").text(Total);
                    } else {
                        newchild.find(".monGoodQuantity").prop('disabled', false);
                        Total -= subTotal;
                        $("#gTotal").text(Total);
                    }
                });
                newchild.appendTo(parent).show();
            }
        });

    }
}

function DisplayMonetisationAppFee(data) {
    if (data[2] == "Successful") {
        swal({
            title: data[2],
            text: data[0],
            type: data[1],
            showCancelButton: false,
            confirmButtonClass: 'btn btn-' + data[1],
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: data[2],
            text: "The Monetisation Apllicaton Failed, Contact an Admin",
            type: "danger",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-' + data[1],
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    }
}

function DisplayMyMonApplications(params){
    var monAppParent = $("#myMonApplicationParent");
    var child = $(".myMonAppClone");
    if(params.length == 0 || params == ""){
        $("<div>").text("No pending monetisation applications").addClass("text-center").appendTo(monAppParent);
    }else{
        monAppParent.empty();
        $.each(params, function(ind, val){
            var newChild = child.clone();
            newChild.removeClass("myMonAppClone");
            newChild.removeClass("hide");
            newChild.addClass(ind);
            var image_url = "../../../global_assets/app/img/ProfilePicture/user-" + val["userid"] + ".png";
            if (imageExists(image_url) === false) {
                image_url = "../../../global_assets/app/img/ProfilePicture/user-0.png";
            }
            newChild.find(".monAppUserImg").attr("src", image_url);
            var Name = val["UserName"];
            newChild.find(".monAppUserName").text(Name);
            newChild.find(".monAppDateTime").text(val["date_applied"]);
            newChild.find(".monUserID").val(val["userid"]);
            newChild.find(".userUsedMonRuleName").text(val["monName"]);
            newChild.find(".userUsedMonRuleID").text(val["monRuleId"]);
            var maxVal = PriceFormat(parseInt(val["warrants_calculated"]));
            newChild.find(".monExWarrants").text(maxVal);
            newChild.find(".monAppFeePd").text(PriceFormat(parseInt(val["amount_paid"])));
            newChild.find(".monAppFeeStatus").text(val["payment_status"]);
            newChild.find(".monAppUserPayRef").text(val["payment_reference"]);
            var appStatus = val["application_status"];
            var actualamount = parseInt(val["calculated_goods_value"]);
            var paymentamount = parseInt(val["AppFee_Calculated"]);
            var goodsVerifed = val["verified"];
            if(goodsVerifed == 1){
                newChild.find(".verifiedBadge").removeClass("badge-secondary").addClass("badge-success").text("verified");
                newChild.find(".ApproveMonetisation").removeClass("disableClick");
            }else if(goodsVerifed == 2){
                newChild.find(".verifiedBadge").removeClass("badge-secondary").addClass("badge-danger").text("Rejected");
            }
            var AppStatus = "";
            appStatus == 0 ? AppStatus = "pending" : appStatus == 1 ? AppStatus = "Approved" : appStatus == 2 ? AppStatus = "Declined": AppStatus = "Not Recognised!!!";
            newChild.find(".monAppStatus").text(AppStatus);
            newChild.find(".monAppUserPayRef").text(val["payment_reference"]);
            var DetailsButton = newChild.find(".ViewMonetisationGoods");
            var PayButton = newChild.find(".PayMonAppFee");
            if(appStatus == 1){
                PayButton.removeClass("disableClick");
            }
            //Details Button
            DetailsButton.click(function(){
                $(".modal-view-monetisation-goods").on("show.bs.modal", function(){
                    MonetisationGoodsDetails(val);
                }).modal("show");

            });
            PayButton.click(function(){
                payWithPaystack(val["id"], paymentamount, val["UserEmail"], actualamount, "Monetisation Application Fee");
            });
            newChild.appendTo(monAppParent).show();
        });
        child.hide();
    }
}

function MonetisationGoodsDetails(details){
    var parent = $("#mon-inv-property");
    parent.empty();
    var child = $(".monGoodClone");
    var productDetails = details['ProductDetails'];
    var count = 0;
    var grandTotal = 0;
    var verified = details["verified"];
    $.each(productDetails, function(index, product){
        count++;
        var newChild = child.clone();
        newChild.removeClass("monGoodClone");
        newChild.removeClass("hide");
        newChild.addClass(index);
        var image_url = extension + "global_assets/app/img/UnlistedProductImages/product-" + index + ".png";
        if (imageExists(image_url) === false) {
            image_url = extension + "global_assets/app/img/ProductImages/product-0.png";
        }
        newChild.find(".monGoodCount").text(count);
        newChild.find(".monGoodImage").attr("src", image_url);
        newChild.find(".monGoodImage").attr("alt", "Product "+ count+ " Listied by " + details["UserName"] + " on the wealth market");
        var name = capitaliseFirstLetter(product["product_name"]);
        newChild.find(".monGoodName").text(name);
        newChild.find(".monGoodDesc").text(product["description"]);
        var price = parseInt(product["proposed_price"]);
        var newprice = PriceFormat(price);
        newChild.find(".monGoodPrice").text(newprice);
        var availQuantity = parseInt(product["quantity"]);
        var appliedQuantity = parseInt(product["ProdAppliedQuant"]);
        newChild.find(".monGoodAvailQuantity").text(availQuantity);
        newChild.find(".monGoodAppliedQuantity").text(appliedQuantity);
        var subTotal = price * appliedQuantity;
        grandTotal += subTotal;
        newChild.find(".monGoodSubtotal").text(PriceFormat(subTotal));
        newChild.appendTo(parent).show();
    });
    $("#gTotal").text(PriceFormat(grandTotal));
    
    var monetisationPercent = parseInt(details["MonetisationDetails"]["percent"]);
    var percentAmt = (monetisationPercent/100) * grandTotal;
    var amtPaid = parseInt(details["amount_paid"]);
    var calcWarrants = parseInt(details["warrants_calculated"]);
    var expWarrants = parseInt(details["warrants_expected"]);
    $(".amt-paid").text(PriceFormat(amtPaid));
    $(".calc-percent").text(PriceFormat(percentAmt));
    $(".exp-warrant").text(PriceFormat(expWarrants));
    $(".calc-warrants").text(PriceFormat(calcWarrants));
    if(verified == 1){
        $(".mon-verification").text("Verified on "+details["date_verified"]).removeClass("text-muted").addClass("text-success");
    }else if(verified == 2){
        $(".mon-verification").text("Goods were not verified by the agent.").removeClass("text-muted").addClass("text-danger");
    }else{
        $(".mon-verification").text("waiting for verification").removeClass("text-success").addClass("text-muted");
        
    }
    
}

function DisplayMonPayAppFee(data){
    swal({
        title: data[0],
        text: data[2],
        type: data[1],
        showCancelButton: false,
        confirmButtonClass: 'btn btn-' + data[1],
        confirmButtonText: 'Continue',
        onClose: function () {
            window.location.reload();
        }
    });
}
//Monetistion

function geoLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Your browser does not support geolocation");
        $(".bd-example-modaladdress").modal("show");
    }
}

function showPosition(position) {
    var Latitude = position.coords.latitude;
    var Longitude = position.coords.longitude;
//    alert("Lat = " + Latitude + " \n Long = " + Longitude);
    //$("#Geo").val("Latitude: " + Latitude + "Longitude: " + Longitude);
    SendPositionToServer(position);
    //displayLocation(Latitude, Longitude);
}

function SendPositionToServer(position) { //
    var Latitude = position.coords.latitude;
    var Longitude = position.coords.longitude;
    var MyRequest = new XMLHttpRequest();
    var method = 'GET';
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + Latitude + ',' + Longitude + '&key=AIzaSyAWL9kdn_ztNOgS98mpZfAOfGBM8ttyCxs';
    var async = true;
    var Street_Num;
    var Street;
    var Neighborhood;
    var Town;
    var LocalGovernment;
    var State;
    MyRequest.open(method, url, async);
    MyRequest.onreadystatechange = function () {
        if (MyRequest.readyState === 4 && MyRequest.status === 200)
        {
//            var ResultArray = JSON.parse(MyRequest.responseText);
//            var ClientAddress = ResultArray.results[0];
//            Street_Num = ClientAddress.address_components[0].long_name;
//            Street = ClientAddress.address_components[1].long_name;
//            Neighborhood = ClientAddress.address_components[2].long_name;
//            Town = ClientAddress.address_components[3].long_name;
//            LocalGovernment = ClientAddress.address_components[4].long_name;
//            State = ClientAddress.address_components[5].long_name;
            var AddType = "Home Address";
            var lcda = "";
            //var data = [AddType, State, LocalGovernment, lcda, Town, Neighborhood, Street, Street_Num, userid];
            var data = ["Office Address", "Lagos", "Oshodi", "", "Ijanikin", "Abule Ado", "Lukman Street", "c12", userid];
            var address = Street_Num + ", " + Street + ", " + Neighborhood + ", " + Town + ", " + LocalGovernment + ", " + State;
//            alert(address);
            swal({
                title: 'Use Address?!',
                text: address,
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'Enter Manually!',
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false
            }).then(function (dismiss) {
                if (dismiss.value) {
                    GetData("Product", "AddUserAddressFromGeoCode", "LoadAddress", data);
                } else {
                    $(".bd-example-modaladdress").modal("show");
                }
            });
        }
    };
    MyRequest.send();

}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            //x.innerHTML = "User denied the request for Geolocation.";
            //CustomAlert("User denied the request for Geolocation.");
            alert("Permission Error");
            break;
        case error.POSITION_UNAVAILABLE:
            //x.innerHTML = "Location information is unavailable.";
            //CustomAlert("Location information is unavailable.");
            alert("Position Error");
            break;
        case error.TIMEOUT:
            //x.innerHTML = "The request to get user location timed out.";
            //CustomAlert("The request to get user location timed out.");
            alert("Timeout Error");
            break;
        case error.UNKNOWN_ERROR:
//x.innerHTML = "An unknown error occurred.";             //CustomAlert("An unknown error occurred.");
            alert("Unknown Error");
            break;
    }
}

function displayLocation(latitude, longitude) {
    var MyRequest = new XMLHttpRequest();
    var x = document.getElementById("Geo");
    var method = 'GET';
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyAWL9kdn_ztNOgS98mpZfAOfGBM8ttyCxs';
    var async = true;
    MyRequest.open(method, url, async);
    MyRequest.onreadystatechange = function () {
        if (MyRequest.readyState === 4 && MyRequest.status === 200)
        {
            var ResultArray = JSON.parse(MyRequest.responseText);
            var ClientAddress = ResultArray.results[1];
//            alert(ClientAddress);
        }
    };
    MyRequest.send();
}

function linkToFunction(action, params) {
//    closeReferencePanel();
    switch (action) {
        case "LoadStates":
        {
            DisplayStates(params);
            break;
        }
        case "LoadLGAs":
        {
            Displaylgas(params);
            break;
        }
        case "LoadTowns":
        {
            DisplayTowns(params);
            break;
        }
        case "LoadLCDAs":
        {
            DisplayLCDAs(params);
            break;
        }
        case "LoadBusStops":
        {
            DisplayBusStops(params);
            break;
        }
        case "LoadStreets":
        {
            DisplayStreets(params);
            break;
        }
        case "ShowstateValue":
        {
            DisplayStateValue(params);
            break;
        }
        case "ShowlgaValue":
        {
            DisplayLGAValue(params);
            break;
        }
        case "ShowlcdaValue":
        {
            DisplayLCDAValue(params);
            break;
        }
        case "ShowtownValue":
        {
            DisplayTownValue(params);
            break;
        }
        case "ShowbstopValue":
        {
            DisplayBstopValue(params);
            break;
        }
        case "LoadNewSection":
        {
            DisplayNewSection(params);
            break;
        }
        case "LoadAddress":
        {
            DisplayAddress(params);
            break;
        }
        case "LoadAddressAfterEdit":
        {
            DisplayAddressAfterEdit(params);
            break;
        }
        case "LoadBanks":
        {
            DisplayBanks(params);
            break;
        }
        case "LoadRemoveFromPool":
        {
            DisplayRemoveFromPool(params);
            break;
        }
        case "LoadUserDetails":
        {
            DisplayUserDetails(params);
            break;
        }
        case "LoadSearchResultUserDetails":
        {
            DisplaySearchResultUserDetails(params);
            break;
        }
        case "LoadBusinessIndustries":
        {
            DisplayBusinessIndustries(params);
            break;
        }
        case "LoadSwitchTo":
        {
            DisplaySwitchTo(params);
            break;
        }
        case "LoadBusinessTypes":
        {
            DisplayBusinessTypes(params);
            break;
        }
        case "LoadQuickTransfer":
        {
            DisplayQuickTransfer(params);
            break;
        }
        case "LoadContactAction":
        {
            DisplayContactAction(params);
            break;
        }
        case "LoadStaffAction":
        {
            DisplayStaffAction(params);
            break;
        }
        case "LoadRecovery":
        {
            DisplayRecovery(params);
            break;
        }
        case "LoadAfterPasswordReset":
        {
            DisplayUserLogin(params);
            break;
        }
        case "LoadRegistration":
        {
            DisplayRegistration(params);
            break;
        }
        case "LoadChangeTransactionPIN":
        {
            DisplayChangeTransactionPIN(params);
            break;
        }
        case "LoadUserLogin":
        {
            DisplayUserLogin(params);
            break;
        }
        case "LoadMemberDetails":
        {
            DisplayMemberDetails(params);
            break;
        }
        case "LoadBankDetails":
        {
            DisplayBankDetails(params);
            break;
        }
        case "LoadBankDetails2":
        {
            DisplayBankDetails2(params);
            break;
        }
        case "LoadUpdateUserDetails":
        {
            DisplayUpdateUserDetails(params);
            break;
        }
        case "LoadSearchResults":
        {
            var categoryItems = params[0];
            var productItems = params[1];
            var propertyItems = params[2];
            var catName = categoryItems[0];
            var catDescription = categoryItems[1];
            if (catName === "") {
                catName = "All Products";
            }
            $(".category-banner").css("background-image", "url('" + extension + "global_assets/app/img/categoryImages/" + catName + ".png')");
            var catBlock = $("<div />", {class: "categoryBanner half-margintop"}).appendTo(".category-banner");
            var content = $("<div />", {class: "homebannerContent"}).appendTo(catBlock);
            var text = $("<div />", {class: "center whitetext normaltext"}).appendTo(content);
            $("<div />", {class: "doubletext", text: (capitaliseFirstLetter(catName))}).appendTo(text);
            $("<div />", {class: "normaltext", text: catDescription}).appendTo(text);
            var parent = $(".products-list");
            DisplayProducts(productItems, parent);
            DisplayFilterParameters(propertyItems);
            break;
        }
        case "LoadPassword":
        {
            DisplayPasswordReset(params);
            break;
        }
        case "LoadLogActivities":
        {
            DisplayLogActivities(params);
            break;
        }
        case "LoadFavoriteBooks":
        {
            DisplayFavBooks(params, $("#userFavArticles"));
            DisplayFavBooks(params, $("#userFavBooks"));
            break;
        }
        case "LoadUserContacts":
        {
            DisplayUserContacts(params, $(".profile_userContacts"), "Contact");
            DisplayUserContactsHeader(params);
            break;
        }
        case "LoadUserStaff":
        {
            DisplayUserContacts(params, $(".profile_userStaff"), "Staff");
            DisplayBusinessStaffList(params);
            break;
        }
        case "LoadUserDashboardContacts":
        {
            DisplayUserDashboardContacts(params, $("#contacts-parent"));
            break;
        }
        case "LoadUserDashboardMessages":
        {
            DisplayUserDashboardMessages(params);
            break;
        }
        case "LoadUserDashboardBusiness":
        {
            DisplayUserDashboardBusiness(params);
            break;
        }
        case "LoadUserHistory":
        {
            DisplayUserHistory(params, $("#userHistory"));
            break;
        }
        case "LoadBusinessHistory":
        {
            DisplayUserHistory(params, $("#businessHistory"));
            break;
        }
        case "LoadUserDashboardActivities":
        {
            DisplayUserDashboardActivities(params, $("#activity-parent"));
            break;
        }
        case "LoadUserProducts":
        {
            DisplayUserProducts(params, $("#ProductsList"));
            break;
        }
        case "LoadUserPendingProducts":
        {
            DisplayUserPendingProducts(params, $("#UserPendingProductsList"));
            break;
        }
        case "LoadUserOrderedProducts":
        {
            DisplayUserOrderedProducts(params, $("#OrderedProductsList"));
            break;
        }
        case "LoadListAndUnlistProduct":
        {
            DisplayListAndUnlistProduct(params);
            break;
        }
        case "LoadCategoryProducts":
        {
            DisplayCategoryProducts(params);
            break;
        }
        case "LoadTopCategories":
        {
            DisplayTopCategories(params, $("#prodTopCategories"));
            break;
        }
        case "LoadCategories":
        {
            DisplayCategories(params, $("#prodCategories"));
            break;
        }
        case "LoadSubCategory":
        {
            DisplaySubCategories(params, $("#prodSubCategories"));
            break;
        }
        case "LoadCategoryProps":
        {
            DisplayCategoryProps(params, $("#prod-props"));
            break;
        }
        case "LoadProductUnits":
        {
            DisplayProductUnits(params, $(".unitSelect"));
            break;
        }
        case "LoadProductHscodes":
        {
            DisplayProductHscodes(params, $("#searchProduct"));
            break;
        }
        case "LoadCategoryVariants":
        {
            DisplayProductCategoryVariants(params, $("#prodVariants"));
            break;
        }
        case "LoadListings":
        {
            DisplayListings(params, $("#listings"));
            break;
        }
        case "ListValue":
        {
            swal({
                title: "Listing Posted",
                text: "Your listing has been posted on the market, awaiting a buyer!",
                type: "success",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-success',
                confirmButtonText: 'Continue',
                onClose: function () {
                    window.location.reload();
                }
            });
            break;
        }
        case "LoadPaymentResponse":
        {
            DisplayPaymentResponse(params);
            break;
        }
        case "LoadInitPaymentUrl":
        {
            InitPaymentUrl(params);
            break;
        }
        case "LoadAccountDefinitions":
        {
            DisplayAccountDefinitions(params);
            break;
        }
        case "LoadAccountBalances":
        {
            DisplayAccountBalanaces(params);
            break;
        }
        case "LoadTransactions":
        {
            DisplayTransactions(params);
            break;
        }
        case "LoadMessages":
        {
            DisplayMessages(params);
            break;
        }
        case "LoadUnreadMessages":
        {
            DisplayUnreadMessages(params);
            break;
        }
        case "LoadBusinesses":
        {
            DisplayBusinessList(params);
            break;
        }
        case "LoadNewMessage":
        {
            DisplayNewMessage(params);
            break;
        }
        case "LoadMessageCounts":
        {
            DisplayMessageCounts(params);
            break;
        }
        case "LoadMessageDetails":
        {
            DisplayMessageDetails(params);
            break;
        }
        case "LoadUsersList":
        {
            DisplayMembersList(params, $(".members-list"), "Contact");
            break;
        }
        case "LoadStaffList":
        {
            DisplayMembersList(params, $(".staff-list"), "Staff");
            break;
        }
        case "UploadProductImage":
        {
            $("#prodid").val(params);
            $(".listUserProductForm").addClass("hide");
            $(".listUserProductForm").hide();
            $(".listProductImageForm").removeClass("hide");
            $(".listProductImageForm").show();
            break;
        }
        case "UploadUserImage":
        {
            DisplayListBusiness(params);
            break;
        }
        case "LoadSempleRejectedContract":
        {
            DisplaySempleRejectedContract(params);
            break;
        }
        case "LoadSignedSempleContract":
        {
            DisplaySignedSempleContract(params);
            break;
        }
        case "LoadTrashMessage":
        {
            DisplayTrashMessage(params);
            break;
        }
        case "LoadRecoveredMessage":
        {
            DisplayRecoveredMessage(params);
            break;
        }
        case "LoadUserListedProducts":
        {
            DisplayUserListedProducts(params);
            break;
        }
        case "LoadGenerateUserTransactionStatement":
        {
            DisplayGenerateUserTransactionStatement(params);
            break;
        }
        case "LoadInspectionFees":
        {
            DisplayInspectionFees(params);
            break;
        }
        case "LoadAllProductCategories":
        {
            DisplayAllProductCategories(params);
            break;
        }
        case "LoadSempleContracts":
        {
            DisplaySempleContracts(params);
            break;
        }
        case "LoadBusinessPermissions":
        {
            DisplayBusinessPermissions(params);
            break;
        }
        case "LoadDailyLimit":
        {
            DisplayDailyLimit(params);
            break;
        }
        case "LoadDebitLimit":
        {
            DisplayDebitLimit(params);
            break;
        }
        case "LoadCreditLimit":
        {
            DisplayCreditLimit(params);
            break;
        }
        case "LoadUserPermissions":
        {
            DisplayUserPermissions(params);
            break;
        }
        case "LoadGeneralAlert":
        {
            DisplayGeneralAlert(params);
            break;
        }
        case "LoadPermissions":
        {
            DisplayPermissions(params, $("#StaffPermissionList"));
            break;
        }
        case "LoadPermissions2":
        {
            DisplayPermissions(params, $("#BizPermissionList"));
            break;
        }
        case "LoadUserRequestedPemissions":
        {
            DisplayLoadUserRequestedPemissions(params);
            break;
        }
        case "LoadRequestChange":
        {
            DisplayRequestChange(params);
            break;
        }
        case "LoadUserRequestedChanges":
        {
            DisplayUserRequestedChanges(params);
            break;
        }
        case "LoadSearchResultInboxDetails":
        {
            DisplaySearchResultInboxDetails(params);
            break;
        }
        case "LoadAllMonetisationRules":
        {
            DisplayMonetisationRules(params);
            break;
        }
        case "LoadUserProductsMon":
        {
            DisplayUserProductsMon(params);
            break;
        }
        case "LoadSubmitMonApp":
        {
            DisplaySubmitMonApplication(params);
            break;
        }
        case "LoadMyMonApplications":
        {
            DisplayMyMonApplications(params);
            break;
        }
    }
}
