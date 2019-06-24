/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * @return {!Object} The FirebaseUI config.
 */

function getUiConfig() {
    return {
        'callbacks': {
            // Called when the user has been successfully signed in.
            'signInSuccess': function (user, credential, redirectUrl) {
                handleSignedInUser(user);
                // Do not redirect.
                return false;
            }
        },
        // Opens IDP Providers sign-in flow in a popup.
        'signInFlow': 'popup',
        'signInOptions': [
            // The Provider you need for your app. We need the Phone Auth
            {
                provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                recaptchaParameters: {
                    //size: getRecaptchaMode()
                    type: 'image',
                    size: 'invisible',
                    badge: 'bottomleft'
                },
                defaultCountry: 'NG',
                loginHint: '7067483120'
            }
        ],
        // Terms of service url.
        'tosUrl': 'http://www.google.com'
    };
}

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

/**
 * Displays the UI for a signed in user.
 * @param {!firebase.User} user
 */
var handleSignedInUser = function (user) {
    $("#user-signed-in").show();
    $("#user-signed-in").removeClass("hide");
    $("#user-signed-out").hide();
    $("#user-signed-out").addClass("hide");
};


/**
 * Displays the UI for a signed out user.
 */
var handleSignedOutUser = function () {
    $("#user-signed-in").hide();
    $("#user-signed-in").addClass("hide");
    ui.start('#firebaseui-container', getUiConfig());
};

// Listen to change in auth state so it displays the correct UI for when
// the user is signed in or not.
firebase.auth().onAuthStateChanged(function (user) {
    user ? handleSignedInUser(user) : handleSignedOutUser();
});



