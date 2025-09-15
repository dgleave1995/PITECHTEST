import flights from "@/configs/flights.json";

/**
 * Calculate return vehicle cost (distance doubled, parking only once)
 */
function getVehicleReturnCost(passengers, distance) {
  const carCapacity = 4;
  const taxiRate = 0.4;
  const carRate = 0.2;
  const parkingFee = 3;

  if (passengers <= carCapacity) {
    const carCost = distance * 2 * carRate + parkingFee; // round trip, parking once
    const taxiCost = distance * 2 * taxiRate;
    return carCost <= taxiCost
      ? { vehicle: "Car", cost: carCost }
      : { vehicle: "Taxi", cost: taxiCost };
  } else {
    const taxisNeeded = Math.ceil(passengers / carCapacity);
    return { vehicle: "Taxi", cost: taxisNeeded * distance * 2 * taxiRate };
  }
}

/**
 * Build adjacency list from flights array
 */
function buildGraph() {
  const graph = {};
  flights.forEach((flight) => {
    const from = flight[0];
    const to = flight[1];
    const distance = parseInt(flight.slice(2));
    if (!graph[from]) graph[from] = [];
    graph[from].push({ to, distance, code: flight });
  });
  return graph;
}

/**
 * Find multiple flight routes (cheapest first) using Dijkstra-like search
 */
function findRoutes(graph, start, end, passengers, limit = 3) {
  const queue = [{ node: start, cost: 0, path: [] }];
  const results = [];
  const visited = {};

  while (queue.length > 0) {
    // sort by lowest cost
    queue.sort((a, b) => a.cost - b.cost);
    const { node, cost, path } = queue.shift();

    // reached destination
    if (node === end) {
      results.push({ cost, path: [...path] });
      if (results.length >= limit) break; // stop after N routes
      continue;
    }

    // skip worse paths
    if (visited[node] !== undefined && visited[node] <= cost) continue;
    visited[node] = cost;

    const edges = graph[node] || [];
    edges.forEach((e) => {
      queue.push({
        node: e.to,
        cost: cost + e.distance * 0.1 * passengers, // flight cost = 0.1 × miles × passengers
        path: [...path, e.code],
      });
    });
  }

  // no route found
  if (results.length === 0) {
    return [{ route: "No flight", cost: 0, steps: [] }];
  }

  // map to richer objects
  return results.map((r) => ({
    route: r.path.join("--"),
    cost: r.cost,
    steps: r.path,
  }));
}

/**
 * Calculate journey suggestions for multiple journeys
 */
function calculateJourneySuggestions(journeys) {
  const graph = buildGraph();

  return journeys.map((j) => {
    const distanceToAirport = parseInt(j.homeToAirport.slice(1));
    const vehicle = getVehicleReturnCost(j.passengers, distanceToAirport);

    const homeAirport = j.homeToAirport[0];

    // find outbound & inbound routes (with alternatives)
    const outboundRoutes = findRoutes(
      graph,
      homeAirport,
      j.destination,
      j.passengers
    );
    const inboundRoutes = findRoutes(
      graph,
      j.destination,
      homeAirport,
      j.passengers
    );

    const outbound = outboundRoutes[0]; // cheapest
    const inbound = inboundRoutes[0]; // cheapest

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
