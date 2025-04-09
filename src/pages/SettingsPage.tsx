
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/common/PageHeader";
import { ContextualHelp } from "@/components/common/ContextualHelp";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    analysisComplete: true,
    patientUpdates: true,
    systemUpdates: false,
    errors: true,
  });

  const [integration, setIntegration] = useState({
    syncEHR: true,
    syncPACS: true,
    anonymizeData: true,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Configure your system preferences and integrations"
      />

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 md:max-w-xl">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="display">Display</TabsTrigger>
          <TabsTrigger value="integration">Integration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Account Information</span>
                <ContextualHelp
                  title="Account Settings"
                  content="Manage your account information, update credentials, and configure security preferences."
                />
              </CardTitle>
              <CardDescription>Update your account details and credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Dr. Jane Smith" defaultValue="Dr. Smith" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="doctor@hospital.org" defaultValue="doctor@hospital.org" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty</Label>
                <Select defaultValue="ophthalmology">
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ophthalmology">Ophthalmology</SelectItem>
                    <SelectItem value="retina">Retina Specialist</SelectItem>
                    <SelectItem value="glaucoma">Glaucoma Specialist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure when and how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Analysis Complete</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications when AI analysis is complete</p>
                  </div>
                  <Switch 
                    checked={notifications.analysisComplete}
                    onCheckedChange={(checked) => setNotifications({...notifications, analysisComplete: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Patient Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications about patient record changes</p>
                  </div>
                  <Switch 
                    checked={notifications.patientUpdates}
                    onCheckedChange={(checked) => setNotifications({...notifications, patientUpdates: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications about system updates and maintenance</p>
                  </div>
                  <Switch 
                    checked={notifications.systemUpdates}
                    onCheckedChange={(checked) => setNotifications({...notifications, systemUpdates: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Error Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts about errors or issues with the system</p>
                  </div>
                  <Switch 
                    checked={notifications.errors}
                    onCheckedChange={(checked) => setNotifications({...notifications, errors: checked})}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="display">
          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>Customize the appearance of the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="justify-start">Light</Button>
                  <Button variant="outline" className="justify-start">Dark</Button>
                  <Button variant="outline" className="justify-start">System</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Default Dashboard View</Label>
                <Select defaultValue="grid">
                  <SelectTrigger>
                    <SelectValue placeholder="Select view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grid</SelectItem>
                    <SelectItem value="list">List</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="integration">
          <Card>
            <CardHeader>
              <CardTitle>System Integrations</CardTitle>
              <CardDescription>Configure integrations with other medical systems</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sync with EHR</Label>
                    <p className="text-sm text-muted-foreground">Automatically sync patient data with electronic health records</p>
                  </div>
                  <Switch 
                    checked={integration.syncEHR}
                    onCheckedChange={(checked) => setIntegration({...integration, syncEHR: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sync with PACS</Label>
                    <p className="text-sm text-muted-foreground">Automatically sync images with PACS system</p>
                  </div>
                  <Switch 
                    checked={integration.syncPACS}
                    onCheckedChange={(checked) => setIntegration({...integration, syncPACS: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Anonymize Data for AI Training</Label>
                    <p className="text-sm text-muted-foreground">Automatically anonymize patient data used for AI model training</p>
                  </div>
                  <Switch 
                    checked={integration.anonymizeData}
                    onCheckedChange={(checked) => setIntegration({...integration, anonymizeData: checked})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>API Keys</Label>
                <Input type="password" value="•••••••••••••••••••••••••••" readOnly />
                <p className="text-xs text-muted-foreground">Contact your system administrator to update API keys</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Integration Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
