| **Código de Status**          | **Descrição**                          | **Caso de Uso**                                                                                  |
| ----------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **200 OK**                    | Solicitação bem-sucedida               | Recuperação ou atualização de um recurso (GET, PUT).                                             |
| **201 Created**               | Recurso criado com sucesso             | Criação de um novo recurso (POST).                                                               |
| **202 Accepted**              | Solicitação aceita, mas não processada | Início de um processo assíncrono (POST).                                                         |
| **204 No Content**            | Solicitação bem-sucedida sem conteúdo  | Recurso excluído com sucesso (DELETE).                                                           |
| **301 Moved Permanently**     | Recurso movido permanentemente         | Recurso realocado para uma nova URL.                                                             |
| **304 Not Modified**          | Recurso não modificado                 | Utilizado com cache, permitindo uso de versão em cache (GET).                                    |
| **400 Bad Request**           | Solicitação inválida ou malformada     | Dados inválidos ou parâmetros ausentes.                                                          |
| **401 Unauthorized**          | Autenticação necessária                | Acesso a recurso protegido sem token válido.                                                     |
| **403 Forbidden**             | Acesso proibido                        | Cliente autenticado, mas sem permissão.                                                          |
| **404 Not Found**             | Recurso não encontrado                 | Recurso inexistente (GET).                                                                       |
| **405 Method Not Allowed**    | Método HTTP não permitido              | Uso de método não permitido para o recurso (e.g., POST em endpoint que aceita apenas GET).       |
| **409 Conflict**              | Conflito de estado do recurso          | Conflito, como tentativa de criar recurso duplicado.                                             |
| **412 Precondition Failed**   | Pré-condição não atendida              | Atualização de recurso sem atender a condição prévia (e.g., versão ou estado).                   |
| **422 Unprocessable Entity**  | Entidade não processável               | Solicitação bem-formada, mas com erros semânticos, como falha em regras de validação de negócio. |
| **500 Internal Server Error** | Erro interno do servidor               | Erro inesperado no servidor, como uma exceção não tratada.                                       |
| **503 Service Unavailable**   | Serviço temporariamente indisponível   | Manutenção ou sobrecarga do servidor.                                                            |
| **504 Gateway Timeout**       | Tempo de resposta esgotado             | Falha ao receber resposta de um serviço upstream dentro do tempo esperado.                       |
