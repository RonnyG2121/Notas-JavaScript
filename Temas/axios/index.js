//Haciendo una petición get

const getUsers = () => {
    axios.get('https://jsonplaceholder.typicode.com/users/1')
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        });
}

// getUsers();

//Haciendo una petición post
const registerUser = () => {
    const data = {
        email: 'eve.holt@reqres.in',
        password: 'pistol'
    };

    axios.post('https://reqres.in/api/register', data)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

}

// registerUser();

//Haciendo una petición put o patch
const updateUsers = () => {
    const data = {
        name: 'Ronny Kitsune',
        username: 'ronnyg2121',
        email: 'jordino@example.com'
    };
    // para actualizar todo usamos el método put
    //axios.put('https://jsonplaceholder.typicode.com/users/1', data)
    // para actualizar parcialmente, usamos un patch
    axios.patch('https://jsonplaceholder.typicode.com/users/1', data)

        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

// updateUsers();

//Haciendo una petición con el método delete
const deleteUsers = () => {
    const data = {
        name: 'Ronny Kitsune',
        username: 'ronnyg2121',
        email: 'jordino@example.com'
    };
    axios.delete('https://jsonplaceholder.typicode.com/users/1')

        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

// deleteUsers();

//Haciendo varias peticiones recurrentes y al mismo tiempo
const getUsersAndPosts = async () => {
    /*    try {
            const usersURL = await axios.get('https://jsonplaceholder.typicode.com/users/');
            const PostsUsers = await axios.get('https://jsonplaceholder.typicode.com/posts');
            
            console.log(usersURL.data);
            console.log(PostsUsers.data);
        } catch (error) {
            console.error(error);
        }
    */

    // Usando una cadena de promesas
    try {
        const usersURL = axios.get('https://jsonplaceholder.typicode.com/users/');
        const PostsUsers = axios.get('https://jsonplaceholder.typicode.com/posts');

        const [users, posts] = await Promise.all([usersURL, PostsUsers]);

        console.log(users.data);
        console.log(posts.data);
    } catch (error) {
        console.error(error);
    }
}

// getUsersAndPosts();

//Aplicando el concepto de interceptors en axios
const interseptorAxios = () => {
    // Lo que esto hace es modificar las peticiones o las respuestas dependiendo
    // Modifica las peticiones o respuestas antes de ser enviadas y se le pueden modificar atributos a la petición
    axios.interceptors.request.use((config) => {
        console.log(config);
        // Modificando la url para pedir los posts aunque la url esté predefinida en la petición
        // config.url = 'https://jsonplaceholder.typicode.com/posts/';
        // Añadiendo un header a la petición
        config.headers = {
            authorization: "Authoriced z123z",

        };
        return config;
    },
        (error) => {
            return Promise.reject(error);
        });
    axios.get('https://jsonplaceholder.typicode.com/users/1')

        .then((res) => {
            console.info(res.data);
        })

        .catch((error) => {
            console.error(error);
        });
}

// interseptorAxios();

// Añadiendo un header a una petición de manera manual
const addHeader = () => {
    // Hare una petición a pokeapi y luego de la petición añadiré el header
    const options = {
        headers: {
            cabecera: "Esta es mi cabecera",
            data: "Datos de la cabecera",
        }
    };

    axios.get("https://pokeapi.co/api/v2/pokemon/25", options)

        .then((res) => {
            console.log(res);
        })

        .catch((error) => {
            console.error(error);
        });

}


// addHeader();


// Usando el request transform
const requestTransform = () => {
    const options = {
        transformResponse: axios.defaults.transformResponse.concat((data) => {
            data.map((user) => {
                user.custom = `
                ${user.name}. ${user.username}. ${user.email}`;
                return user;
            });
            return data;
        }),
    };
    // Esto nos permite transformar las respuestas al momento de la petición. y nos permite modificar su contenido para mostrarlo en el frontend

    axios.get(
        "https://jsonplaceholder.typicode.com/users",
        options)

        .then((res) => {
            console.log(res);
        })

        .catch((error) => {
            console.error(error);
        })
}

// requestTransform();


// Configurando los globals. Esto nos permite configurar todo el proyecto
const confGlobal = async () => {
    // Añadiendo varios headers a la configuración
    axios.defaults.headers.common['bash-xyz'] = 'hola_mundo';
    axios.defaults.headers.common['Authorization'] = 'si';

    try {
        const [users, posts] = await Promise.all([
            axios.get('https://jsonplaceholder.typicode.com/users/'),
            axios.get('https://jsonplaceholder.typicode.com/posts')
        ]);

        console.log(users.data);
        console.log(posts.data);
    } catch (error) {
        console.error(error);
    }
}

confGlobal();
