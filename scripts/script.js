const guestTypes = {
    love: {
        type: "day",
        formUrl: "https://docs.google.com/forms/d/e/1FAIpQLScDCWEOTiI0K1v9KAcBaiCf4Sg5BOT5iVZvVq06GQQPpK5IOA/viewform?usp=dialog",
        formHeight: 1200
    },

    party: {
        type: "evening",
        formUrl: "https://docs.google.com/forms/d/e/1FAIpQLScDtYHZL8-l_xmRu7NPZrHyerIQ8QlICWshz4O8hl-dwBjbbA/viewform?usp=publish-editor",
        formHeight: 950
    }
};

// Grab page elements
const loginSection = document.getElementById("guest-login");
const websiteContent = document.getElementById("website-content");
const passwordInput = document.getElementById("guest-password");
const passwordError = document.getElementById("guest-password-error");
const loginButton = document.getElementById("guest-login-button");
const formContainer = document.getElementById("form-container");

// ----------------------------
// Login
// ----------------------------

function enterWebsite() {

    const password = passwordInput.value.trim().toLowerCase();
    const guest = guestTypes[password];

    if (!guest) {
        passwordError.textContent =
            "Incorrect password. Please enter the password shown on your invitation.";

        passwordInput.focus();
        return;
    }

    passwordError.textContent = "";

    updateOrderOfTheDay(guest.type);
    showRSVPForm(guest);

    loginSection.style.display = "none";
    websiteContent.hidden = false;

    document.body.classList.remove("locked");

    // Remember for this browser tab
    sessionStorage.setItem("guestPassword", password);
}

// ----------------------------
// Order of the Day
// ----------------------------

function updateOrderOfTheDay(guestType) {
    document.querySelectorAll(".day-guest-info").forEach(item => {
        item.hidden = guestType !== "day";
    });
}

// ----------------------------
// RSVP Form
// ----------------------------

function showRSVPForm(guest) {

    formContainer.innerHTML = `
        <iframe
            src="${guest.formUrl}"
            width="640"
            height="${guest.formHeight}"
            frameborder="0"
            marginheight="0"
            marginwidth="0">
            Loading…
        </iframe>
    `;

}

// ----------------------------
// Event Listeners
// ----------------------------

loginButton.addEventListener("click", enterWebsite);

passwordInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        enterWebsite();
    }

});

// ----------------------------
// Restore session after refresh
// ----------------------------

const savedPassword = sessionStorage.getItem("guestPassword");

if (savedPassword && guestTypes[savedPassword]) {

    const guest = guestTypes[savedPassword];

    updateOrderOfTheDay(guest.type);
    showRSVPForm(guest);

    loginSection.style.display = "none";
    websiteContent.hidden = false;

    document.body.classList.remove("locked");

} else {

    passwordInput.focus();

}