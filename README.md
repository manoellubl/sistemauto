# sistemauto

Nós temos os seguintes recursos:

> Em relação às auto escolas
GET /api/user
GET /api/user/:idUser
POST /api/user
PUT /api/user/:idUser

> Para estudantes de uma auto escola:
GET /api/user/:idUser/student
GET /api/user/:idUser/student/:idStudent
POST /api/user/:idUser/student
PUT /api/user/:idUser/student/:idStudent
DELETE /api/user/:idUser/student/:idStudent

> Para instrutores de uma auto escola:
GET /api/user/:idUser/instructor
GET /api/user/:idUser/instructor/:idInstructor
POST /api/user/:idUser/instructor
PUT /api/user/:idUser/instructor/:idInstructor
DELETE /api/user/:idUser/instructor/:idInstructor

> Para aulas de uma auto escola:

GET /api/user/:idUser/clazz (todas as aulas de uma auto escola)
GET /api/user/:id_user/student/:idStudent/clazz
POST /api/user/:id_user/student/:idStudent/clazz
GET /api/user/:id_user/student/:idStudent/clazz/:idClazz
PUT /api/user/:id_user/student/:idStudent/clazz/:idClazz

> Para autenticação:
POST /api/authenticate/login
POST /api/authenticate/logout

> Para ativação de conta:
GET /api/activate?hash=<id_usuario> (libera a conta para um determinado usuário)