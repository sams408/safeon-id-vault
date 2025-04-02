
import { useState } from "react";
import { Mail, User, Building, Phone, Lock, Save, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  // Placeholder data - would come from your auth context or API call
  const [user, setUser] = useState({
    id: "1",
    name: "Admin User",
    email: "admin@safeon.com",
    phone: "+1 555-123-4567",
    role: "Administrador",
    company: "SafeOn Technologies",
    created_at: "2023-08-15T10:30:00Z"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Here you would save the changes to your backend
    toast({
      title: "Perfil actualizado",
      description: "Tu información ha sido actualizada correctamente",
    });
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container max-w-6xl py-4 md:py-8">
      <h1 className="text-2xl font-bold mb-6">Perfil de Usuario</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - User card */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6 flex flex-col items-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarFallback className="text-4xl bg-safeon-600 text-white">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.role}</p>
            
            <div className="w-full mt-6">
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <span>{user.email}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <span>{user.phone}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-gray-500" />
                  <span>{user.company}</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <p className="text-sm text-gray-500">
                Miembro desde {formatDate(user.created_at)}
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Right column - User information and settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>Gestiona tu información y configuración</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? (
                  <span className="flex items-center gap-1">Cancelar</span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Edit className="h-4 w-4" /> Editar
                  </span>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="profile">
              <TabsList>
                <TabsTrigger value="profile">Perfil</TabsTrigger>
                <TabsTrigger value="security">Seguridad</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="mt-4 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                        <User size={18} />
                      </div>
                      <Input
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        className="pl-10"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                        <Mail size={18} />
                      </div>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={user.email}
                        onChange={handleInputChange}
                        className="pl-10"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                        <Phone size={18} />
                      </div>
                      <Input
                        id="phone"
                        name="phone"
                        value={user.phone}
                        onChange={handleInputChange}
                        className="pl-10"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                        <Building size={18} />
                      </div>
                      <Input
                        id="company"
                        name="company"
                        value={user.company}
                        onChange={handleInputChange}
                        className="pl-10"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="security" className="mt-4 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Contraseña actual</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                      <Lock size={18} />
                    </div>
                    <Input
                      id="current-password"
                      type="password"
                      className="pl-10"
                      placeholder="••••••••"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nueva contraseña</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                      <Lock size={18} />
                    </div>
                    <Input
                      id="new-password"
                      type="password"
                      className="pl-10"
                      placeholder="••••••••"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                      <Lock size={18} />
                    </div>
                    <Input
                      id="confirm-password"
                      type="password"
                      className="pl-10"
                      placeholder="••••••••"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          {isEditing && (
            <CardFooter>
              <Button 
                onClick={handleSave} 
                className="ml-auto"
              >
                <Save className="h-4 w-4 mr-2" /> Guardar cambios
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Profile;
