
import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ContextualHelp } from "@/components/common/ContextualHelp";
import { useToast } from "@/hooks/use-toast";
import { Bell, Brain, Lock, Monitor, Shield, User } from "lucide-react";

export default function SettingsPage() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    results: true,
    system: false
  });

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully."
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account and application preferences"
      />

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Account</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            <span>Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span>AI Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>Profile Information</span>
                <ContextualHelp 
                  title="Profile Information"
                  content="Update your personal and professional information. This information may be visible to other physicians on the platform."
                />
              </CardTitle>
              <CardDescription>
                Update your account details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="Dr. James Smith" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="james.smith@neuroview.org" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input id="title" defaultValue="Neurologist, MD" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution</Label>
                  <Input id="institution" defaultValue="Central Neurology Center" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license">Medical License #</Label>
                  <Input id="license" defaultValue="ML29384756" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>Notification Preferences</span>
                <ContextualHelp 
                  title="Notification Settings"
                  content="Configure when and how you receive notifications from NeuroView."
                />
              </CardTitle>
              <CardDescription>
                Manage how you receive notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive email notifications for important updates</p>
                  </div>
                  <Switch 
                    id="email-notifications" 
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications" className="font-medium">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                  </div>
                  <Switch 
                    id="push-notifications" 
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="results-notifications" className="font-medium">Analysis Results</Label>
                    <p className="text-sm text-muted-foreground">Get notified when new analysis results are available</p>
                  </div>
                  <Switch 
                    id="results-notifications" 
                    checked={notifications.results}
                    onCheckedChange={(checked) => setNotifications({...notifications, results: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="system-notifications" className="font-medium">System Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified about system updates and maintenance</p>
                  </div>
                  <Switch 
                    id="system-notifications" 
                    checked={notifications.system}
                    onCheckedChange={(checked) => setNotifications({...notifications, system: checked})}
                  />
                </div>
              </div>
              <Button onClick={handleSave}>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your password and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
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
                <div className="flex items-center space-x-2">
                  <Switch id="2fa" defaultChecked />
                  <div className="grid gap-1.5">
                    <Label htmlFor="2fa" className="font-medium">Two-factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require an authentication code in addition to your password</p>
                  </div>
                </div>
                <Button onClick={handleSave} className="flex gap-2">
                  <Lock className="h-4 w-4" />
                  <span>Update Security Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the look and feel of the application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Theme</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="justify-center">Light</Button>
                    <Button variant="outline" className="justify-center">Dark</Button>
                    <Button variant="outline" className="justify-center">System</Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="animations" defaultChecked />
                  <Label htmlFor="animations">Enable animations</Label>
                </div>
                <Button onClick={handleSave}>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle>AI Analysis Settings</CardTitle>
              <CardDescription>
                Configure how the NeuroView AI analysis works
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="ai-sensitivity" className="font-medium">Analysis Sensitivity</Label>
                    <p className="text-sm text-muted-foreground">Higher values may detect more subtle anomalies</p>
                  </div>
                  <div className="w-48">
                    <Input id="ai-sensitivity" type="range" min="1" max="10" defaultValue="7" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="ai-preprocessing" defaultChecked />
                  <Label htmlFor="ai-preprocessing">Enhanced preprocessing</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="ai-secondary" defaultChecked />
                  <Label htmlFor="ai-secondary">Secondary confirmation analysis</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="ai-reports" defaultChecked />
                  <Label htmlFor="ai-reports">Generate AI report suggestions</Label>
                </div>
                
                <Button onClick={handleSave}>Save AI Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
