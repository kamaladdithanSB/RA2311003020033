const log = require('../logging_middleware/logger');

const BASE_URL = "http://20.207.122.201/evaluation-service";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrYjQxMjdAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMTg0NywiaWF0IjoxNzc3NzAwOTQ3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNjgyNGQxYTctOGEwNi00ZjU4LTgyZWYtNzQyMTg2ZGE3ZmU1IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoia2FtYWxhZGRpdGhhbnNiIiwic3ViIjoiYjQ4ZjQxNzEtZjg4NS00Y2ViLThhMmItMjcxYTg5ZDk0NDRiIn0sImVtYWlsIjoia2I0MTI3QHNybWlzdC5lZHUuaW4iLCJuYW1lIjoia2FtYWxhZGRpdGhhbnNiIiwicm9sbE5vIjoicmEyMzExMDAzMDIwMDMzIiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiYjQ4ZjQxNzEtZjg4NS00Y2ViLThhMmItMjcxYTg5ZDk0NDRiIiwiY2xpZW50U2VjcmV0IjoicXJIU3BOd2tRV3lmeGVQUSJ9.M7JcyhL0zgT1x1db9dRzAFOCdfn7C460tYlMTqND6uk"; 

async function runScheduler() {
    try {
        await log("backend", "info", "service", "Fetching data for optimization");

        const headers = { 
            'Authorization': `Bearer ${TOKEN}`,
            'Content-Type': 'application/json'
        };

        // 1. Fetch Data
        const [depotsRes, vehiclesRes] = await Promise.all([
            fetch(`${BASE_URL}/depots`, { headers }),
            fetch(`${BASE_URL}/vehicles`, { headers })
        ]);

        const depotsData = await depotsRes.json();
        const vehiclesData = await vehiclesRes.json();

        // Check if data exists before mapping
        if (!depotsData.depots || !vehiclesData.vehicles) {
            console.error("API Error Response:", { depotsData, vehiclesData });
            await log("backend", "error", "service", "Invalid API response structure");
            return;
        }

        const { depots } = depotsData;
        const { vehicles } = vehiclesData;

        // 2. Process each Depot (Knapsack)
        const results = depots.map(depot => {
            const capacity = depot.MechanicHours;
            const n = vehicles.length;
            const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));

            for (let i = 1; i <= n; i++) {
                const { Duration, Impact } = vehicles[i - 1];
                for (let w = 0; w <= capacity; w++) {
                    if (Duration <= w) {
                        dp[i][w] = Math.max(Impact + dp[i - 1][w - Duration], dp[i - 1][w]);
                    } else {
                        dp[i][w] = dp[i - 1][w];
                    }
                }
            }

            let w = capacity;
            const selectedTasks = [];
            for (let i = n; i > 0 && w > 0; i--) {
                if (dp[i][w] !== dp[i - 1][w]) {
                    selectedTasks.push(vehicles[i - 1].TaskID);
                    w -= vehicles[i - 1].Duration;
                }
            }
            return { depotID: depot.ID, selectedTasks };
        });

        console.log("SUCCESS! Optimization results:");
        console.log(JSON.stringify(results, null, 2));
        await log("backend", "info", "service", "Successfully scheduled vehicle maintenance");

    } catch (error) {
        console.error("Critical Error:", error);
        await log("backend", "error", "service", `Scheduler exception: ${error.message}`);
    }
}

runScheduler();