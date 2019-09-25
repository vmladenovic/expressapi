import mongoose from "mongoose";
import bcrypt from "bcrypt";

/**
 * @swagger
 *
 * definitions:
 *   CreateUser:
 *     type: object
 *     required:
 *       - username
 *       - email
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       email:
 *         type: email
 *       password:
 *         type: password
 *     example: {
 *       "username": "someUser",
 *       "email": "jane@example.com",
 *       "password": "aaaa1111"
 *     }
 *
 *   User:
 *     allOf:
 *     - $ref: '#/definitions/CreateUser'
 *     - type: object
 *       properties:
 *         activationToken:
 *           type: string
 *         active:
 *           type: boolean
 *         createdAt:
 *           type: string
 *         id:
 *           type: string
 *         updatedAt:
 *           type: string
 */
const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true
    },
    firstName: String,
    lastName: String,
    username: {},
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    },
    activationToken: String,
    image: String
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = function(candidatePassword, next) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return next(err);
    }
    next(null, isMatch);
  });
};

userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  // delete obj._id;
  // delete obj.__v;

  return obj;
};

/**
 * Find and activate user based on activationToken string
 * @param activationToken
 * @returns {Query|void}
 */
userSchema.statics.confirmToken = function(activationToken) {
  return this.findOneAndUpdate(
    { activationToken: new RegExp(activationToken, "i") },
    { active: true, activationToken: null },
    { new: true }
  );
};

/**
 * Pre save hook used to hash the password
 */
userSchema.pre("save", function(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.hash(user.password, 10).then(hashedPassword => {
    user.password = hashedPassword;
    next();
  });
});

const User = mongoose.model("User", userSchema);

export default User;
