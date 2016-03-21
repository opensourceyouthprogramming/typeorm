import {createMysqlConnection} from "../../src/typeorm";
import {Post} from "./entity/Post";
import {PostDetails} from "./entity/PostDetails";

// first create a connection
let options = {
    host: "192.168.99.100",
    port: 3306,
    username: "root",
    password: "admin",
    database: "test",
    autoSchemaCreate: true
};

createMysqlConnection(options, [__dirname + "/entity"]).then(connection => {

    let details1 = new PostDetails();
    details1.comment = "People";

    let details2 = new PostDetails();
    details2.comment = "Human";

    let post = new Post();
    post.text = "Hello how are you?";
    post.title = "hello";
    post.details = [details1, details2];

    let postRepository = connection.getRepository<Post>(Post);

    postRepository
        .persist(post)
        .then(post => console.log("Post has been saved"))
        .catch(error => console.log("Cannot save. Error: ", error));

}, error => console.log("Cannot connect: ", error));