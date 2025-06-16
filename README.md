# BetterUptime - Website Monitoring Platform

BetterUptime is a robust website monitoring platform that helps you track the uptime and performance of your websites in real-time. Built with modern technologies and a distributed architecture, it provides reliable monitoring with instant notifications when your websites experience downtime.

## Features

- Real-time website monitoring
- Response time tracking
- Beautiful dashboard interface
- Distributed monitoring system using message queues
- Email notifications for website downtime
- Scalable architecture ready for growth
- Secure authentication with Google OAuth Using Better Auth

## Tech Stack

- **Frontend**: Next.js with TypeScript
- **API Server**: Bun with TypeScript
- **Google OAuth**: Better Auth
- **Worker**: TypeScript (with planned Go migration)
- **Message Queue**: RabbitMQ (Queue 1 to send jobs to worker)
- **Email Service**: Nodemailer with Gmail SMTP
- **Database**: PostgreSQL with Prisma
- **Package Management**: bun with Turborepo

## Getting Started

### Prerequisites

- Node.js 22 or higher
- bun
- Bun runtime
- RabbitMQ (or CloudAMQP account)
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
RABBITMQ_URL=your_cloudamqp_url
EMAIL_USER=your_gmail_address
EMAIL_PASSWORD=your_gmail_app_password
```

4. Start the development servers:
```bash
bun dev
```

This will start:
- Web interface on http://localhost:3000
- API server on http://localhost:3001
- Worker service for processing monitoring tasks and sending email notifications

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

3. **Worker**:
   - Consumes monitoring tasks from RabbitMQ
   - Performs actual website status checks
   - Reports status and response times back to DB
   - Sends email notifications when websites go down
   - Handles email delivery through Gmail SMTP

4. **Message Queues**:
   - RabbitMQ for monitoring tasks
   - Email alerts

5. **Monitored Websites**:
   - External websites being monitored
   - Status checks performed every 5 minutes
   - Response times recorded for performance tracking
   - Email alerts sent on downtime detection

Key components:
1. **Web Interface**: React-based dashboard for managing monitored websites and viewing their status
2. **API Server**: Handles website management and publishes monitoring tasks with user email info
3. **RabbitMQ**: Message queue for distributing monitoring tasks
4. **Worker Service**: Consumes monitoring tasks, performs website checks, and sends notifications
5. **PostgreSQL**: Stores website data, monitoring history, and user information
6. **Email Service**: Handles downtime notifications via Gmail SMTP

## Development

### Project Structure
```
apps/
  ├── web/          # Next.js frontend
  ├── api/          # Bun/TypeScript API server
  └── worker/       # TypeScript monitoring worker with email notifications
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
- Redis-based notification queue for improved scalability
- Multiple notification channels:
  - Enhanced email notifications:
    - Customizable email templates
    - Website recovery (up) notifications
    - HTML email support with branding
    - Notification batching for multiple events
    - Future Redis Queue for enhanced notifications:
     - Email notifications with templates
     - WhatsApp alerts

  - WhatsApp integration for instant alerts
  - SMS/Voice call alerts for critical outages
  - Webhook support for custom integrations
- Notification rate limiting and batching
- Custom notification rules and schedules
- Notification preferences per user/website

### Monitoring Enhancements
- Time Series DB 
- Monitoring History
- Advanced email reporting:
  - Weekly/monthly uptime reports
  - Performance trend analysis
  - Custom alert thresholds
  - Scheduled maintenance windows
