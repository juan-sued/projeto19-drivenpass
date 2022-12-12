
## Documentação da API



#### cadastro

```http
  POST /users/
```


Esperado:

```javascript
{
  "email": "juansued19@gmail.com",
  "password": "juansued123"
}
```


#### login

```http
  POST /auth/
```


Esperado:

```javascript
{
  "email": "juansued19@gmail.com",
  "password": "juansued123"
}
```

Response: 

```javascript
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjcwODA2MjczLCJleHAiOjE2NzA4OTI2NzN9.AUN3pqdAsKf2rj3Llc8Pj4whVBVFsDw_0q-ntwnTBpI"
}
```







#### Insere um credential

```http
  POST /credentials/
```


Esperado:

```javascript
 {
  url: "https://teste",
  password: "asdasdasdasdasd",
  title: "testeasdasda",
  username: "dj rogerin"
 }
```




#### Retorna todos os credentials

```http
  GET /credentials/
```

#### Retorna um credential

```http
  GET /credentials/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |







#### Insere um network

```http
  POST /network/
```


Esperado:

```javascript
 {
  "title": "wifi do vizinho",
  "network": "rede 3423",
  "password": "Joi.string().min(1).required("
 }
```





#### Retorna todos os networks

```http
  GET /networks/
```

Retorno:

```javascript


 {
  "networkId": 1,
  "title": "wifi do vizinho",
  "network": "rede 3423",
  "password": "Joi.string().min(1).required("
  }


```




#### Retorna um item

```http
  GET /networks/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |


