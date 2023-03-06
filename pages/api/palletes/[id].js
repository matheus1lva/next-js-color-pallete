import knex from "../../../clients/knex";
export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    const pallets = await knex("palletes")
      .where({ id: Number(id) })
      .first();
    res.json(pallets);
  } else if (req.method === "DELETE") {
    await knex("palletes")
      .delete()
      .where({ id: Number(req.query.id) });
    return res.status(200).json({ message: "Pallet deleted" });
  } else if (req.method === "PUT") {
    const { id } = req.query;
    await knex("palletes")
      .update({ colors: req.body.colors })
      .where({ id: Number(id) });
    return res.status(200).json({ message: "Pallet updated" });
  }
}
