export interface User {
    id: string;
    name: string;
    email: string
    profile: Profile;
    roles: string[]
}

interface Profile {
    bio: string;
website: string;

}

const user1: User = {
    id: "123",
    name: 'Ana López',
    email: 'ana.lopez@example.com',
    profile: {
        bio: 'Desarrolladora apasionada por el frontend.',
        website: 'https://www.anadevelops.com'
    },
    roles: ['admin', 'editor', 'uploader']
};

const { name, email, roles } = user1;
const { bio, website } = user1.profile;


const [admin, ...OtrosRoles] = roles;
console.info({ name, email, bio, website, rolPrincipal: admin, otrosRoles: OtrosRoles });





// export { }