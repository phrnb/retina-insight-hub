
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileText, Mail, Phone, MessageSquare, Video, HelpCircle, BookOpen, GraduationCap, Coffee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function HelpPage() {
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search initiated",
      description: "Searching help documentation..."
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "Your support request has been submitted. We'll get back to you shortly."
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Help Center" 
        description="Find answers and support for NeuroView"
      />

      <div className="max-w-2xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="flex w-full items-center space-x-2">
          <Input placeholder="Search for help topics..." className="flex-1" />
          <Button type="submit" variant="default">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>
      </div>

      <Tabs defaultValue="documentation" className="space-y-6">
        <TabsList className="flex justify-center max-w-2xl mx-auto">
          <TabsTrigger value="documentation" className="flex gap-2">
            <FileText className="h-4 w-4" />
            <span>Documentation</span>
          </TabsTrigger>
          <TabsTrigger value="tutorials" className="flex gap-2">
            <GraduationCap className="h-4 w-4" />
            <span>Tutorials</span>
          </TabsTrigger>
          <TabsTrigger value="faqs" className="flex gap-2">
            <HelpCircle className="h-4 w-4" />
            <span>FAQs</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex gap-2">
            <Mail className="h-4 w-4" />
            <span>Contact</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="documentation" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Getting Started
                </CardTitle>
                <CardDescription>Learn the basics of NeuroView</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="text-primary hover:underline cursor-pointer">System Overview</li>
                  <li className="text-primary hover:underline cursor-pointer">User Account Setup</li>
                  <li className="text-primary hover:underline cursor-pointer">Dashboard Navigation</li>
                  <li className="text-primary hover:underline cursor-pointer">Your First Analysis</li>
                  <li className="text-primary hover:underline cursor-pointer">Understanding Reports</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Neural Analysis
                </CardTitle>
                <CardDescription>Working with brain scans</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="text-primary hover:underline cursor-pointer">Uploading Scans</li>
                  <li className="text-primary hover:underline cursor-pointer">Analysis Settings</li>
                  <li className="text-primary hover:underline cursor-pointer">Reading Results</li>
                  <li className="text-primary hover:underline cursor-pointer">Identification Markers</li>
                  <li className="text-primary hover:underline cursor-pointer">Exporting Data</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Patient Management
                </CardTitle>
                <CardDescription>Managing patient records</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="text-primary hover:underline cursor-pointer">Adding New Patients</li>
                  <li className="text-primary hover:underline cursor-pointer">Medical History</li>
                  <li className="text-primary hover:underline cursor-pointer">Tracking Progress</li>
                  <li className="text-primary hover:underline cursor-pointer">Patient Privacy</li>
                  <li className="text-primary hover:underline cursor-pointer">Data Export</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Latest Documentation Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="border-b pb-2">
                  <div className="font-medium">New Diagnostic Tools</div>
                  <div className="text-sm text-muted-foreground">Updated April 5, 2025</div>
                </li>
                <li className="border-b pb-2">
                  <div className="font-medium">Patient Data Protection Guidelines</div>
                  <div className="text-sm text-muted-foreground">Updated March 28, 2025</div>
                </li>
                <li className="border-b pb-2">
                  <div className="font-medium">AI Analysis Interpretation Guide</div>
                  <div className="text-sm text-muted-foreground">Updated March 15, 2025</div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tutorials" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Video Tutorials</CardTitle>
                <CardDescription>Watch step-by-step guides</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex gap-3 items-center">
                    <Video className="h-10 w-10 text-primary p-2 bg-primary/10 rounded" />
                    <div>
                      <div className="font-medium">Getting Started with NeuroView</div>
                      <div className="text-xs text-muted-foreground">5:32 • Beginner</div>
                    </div>
                  </li>
                  <li className="flex gap-3 items-center">
                    <Video className="h-10 w-10 text-primary p-2 bg-primary/10 rounded" />
                    <div>
                      <div className="font-medium">Advanced Neural Analysis</div>
                      <div className="text-xs text-muted-foreground">12:47 • Advanced</div>
                    </div>
                  </li>
                  <li className="flex gap-3 items-center">
                    <Video className="h-10 w-10 text-primary p-2 bg-primary/10 rounded" />
                    <div>
                      <div className="font-medium">Patient Data Management</div>
                      <div className="text-xs text-muted-foreground">8:15 • Intermediate</div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Guided Tutorials</CardTitle>
                <CardDescription>Interactive walkthroughs</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex gap-3 items-center">
                    <Coffee className="h-10 w-10 text-primary p-2 bg-primary/10 rounded" />
                    <div>
                      <div className="font-medium">New User Orientation</div>
                      <div className="text-xs text-muted-foreground">10 minutes • Basic</div>
                    </div>
                  </li>
                  <li className="flex gap-3 items-center">
                    <Coffee className="h-10 w-10 text-primary p-2 bg-primary/10 rounded" />
                    <div>
                      <div className="font-medium">Diagnosis Workflow</div>
                      <div className="text-xs text-muted-foreground">15 minutes • Intermediate</div>
                    </div>
                  </li>
                  <li className="flex gap-3 items-center">
                    <Coffee className="h-10 w-10 text-primary p-2 bg-primary/10 rounded" />
                    <div>
                      <div className="font-medium">Custom Reports</div>
                      <div className="text-xs text-muted-foreground">12 minutes • Advanced</div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center">
            <Button variant="outline" className="gap-2">
              <GraduationCap className="h-4 w-4" />
              View All Training Resources
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="faqs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions and answers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium text-lg">How accurate is the neural analysis?</h3>
                <p className="text-muted-foreground">NeuroView's analysis system has been validated with a 94% accuracy rate in clinical trials. Results should always be confirmed by a qualified physician.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-lg">What scan formats are supported?</h3>
                <p className="text-muted-foreground">NeuroView supports DICOM, NIfTI, Analyze, and several other common neuroimaging formats. For a complete list, please refer to the technical documentation.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-lg">How is patient data secured?</h3>
                <p className="text-muted-foreground">All patient data is encrypted at rest and in transit using AES-256 encryption. Our platform is HIPAA compliant and undergoes regular security audits.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-lg">Can I integrate NeuroView with our hospital EHR system?</h3>
                <p className="text-muted-foreground">Yes, NeuroView offers API integration with major EHR systems including Epic, Cerner, and Allscripts. Contact our integration team for specific details.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-lg">What training is required to use NeuroView?</h3>
                <p className="text-muted-foreground">We offer comprehensive training programs for all user levels. Basic usage requires minimal training, while advanced features may require specialized training sessions.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get help from our team</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input id="subject" placeholder="How can we help you?" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    placeholder="Describe your issue or question" 
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  ></textarea>
                </div>
                <Button type="submit" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Phone Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Available Monday-Friday</p>
                <p className="text-sm">9:00 AM - 5:00 PM EST</p>
                <p className="font-medium mt-2">+1 (800) 555-0123</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Email Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">24/7 support via email</p>
                <p className="text-sm">Response within 24 hours</p>
                <p className="font-medium mt-2">support@neuroview.org</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Live Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Available Monday-Friday</p>
                <p className="text-sm">8:00 AM - 8:00 PM EST</p>
                <Button variant="outline" size="sm" className="mt-2 gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Users(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function Brain(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  );
}
