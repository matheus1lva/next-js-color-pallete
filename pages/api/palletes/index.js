import knex from "../../../clients/knex";

export default async (req, res) => {
  if (req.method === "POST") {
    await knex("palletes").insert({
      colors: req.body.colors,
    });
    res.status(201).json({});
  } else if (req.method === "GET") {
    const palletes = await knex("palletes");

    res.status(200).json(palletes);
  } else {
    res.status(404).json({ error: `${req.method} endpoint does not exist` });
  }
};
