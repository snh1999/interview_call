import bcrypt from "bcryptjs";
import { type InferSchemaType, model, Schema, type Types } from "mongoose";

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minLength: 4,
		},
		name: {
			type: String,
			required: true,
			minLength: 3,
		},
		lastLogin: {
			type: Date,
			default: Date.now,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		resetPasswordToken: String,
		resetPasswordTokenExpireAt: Date,
		verificationToken: String,
		verificationTokenExpireAt: Date,
		passwordChangedAt: Date,
	},
	{ timestamps: true },
);

userSchema.pre("save", async function () {
	if (!this.isModified("password")) return;

	this.password = await bcrypt.hash(this.password, 10);

	if (!this.isNew) {
		this.passwordChangedAt = new Date(Date.now() - 10);
	}
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
	return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(this.passwordChangedAt.getTime(), 10);
		return JWTTimestamp < changedTimestamp;
	}
	return false;
};

type TUser = InferSchemaType<typeof userSchema>;
export interface IUserDocument extends TUser {
	_id: Types.ObjectId;
	matchPassword(enteredPassword: string): Promise<boolean>;
	changedPasswordAfter(JWTTimestamp: number): boolean;
}

export const User = model<IUserDocument>("User", userSchema);
