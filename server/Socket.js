const socket = require('socket.io')

class Socket {
  constructor() {
    this.io = null
    this.onlineClients = []
  }

  initSocket(server) {
    this.io = socket(server)

    this.io.on('connection', (socket) => {

      socket.on('online', (userId) => {
        this.onlineClients.push({ [userId]: socket })
      })

      socket.on('disconnect', (userId) => {
        this.onlineClients.splice(this.onlineClients.findIndex(s => s[userId]), 1)
        socket.disconnect()
      })
    })
  }

  emitToAllSubscribedUsers(userIds, notification) {
    userIds.forEach(userId => {
      if (this.onlineClients.length) {
        const clientSocket = this.onlineClients.find(socket => socket[userId._id])
        if (clientSocket) {
          clientSocket[userId._id].emit('newNotification', notification)
        }
      }
    })
  }
}

const appSocket = new Socket()
module.exports = appSocket