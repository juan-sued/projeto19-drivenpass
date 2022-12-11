import app, { init } from './app';

const PORT: string = process.env.PORT || '4000';

init().then(() => {
  app.listen(PORT, () => {
    console.log('Servidor rodando na porta ' + PORT);
  });
});
