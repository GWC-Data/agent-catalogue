import React from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

interface TicketsCardProps {
  tickets: {
    ticket_id: string
    category: string
    urgency: string
    description: string
    recommended_resolution: {
      summary: string
      steps: string[]
    }
    assigned_resolver: {
      assigned_resolver: string
    }
  }[]
}

export const TicketsCard: React.FC<TicketsCardProps> = ({ tickets }) => {
  return (
    <div className="w-full grid grid-cols-3 gap-4">
      {tickets.map((ticket) => (
        <div
          key={ticket.ticket_id}
          className="border rounded-md shadow-sm bg-white p-4 space-y-3"
        >
          {/* HEADER INFO */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-sm">{ticket.ticket_id}</div>
              <div className="text-xs text-gray-500 capitalize">
                {ticket.category}
              </div>
            </div>

            <Badge
              variant={
                ticket.urgency === "P1"
                  ? "destructive"
                  : ticket.urgency === "P2"
                  ? "secondary"
                  : "outline"
              }
            >
              {ticket.urgency}
            </Badge>
          </div>

          {/* ISSUE */}
          <div>
            <div className="font-medium text-sm mb-1">Issue</div>
            <p className="text-sm text-gray-600">{ticket.description}</p>
          </div>

          {/* 🔽 DROPDOWNS — PER CARD ACCORDION */}
          <Accordion type="multiple" className="space-y-2">
            {/* SUMMARY */}
            <AccordionItem
              value={`summary-${ticket.ticket_id}`}
              className="border rounded-md px-3"
            >
              <AccordionTrigger className="text-sm font-medium hover:no-underline">
                Resolution Summary
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-gray-600">
                  {ticket.recommended_resolution.summary}
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* STEPS */}
            <AccordionItem
              value={`steps-${ticket.ticket_id}`}
              className="border rounded-md px-3"
            >
              <AccordionTrigger className="text-sm font-medium hover:no-underline">
                Steps to Resolve
              </AccordionTrigger>
              <AccordionContent>
                <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                  {ticket.recommended_resolution.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* FOOTER */}
          <div className="flex justify-end text-xs text-gray-500 pt-2">
            Resolver: {ticket.assigned_resolver.assigned_resolver}
          </div>
        </div>
      ))}
    </div>
  )
}
