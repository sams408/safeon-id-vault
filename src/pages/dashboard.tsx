
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, Package, Lock, ShieldCheck, Activity, Globe } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line
} from "recharts";

const monthlyActivityData = [
  { name: 'Ene', Clientes: 5, Items: 25, UUIDs: 65 },
  { name: 'Feb', Clientes: 6, Items: 32, UUIDs: 78 },
  { name: 'Mar', Clientes: 7, Items: 27, UUIDs: 82 },
  { name: 'Abr', Clientes: 8, Items: 35, UUIDs: 90 },
  { name: 'May', Clientes: 10, Items: 32, UUIDs: 110 },
  { name: 'Jun', Clientes: 11, Items: 42, UUIDs: 125 }
];

const geographicDistributionData = [
  { country: 'Colombia', value: 45 },
  { country: 'México', value: 30 },
  { country: 'Otros', value: 25 }
];

const MetricCard = ({ 
  icon: Icon, 
  title, 
  value, 
  description, 
  iconColor 
}: { 
  icon: React.ElementType; 
  title: string; 
  value: string; 
  description: string; 
  iconColor: string; 
}) => (
  <Card>
    <CardContent className="p-6 flex flex-col">
      <div className="flex items-center mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconColor}`}>
          <Icon size={20} className="text-white" />
        </div>
        <span className="ml-3 text-sm font-medium text-gray-500">{title}</span>
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-label">{description}</div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          icon={Building2} 
          title="Clientes" 
          value="12" 
          description="Total de clientes activos" 
          iconColor="bg-safeon-500"
        />
        <MetricCard 
          icon={Users} 
          title="Usuarios" 
          value="48" 
          description="Usuarios registrados en el sistema" 
          iconColor="bg-sky-500"
        />
        <MetricCard 
          icon={Package} 
          title="Items" 
          value="156" 
          description="Items registrados en la plataforma" 
          iconColor="bg-amber-500"
        />
        <MetricCard 
          icon={Lock} 
          title="UUIDs" 
          value="543" 
          description="Identificadores únicos generados" 
          iconColor="bg-red-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="section-title">
              <Activity size={18} />
              <span>Actividad Mensual</span>
            </div>
            <p className="text-sm text-gray-500 mb-6">Resumen de actividad en los últimos 6 meses</p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyActivityData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Clientes" fill="#0ea5e9" />
                  <Bar dataKey="Items" fill="#f59e0b" />
                  <Bar dataKey="UUIDs" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="section-title">
              <ShieldCheck size={18} className="text-success-500" />
              <span>Estado de Seguridad</span>
            </div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-success-50 flex items-center justify-center mr-4">
                <ShieldCheck size={24} className="text-success-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-success-600">Óptimo</h3>
                <p className="text-sm text-gray-500">Todos los sistemas funcionando correctamente</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Encriptación</span>
                  <span className="text-xs text-success-600 font-medium">Activa (AES-256)</span>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Última auditoría</span>
                  <span className="text-xs text-gray-600">Hace 3 días</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="section-title">
            <Globe size={18} />
            <span>Distribución geográfica</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={geographicDistributionData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="country" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#10b981" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {geographicDistributionData.map((item) => (
                <div key={item.country} className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    item.country === 'Colombia' ? 'bg-success-500' :
                    item.country === 'México' ? 'bg-success-400' : 'bg-amber-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{item.country}</span>
                      <span className="text-sm font-medium">{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${
                        item.country === 'Colombia' ? 'bg-success-500' :
                        item.country === 'México' ? 'bg-success-400' : 'bg-amber-500'
                      }`} style={{ width: `${item.value}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
