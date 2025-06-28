# BetterUptime - Website Monitoring Platform

BetterUptime is a robust website monitoring platform that helps you track the uptime and performance of your websites in real-time. Built with modern technologies and a distributed architecture, it provides reliable monitoring with instant notifications when your websites experience downtime.

# Demo
https://github.com/user-attachments/assets/b115c62a-99b5-4f0a-b3d3-3059a30492d8


## Features

- Real-time website monitoring
- Response time tracking
- Beautiful dashboard interface
- Distributed monitoring system using message queues
- Smart notification system:
  - Email notifications for website downtime and recovery
  - Redis-based email queue for reliable delivery
  - Automatic retries for failed notifications
- Scalable architecture ready for growth
- Secure authentication with Google OAuth Using Better Auth

## Tech Stack

- **Frontend**: Next.js with TypeScript
- **API Server**: Bun with TypeScript
- **Google OAuth**: Better Auth
- **Worker**: TypeScript (with planned Go migration)
- **Message Queues**: 
  - RabbitMQ for monitoring tasks
  - Redis for email notifications
- **Email Service**: Nodemailer with Gmail SMTP
- **Database**: PostgreSQL with Prisma
- **Package Management**: bun with Turborepo

## Getting Started

### Prerequisites

- Node.js 22 or higher
- bun
- Bun runtime
- RabbitMQ (or CloudAMQP account)
- Redis (for email queue)
- PostgreSQL database
- Gmail account for SMTP (with App Password)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Rudra-Sankha-Sinhamahapatra/Better-Uptime
cd Better-Uptime
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
# In apps/web/.env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

# In apps/api/.env
DATABASE_URL=your_database_url
RABBITMQ_URL=your_cloudamqp_url
PORT=3001

# In apps/worker/.env
DATABASE_URL=""
AMQP_URL="" # RabbitMQ URL
EMAIL_USER="" # Gmail address
EMAIL_PASSWORD="" # Gmail App password for nodemailer
REDIS_URL="redis://localhost:6379" # Redis URL for email queue
```

4. Start the development servers:
```bash
bun dev
```

This will start:
- Web interface on http://localhost:3000
- API server on http://localhost:3001
- Worker service for processing monitoring tasks and managing email notifications

## Architecture

The system is built with a distributed architecture to ensure reliability and scalability.

![System Architecture](assets/architecture.png)

The architecture consists of several key components working together:

1. **Backend (BE)**: 
   - Runs a 5-minute cron job to check website status
   - Manages website monitoring tasks
   - Sends batch monitoring jobs to RabbitMQ
   - Includes user email in monitoring messages for notifications

2. **Database (DB)**:
   - Stores website information
   - Records monitoring history and website ticks
   - Maintains response times and status data
   - Stores user information for notifications

3. **Worker**:
   - Consumes monitoring tasks from RabbitMQ
   - Performs actual website status checks
   - Reports status and response times back to DB
   - Manages email notifications through Redis queue:
     - Queues downtime notifications
     - Queues recovery notifications
     - Handles automatic retries
     - Provides reliable email delivery

4. **Message Queues**:
   - RabbitMQ for monitoring tasks
   - Redis for reliable email notification delivery:
     - Priority-based email queuing
     - Automatic retries with exponential backoff
     - Failed notification tracking

5. **Monitored Websites**:
   - External websites being monitored
   - Status checks performed every 5 minutes
   - Response times recorded for performance tracking
   - Smart notification system:
     - Downtime alerts
     - Recovery notifications
     - Automatic retry on delivery failure

Key components:
1. **Web Interface**: React-based dashboard for managing monitored websites and viewing their status
2. **API Server**: Handles website management and publishes monitoring tasks with user email info
3. **RabbitMQ**: Message queue for distributing monitoring tasks
4. **Redis**: Handles reliable email notification delivery with retries
5. **Worker Service**: Consumes monitoring tasks, performs website checks, and manages notifications
6. **PostgreSQL**: Stores website data, monitoring history, and user information
7. **Email Service**: Processes queued notifications via Gmail SMTP

## Development

### Project Structure
```
apps/
  ├── web/          # Next.js frontend
  ├── api/          # Bun/TypeScript API server
  └── worker/       # TypeScript monitoring worker with Redis-based notifications
packages/
  ├── db/           # Prisma schema and client
  ├── ui/           # Shared UI components
  └── config/       # Shared configuration
```

### Running Tests
Inside apps/tests
```bash
bun test
```

### Building for Production

```bash
bun run build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Future Improvements

### Enhanced Notification System
- Multiple notification channels:
  - Enhanced email notifications:
    - HTML email templates with rich formatting
    - Customizable notification templates
    - Batch notifications for multiple events
    - Weekly/monthly status reports
  - Additional channels:
    - WhatsApp integration
    - SMS alerts
    - Voice calls for critical outages
    - Webhook support
- Advanced notification features:
  - Rate limiting and throttling
  - Custom notification rules
  - Per-user notification preferences
  - Scheduled maintenance windows
  - Custom alert thresholds
  - Notification history and analytics

### Monitoring Enhancements
- Time Series DB for metrics
- Extended monitoring history
- Performance analytics:
  - Trend analysis
  - Uptime statistics
  - Response time graphs
  - Geographic monitoring distribution
