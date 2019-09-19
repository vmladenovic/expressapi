import Location from "./../models/location";
import mongoose from "mongoose";
import uuidv1 from "uuid/v1";

/**
 * @swagger
 * /locations/create:
 *   post:
 *     summary: Creates a new location
 *     description:
 *       "Creates new location"
 *     tags:
 *       - Locations
 *     parameters:
 *       - name: location
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/CreateLocation'
 *     responses:
 *       200:
 *         description: OK!
 *         schema:
 *           type: object
 *           properties:
 *             location:
 *               $ref: '#/definitions/Location'
 *       400:
 *          description: Fill in all mandatory fields
 *          schema:
 *            type: object
 *            properties:
 *             location:
 *               $ref: '#/definitions/Location'
 */
export const create = (req, res, done) => {
  var location = new Location({
    title: req.body.title,
    description: req.body.description,
    address: req.body.address,
    city: req.body.city,
    zip_code: req.body.zip_code
  });
  location
    .save()
    .then(location => {
      res.send(location);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

/**
 * @swagger
 * /locations/{id}:
 *   get:
 *     summary: Show Location
 *     description:
 *       "Show Location"
 *     tags:
 *       - Locations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           required: true
 *           description: Location id
 *     responses:
 *       200:
 *         description: OK!
 *         schema:
 *           type: object
 *           properties:
 *             location:
 *               $ref: '#/definitions/Location'
 *       404:
 *          description: Location not found
 *          schema:
 *            type: object
 *            properties:
 *             location:
 *               $ref: '#/definitions/Location'
 */
export const show = async function(req, res, next) {
  const id = { id: req.params.id };

  const location = await Location.findOne(id);

  console.log(location);

  if (!location) {
    return res.status(404).send({ error: "Location not found" });
  }

  return res.status(200).json(location);
};

/**
 * @swagger
 * /locations/{id}:
 *   patch:
 *     summary: Edit Location
 *     description:
 *       "Edit Location"
 *     tags:
 *       - Locations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           required: true
 *           description: Location id
 *       - in: body
 *         name: body
 *         description: "Updated location object"
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Location"
 *     responses:
 *       200:
 *         description: OK!
 *         schema:
 *           type: object
 *           properties:
 *             location:
 *               $ref: '#/definitions/Location'
 *       404:
 *          description: Location not found
 *          schema:
 *            type: object
 *            properties:
 *             location:
 *               $ref: '#/definitions/Location'
 */
export const edit = function(req, res, done) {
  console.log(req.body);

  const id = { id: req.params.id };

  const update = {
    title: req.body.title,
    description: req.body.description,
    address: req.body.address,
    city: req.body.city,
    zip_code: req.body.zip_code
  };

  const location = Location.findOneAndUpdate(id, update, function(
    err,
    location
  ) {
    res.send(location);
  });

  console.log(location);
};

/**
 * @swagger
 * /locations/{id}:
 *   delete:
 *     summary: Delete Location
 *     description:
 *       "Delete Location"
 *     tags:
 *       - Locations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           required: true
 *           description: Location id
 *     responses:
 *       400:
 *         description: "Invalid location supplied"
 *       404:
 *          description: Location not found
 *          schema:
 *            type: object
 *            properties:
 *             location:
 *               $ref: '#/definitions/Location'
 */
export const remove = async function(req, res, next) {
  const id = { id: req.params.id };

  const location = await Location.findOneAndDelete(id);

  console.log(location);

  if (!location) {
    return res.status(404).send();
  }
};
