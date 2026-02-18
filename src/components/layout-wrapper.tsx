import React from 'react';
import { 
  Github, 
  Menu, 
  Terminal,
  FileText,
  Mail,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {/* 1. Sidebar (Optional) 
          If you don't have a <Sidebar /> component yet, 
          SidebarTrigger won't do much, but the structure is preserved.
      */}
      
      <SidebarInset className="flex flex-col min-h-screen bg-background">
        
        {/* 2. Sticky Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between px-4 md:px-6">
            
            {/* Left Side: Trigger, Logo & Breadcrumbs */}
            <div className="flex items-center gap-3">
              <Separator orientation="vertical" className="h-4 mx-1" />
              
              <div className="flex items-center gap-2 font-bold tracking-tighter mr-4">
                <div className="bg-primary text-primary-foreground p-1 rounded">
                  <Terminal size={16} />
                </div>
                <span className="hidden lg:inline-block text-sm">Nishan Shashintha</span>
              </div>

              
            </div>

            {/* Right Side: Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
              <div className="flex items-center gap-4 text-muted-foreground">
                <a href="#services" className="transition-colors hover:text-primary">Services</a>
                <a href="#experience" className="transition-colors hover:text-primary">Experience</a>
                <a href="#projects" className="transition-colors hover:text-primary">Projects</a>
              </div>
              
              <Separator orientation="vertical" className="h-4" />
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Github className="h-4 w-4" />
                </Button>
                <Button size="sm" className="h-8 gap-2 text-xs">
                  <FileText className="h-3.5 w-3.5" />
                  Resume
                </Button>
              </div>
            </nav>

            {/* Mobile Navigation */}
            <div className="flex md:hidden items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[80%] p-6">
                  <div className="flex flex-col gap-6 mt-6">
                    <div className="space-y-3">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Navigation</h3>
                      <nav className="flex flex-col gap-3">
                        <a href="#services" className="text-lg font-medium">Services</a>
                        <a href="#experience" className="text-lg font-medium">Experience</a>
                        <a href="#projects" className="text-lg font-medium">Projects</a>
                      </nav>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-3">
                      <Button className="w-full justify-start gap-2" variant="outline">
                        <Github className="h-4 w-4" /> GitHub
                      </Button>
                      <Button className="w-full justify-start gap-2">
                        <Mail className="h-4 w-4" /> Hire Me
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        {/* 3. Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          {/* Removed the neutral-100 background and forced max-width here 
              to keep the content centered and clean.
          */}
          <div className="w-full mx-auto">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}