const log = require('./logging_middleware/logger');

async function runTest() {
    console.log("Attempting to send a test log...");
    
    
    await log(
        "backend",    
        "info",       
        "controller", 
        "Testing the logging middleware connection" 
    );
}

runTest();