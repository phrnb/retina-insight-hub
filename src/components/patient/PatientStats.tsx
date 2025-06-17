
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area } from "recharts";

const monthlyPatients = [
  { month: "Янв", new: 15, total: 180 },
  { month: "Фев", new: 22, total: 202 },
  { month: "Мар", new: 18, total: 220 },
  { month: "Апр", new: 25, total: 245 },
  { month: "Май", new: 19, total: 264 },
  { month: "Июн", new: 28, total: 292 },
];

const statusTrend = [
  { month: "Янв", stable: 45, improving: 25, deteriorating: 15, critical: 8 },
  { month: "Фев", stable: 48, improving: 28, deteriorating: 12, critical: 6 },
  { month: "Мар", stable: 52, improving: 30, deteriorating: 10, critical: 5 },
  { month: "Апр", stable: 55, improving: 32, deteriorating: 8, critical: 4 },
  { month: "Май", stable: 58, improving: 35, deteriorating: 7, critical: 3 },
  { month: "Июн", stable: 62, improving: 38, deteriorating: 6, critical: 2 },
];

const chartConfig = {
  stable: { label: "Стабильные", color: "#6E59A5" },
  improving: { label: "Улучшение", color: "#9b87f5" },
  deteriorating: { label: "Ухудшение", color: "#D3E4FD" },
  critical: { label: "Критические", color: "#E5DEFF" },
};

export function PatientStats() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Динамика пациентов</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyPatients}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="total" stroke="#6E59A5" strokeWidth={2} dot={{ fill: "#6E59A5" }} />
                <Line type="monotone" dataKey="new" stroke="#9b87f5" strokeWidth={2} dot={{ fill: "#9b87f5" }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center text-sm">
              <div className="w-3 h-3 mr-2 rounded-sm bg-[#6E59A5]" />
              <span>Всего пациентов</span>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-3 h-3 mr-2 rounded-sm bg-[#9b87f5]" />
              <span>Новые пациенты</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Статусы пациентов по месяцам</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={statusTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="stable" stackId="1" stroke="#6E59A5" fill="#6E59A5" fillOpacity={0.6} />
                <Area type="monotone" dataKey="improving" stackId="1" stroke="#9b87f5" fill="#9b87f5" fillOpacity={0.6} />
                <Area type="monotone" dataKey="deteriorating" stackId="1" stroke="#D3E4FD" fill="#D3E4FD" fillOpacity={0.6} />
                <Area type="monotone" dataKey="critical" stackId="1" stroke="#E5DEFF" fill="#E5DEFF" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="flex items-center justify-center gap-4 mt-4">
            {Object.entries(chartConfig).map(([key, config]) => (
              <div key={key} className="flex items-center text-sm">
                <div className="w-3 h-3 mr-2 rounded-sm" style={{ backgroundColor: config.color }} />
                <span>{config.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
