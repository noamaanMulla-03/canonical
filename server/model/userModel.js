import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;
const { genSalt, hash } = bcrypt;

const userSchema = new Schema({
	email: {
		type: String,
		required: [true, "Email is required"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Password is required"],
		unique: true,
	},
	firstName: {
		type: String,
		required: false,
	},
	lastName: {
		type: String,
		required: false,
	},
	image: {
		type: String,
		required: false,
	},
	colorCode: {
		type: String,
		required: false,
	},
	profileSetup: {
		type: Boolean,
		default: false,
	},
});

userSchema.pre("save", async function (next) {
	const salt = await genSalt(10);
	this.password = await hash(this.password, salt);
	next();
});

const User = mongoose.model("User", userSchema);

export default User;
