const request = require('supertest');
const app = require('../server');

describe('Auth API', () => {
    let token; 
    let id;
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({ username: 'testuser', email: 'test@example.com', password: 'password' });
        expect(response.status).toBe(201);
    });

    it('should fail input validation for registering register as password is less than 8 chars', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({ username: 'testuser', email: 'test@example.com', password: 'pass' });
        expect(response.status).toBe(400);
    });

    it('should fail input validation for registering register as email is required', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({ username: 'testuser', password: 'password' });
        expect(response.status).toBe(400);
    });

    it('should login a user', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({ email: 'test@example.com', password: 'password' });
            
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
        token = response.body.token;
        id = response.body.id;
    });

    it('should update user', async () => {
        const response = await request(app)
            .put(`/api/users/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ username: 'testuserupdated', email: 'test@example.com', password: 'password123' });
        expect(response.status).toBe(200);
        expect(response.body.username).toBe("testuserupdated");
    });

    it('should get all users', async () => {
        const response = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it('should fail get all users', async () => {
        const response = await request(app)
            .get('/api/users');
        expect(response.status).toBe(401);
    });

    it('should get user by Id', async () => {
        const response = await request(app)
            .get(`/api/users/${id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it('should fail get user by Id', async () => {
        const response = await request(app)
            .get(`/api/users/1000`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);
    });

    it('should delete user', async () => {
        const response = await request(app)
            .delete(`/api/users/${id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(204);
    });

    it('should fail delete user', async () => {
        const response = await request(app)
            .delete(`/api/users/1000`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);
    });
});

