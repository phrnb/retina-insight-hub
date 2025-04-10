
import { FileText, Video, Bookmark, BookOpen, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  type: "article" | "video" | "protocol";
}

interface KnowledgeArticleCardProps {
  article: Article;
  viewType: "grid" | "list";
}

export function KnowledgeArticleCard({ article, viewType }: KnowledgeArticleCardProps) {
  const TypeIcon = article.type === "video" ? Video : 
                  article.type === "protocol" ? FileText : 
                  BookOpen;
  
  if (viewType === "list") {
    return (
      <div className="border rounded-md overflow-hidden hover:border-primary/50 transition-colors duration-200">
        <div className="flex flex-col sm:flex-row">
          <div className="relative h-32 sm:h-auto sm:w-36 bg-muted">
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <TypeIcon className="h-3 w-3" />
                <span className="capitalize">{article.type}</span>
              </Badge>
            </div>
          </div>
          
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-base mb-1">{article.title}</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8 ml-2 mt-[-4px]">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
              {article.excerpt}
            </p>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {article.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-muted-foreground">
                {new Date(article.date).toLocaleDateString()} · {article.readTime} read
              </span>
              <Button variant="ghost" size="sm" className="text-xs h-7">
                Read <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="border rounded-md overflow-hidden hover:border-primary/50 transition-colors duration-200">
      <div className="relative h-40 bg-muted">
        <img 
          src={article.imageUrl} 
          alt={article.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <TypeIcon className="h-3 w-3" />
            <span className="capitalize">{article.type}</span>
          </Badge>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-base mb-1">{article.title}</h3>
          <Button variant="ghost" size="icon" className="h-8 w-8 ml-2 mt-[-4px]">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {article.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {article.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-muted-foreground">
            {new Date(article.date).toLocaleDateString()} · {article.readTime} read
          </span>
          <Button variant="ghost" size="sm" className="text-xs h-7">
            Read <ExternalLink className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
