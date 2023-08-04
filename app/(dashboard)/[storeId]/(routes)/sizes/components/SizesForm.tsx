"use client";

import { Billboard, Category, Size } from "@prisma/client";
import { FC, useState } from "react";
import { Trash } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useOrigin } from "@/hooks/use/use-origin";
import AlertModal from "@/components/modals/AlertModal";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

type SizesFormValues = z.infer<typeof formSchema>;

interface SizesFormProps {
  initialData: Size | null;
}

const SizesForm: FC<SizesFormProps> = ({ initialData }) => {
  const origin = useOrigin();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit size" : "Create size";
  const description = initialData ? "Edit size" : "Add a new size";
  const toastMessage = initialData ? "Size updated" : "Added new size";
  const action = initialData ? "Save changes" : "Create size";

  const form = useForm<SizesFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: SizesFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params?.storeId}/sizes/${params.sizeId}`,
          data
        );
      } else {
        await axios.post(`/api/${params?.storeId}/sizes`, data);
      }

      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast.success(toastMessage);
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params?.storeId}/sizes/${params.sizeId}`
      );

      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast.success("Category deleted successfully");
    } catch (err) {
      toast.error(
        "Make sure you removed all products using this size first!"
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        loading={loading}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={deleteHandler}
      />
      <div className='flex items-center justify-between'>
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            className='text-white font-bold group h-10 '
            variant='destructive'
            size='sm'
            onClick={() => setOpen(true)}
          >
            <p className='group-hover:w-24 group-hover:text-white transition-all w-0 text-transparent'>
              Delete Store
            </p>
            <Trash className='h-4 w-4 ml-2 mr-2' />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          className='space-y-8 w-full'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='ml-1 font-semibold'>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Size name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='value'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='ml-1 font-semibold'>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Size value'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
export default SizesForm;
