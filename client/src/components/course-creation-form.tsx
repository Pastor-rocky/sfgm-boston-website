import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface CourseCreationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CourseCreationForm({ isOpen, onClose }: CourseCreationFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [duration, setDuration] = useState("");
  const [points, setPoints] = useState("");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createCourseMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest('POST', '/api/courses', data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Course created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/courses'] });
      onClose();
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create course",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setName("");
    setDescription("");
    setCategory("");
    setDifficulty("");
    setDuration("");
    setPoints("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !description.trim() || !category || !difficulty) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    createCourseMutation.mutate({
      name,
      description,
      category,
      difficulty,
      duration: parseInt(duration) || 10,
      points: parseInt(points) || 300,
      isActive: true,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Bible School Course</DialogTitle>
          <DialogDescription>
            Add a new course to the SFGM Boston Bible School catalog
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Course Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Advanced Eschatology"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Biblical Studies">Biblical Studies</SelectItem>
                  <SelectItem value="Theology">Theology</SelectItem>
                  <SelectItem value="Ministry Leadership">Ministry Leadership</SelectItem>
                  <SelectItem value="Church History">Church History</SelectItem>
                  <SelectItem value="Pastoral Care">Pastoral Care</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Course Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the course content, objectives, and what students will learn"
              rows={3}
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level *</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (weeks)</Label>
              <Input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="10"
                min="1"
                max="52"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="points">Total Points</Label>
              <Input
                id="points"
                type="number"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                placeholder="300"
                min="100"
                max="1000"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={createCourseMutation.isPending}>
              {createCourseMutation.isPending ? "Creating..." : "Create Course"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}