// tests/user.test.js
jest.mock('dotenv', () => ({
    config: jest.fn(() => ({ parsed: {} })),
  }));
  
  const request = require('supertest');
  const app = require('../app'); // Import the app for testing
  const mongoose = require('mongoose');
  const User = require('../models/user');
  
  // Mock dotenv configuration
  jest.mock('dotenv', () => ({
    config: jest.fn(),
  }));
  
  beforeAll(async () => {
    // Connect to MongoDB in-memory for tests
    const url = 'mongodb://localhost:27017/userdb_test';
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  });
  
  afterAll(async () => {
    // Clean up and close the database after tests
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
  
  describe('User API', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ name: 'John Doe', email: 'john@example.com', password: '123456' });
  
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('name', 'John Doe');
      expect(res.body).toHaveProperty('email', 'john@example.com');
    });
  
    it('should update an existing user', async () => {
      const user = new User({ name: 'Jane Doe', email: 'jane@example.com', password: '123456' });
      await user.save();
  
      const res = await request(app)
        .put(`/api/users/${user._id}`)
        .send({ name: 'Jane Smith', email: 'jane@example.com', password: '654321' });
  
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Jane Smith');
    });
  
    it('should return a list of users', async () => {
      const res = await request(app).get('/api/users');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
  