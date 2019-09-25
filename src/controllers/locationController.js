import Location from "./../models/location";
import mongoose from "mongoose";
import uuidv1 from "uuid/v1";
import url from "url";
import querystring from "querystring";

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
    id: uuidv1(),
    title: req.body.title,
    description: req.body.description,
    address: req.body.address,
    street_number: req.body.street_number,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
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
 *   put:
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
  const id = { id: req.params.id };

  const update = {
    title: req.body.title,
    description: req.body.description,
    address: req.body.address,
    street_number: req.body.street_number,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    zip_code: req.body.zip_code
  };

  console.log(update);

  const location = Location.findOneAndUpdate(id, update, function(
    err,
    location
  ) {
    res.json(location);
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
 *       200:
 *         description: OK!
 *         schema:
 *           type: object
 *           properties:
 *             location:
 *               $ref: '#/definitions/Location'
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
export const remove = async function(req, res) {
  const id = { id: req.params.id };

  await Location.findOneAndDelete(id)
    .exec()
    .then(doc => {
      if (!doc) {
        return res.status(404).end();
      }
      return res.status(204).end();
    })
    .catch(err => next(err));
};

/**
 * @swagger
 * /locations:
 *   get:
 *     summary: Show All Locations
 *     description:
 *       "Show All Locations"
 *     tags:
 *       - Locations
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *           description: Return results for any string
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *           description: Return results for given city
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
export const all = async function(req, res, next) {
  // const keyword = req.query.keyword ? req.query.keyword : "";
  // const city = req.query.city ? req.query.city : "";

  console.log("req.query", req.query);

  const query = {
    keyword: req.query.keyword ? req.query.keyword : "",
    city: req.query.city ? req.query.city : ""
  };

  console.log("query", query.city);

  if (query.keyword && query.city) {
    await Location.find(
      {
        $or: [
          { title: { $in: [new RegExp(query.keyword, "i")] } },
          { description: { $in: [new RegExp(query.keyword, "i")] } },
          { address: { $in: [new RegExp(query.keyword, "i")] } },
          { street_number: { $in: [new RegExp(query.keyword, "i")] } },
          { city: { $in: [new RegExp(query.city, "i")] } },
          { state: { $in: [new RegExp(query.keyword, "i")] } },
          { country: { $in: [new RegExp(query.keyword, "i")] } },
          { zip_code: { $in: [new RegExp(query.keyword, "i")] } }
        ],
        $and: [{ city: { $in: [new RegExp(query.city, "i")] } }]
      },
      function(err, locations) {
        if (err) {
          res.send("404");
        }
        res.json(locations);
      }
    ).sort([["created_at", -1]]);
  } else if (query.keyword) {
    await Location.find(
      {
        $or: [
          { title: { $in: [new RegExp(query.keyword, "i")] } },
          { description: { $in: [new RegExp(query.keyword, "i")] } },
          { address: { $in: [new RegExp(query.keyword, "i")] } },
          { street_number: { $in: [new RegExp(query.keyword, "i")] } },
          { city: { $in: [new RegExp(query.keyword, "i")] } },
          { state: { $in: [new RegExp(query.keyword, "i")] } },
          { country: { $in: [new RegExp(query.keyword, "i")] } },
          { zip_code: { $in: [new RegExp(query.keyword, "i")] } }
        ]
      },
      function(err, locations) {
        if (err) {
          res.send("404");
        }
        res.json(locations);
      }
    ).sort([["created_at", -1]]);
  } else if (query.city) {
    await Location.find(
      {
        $or: [{ city: { $in: [new RegExp(query.city, "i")] } }]
      },
      function(err, locations) {
        if (err) {
          res.send("404");
        }
        res.json(locations);
      }
    ).sort([["created_at", -1]]);
  } else {
    await Location.find({}, function(err, locations) {
      if (err) {
        res.send("404");
      }
      res.json(locations);
    }).sort([["created_at", -1]]);
  }
};
