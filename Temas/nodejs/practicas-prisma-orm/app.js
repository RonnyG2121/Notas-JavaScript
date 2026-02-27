// Import the prisma client. Is the client that will be used to interact with the database.
import { PrismaClient } from "@prisma/client";

// Creating the instance from prisma client
const prismaDB = new PrismaClient();

const main = async () => {
    // create a new user
    /*         const user = await prismaDB.user.create({
                data: {
                    name: "Juan",
                    lastname: "Perez",
                    age: 95,
                    email: "jperez@ejemplo.com",
                    password: "jp12345"
                }
            });
            const newUser = await user;
    
     */


    // Create a post to a user created
/*     const post = await prismaDB.post.create({
        data: {
            title: 'Hello World',
            content: 'This is a first post of Juan',
            published: true,
            authorId: 1,
        }
    });

    console.info(post);
 */    

// Create a new post from a user
/*     const user = await prismaDB.user.create({
        data: {
            name: "Jordino",
            lastname: "Mendez",
            age: 100,
            email: "jdino@ejemplo.com",
            password: "jdino12345",
            posts: {
                create: [
                    {
                        title: 'Hello World',
                        content: 'This is a first post of Jordino',
                        published: true
                    },
                    {
                        title: 'My second post',
                        content: 'This is still a draft'
                    }
                ]
            }
        }
    });
 */

    // Consults the data from users created
    const users = await prismaDB.user.findMany();
    console.info(`Todos los usuarios. (Solo se muestran los campos del usuarios sin sus relaciones): ${JSON.stringify(users, null, 2)}`);

    // Consults the users with the posts
    const usersWhitPosts = await prismaDB.user.findMany({
        include: {
            posts: true,
            Profile: true
        },
    });
    console.dir(usersWhitPosts, {depth: null});

    // Finds one user for a data
    /*         const oneuser = await prismaDB.user.findFirst({
                where: {
                    id: 2
                }
            });
            console.info(`Usuario encontrado: ${JSON.stringify(oneuser, null, 2)}`);
    */



}


main()
    .then(async () => {
        await prismaDB.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);
        await prismaDB.$disconnect();
        process.exit(1);
    });
