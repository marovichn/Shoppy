"use client";

import { Billboard } from "@prisma/client";
import { FC, useState } from "react";
import Heading from "./Heading";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { Separator } from "./ui/separator";
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
} from "./ui/form";
import { Input } from "./ui/input";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "./modals/AlertModal";
import { useOrigin } from "@/hooks/use/use-origin";
import ImageUpload from "./ImageUpload";

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

type BillbooardFormValues = z.infer<typeof formSchema>;

interface BillbooardFormProps {
  initialData: Billboard | null;
}

const BillbooardForm: FC<BillbooardFormProps> = ({ initialData }) => {
  const origin = useOrigin();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit Billboard" : "New Billboard";
  const description = initialData ? "Edit a billboard" : "Add a new billboard";
  const toastMessage = initialData
    ? "Billboard updated"
    : "Added new billboard";
  const action = initialData ? "Save changes" : "Create billboard";

  const form = useForm<BillbooardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: BillbooardFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params?.storeId}/billboards/${params.billboardId}`,
          { label: data.label, imageUrl: data.imageUrl }
        );
      } else {
        await axios.post(`/api/${params?.storeId}/billboards`, {
          label: data.label,
          imageUrl: data.imageUrl,
        });
      }

      router.refresh();
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
        `/api/${params?.storeId}/billboards/${params.billboardId}`
      );

      router.refresh();
      toast.success("Billboard deleted successfully");
    } catch (err) {
      toast.error(
        "Make sure you removed all categories using this billboard first!"
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
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='ml-1 font-semibold'>
                  Background Image
                </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='label'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='ml-1 font-semibold'>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Billboard label'
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
      <Separator />
    </>
  );
};
export default BillbooardForm;
