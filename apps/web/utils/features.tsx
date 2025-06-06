import { 
    Activity, 
    Bell, 
    BarChart4,
    Clock,
    Shield,
    Zap
} from "lucide-react" 

export const features = [
    {
        icon: <Activity className="w-6 h-6 text-green-500" />,
        title: "Real-time Monitoring",
        description: "Monitor your website's uptime with instant notifications when issues arise."
    },
    {
        icon: <Bell className="w-6 h-6 text-green-500" />,
        title: "Instant Alerts",
        description: "Get notified immediately through multiple channels when your site goes down."
    },
    {
        icon: <BarChart4 className="w-6 h-6 text-green-500" />,
        title: "Detailed Analytics",
        description: "Comprehensive insights into your website's performance and uptime history."
    },
    {
        icon: <Clock className="w-6 h-6 text-green-500" />,
        title: "24/7 Monitoring",
        description: "Round-the-clock monitoring ensures you never miss any downtime."
    },
    {
        icon: <Shield className="w-6 h-6 text-green-500" />,
        title: "Security Checks",
        description: "Regular security scans to keep your website protected."
    },
    {
        icon: <Zap className="w-6 h-6 text-green-500" />,
        title: "Fast Response",
        description: "Quick response times and immediate issue detection."
    }
];