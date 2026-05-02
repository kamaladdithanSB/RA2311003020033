# Campus Microservices Suite

This repository houses a comprehensive suite of microservices designed for a campus ecosystem, focusing on optimized vehicle maintenance and real-time student notification management.

## Core Implementations

### 1. Campus Notifications Microservice
A scalable system for delivering real-time updates to students regarding Placements, Results, and Events.

- **Weighted Priority Inbox**: Implements an algorithm to sort notifications based on critical importance (Placement > Result > Event) and chronological recency.
- **System Architecture**: Designed for high performance using PostgreSQL for data integrity and Redis for sub-millisecond retrieval of unread alerts.
- **Reliability**: Features an asynchronous redesign utilizing Message Queues (RabbitMQ/Kafka) to handle bulk notification bursts of 50,000+ users without system blocking.

### 2. Vehicle Maintenance Scheduler
An optimization engine built to manage logistics depot tasks efficiently.

- **Optimization Logic**: Utilizes a sophisticated algorithm to maximize the operational impact score of maintenance tasks within a fixed daily mechanic-hour budget.
- **Scalability**: The solution is architected to handle large-scale task inputs and varied depot constraints dynamically.

### 3. Centralized Logging Middleware
A mandatory monitoring layer integrated across all services.

- **Standardized Logging**: Captures structured logs for system events, informational shifts, and critical errors to ensure full observability.
- **Performance Monitoring**: Tracks microservice health and API interaction times.

##Execution Results

### Priority Inbox Output
The terminal output below demonstrates the weighted sorting logic successfully identifying the Top 10 most critical notifications for a student.

![Priority Inbox Output](priority_output.png)

### API Verification
Verified system connectivity and data structure through standardized API client testing, ensuring 200 OK responses and optimal response times.

| API | Screenshot |
|-----|-------------|
| Notifications API | ![Notifications API](notifications_api_postman_output.png) |
| Depots API | ![Depots API](depots_api_postman_output.png) |
| priority_output | ![priority_output](priority_output.png) |
| Vehicle Maintenance API | ![Vehicle Maintenance API](vehicle_maintenance_scheduler_output4.png) |

## Repository Structure

logging_middleware/ # Centralized logging logic
notification_app_be/ # Backend logic for the Priority Inbox
vehicle_maintenance_scheduler/# Optimization algorithms for logistics
notification_system_design.md # Detailed architectural design and scaling strategies


## Getting Started

### Prerequisites
- Node.js / Python (depending on service)
- PostgreSQL
- Redis
- RabbitMQ or Kafka (for bulk notifications)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-repo/campus-microservices.git

# Navigate to individual services
cd notification_app_be
npm install   # or pip install -r requirements.txt

# Configure environment variables
cp .env.example .env

# Run database migrations
npm run migrate

# Start the service
npm start
