importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");
const firebaseConfig = {
    apiKey: "AIzaSyAUHanWw4k3PpPEoVlHzOxbRDEyJwmqWIs",

    authDomain: "todos-a7b55.firebaseapp.com",

    databaseURL: "https://todos-a7b55-default-rtdb.firebaseio.com",

    projectId: "todos-a7b55",

    storageBucket: "todos-a7b55.appspot.com",

    messagingSenderId: "491413917973",

    appId: "1:491413917973:web:d942816e4b2e9e037b991c"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: "/logo192.png",
  };
return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

