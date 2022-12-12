import app from '../src/server';

import supertest from 'supertest';

const api = supertest(app);

describe('Testando rota credentials', () => {
  it('Testando GET: /credentials', async () => {
    const result = await api.get('credentials/');
  });
});
