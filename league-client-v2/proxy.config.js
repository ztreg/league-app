module.exports = [
  {
    context: [
      '/api',
    ],
    target: 'https://euw1.api.riotgames.com',
    secure: true,       // set to true if you need HTTPS
    changeOrigin: true, // set to true if your API isn't on localhost
    pathRewrite: {
      '/ritoAPI': '/'     // rewrite paths. this example sends http://localhost:4200/api/v1/users to http://localhost:3000/users
    }
  }
]
