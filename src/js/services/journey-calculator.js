import flights from "@/configs/flights.json";

/**
 * Decide whether to use a car or taxi for a round trip to the airport,
 * and calculate the cost.
 *
 * - Cars: pay per mile (cheaper rate), but also a parking fee.
 * - Taxis: more expensive per mile, but no parking fee.
 * - If more than 4 passengers, taxis are required (multiple if needed).
 */
function getVehicleReturnCost(passengers, distance) {
  const carCapacity = 4;
  const taxiRate = 0.4;   // cost per mile per passenger group (taxi)
  const carRate = 0.2;    // cost per mile (car, flat rate)
  const parkingFee = 3;   // one-time parking charge at airport

  if (passengers <= carCapacity) {
    // Single car can fit everyone
    const carCost = distance * 2 * carRate + parkingFee; // round trip + parking once
    const taxiCost = distance * 2 * taxiRate;            // taxi, no parking

    // Pick whichever is cheaper
    return carCost <= taxiCost
      ? { vehicle: "Car", cost: carCost }
      : { vehicle: "Taxi", cost: taxiCost };

  } else {
    // Too many passengers → need multiple taxis
    const taxisNeeded = Math.ceil(passengers / carCapacity);
    return { vehicle: "Taxi", cost: taxisNeeded * distance * 2 * taxiRate };
  }
}

/**
 * Convert the flat flights list into a graph (adjacency list).
 *
 * Each entry in `flights.json` looks like "AB120":
 * - First letter = origin airport
 * - Second letter = destination airport
 * - Rest = distance in miles
 *
 * Example: "AB120" → from A → B, distance 120
 */
function buildGraph() {
  const graph = {};
  flights.forEach((flight) => {
    const from = flight[0];                   // origin airport code
    const to = flight[1];                     // destination airport code
    const distance = parseInt(flight.slice(2)); // distance in miles

    if (!graph[from]) graph[from] = [];
    graph[from].push({ to, distance, code: flight });
  });
  return graph;
}

/**
 * Find up to N cheapest routes between two airports.
 *
 * Uses a simplified Dijkstra-like algorithm:
 * - Expands paths starting from the cheapest so far.
 * - Stops once enough valid routes are found (default 3).
 *
 * Flight cost formula:
 *   cost = distance × 0.1 × passengers
 */
function findRoutes(graph, start, end, passengers, limit = 3) {
  const queue = [{ node: start, cost: 0, path: [] }];
  const results = [];
  const visited = {};

  while (queue.length > 0) {
    // Always process the cheapest route next
    queue.sort((a, b) => a.cost - b.cost);
    const { node, cost, path } = queue.shift();

    // Reached the destination
    if (node === end) {
      results.push({ cost, path: [...path] });
      if (results.length >= limit) break; // stop once we have enough routes
      continue;
    }

    // Skip if we’ve already reached this node with a cheaper path
    if (visited[node] !== undefined && visited[node] <= cost) continue;
    visited[node] = cost;

    // Explore outbound flights from this airport
    const edges = graph[node] || [];
    edges.forEach((e) => {
      queue.push({
        node: e.to,
        cost: cost + e.distance * 0.1 * passengers, // per-passenger cost
        path: [...path, e.code],
      });
    });
  }

  // No valid path found
  if (results.length === 0) {
    return [{ route: "No flight", cost: 0, steps: [] }];
  }

  // Format results into easy-to-read objects
  return results.map((r) => ({
    route: r.path.join("--"), // string like "AB120--BC200"
    cost: r.cost,
    steps: r.path,
  }));
}

/**
 * Suggest full travel plans for a list of journeys.
 *
 * Each journey includes:
 * - homeToAirport (e.g. "A50": from home to airport A, 50 miles)
 * - destination (airport code, e.g. "C")
 * - passengers (number of travelers)
 *
 * Output for each journey:
 * - Cheapest vehicle (car/taxi) and cost
 * - Cheapest outbound + inbound flight routes (with alternatives)
 * - Total cost of whole trip
 */
function calculateJourneySuggestions(journeys) {
  const graph = buildGraph();

  return journeys.map((journey) => {
    // Distance from home to airport is in the digits after the first char
    const distanceToAirport = parseInt(journey.homeToAirport.slice(1));
    // Cheapest vehicle option (car/taxi)
    const vehicle = getVehicleReturnCost(journey.passengers, distanceToAirport);

    const homeAirport = journey.homeToAirport[0];

    // Outbound journey options
    const outboundRoutes = findRoutes(
      graph,
      homeAirport,
      journey.destination,
      journey.passengers
    );
    // Return journey options
    const inboundRoutes = findRoutes(
      graph,
      journey.destination,
      homeAirport,
      journey.passengers
    );

    // Cheapest outbound + inbound
    const outbound = outboundRoutes[0];
    const inbound = inboundRoutes[0];

    // If flights exist both ways, add up costs
    const totalCost =
      outbound.route !== "No flight" && inbound.route !== "No flight"
        ? vehicle.cost + outbound.cost + inbound.cost
        : 0;

    return {
      vehicle: vehicle.vehicle,
      vehicleReturnCost: vehicle.cost,

      outboundRoute: outbound.route,
      outboundCost: outbound.cost,
      outboundSteps: outbound.steps,
      outboundAlternatives: outboundRoutes,

      inboundRoute: inbound.route,
      inboundCost: inbound.cost,
      inboundSteps: inbound.steps,
      inboundAlternatives: inboundRoutes,

      totalCost,
    };
  });
}

export default {
  calculateJourneySuggestions,
  getVehicleReturnCost,
  findRoutes,
};
