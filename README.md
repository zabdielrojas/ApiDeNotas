# (ApiDeNotas) Plataforma de Notas Personalizadas: Organiza, Comparte y Crea con Libertad


## Descripción

Esta presentación introduce nuestra innovadora "App de Notas de Texto", una herramienta poderosa y versátil diseñada para ayudarte a administrar tus pensamientos y tareas de manera eficiente, compartir y crear contenido de manera personalizada.

Funcionalidades Destacadas:

Registro y Autenticación Fácil:

Regístrate con tu email y crea una contraseña segura.
Accede de manera rápida y segura a tu cuenta.

Gestión de Notas Privadas:

Crea y organiza tus notas de texto personalizadas con títulos y contenido.

Categoriza tus notas para una fácil búsqueda y acceso.

Explora y Personaliza:

Visualiza tu lista de notas con títulos para un rápido acceso.

Explora tus notas con una vista detallada para ver el contenido completo.

Edición Sencilla:

Modifica tus notas existentes: ajusta títulos, contenido y categorías.

Potencia la Colaboración:

Marca notas como públicas para compartirlas con otros usuarios.
Comparte enlaces a tus notas públicas, accesibles solo a través de URL.


Personalización Visual:

Agrega imágenes únicas a cada nota para darles un toque personal.

Seguridad y Privacidad:

Tus notas privadas están protegidas y solo visibles para ti.
Controla qué notas compartes y cuáles mantienes privadas.

Experiencia Intuitiva y Accesible:

Interfaz fácil de usar, diseñada pensando en la comodidad del usuario.
Accede desde cualquier dispositivo, en cualquier momento.

¡Únete a nuestra comunidad y experimenta la libertad de organizar tus ideas, compartir conocimientos y crear contenido de manera única con la App de Notas de Texto!

## Instrucciones

1. Instalar las dependencias mediante el comando `npm install` o `npm i`.

2. Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.

3. Crear la base de datos con el nombre escrito en el .env

4. Ejecutar `npm run initDb` para crear las tablas necesarias en la base de datos.

5. Ejecutar npm run dev


## Base de datos

### Listado de Usuarios

| Campo       | Tipo        | Descripción                                    |
| ----------- | ----------- | ---------------------------------------------- |
| Id          | INT         | Identificador único para cada usuario          |
| email       | VARCHAR(100)| email                                          |
| password    | VARCHAR(100)| contraseña encriptada                          |
| username    | VARCHAR(30) | nombre de usuario                              |
| created_at | TIMESTAMP |  registro del usuario                      |


### Listado de Notas

| Campo       | Tipo        | Descripción                                    |
| ----------- | ----------- | ---------------------------------------------- |
| Id          | INT         | Identificador único para cada titulo           |
| title       | VARCHAR(30) | títulos de las notas                           |
| text        | VARCHAR(1000)| texto de las notas                            |
| user_id     | INT         | id del usuario creador                         |
| category    | ENUM        | categoria de la nota                           |
| is_public   | BOOLEAN     | Listado publico o privado                      |
| is_public   | uuid        | identificador para acceder con url a la  nota                      |
| created_at | TIMESTAMP | fecha de creacion de la nota                            |

### Extensiones NPM Usadas

#### DevDependencies

- eslint
- nodemon
- prettier
- morgan

#### Dependencies

- cors
- dotenv
- express
- express-fileupload
- jsonwebtoken
- mysql2
- bcrypt


### Endpoints 

### **Endpoints de ficheros estáticos** 
- [/:uuid] - Muestra los archivos estáticos.

### **Endpoints de registro** 
- **POST** - [/users] - Pide email + contraseña

### **Endpoints de login** 
- **POST** - [/users/login] - Crea un nuevo usuario usando email y contraseña.

### **Endpoints de Perfil** 
- **GET** - [/users] -  Muestra el perfil del usuario (TOKEN) 

### **Endpoints de Editar Perfil** 
- **PUT** - [/users] - Edita un usuario (TOKEN)

### **Endpoints de crear una Nota**
- **POST** - [/createNotes] - Crea notas título, texto y categoría única (fijas)

### **Endpoints de Listado de Notas**
- **GET** - [/notes] - Permite (en el listado sólo se ven los títulos) 

### **Endpoints de Filtrado por categoria**
- **GET** - [/notes/?category=category] - Ver el listado filtrado por categorias

### **Endpoints de Ver Notas**  
- **GET** - [/notes/:id] - Ver notas

### **Endpoints de Ver Notas públicas**  
- **GET** - [/notes/public/:uuid] - Ver notas públicas.

### **Endpoints de Modificar Notas**  
- **PUT** - [/notes/:id] - Modificar título, texto, categoría y marcar como pública o privada

