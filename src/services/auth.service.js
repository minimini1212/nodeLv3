export class UserService {

    getUser = async (req, res) => {
        const user = req.user;
        return user;
    }
}