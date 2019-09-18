var mongoose = require("mongoose");
/**
 * @swagger
 *
 * definitions:
 *   CreateLocation:
 *     type: object
 *     required:
 *       - title
 *       - address
 *       - city
 *     properties:
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       address:
 *         type: string
 *       city:
 *         type: string
 *       state:
 *         type: string
 *       zipCode:
 *         type: string
 *     example: {
 *       "title": "someLocation",
 *       "description": "description",
 *       "address": "Main street",
 *       "city": "New York",
 *       "state": "New York",
 *       "zipCode": "000000"
 *     }
 *
 *   Location:
 *     allOf:
 *     - $ref: '#/definitions/CreateLocation'
 *     - type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         address:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         zipCode:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */
const locationSchema = mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: String,
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: String,
    zip_code: String
  },
  { timestamps: true }
);

locationSchema.methods.toJSON = function() {
  const obj = this.toObject();
  // delete obj._id;
  // delete obj.__v;

  return obj;
};

// Export Location model
const Location = mongoose.model("Location", locationSchema);

export default Location;
