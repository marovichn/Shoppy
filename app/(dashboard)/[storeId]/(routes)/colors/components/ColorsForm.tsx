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

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

type ColorsFormValues = z.infer<typeof formSchema>;

interface ColorsFormProps {
  initialData: Size | null;
}

const ColorsForm: FC<ColorsFormProps> = ({ initialData }) => {
  const origin = useOrigin();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit color" : "Create color";
  const description = initialData ? "Edit color" : "Add a new color";
  const toastMessage = initialData ? "Color updated" : "Added new color";
  const action = initialData ? "Save changes" : "Create color";

  const form = useForm<ColorsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: ColorsFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params?.storeId}/colors/${params.colorId}`,
          data
        );
      } else {
        await axios.post(`/api/${params?.storeId}/colors`, data);
      }

      router.refresh();
      router.push(`/${params.storeId}/colors`);
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
        `/api/${params?.storeId}/colors/${params.colorId}`
      );

      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast.success("Color deleted successfully");
    } catch (err) {
      toast.error(
        "Make sure you removed all products using this color first!"
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
              Delete Color
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
                      placeholder='Color name'
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
                      placeholder='Color value'
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
export default ColorsForm;
