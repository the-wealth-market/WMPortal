<%-- 
    Document   : validate
    Created on : 09-Nov-2018, 13:11:28
    Author     : ndfmac
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>WM-Portal - Validate</title>

        <!-- Global stylesheets -->
        <link rel="icon" type="image/png" href="../../global_assets/images/wm/favicon-16x16.png"/>
        <!-- Global stylesheets -->
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900" rel="stylesheet" type="text/css">
        <link href="../../global_assets/css/icons/icomoon/styles.css" rel="stylesheet" type="text/css"/>
        <link href="../../global_assets/app/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="../../global_assets/app/css/bootstrap_limitless.min.css" rel="stylesheet" type="text/css">
        <link href="../../global_assets/app/css/layout.min.css" rel="stylesheet" type="text/css">
        <link href="../../global_assets/app/css/components.min.css" rel="stylesheet" type="text/css">
        <link href="../../global_assets/app/css/colors.min.css" rel="stylesheet" type="text/css">
        <!-- /global stylesheets -->
        <link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/3.1.1/firebaseui.css" />
    </head>

    <body>

        <jsp:include page="../../WEB-INF/static_pages/general/validate.jsp"></jsp:include>



        <!-- Core JS files -->
        <script src="../../global_assets/js/main/jquery.min.js"></script>
        <script src="../../global_assets/js/main/bootstrap.bundle.min.js"></script>
        <script src="../../global_assets/js/plugins/loaders/blockui.min.js"></script>
        <!-- /core JS files -->
        <!-- /global stylesheets -->
        <script src="https://www.gstatic.com/firebasejs/5.5.8/firebase.js"></script>
        <script src="https://cdn.firebase.com/libs/firebaseui/2.3.0/firebaseui.js"></script>


        <script>
            // Initialize Firebase
            var config = {
                apiKey: "AIzaSyBtEknYB2zdrLpniXt_lFzAhqPhDp_G2Z0",
//                authDomain: "http://172.20.10.2",//tolu data
//                authDomain: "http://192.168.1.8",//spectra data
                authDomain: "http://thewealthmarket.com/",// remote
//                authDomain: "wmapps-67ed3.firebaseapp.com",//default
                databaseURL: "https://wmapps-67ed3.firebaseio.com",
                projectId: "wmapps-67ed3",
                storageBucket: "wmapps-67ed3.appspot.com",
                messagingSenderId: "1054183974329"
            };
            firebase.initializeApp(config);
        </script>
        <script src="../../global_assets/js/plugins/forms/styling/uniform.min.js"></script>
        <script src="../../global_assets/js/plugins/notifications/sweet_alert.min.js"></script>
        <script src="../../global_assets/js/plugins/forms/selects/select2.min.js"></script>



        <script src="../../global_assets/app/js/app.js" type="text/javascript"></script>
        <script src="../../global_assets/app/js/helper.js" type="text/javascript"></script>
        <script src="../../global_assets/app/js/AppScript.js" type="text/javascript"></script>
        <script src="../../global_assets/app/js/custom.js" type="text/javascript"></script>
        <script src="../../global_assets/app/js/validateScript.js" type="text/javascript"></script>

        <script src="../../global_assets/js/plugins/parsleyjs/dist/parsley.min.js" type="text/javascript"></script>
        <script src="https://js.paystack.co/v1/inline.js"></script>
        <!-- /theme JS files -->
    </body>
</html>
