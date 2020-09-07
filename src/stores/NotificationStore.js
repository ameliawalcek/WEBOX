import { observable, action } from 'mobx'
import axios from 'axios'

export class NotificationStore {
    @action urlBase64ToUint8Array = (base64String) => {
        const padding = "=".repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, "+")
            .replace(/_/g, "/");

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    @action sendNotification = async () => {
        const publicVapidKey = "BDXWCHbGPKmL3JZIXkIe1_2n-TMVAMWQ5ukV55hy7V5nA1Aqj-p_4dpaKOcm0TAed5w0f-ZHDU9sQGBnWB0TGP4"
        console.log("Registering service worker...");

        if ('serviceWorker' in navigator) {
            const register = await navigator.serviceWorker.register('../serviceWorker.js', {
                scope: "/"
            })
            console.log("Service Worker Registered...");

            console.log("Registering Push...");
            const subscription = await register.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: this.urlBase64ToUint8Array(publicVapidKey)
            });
            console.log("Push Registered...");

            console.log("Sending Push...");
            await axios.post("/subscribe", subscription)
        }
    }
}