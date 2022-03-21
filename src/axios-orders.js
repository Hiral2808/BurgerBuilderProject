import axios from "axios";

const instance =axios.create({
    baseURL:'https://react-my-burger-e5035-default-rtdb.firebaseio.com/'

});

export default instance;
