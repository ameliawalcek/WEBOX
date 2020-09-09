const socket = require('socket.io')

class Socket {
  constructor() {
    this.io = null
    this.onlineClients = []
  }

  initSocket(server) {
    this.io = socket(server)

    this.io.on('connection', (socket) => {
      console.log(socket.id + ' connected')

      socket.on('online', (userId) => {
        this.onlineClients.push({ [userId]: socket })
        console.log(this.onlineClients)
      })

      socket.on('disconnect', (userId) => {
        this.onlineClients.splice(this.onlineClients.findIndex(s => s[userId]), 1)
        socket.disconnect()
      })
    })
  }

  emitToAllSubscribedUsers(userIds, notification) {
    userIds.forEach(userId => {
      this.onlineClients
        .find(socket => socket[userId._id])[userId._id]
        .emit('newNotification', notification)
    })
  }
}

const appSocket = new Socket()
module.exports = appSocket