const pool = require("./pool");

async function getAll() {
  const { rows } = await pool.query("SELECT * FROM algo");
  return rows;
}

async function getAllCategory(category) {
  const { rows } = await pool.query("SELECT * FROM algo WHERE structure ILIKE $1", [`%${category}%`]);
  return rows;
}

async function getSingle(id){
    const { rows } = await pool.query("SELECT * FROM algo WHERE id = $1", [id])
    return rows;
}

async function createAlgorithm(values) {
  const { name, runtime, space, structure, description, comment } = values;

  const result = await pool.query(
    "INSERT INTO algo (name, runtime, space, structure, description, comment) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
    [name, runtime, space, structure, description, comment]
  );

  return result.rows[0].id;
}

async function updateAlgorithm(id, values){
    // Get all values from the object. If we only want to update a specific value, we might need to handle this differently.
    const { name, runtime, space, structure, description, comment } = values;
    await pool.query(`UPDATE algo
     SET name = $1,
         runtime = $2,
         space = $3,
         structure = $4,
         description = $5,
         comment = $6,
         updated = CURRENT_TIMESTAMP
     WHERE id = $7`, 
     [name,runtime, space, structure, description, comment, id]);
}

async function deleteAlgorithm(id) {
  await pool.query('DELETE FROM algo WHERE id = $1', [id]);
}



module.exports = {
  getAll,
  getSingle,
  createAlgorithm,
  updateAlgorithm,
  deleteAlgorithm,
  getAllCategory,
};

//  Schema
// INSERT INTO algo (
//   name,
//   runtime,
//   space,
//   structure,
//   description,
//   comment
// ) VALUES (
//   'A* Search',
//   'O(b^d)',  
//   'O(b^d)',
//   'Graph',
//   'A* is an informed search algorithm that finds the shortest path from a start node to a goal node using a cost function f(n) = g(n) + h(n), where g is the cost from start to n and h is a heuristic estimate to the goal.',
//   'This is mainly used in order to find the best path from A to B, however it's not the most efficient way to do this. We rely on a heuristic (for example in a maze like graph, we might use Manhattan Distance) and it can seem inefficient in the way it works. I first came across this algorithm when I followed CS50s Introduction to Artificial Intelligence with AI course.'
// );

