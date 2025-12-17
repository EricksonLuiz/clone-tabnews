function status(request, response) {
  response.status(200).json({ chave: "Retorno valido" });
}

export default status;
