const express = require('express');
const path = require('path')
const rootRoutes = require('./routes/root.routes')
const rootSubmit = require('./routes/req.routes')
const app = express();
const connectDB = require('./database/db')
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

connectDB()
app.use('/',rootRoutes)
app.use('/api',rootSubmit)

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});