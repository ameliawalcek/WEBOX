// const publicVapidKey = "BMIduzT1FU-quw3-EHg3gJrxHIWULgPZpJo26OLBXGAxdz6zLVxck5P3WfojOH_yuzniJdm37b3j9riDL8MD1qs";

// if ("serviceWorker" in navigator) {
//     send().catch(err => console.error(err));
// }
// async function send() {
//     const register = await navigator.serviceWorker.register("/worker.js", {
//         scope: "/"
//     });
//     const subscription = await register.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
//     });
//     await fetch("http://localhost:3001/subscribe", {
//         method: "POST",
//         body: JSON.stringify(subscription),
//         headers: {
//             "content-type": "application/json"
//         },
//     });
// }

// function urlBase64ToUint8Array(base64String) {
//     const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
//     const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
//     const rawData = window.atob(base64);
//     const outputArray = new Uint8Array(rawData.length);
//     for (let i = 0; i < rawData.length; ++i) {
//         outputArray[i] = rawData.charCodeAt(i);
//     }
//     return outputArray;
// }