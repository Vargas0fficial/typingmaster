import "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            avatar: string;
        };
    }
    interface User {
        id: string;
        avatar: string;
    }
}