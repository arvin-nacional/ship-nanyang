"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteBlog } from "@/lib/actions/blog.action";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Props {
  id: string;
}

const DeleteBlogButton = ({ id }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteBlog(id);
        toast({ title: "Blog post deleted successfully" });
        router.push("/admin/blogs");
      } catch {
        toast({
          title: "Failed to delete blog post",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="border-red-400 text-red-500 hover:bg-red-50 flex items-center gap-2"
          disabled={isPending}
        >
          <Trash2 size={16} />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="background-light900_dark300 text-dark400_light700">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this blog post?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The blog post will be permanently
            removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBlogButton;
