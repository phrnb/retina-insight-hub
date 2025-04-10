
import { useState, useEffect } from "react";
import { Search, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KnowledgeArticleCard } from "./KnowledgeArticleCard";
import { Skeleton } from "@/components/ui/skeleton";

interface KnowledgeArticleListProps {
  category: string;
}

export function KnowledgeArticleList({ category }: KnowledgeArticleListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState<any[]>([]);
  
  useEffect(() => {
    // Simulate loading articles based on selected category
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      const mockArticles = [
        {
          id: "1",
          title: "Understanding Fundus Photography in Glaucoma Detection",
          excerpt: "A comprehensive guide to interpreting fundus images for glaucoma diagnosis and progression monitoring.",
          imageUrl: "https://placehold.co/600x400?text=Fundus+Imaging",
          category: "glaucoma",
          tags: ["Fundus", "Diagnosis", "Imaging"],
          date: "2025-03-15",
          readTime: "8 min",
          type: "article"
        },
        {
          id: "2",
          title: "Early Indicators of Diabetic Retinopathy",
          excerpt: "Learn to identify the early signs of diabetic retinopathy through OCT and fundus examination.",
          imageUrl: "https://placehold.co/600x400?text=Diabetic+Retinopathy",
          category: "retinopathy",
          tags: ["Diabetes", "Early Detection", "OCT"],
          date: "2025-04-02",
          readTime: "12 min",
          type: "article"
        },
        {
          id: "3",
          title: "AMD Classification and Treatment Guidelines",
          excerpt: "Current classification systems for Age-Related Macular Degeneration and evidence-based treatment approaches.",
          imageUrl: "https://placehold.co/600x400?text=AMD",
          category: "amd",
          tags: ["AMD", "Classification", "Treatment"],
          date: "2025-03-28",
          readTime: "10 min",
          type: "video"
        },
        {
          id: "4",
          title: "Advanced Cataract Surgery Techniques",
          excerpt: "Modern approaches to cataract extraction and intraocular lens implantation.",
          imageUrl: "https://placehold.co/600x400?text=Cataract+Surgery",
          category: "cataract",
          tags: ["Surgery", "IOL", "Techniques"],
          date: "2025-04-05",
          readTime: "15 min",
          type: "protocol"
        },
        {
          id: "5",
          title: "OCT Interpretation in Retinal Diseases",
          excerpt: "A systematic approach to interpreting Optical Coherence Tomography in various retinal pathologies.",
          imageUrl: "https://placehold.co/600x400?text=OCT+Guide",
          category: "imaging",
          tags: ["OCT", "Imaging", "Interpretation"],
          date: "2025-03-10",
          readTime: "9 min",
          type: "article"
        },
        {
          id: "6",
          title: "2025 Guidelines for Glaucoma Management",
          excerpt: "Updated clinical guidelines for glaucoma diagnosis, monitoring, and treatment strategies.",
          imageUrl: "https://placehold.co/600x400?text=Glaucoma+Guidelines",
          category: "protocols",
          tags: ["Guidelines", "Management", "Treatment"],
          date: "2025-02-20",
          readTime: "18 min",
          type: "protocol"
        },
        {
          id: "7",
          title: "Global Trends in Diabetic Retinopathy Prevalence",
          excerpt: "Statistical analysis of DR prevalence across different regions and populations.",
          imageUrl: "https://placehold.co/600x400?text=DR+Statistics",
          category: "statistics",
          tags: ["Statistics", "Epidemiology", "Global Health"],
          date: "2025-03-05",
          readTime: "11 min",
          type: "article"
        },
      ];
      
      const filtered = category === "all" 
        ? mockArticles 
        : mockArticles.filter(article => article.category === category);
        
      setArticles(filtered);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [category]);
  
  // Filter by search term
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search articles..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs value={viewType} onValueChange={(value) => setViewType(value as "grid" | "list")}>
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {isLoading ? (
        viewType === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border rounded-md p-4">
                <Skeleton className="h-40 w-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 mt-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="border rounded-md p-4 flex">
                <Skeleton className="h-24 w-24 mr-4" />
                <div className="flex-1">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )
      ) : filteredArticles.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
          <h3 className="mt-4 text-lg font-medium">No articles found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      ) : (
        <div className={viewType === "grid" 
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4" 
          : "space-y-4 mt-4"
        }>
          {filteredArticles.map((article) => (
            <KnowledgeArticleCard
              key={article.id}
              article={article}
              viewType={viewType}
            />
          ))}
        </div>
      )}
    </div>
  );
}
