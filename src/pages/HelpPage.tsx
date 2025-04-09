
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, FileText, HelpCircle, Video, Phone } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Help & Support"
        description="Resources and assistance for using RetinaScan InsightHub"
      />

      <div className="flex items-center space-x-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for help topics..."
            className="pl-8"
          />
        </div>
        <Button type="submit">
          Search
        </Button>
      </div>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 md:max-w-xl">
          <TabsTrigger value="faq">
            <HelpCircle className="h-4 w-4 mr-2" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="guides">
            <FileText className="h-4 w-4 mr-2" />
            Guides
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Video className="h-4 w-4 mr-2" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="contact">
            <Phone className="h-4 w-4 mr-2" />
            Contact
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How accurate is the AI diagnostic system?</AccordionTrigger>
                  <AccordionContent>
                    Our AI system has been validated with a 92% accuracy rate when compared to diagnoses from board-certified ophthalmologists. The system is designed to assist, not replace, clinical judgment. All AI results should be reviewed by a qualified medical professional.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What image types are supported by the system?</AccordionTrigger>
                  <AccordionContent>
                    RetinaScan currently supports the following image types: Fundus photography, OCT (Optical Coherence Tomography), Color retinal images, Fluorescein angiography, and IndoCyanine Green angiography. Images should be in DICOM, PNG, JPEG or TIFF formats.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How is patient data secured?</AccordionTrigger>
                  <AccordionContent>
                    All patient data is encrypted at rest and in transit using AES-256 encryption. Our system is HIPAA compliant and undergoes regular security audits. Images are anonymized before processing with our AI algorithms unless explicitly opted out in settings.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Can I export reports to our hospital EHR system?</AccordionTrigger>
                  <AccordionContent>
                    Yes, RetinaScan supports integration with major EHR systems including Epic, Cerner, and Allscripts through standard HL7 and FHIR protocols. For custom integrations, please contact our support team.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>What should I do if the system is slow or unresponsive?</AccordionTrigger>
                  <AccordionContent>
                    First, check your internet connection. If issues persist, try refreshing your browser or clearing the cache. For persistent performance issues, contact technical support with details about your system configuration and the specific actions that trigger slowdowns.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="guides">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Getting Started Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Complete walkthrough of system setup, user onboarding, and basic functionality.
                </p>
                <Button variant="link" className="p-0 h-auto mt-2">
                  Read guide
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Image Analysis Tutorial</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Learn how to upload, analyze, and interpret retinal images with AI assistance.
                </p>
                <Button variant="link" className="p-0 h-auto mt-2">
                  Read guide
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Integration Manual</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Technical documentation for integrating with EHR, PACS, and other medical systems.
                </p>
                <Button variant="link" className="p-0 h-auto mt-2">
                  Read guide
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Diagnostic Reference</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Reference material for understanding AI diagnostic output and clinical implications.
                </p>
                <Button variant="link" className="p-0 h-auto mt-2">
                  Read guide
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Security Protocols</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Best practices for ensuring patient data security and HIPAA compliance.
                </p>
                <Button variant="link" className="p-0 h-auto mt-2">
                  Read guide
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Troubleshooting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Common issues and solutions for system operation and connectivity problems.
                </p>
                <Button variant="link" className="p-0 h-auto mt-2">
                  Read guide
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="videos">
          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">System Overview Tutorial</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted flex items-center justify-center rounded-md mb-3">
                  <Video className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  A complete walkthrough of the RetinaScan system and its major features.
                </p>
                <div className="mt-3 flex items-center text-sm text-muted-foreground">
                  <span>10:32</span>
                  <Button variant="link" className="ml-auto p-0 h-auto">
                    Watch video
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Image Upload & Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted flex items-center justify-center rounded-md mb-3">
                  <Video className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Learn how to upload retinal images and interpret AI analysis results.
                </p>
                <div className="mt-3 flex items-center text-sm text-muted-foreground">
                  <span>8:15</span>
                  <Button variant="link" className="ml-auto p-0 h-auto">
                    Watch video
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Advanced Reporting</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted flex items-center justify-center rounded-md mb-3">
                  <Video className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Create customized reports and export them to different formats and systems.
                </p>
                <div className="mt-3 flex items-center text-sm text-muted-foreground">
                  <span>6:42</span>
                  <Button variant="link" className="ml-auto p-0 h-auto">
                    Watch video
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Patient Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted flex items-center justify-center rounded-md mb-3">
                  <Video className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Efficiently manage patient records, history, and diagnostic information.
                </p>
                <div className="mt-3 flex items-center text-sm text-muted-foreground">
                  <span>7:18</span>
                  <Button variant="link" className="ml-auto p-0 h-auto">
                    Watch video
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="contact">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Technical Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium">Email Support:</p>
                  <p className="text-sm text-muted-foreground">support@retinascan.med</p>
                </div>
                <div>
                  <p className="font-medium">Phone Support:</p>
                  <p className="text-sm text-muted-foreground">1-800-RETINA-HELP (Available 24/7)</p>
                </div>
                <div>
                  <p className="font-medium">Response Time:</p>
                  <p className="text-sm text-muted-foreground">Critical issues - 1 hour</p>
                  <p className="text-sm text-muted-foreground">Standard issues - 24 hours</p>
                </div>
                <Button className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input id="email" type="email" placeholder="Your email" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                      <Input id="subject" placeholder="How can we help?" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Message</label>
                      <textarea
                        id="message"
                        className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Please describe your issue or question"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
