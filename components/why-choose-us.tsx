"use client"

import { motion } from "framer-motion"
import { Award, Clock, Globe, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Reliability",
      description: "99.8% on-time delivery rate with real-time tracking and notifications",
      value: "99.8%",
      label: "On-time delivery",
    },
    {
      icon: <Globe className="h-10 w-10" />,
      title: "Global Network",
      description: "Extensive network covering 150+ countries with local expertise",
      value: "150+",
      label: "Countries served",
    },
    {
      icon: <Clock className="h-10 w-10" />,
      title: "Fast Turnaround",
      description: "Expedited shipping options with priority handling for urgent cargo",
      value: "24/7",
      label: "Support available",
    },
    {
      icon: <Award className="h-10 w-10" />,
      title: "Technology-Driven",
      description: "AI-powered route optimization and predictive analytics for efficient delivery",
      value: "30%",
      label: "Faster than average",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="h-full border-border/50 overflow-hidden">
            <CardHeader className="pb-2">
              <motion.div
                className="p-2 rounded-full w-16 h-16 flex items-center justify-center mb-2 bg-primary/10 text-primary"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                {feature.icon}
              </motion.div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-base">{feature.description}</CardDescription>
              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <motion.span
                  className="text-3xl font-bold text-primary"
                  whileInView={{
                    opacity: [0, 1],
                    y: [20, 0],
                  }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  {feature.value}
                </motion.span>
                <span className="text-sm text-muted-foreground">{feature.label}</span>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
