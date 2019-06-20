import { USER_ID, AuthenticateUserService } from '../service/auth/authenticate-user.service';
import { Users } from './users.module';


export class Jobs {
    id: number;
    title: string;
    description: string;
    publishedDate: Date;
    usersId: Users;
    user;

    constructor(id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }
}
