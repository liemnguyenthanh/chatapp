import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    full_name: { type: String, require: true },
    username : { type: String, require: true },
    phone_number: { type: String}
});

var User = mongoose.model("User", userSchema);

export default User;