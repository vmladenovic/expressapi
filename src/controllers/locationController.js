import Location from "./../models/location";
import db from "mongoose";
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
  console.log(
    Location.create(
      {
        id: uuidv1(),
        title: req.body.title,
        description: req.body.description,
        address: req.body.address,
        city: req.body.city,
        zipCode: req.body.zipCode
      },
      (err, location) => {
        if (err !== null) {
          // error has been detected
          return done(null, false, {
            message: err,
            error: err
          });
        }

        return done(null, location);
      }
    )
  );

  Location.create(
    {
      id: uuidv1(),
      title: req.body.title,
      description: req.body.description,
      address: req.body.address,
      city: req.body.city,
      zipCode: req.body.zipCode
    },
    (err, location) => {
      if (err !== null) {
        // error has been detected
        return done(null, false, {
          message: err,
          error: err
        });
      }

      return done(null, location);
    }
  );

  // var location = new Location(req.body);
  // location
  //   .save()
  //   .then(location => {
  //     res.send(location);
  //   })
  //   .catch(err => {
  //     res.status(400).send(err);
  //   });
};

/**
 * @swagger
 * /locations/:id:
 *   get:
 *     summary: Show Location
 *     description:
 *       "Show Location"
 *     tags:
 *       - Locations
 *     parameters:
 *       - in: path
 *         name: Location id
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
export const show = function(req, res) {
  const id = req.params.id;
  const location = [];

  db.collection("location").findOne({ id: new Location(id) }),
    function(err, location) {
      res.send(location);
      console.log(location);
    };
};
