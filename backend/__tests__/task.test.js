const request = require('supertest');
const app = require('../server');

describe('Task API', () => {
    let token;
    let id;
    let taskId;

    beforeAll(async () => {
        const registerResponse = await request(app)
            .post('/api/users/register')
            .send({ username: 'testuser1', email: 'test1@example.com', password: 'password' });
        const loginResponse = await request(app)
            .post('/api/users/login')
            .send({ email: 'test1@example.com', password: 'password' });
        token = loginResponse.body.token;
        id = loginResponse.body.id;
    });

    it('should create a task', async () => {
        const response = await request(app)
            .post('/api/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Test Task', description: 'Description', due_date: new Date(), status: 'pending', priority: 'medium', created_user_id: id, assigned_user_id: id  });
        expect(response.status).toBe(201);
        expect(response.body.title).toBe('Test Task');
        taskId = response.body.id;
    });

    it('should fail input validation', async () => {
        const response = await request(app)
            .post('/api/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Test Task', description: 'Description', due_date: new Date(), priority: 'medium', created_user_id: id });
        expect(response.status).toBe(400);
    });

    it('should get all tasks', async () => {
        const response = await request(app)
            .get('/api/tasks')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it('should fail get all tasks with unAuthorized', async () => {
        const response = await request(app)
            .get('/api/tasks');
        expect(response.status).toBe(401);
    });

    it('should update task', async () => {
        const response = await request(app)
            .put(`/api/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Test Task Title Updated'  });
        expect(response.status).toBe(200);
        expect(response.body.title).toBe("Test Task Title Updated");
    });

    it('should get task by Id', async () => {
        const response = await request(app)
            .get(`/api/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it('should fail get task by Id with 404 not found', async () => {
        const response = await request(app)
            .get(`/api/tasks/1000`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);
    });

    it('should delete task', async () => {
        const response = await request(app)
            .delete(`/api/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(204);
    });

    it('should fail delete operation with 404 not found task', async () => {
        const response = await request(app)
            .delete(`/api/tasks/100`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);
    });
});
