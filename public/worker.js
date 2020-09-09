self.addEventListener("push", e => {
    debugger;
    const data = e.data.json();
    e.waitUntil(self.registration.showNotification(data.title, {
      body: "nothing special",
      icon: "http://image.ibb.co/frYOFd/tmlogo.png"
    }));
  });