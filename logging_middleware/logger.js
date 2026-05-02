const log = async (stack, level, pkg, message) => {
    const url = "http://20.207.122.201/evaluation-service/logs";
    const payload = {
        stack: stack,   
        level: level,    
        package: pkg,    
        message: message
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrYjQxMjdAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMDQwMiwiaWF0IjoxNzc3Njk5NTAyLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZGFhMjVjNjEtM2ZjYi00ODBhLWFhODgtMmQ1OTFlNjI4OWUwIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoia2FtYWxhZGRpdGhhbnNiIiwic3ViIjoiYjQ4ZjQxNzEtZjg4NS00Y2ViLThhMmItMjcxYTg5ZDk0NDRiIn0sImVtYWlsIjoia2I0MTI3QHNybWlzdC5lZHUuaW4iLCJuYW1lIjoia2FtYWxhZGRpdGhhbnNiIiwicm9sbE5vIjoicmEyMzExMDAzMDIwMDMzIiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiYjQ4ZjQxNzEtZjg4NS00Y2ViLThhMmItMjcxYTg5ZDk0NDRiIiwiY2xpZW50U2VjcmV0IjoicXJIU3BOd2tRV3lmeGVQUSJ9.yQ5v6ICs-ayFGgg-FBcNn3fiEGtvXM6VGdrNzQIafVY',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
            
        });

        if (response.ok) {
            console.log(`Log synced: ${message}`);
        }
    } catch (error) {
        console.error("Logging failed:", error);
    }
};

module.exports = log;