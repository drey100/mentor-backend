const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const sectionRoutes = require('./routes/sectionRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const cors = require('cors');
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/sessions', sessionRoutes);



app.listen(5000, () => console.log('Server running on port 5000'));
