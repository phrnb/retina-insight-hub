
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContextualHelp } from "../common/ContextualHelp";
import { ResponsiveContainer, BarChart, Bar, AreaChart, Area, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";

interface DateRangeTabsProps {
  onPeriodChange?: (period: 'month' | 'halfYear' | 'year') => void;
}

const COLORS = ['#6E59A5', '#9b87f5', '#D3E4FD', '#E5DEFF'];

// Данные для разных периодов
const dataByPeriod = {
  month: {
    weeklyScans: [
      { day: "Пн", scans: 12 },
      { day: "Вт", scans: 19 },
      { day: "Ср", scans: 15 },
      { day: "Чт", scans: 22 },
      { day: "Пт", scans: 18 },
      { day: "Сб", scans: 8 },
      { day: "Вс", scans: 5 },
    ],
    diagnosisDistribution: [
      { name: "Глаукома", value: 35 },
      { name: "Диабетическая ретинопатия", value: 28 },
      { name: "ВМД", value: 22 },
      { name: "Катаракта", value: 15 },
    ],
    monthlyAnalytics: [
      { period: "1 нед", completed: 25, pending: 3 },
      { period: "2 нед", completed: 32, pending: 2 },
      { period: "3 нед", completed: 28, pending: 4 },
      { period: "4 нед", completed: 35, pending: 1 },
    ],
    accuracyTrend: [
      { period: "1 нед", accuracy: 92 },
      { period: "2 нед", accuracy: 94 },
      { period: "3 нед", accuracy: 93 },
      { period: "4 нед", accuracy: 95 },
    ]
  },
  halfYear: {
    weeklyScans: [
      { day: "Янв", scans: 142 },
      { day: "Фев", scans: 159 },
      { day: "Мар", scans: 175 },
      { day: "Апр", scans: 188 },
      { day: "Май", scans: 205 },
      { day: "Июн", scans: 198 },
    ],
    diagnosisDistribution: [
      { name: "Глаукома", value: 32 },
      { name: "Диабетическая ретинопатия", value: 30 },
      { name: "ВМД", value: 25 },
      { name: "Катаракта", value: 13 },
    ],
    monthlyAnalytics: [
      { period: "Янв", completed: 130, pending: 12 },
      { period: "Фев", completed: 145, pending: 14 },
      { period: "Мар", completed: 160, pending: 15 },
      { period: "Апр", completed: 172, pending: 16 },
      { period: "Май", completed: 190, pending: 15 },
      { period: "Июн", completed: 182, pending: 16 },
    ],
    accuracyTrend: [
      { period: "Янв", accuracy: 88 },
      { period: "Фев", accuracy: 90 },
      { period: "Мар", accuracy: 92 },
      { period: "Апр", accuracy: 93 },
      { period: "Май", accuracy: 94 },
      { period: "Июн", accuracy: 95 },
    ]
  },
  year: {
    weeklyScans: [
      { day: "Q1", scans: 476 },
      { day: "Q2", scans: 591 },
      { day: "Q3", scans: 623 },
      { day: "Q4", scans: 658 },
    ],
    diagnosisDistribution: [
      { name: "Глаукома", value: 30 },
      { name: "Диабетическая ретинопатия", value: 32 },
      { name: "ВМД", value: 26 },
      { name: "Катаракта", value: 12 },
    ],
    monthlyAnalytics: [
      { period: "Q1", completed: 435, pending: 41 },
      { period: "Q2", completed: 547, pending: 44 },
      { period: "Q3", completed: 580, pending: 43 },
      { period: "Q4", completed: 615, pending: 43 },
    ],
    accuracyTrend: [
      { period: "Q1", accuracy: 89 },
      { period: "Q2", accuracy: 92 },
      { period: "Q3", accuracy: 94 },
      { period: "Q4", accuracy: 95 },
    ]
  }
};

export function DateRangeTabs({ onPeriodChange }: DateRangeTabsProps) {
  const handleTabChange = (value: string) => {
    onPeriodChange?.(value as 'month' | 'halfYear' | 'year');
  };

  return (
    <Tabs defaultValue="month" onValueChange={handleTabChange} className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Аналитика по периодам</h2>
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="month">Месяц</TabsTrigger>
          <TabsTrigger value="halfYear">Полгода</TabsTrigger>
          <TabsTrigger value="year">Год</TabsTrigger>
        </TabsList>
      </div>

      {Object.entries(dataByPeriod).map(([period, data]) => (
        <TabsContent key={period} value={period} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-md font-medium">
                  Анализ сканов за {period === 'month' ? 'месяц' : period === 'halfYear' ? 'полгода' : 'год'}
                </CardTitle>
                <ContextualHelp 
                  title="Анализ сканов"
                  content={`График показывает количество проанализированных сканов глаз за ${period === 'month' ? 'текущий месяц' : period === 'halfYear' ? 'последние полгода' : 'текущий год'}.`}
                />
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.weeklyScans}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-background border rounded p-2 shadow">
                                <p className="font-medium">{`${payload[0].payload.day}: ${payload[0].value} сканов`}</p>
                              </div>
                            );
                          }
                          return null;
                        }} 
                      />
                      <Bar dataKey="scans" fill="#6E59A5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-md font-medium">
                  Распределение диагнозов
                </CardTitle>
                <ContextualHelp 
                  title="Распределение диагнозов"
                  content={`Распределение диагнозов среди всех пациентов за ${period === 'month' ? 'текущий месяц' : period === 'halfYear' ? 'последние полгода' : 'текущий год'}.`}
                />
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.diagnosisDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {data.diagnosisDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-background border rounded p-2 shadow">
                                <p className="font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
                              </div>
                            );
                          }
                          return null;
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {data.diagnosisDistribution.map((item, index) => (
                      <div key={item.name} className="flex items-center text-xs">
                        <div 
                          className="w-3 h-3 mr-1 rounded-sm" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-md font-medium">
                  Аналитика за период
                </CardTitle>
                <ContextualHelp 
                  title="Аналитика за период"
                  content="Сравнение завершенных и ожидающих анализов за выбранный период."
                />
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.monthlyAnalytics}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="period" />
                      <YAxis />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-background border rounded p-2 shadow">
                                <p className="font-medium">{payload[0].payload.period}</p>
                                <p className="text-sm text-primary">Завершено: {payload[0].value}</p>
                                <p className="text-sm text-muted-foreground">Ожидает: {payload[1].value}</p>
                              </div>
                            );
                          }
                          return null;
                        }} 
                      />
                      <Area type="monotone" dataKey="completed" stroke="#6E59A5" fill="#9b87f5" fillOpacity={0.3} />
                      <Area type="monotone" dataKey="pending" stroke="#E5DEFF" fill="#E5DEFF" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-center gap-4 mt-2">
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 mr-1 rounded-sm bg-primary" />
                    <span>Завершено</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 mr-1 rounded-sm bg-muted" />
                    <span>Ожидает</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-md font-medium">
                  Тренд точности диагностики
                </CardTitle>
                <ContextualHelp 
                  title="Тренд точности"
                  content="Тренд точности диагностики за выбранный период."
                />
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.accuracyTrend}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="period" />
                      <YAxis domain={[80, 100]} />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-background border rounded p-2 shadow">
                                <p className="font-medium">{payload[0].payload.period}</p>
                                <p className="text-sm">{`Точность: ${payload[0].value}%`}</p>
                              </div>
                            );
                          }
                          return null;
                        }} 
                      />
                      <Line type="monotone" dataKey="accuracy" stroke="#6E59A5" strokeWidth={2} dot={{ fill: "#6E59A5" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
