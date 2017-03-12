const app = require('./app')
const express = require('express');

app.set('port', process.env.PORT || 60000)
app.listen(app.get('port'))
