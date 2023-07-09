import http from "http";

const server = http.createServer((request, response) => {
  console.log(request); // aca hago un console.log para ver el requerimiento del cliente
  response.end("Hola soy un servidor http!"); // aca le respondo desde el backend
});

server.listen(8080, () => {
  console.log("Escuchando en el puerto 8080");
});
