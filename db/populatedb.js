const { Client } = require("pg");
require("dotenv").config();

const SQL1 = `
CREATE TABLE IF NOT EXISTS algo (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255),
  runtime VARCHAR(255),
  space VARCHAR(255),
  structure VARCHAR(255),
  description TEXT,
  comment TEXT,
  added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`



async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:5432/algorithms`,
  });
  await client.connect();
  await client.query(SQL1);
  await client.query(
  `INSERT INTO algo (name, runtime, space, structure, description, comment)
   VALUES ($1, $2, $3, $4, $5, $6)`,
  [
    'A* Search',
    'O(b^d)',
    'O(b^d)',
    'Graph',
    'A* is an informed search algorithm that finds the shortest path from a start node to a goal node using a cost function f(n) = g(n) + h(n), where g is the cost from start to n and h is a heuristic estimate to the goal.',
    'This is mainly used in order to find the best path from A to B, however it\'s not the most efficient way to do this. We rely on a heuristic (for example in a maze like graph, we might use Manhattan Distance) and it can seem inefficient in the way it works. I first came across this algorithm when I followed CS50\'s Introduction to Artificial Intelligence with AI course.'
  ]
);

// A few more to add

const algorithms = [
  // Graph
  ['Dijkstra\'s Algorithm', 'O(V + E log V)', 'O(V)', 'Graph',
   'Finds shortest paths from a source node to all others using a priority queue.',
   'Ideal for weighted graphs without negative edges. I used this in a pathfinding visualizer.'],

  ['Bellman-Ford', 'O(VE)', 'O(V)', 'Graph',
   'Handles negative weights and detects negative cycles.',
   'Slower than Dijkstra but more flexible. Great for teaching edge relaxation.'],

  ['Topological Sort', 'O(V + E)', 'O(V)', 'Graph',
   'Orders nodes in a DAG so that for every directed edge u → v, u comes before v.',
   'I used this for task scheduling in a build system simulation.'],

  // Heap
  ['Heap Sort', 'O(n log n)', 'O(1)', 'Heap',
   'Sorts an array by building a heap and repeatedly extracting the max/min.',
   'Efficient and in-place, but not stable. Good for teaching priority queues.'],

  ['Kth Largest Element', 'O(n log k)', 'O(k)', 'Heap',
   'Finds the kth largest element using a min-heap of size k.',
   'Used this in a coding interview prep—great for streaming data.'],

  ['Merge K Sorted Lists', 'O(n log k)', 'O(k)', 'Heap',
   'Merges multiple sorted lists using a min-heap.',
   'Classic LeetCode problem. I implemented this with custom comparator logic.'],

  // Tree
  ['Binary Search Tree (BST)', 'O(log n)', 'O(n)', 'Tree',
   'Stores ordered data with fast lookup, insert, and delete.',
   'I built a visual BST explorer to understand rotations and balancing.'],

  ['Trie Search', 'O(m)', 'O(m)', 'Tree',
   'Searches words in a prefix tree where m is the length of the word.',
   'Autocomplete’s best friend. I used this in a search bar project.'],

  ['Segment Tree', 'O(log n)', 'O(n)', 'Tree',
   'Supports efficient range queries and updates.',
   'Used this for a range sum query assignment—super powerful once you get it.'],

  // Stack
  ['Depth-First Search (DFS)', 'O(V + E)', 'O(V)', 'Stack',
   'Explores as far as possible along each branch before backtracking.',
   'I implemented this both recursively and with an explicit stack—great for maze solving.'],

  ['Balanced Parentheses', 'O(n)', 'O(n)', 'Stack',
   'Checks if a string of brackets is properly nested using a stack.',
   'Classic interview question. I added emoji brackets for fun.'],

  ['Evaluate Reverse Polish Notation', 'O(n)', 'O(n)', 'Stack',
   'Evaluates postfix expressions using a stack.',
   'I built a calculator that supports RPN—surprisingly intuitive once you get used to it.'],

  // Matrix
  ['Flood Fill', 'O(n)', 'O(n)', 'Matrix',
   'Fills connected regions in a 2D grid using DFS or BFS.',
   'Used this in a pixel art editor—super satisfying to watch it fill.'],

  ['Spiral Matrix Traversal', 'O(n)', 'O(1)', 'Matrix',
   'Traverses a matrix in spiral order.',
   'I used this to animate matrix traversal in a UI demo.'],

  ['Rotate Matrix 90°', 'O(n^2)', 'O(1)', 'Matrix',
   'Rotates a square matrix in-place by 90 degrees.',
   'Implemented this for a Tetris-like game board.']
];
    for (const algo of algorithms) {
    await client.query(
        `INSERT INTO algo (name, runtime, space, structure, description, comment)
        VALUES ($1, $2, $3, $4, $5, $6)`,
        algo
    );
    }
  await client.end();
  console.log("done");
}

main();