var mongoose = require("mongoose");
import uuidv1 from "uuid/v1";

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
 *       streetNumber:
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
 *       "street_number": "1",
 *       "city": "New York",
 *       "state": "New York",
 *       "country": "United States",
 *       "zip_code": "000000"
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
 *         streetNumber:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         country:
 *           type: string
 *         zipCode:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */
const locationSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
    default: uuidv1()
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  street_number: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  zip_code: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

locationSchema.methods.toJSON = function() {
  const obj = this.toObject();
  // delete obj._id;
  // delete obj.__v;

  return obj;
};

// Export Location model
const Location = mongoose.model("Location", locationSchema);

export default Location;
