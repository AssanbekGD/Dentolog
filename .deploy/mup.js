module.exports = {
  servers: {
    one: {
      host: '159.203.166.117',
      username: 'root',
      // pem:
      password: 'mbC63amg'
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'app',
    path: '.',
    dockerImage: 'abernix/meteord:base',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'http://localhost:3000/',
      MONGO_URL: 'http://localhost:3001/'
    },

    //dockerImage: 'kadirahq/meteord'
    deployCheckWaitTime: 120
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
