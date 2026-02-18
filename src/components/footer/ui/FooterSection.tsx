import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from 'lucide-react';
export function FooterSection() {
    return (
        <footer className="border-t py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-sm text-muted-foreground">Nishan Shashintha © 2026</p>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" className="rounded-full"><Github /></Button>
            <Button variant="ghost" size="icon" className="rounded-full"><Linkedin /></Button>
            <Button variant="ghost" size="icon" className="rounded-full"><Mail /></Button>
          </div>
        </footer>
    )
}