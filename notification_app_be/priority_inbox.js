const log = require('../logging_middleware/logger');

const API_URL = "http://20.207.122.201/evaluation-service/notifications";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrYjQxMjdAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMzI0MCwiaWF0IjoxNzc3NzAyMzQwLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZWViZDc3N2EtNTYyMy00YjgxLTgzMTMtZmZhOGNmNDM4ZGJiIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoia2FtYWxhZGRpdGhhbnNiIiwic3ViIjoiYjQ4ZjQxNzEtZjg4NS00Y2ViLThhMmItMjcxYTg5ZDk0NDRiIn0sImVtYWlsIjoia2I0MTI3QHNybWlzdC5lZHUuaW4iLCJuYW1lIjoia2FtYWxhZGRpdGhhbnNiIiwicm9sbE5vIjoicmEyMzExMDAzMDIwMDMzIiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiYjQ4ZjQxNzEtZjg4NS00Y2ViLThhMmItMjcxYTg5ZDk0NDRiIiwiY2xpZW50U2VjcmV0IjoicXJIU3BOd2tRV3lmeGVQUSJ9.XxYdp8MCLKCBY-MYbDbcynNze6EqRHjO3J437iieUhc"; 

async function fetchPriorityInbox() {
    try {
        await log("backend", "info", "service", "Executing Priority Inbox Logic for Stage 6");

        const response = await fetch(API_URL, {
            headers: { 'Authorization': `Bearer ${TOKEN}` }
        });
        const data = await response.json();

        // Safety Check: If the API returns an error or empty object
        if (!data || !data.notifications) {
            console.error("API ERROR:", data);
            await log("backend", "error", "service", "API returned invalid structure or unauthorized");
            return;
        }

        const weights = { "Placement": 3, "Result": 2, "Event": 1 };

        const sortedNotifications = data.notifications.sort((a, b) => {
            const weightA = weights[a.type] || 0;
            const weightB = weights[b.type] || 0;

            if (weightB !== weightA) {
                return weightB - weightA;
            }
            return new Date(b.Timestamp) - new Date(a.Timestamp);
        });

        const top10 = sortedNotifications.slice(0, 10);
        
        console.log("SUCCESS! TOP 10 PRIORITY NOTIFICATIONS:");
        console.table(top10); 

        await log("backend", "info", "service", "Successfully generated priority inbox");
    } catch (error) {
        await log("backend", "error", "service", `Priority Inbox Error: ${error.message}`);
        console.error("Critical Error:", error);
    }
}

fetchPriorityInbox();